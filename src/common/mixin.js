import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      _refresh: null
    }
  },
  mounted () {
    // 监听goodsListItem中图片加载完成
    this._refresh = debounce(this.$refs.scroll.refresh, 500)
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      this._refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data () {
    return {
      isBackTopShow: false
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    }
  },
}