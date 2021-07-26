import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "components/common/toast"
import Fastclick from 'fastclick'
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//安装toast函数,.use函数会自动调用install方法
Vue.use(toast)
//解决移动端的300ms延迟
Fastclick.attach(document.body)
//使用懒加载的插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


