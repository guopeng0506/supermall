import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//创建事件总线对象 this.$bus 事件总线 $emit发射 $on接收
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
