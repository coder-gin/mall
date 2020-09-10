import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
  addCart (context, payload) {
    return new Promise((resolve) => {
      // 查找之前数组中是否有该商品
      const product = context.state.cartList.find(item => item.iid === payload.iid)
      if (product) { // 数量+1
        context.commit(ADD_COUNTER, product)
        resolve('当前的商品数量+1')
      } else { // 添加新的商品
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}