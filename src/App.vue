<template>
  <div id="app">
    <!-- 路由展示页面 -->
    <router-view/>
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
