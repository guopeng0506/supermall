<!-- better-scroll滚动组件 -->
<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
      probeType:{
          type:Number,
          default:0
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      }
  },
  data() {
      return {
          scroll:null
      }
  },
  methods: {
      scrollTo(x,y,time=300){
          this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
          this.scroll.finishPullUp() //重新激活上拉加载
      },
      refresh(){
          this.scroll.refresh()
      }
  },
  mounted(){
      //1.创建BScroll对象
      this.scroll =  new BScroll (this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
      })
        
      //2.监听滚动位置
      this.scroll.on('scroll',position =>{
          //console.log(position)
          this.$emit('scroll',position)//自定义事件 传出去
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp',() =>{
          //console.log('上拉加载更多')
          this.$emit('pullingUp')//自定义事件 传出去
      })

      
  }
}
</script>

<style scoped>

</style>