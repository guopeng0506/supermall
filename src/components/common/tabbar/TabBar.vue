<!-- tabbar组件(首页、分类、购物车、我的) -->
<template>
  <div>
      <div id="tab-bar">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabBar'

}
</script>

<style scoped>
    #tab-bar{
    display: flex;/**平铺 */
    background-color: #f6f6f6;

    position: fixed;/**+上bottom:0 实现靠底部 */
    left:0;
    right:0;
    bottom:0;

    box-shadow: 0 -2px 1px rgba(100,100,100,.2);/**底部倾斜阴影 */
  }
</style>