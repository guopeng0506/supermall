import Vue from 'vue'
import VueRouter from 'vue-router'
//懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Catr = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

//安装插件
Vue.use(VueRouter)


const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/catr',
        component:Catr
    },
    {
        path:'/profile',
        component:Profile
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router