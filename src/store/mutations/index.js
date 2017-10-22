
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('_user_account')
      cookieStorage.remove('_password')
      cookieStorage.remove('_user_id')
      cookieStorage.remove('_token')
      cookieStorage.remove('_user')
    } else {
      cookieStorage.set('user_info', userinfo, 10)
      cookieStorage.set('_user_account', userinfo.account, 10)
      cookieStorage.set('_password', userinfo.passwd, 10)
      cookieStorage.set('_user_id', userinfo.id, 10)
      cookieStorage.set('_token', userinfo.token, 10)
      cookieStorage.set('_user', ''+userinfo.id+''+userinfo.account+''+userinfo.passwd+'', 10)
      cookieStorage.set('login', 'true', 10)
    }
  },
  // 设置全局省份code
  [type.SET_PROVICE_CODE](state,pcode){
    state.proviceCode = pcode
  },
  [type.SET_CITY_CODE](state,pcode){
    state.cityCode = pcode
  },
  // 设置侧边栏
  [type.SET_MUNU_List](state, data){
    state.munuList = data
  },
  [type.SET_Single_CODE](state,code){
    state.singleCode = code
  },

}
