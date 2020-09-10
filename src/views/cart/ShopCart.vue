<template>
  <div id="cart">
    <!-- 导航 -->
    <cart-nav-bar />
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-button-bar />
  </div>
</template>

<script>
import CartNavBar from './childrenCart/CartNavBar'
import CartList from './childrenCart/CartList'
import CartButtonBar from './childrenCart/CartButtonBar'

export default {
  name: 'ShopCart',
  components: {
    CartNavBar,
    CartList,
    CartButtonBar
  },
}
</script>

<style scoped>
#cart {
  height: 100vh;
}
</style>