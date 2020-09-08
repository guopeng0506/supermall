<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" :key="index" :class="{active:index === currentIndex}"
       class="tab-control-item" @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
      titles:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data() {
      return {
          currentIndex: 0
      }
  },
  methods: {
      itemClick(index){
          this.currentIndex = index
          this.$emit('tabClick',index) //组件点击切换（流行、新款、精选 tabbar）通知父组件 已点击
      }
  },
}
</script>

<style scoped>
    .tab-control{
        height: 40px;
        line-height: 40px;
        display: flex; /**平铺 */
        text-align: center;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;  /**平分*/

    }
    .tab-control-item span{
       padding:5px;
    }
    .active{
        color:var(--color-high-text);
        
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>