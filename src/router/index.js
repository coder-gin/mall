import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/cart/ShopCart')
const Profile = () => import('views/profile/Profile')

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/cart', component: ShopCart },
  { path: '/profile', component: Profile }
]

const router = new VueRouter({
  routes
})

export default router