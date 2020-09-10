<template>
  <div id="home">
     <!-- 导航栏组件 -->
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
     <tab-control class="fixed" :titles="['流行','新款','精选']" 
          @tabClick="tabClick" ref="tabControl1" 
          v-show="isTabFixed">
     </tab-control>
      <!-- better-scroll滚动组件 -->
      <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
       @scroll="contentScroll" @pullingUp="loadMore">
          <!-- 轮播图组件 -->
          <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
          <!-- 推荐组件 -->
          <recommend-view :recommends="recommends" />
          <!-- 一张图片的组件 -->
          <feature-view/>
          <!-- [流行、新款、精选 tabbar] -->
          <tab-control class="tab-control" :titles="['流行','新款','精选']" 
          @tabClick="tabClick" ref="tabControl2">
          </tab-control>
          <!-- [流行、新款、精选 数据展示组件] -->
          <goods-list :goods="showGoods" />
      </scroll>
      <!-- 回到顶部组件 组件要监听click要添加native修饰符 -->
      <back-top @click.native="backClick" v-show="isShowBackTop" />
   
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods}  from 'network/home'

export default {
  name:'Home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    scroll,
    BackTop
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
      currentType:'pop',
      isShowBackTop:false,//返回顶部的图标
      tabOffsetTop:0,//tab-control组件距离top的高度 用于判断isTabFixed是否展示
      isTabFixed:false,//顶部的tab-control组件是否展示
      saveY:0, //记录离开时的位置

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
  mounted() {
    //3.通过事件总线监听图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh,50) //返回一个方法 timer被return闭包方法所指向，所以里面的timer不会销毁
    this.$bus.$on('itemImageLoad',() =>{
      refresh()
      //this.$refs.scroll.refresh()
    })
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      //通过this.$refs.组件名称可以拿到scroll组件对象
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
       1.//判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000 //是否成立 返回的是布尔值 position.y默认是负数 所以要在前面加个-变成整数

      2.//决定tabControl是否吸顶（postion:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
    },
    //防抖函授
    debounce(func,delay){
      let timer = null
      return function(...args){
        if(timer){
          clearTimeout(timer)
        } 
        timer = setTimeout(() =>{
          func.apply(this,args)
        },delay)
      }
    },
    //监听轮播图加载完成
    swiperImageLoad(){
      //每个组件都有一个属性$el 用于获取组件中的元素
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
      getHomeGoods(type,page).then(res =>{ //getHomeGoods是home.js的网络请求方法 this.getHomeGoods是封装数据方法
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page +=1

    
        this.$refs.scroll.finishPullUp() //重新激活上拉加载
    })
    }
  },
  destroyed() {
    console.log('home组件销毁了')
  },
  activated() {//组件活跃时
  console.log('home组件activated活跃')
    //不做记录 只给路由套上<keep-alive> 好像也没问题 所以暂时注释
    // this.$refs.scroll.scrollTo(0,this.saveY,0)
    // this.$refs.scroll.refresh()
  },
  deactivated() {//组件不活跃时
  console.log('home组件activated不活跃')
    // this.saveY = this.$refs.scroll.scroll.y
  },
}
</script>

<style scoped>
  #home{
    padding-top: 0px;
    height: 100vh; /**100视口 */
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
     /**用原生scroll才需要下面的代码 防止导航栏跟随滚动 现在用better-scroll*/
    /* position: fixed;
    left:0;
    right:0;
    top:0; 
    z-index: 9; */
  }
 /**根据top 当符合top值时会将sticky变成position:fixed */
  /* .tab-control{
    position: sticky; 
    top: 44px;
    z-index: 9;
  } */
  .fixed{
    position: relative;
    z-index: 9;
  }
  .content{
    /* height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>