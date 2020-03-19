import Vue from 'vue'
import App from './App.vue'
import ECharts from 'vue-echarts'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import VueSocketio from 'vue-socket.io';
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as filters from './filters'
import 'echarts'
// import { global } from './global/global';

Vue.use(new VueSocketio({
  debug: true, 
  connection: 'http://192.168.0.101:7001/'
}));
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.component('v-chart', ECharts)
Vue.config.productionTip = false
// 实例化过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
//加载用户主题
if( sessionStorage.getItem('themeValue') ){
  // global.changeTheme( sessionStorage.getItem("themeValue"));
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
