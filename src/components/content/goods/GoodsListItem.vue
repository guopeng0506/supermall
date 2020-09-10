<template>
  <div class="goods-item" @click="itemClick">
      <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
      goodsItem:{
          type:Object,
          default(){
              return []
          }
      }
  },
  methods: {
    imageLoad(){
      this.$bus.$emit('itemImageLoad') //this.$bus 事件总线 $emit发射 $on接收
    },
    itemClick(){//跳转详情页 也可以通过标签方式<router-link to="'/detail/'+iid">
      //使用push跳转 有返回 后期直接调$router.go(-1);//返回上一层 使用replace跳转没有返回
      //this.$route.params.id 可以拿到路由配置中url后面的参数  
      this.$router.push('/detail/' + this.goodsItem.iid)
      // this.$router.push({
      //   path:'/detail',
      //   query:{

      //   }
      // })
      //如果是上面这个方式可以通过this.$route.query到拿传过去的参数
    }
  },
}
</script>

<style scoped>
    .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
    
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>