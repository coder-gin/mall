<template>
  <div id="home">
    <!-- 导航区域 -->
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @itemClick="itemClick"
      ref="tabControl1"
      class="tab_control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图区域 -->
      <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>

      <home-recommend :recommend="recommend"></home-recommend>

      <home-feature></home-feature>

      <tab-control :titles="['流行','新款','精选']" @itemClick="itemClick" ref="tabControl2"></tab-control>

      <goods-list :goodsList="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childrenHome/HomeSwiper'
import HomeRecommend from './childrenHome/HomeRecommend'
import HomeFeature from './childrenHome/HomeFeature'

import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    HomeRecommend,
    HomeFeature
  },
  data () {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    debounce (handler, delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          handler.call(this, args)
        }, delay)
      }
    },
    itemClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) {
      // 判断backTop是否显示
      this.isBackTopShow = position.y < -1000

      // 判断tabControl是否吸顶（position:fixed）
      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  created () {
    // 请求多个数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 监听goodsListItem中图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('itemImgLoad', () => {
      refresh()
    })
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.home_nav {
  background-color: var(--color-tint);
  color: #fff;
}

.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab_control {
  position: relative;
  z-index: 9;
}
</style>