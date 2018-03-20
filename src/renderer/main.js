import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueAxios from 'vue-axios'
import VueSocketio from 'vue-socket.io'
import global_ from './components/common/Global'
import VueI18n from 'vue-i18n'



if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.use(iView)
Vue.use(VueAxios, axios)

Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
Vue.config.productionTip = false
Vue.use(VueI18n)

let IPnow = window.localStorage.getItem('IPnow');
if(IPnow === null) {
  IPnow = 'http://api.thebesser.com';
}
axios.defaults.baseURL = IPnow + ':17108/'
Vue.use(VueSocketio, IPnow + ':17106')

// axios.defaults.baseURL = 'http://api.thebesser.com:17108/'
// Vue.use(VueSocketio, 'http://api.thebesser.com:17106')

let langNow = window.localStorage.getItem('langNow');
if (langNow === null) {
  langNow = 'CN';
}
const i18n = new VueI18n({
  locale: langNow, // 语言标识
  messages: {
    'CN': require('./assets/lang/cn'), // 中文语言包
    'EN': require('./assets/lang/en'),
    'TW': require('./assets/lang/tw') // 英文语言包
  },
})


/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  i18n,
  router,
  template: '<App/>'
}).$mount('#app')
