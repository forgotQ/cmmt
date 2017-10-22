
//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-default/index.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
// 导入富文本
import VueQuillEditor from 'vue-quill-editor'
import {cookieStorage} from 'common/storage'

//使用element-ui
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(VueI18n)
//使用自定义插件
Vue.use(Plugins)

//使用api
Vue.use(api)

//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

const i18n = new VueI18n({
  locale: cookieStorage.get('language')?cookieStorage.get('language'):'zh-CN',    // 语言标识
  messages: {
    'zh-CN': require('src/common/lang/zh.json'),   // 中文语言包
    'en-US': require('src/common/lang/en.json')    // 英文语言包
  }
})

new Vue({
  router,
  store,
  i18n,
  ...App
}).$mount('mainbody')
