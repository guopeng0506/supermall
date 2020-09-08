<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive">
          <slot name="item-icon"></slot>
      </div>
      <div v-else>
          <slot name="item-icon-active"></slot>
      </div>
      <div :style="{color:isActive?activeColor:''}">
          <slot name="item-text"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'#FFA9A2'
        }
    },
    data() {
        return {
            //isActive:false
        }
    },
    computed: {
        isActive(){//vue一直在监听 computed是数据发生变化就会执行 this.$route被改变就会进来重新执行
            return this.$route.path.indexOf(this.path) !== -1 
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
        }
    }
}
</script>

<style scoped>
    .tab-bar-item{
    flex: 1;/**平分宽度 */
    text-align: center;
    height: 49px; 
    font-size: 14px;
  }
  .tab-bar-item img{
      width:24px;
      height:24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
      
  }
  .active{
      color: #FFA9A2;
  }
</style>