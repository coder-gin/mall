<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkLen}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapState } from 'vuex'

export default {
  name: 'CartButtonBar',
  components: {
    CheckButton,
  },
  methods: {
    checkClick () {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick () {
      if (!this.isSelectAll) {
        this.$toast.show('请先添加商品')
      }
    }
  },
  computed: {
    ...mapState(['cartList']),
    totalPrice () {
      return '¥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLen () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}

.check-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 30px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: #f00;
  text-align: center;
  color: #fff;
}
</style>