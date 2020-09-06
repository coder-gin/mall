<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true // 开启对 scroll 区域 DOM 改变的探测。当插件被使用后，当 scroll 的 dom 元素发生时，将会触发 scroll 的 refresh 方法
    })

    // 监听滚动事件
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })

    // 监听上拉加载事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
}
</script>


<style scoped>
</style>
