
import dateFormat from 'plugins/date'
import {cookieStorage} from 'common/storage'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $dateFormat: {
      get() {
        return dateFormat
      }
    },
    $lan: {
      get() {
        return ()=>{
          var  language =  cookieStorage.get('language')
          if (language === 'zh-CN')
            return 'title'
          return 'enTitle'
        }
      }
    }
  })
}

export default {
  install
}
