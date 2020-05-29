import Vue from 'vue'
import App from './App.vue'
import axios from './backend/vue-axios'
import Router from './router/index'
import store from './store/index'

//global css
import './assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css';
import './assets/vendors/iconfonts/typicons/src/font/typicons.css';
import './assets/vendors/css/vendor.bundle.base.css';
import './assets/vendors/css/vendor.bundle.addons.css';
import './assets/css/shared/style.css';
import './assets/css/demo_1/style.css';

//global js
import './assets/vendors/js/vendor.bundle.base.js'

//global lib
import VModal from 'vue-js-modal'

Vue.use(VModal,{dialog: true } )


Vue.config.productionTip = false
new Vue({
  el: '#app',
  axios : axios,
  router: Router,
  store,
  template: '<App/>',
  render: h => h(App),
})
