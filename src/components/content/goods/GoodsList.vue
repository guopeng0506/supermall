<template>
  <div class="goods">
      <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item" />

  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:'GoodsList',
  props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components:{
      GoodsListItem
  }
}
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;/**平铺按照宽度不包裹 默认包裹是显示在一行  */
        justify-content: space-around; /**在弹性盒对象的 <div> 元素中的各项周围留有空白 */
        padding: 2px;
    }
</style>