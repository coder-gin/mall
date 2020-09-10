<template>
  <scroll class="wrapper" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapState } from 'vuex'

export default {
  name: 'CartList',
  computed: {
    ...mapState(['cartList'])
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.wrapper {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>