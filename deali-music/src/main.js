import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './service/Axios';
import filters from './filters';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.prototype.$axios = axios;

// 필터 등록
Object.entries(filters).map((item) => {
  Vue.filter(item[0], item[1]);
  return item;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
