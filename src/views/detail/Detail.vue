<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll class="wrapper" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :detailBanner="detailBanner" />
      <detail-baseInfo :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" ref="shop" />
      <detail-image-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goodsList="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isBackTopShow" />
    <toast />
  </div>
</template>

<script>
import DetailNavBar from './childrenDetail/DetailNavBar'
import DetailSwiper from './childrenDetail/DetailSwiper'
import DetailBaseInfo from './childrenDetail/DetailBaseInfo'
import DetailShopInfo from './childrenDetail/DetailShopInfo'
import DetailImageInfo from './childrenDetail/DetailImageInfo'
import DetailParamInfo from './childrenDetail/DetailParamInfo'
import DetailCommentInfo from './childrenDetail/DetailCommentInfo'
import DetailBottomBar from './childrenDetail/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'
import GoodsList from 'components/content/goods/GoodsList'

import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { debounce } from 'common/utils'

import { getDetail, Goods, getRecommend } from 'network/detail'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    Toast,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      id: null,
      detailBanner: [], // 轮播图数据
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null
    }
  },
  methods: {
    ...mapActions(['addCart']),
    detailImgLoad () {
      this._refresh()
      this.getThemeTopY()
    },

    // 点击标题滚动到对应内容
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },

    contentScroll (position) {
      // 判断backTop是否显示
      this.isBackTopShow = position.y < -1000

      // 滚动内容显示对应的标题
      const positionY = -position.y
      /**
       * positionY与this.themeTopYs对比 [0, 9310, 10052, 10246]
       * positionY 0-9310 index = 0
       */
      let length = this.themeTopYs.length,
        currentIndex = this.$refs.nav.currrentIndex

      // hack做法
      for (let i = 0; i < length - 1; i++) {
        let iPos = this.themeTopYs[i]
        if (currentIndex !== i && positionY >= iPos && positionY < this.themeTopYs[i + 1]) {
          this.$refs.nav.currentIndex = i
        }
      }

      // for (let i = 0; i < length; i++) {
      //   let iPos = this.themeTopYs[i]
      //   if (this.currentIndex !== i && (i < length - 1 && positionY >= iPos && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= iPos)) {
      //     this.$refs.nav.currentIndex = i
      //   }
      // }
    },
    addToCart () {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.detailBanner[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.id

      // 将商品添加到购物车
      // this.$store.dispatch('addCart', product).then(res => console.log(res))
      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    }
  },
  created () {
    // 获取id
    this.id = this.$route.params.id

    // 请求详情数据
    getDetail(this.id).then(res => {
      const data = res.result

      // 轮播图数据
      this.detailBanner = data.itemInfo.topImages

      // 创建商品对象
      this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 店铺信息
      this.shopInfo = data.shopInfo

      // 详情信息
      this.detailInfo = data.detailInfo

      // 参数信息
      this.paramInfo = data.itemParams

      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 对getThemeTopY赋值（对this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 100)
  },
  destroyed () {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

.wrapper {
  height: calc(100% - 44px - 49px);
}
</style>