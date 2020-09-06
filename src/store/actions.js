import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
  addCart (context, payload) {
    const product = context.state.cartList.find(item => item.iid === payload.iid)
    if (product) {
      context.commit(ADD_COUNTER, product)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}