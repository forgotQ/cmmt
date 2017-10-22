/**
 * @file: index.
 * @intro: api请求索引.
 *
 */

//导入模块
import * as api_file from './file'
import * as api_table from './table'
import * as api_user from './user'
import * as api_submit from './submit'
import * as api_business from './business/business'
import * as api_video from './video/video'
import * as api_search from './common/search'
import * as api_fatchData from './common/fetchData'
import * as api_news from './news/news'
import * as api_products from './products/products'
import * as api_raiders from './raiders/raiders'
import * as api_power from './power/power'

const apiObj = {
  api_file,
  api_table,
  api_user,
  api_business,
  api_submit,
  api_video,
  api_search,
  api_fatchData,
  api_news,
  api_products,
  api_raiders,
  api_power
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
