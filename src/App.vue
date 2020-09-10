<template>
  <div id="app">
    <!-- 路由展示页面 keep-alive切换路由时不销毁 利用activated()组件活跃时生命周期
    和deactivated()组件不活跃时生命周期 记录离开时位置 回来再重新回到原来的位置。
    -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    
    <!-- tabbar组件 (首页、分类、购物车、我的) -->
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
   MainTabBar
  }
}
</script>
 
<style>
  @import "./assets/css/base.css"
</style>
