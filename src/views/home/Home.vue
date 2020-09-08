<template>
  <div id="home">
     <!-- 导航栏组件 -->
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <!-- 轮播图组件 -->
    <home-swiper :banners="banners"/>
    <!-- 推荐组件 -->
    <recommend-view :recommends="recommends" />
    <!-- 一张图片的组件 -->
     <feature-view/>
    <!-- [流行、新款、精选 tabbar] -->
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <!-- [流行、新款、精选 数据展示组件] -->
    <goods-list :goods="showGoods" />
    
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata,getHomeGoods}  from 'network/home'

export default {
  name:'Home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop'
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求首页多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {

    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      switch(index){
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
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){ 
      getHomeMultidata().then(res =>{
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type){
        const page = this.goods[type].page  + 1 
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page +=1
    })
    }
  },
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;

    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }
  #home{
    padding-top:44px;
  }
  .tab-control{
    position: sticky; /**根据top 当符合top值时会将sticky变成position:fixed */
    top: 44px;
    z-index: 9;
  }
</style>