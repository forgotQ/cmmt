
import {cookieStorage} from 'common/storage'

export default {
  //用户信息和是否登录
  user_info: {
    account: cookieStorage.get('_user_account'),
    passwd: cookieStorage.get('_password'),
    account: cookieStorage.get('_user_account'),
    id: cookieStorage.get('_user_id'),
    token: cookieStorage.get('_token'),
    login: cookieStorage.get('login'),
  },
  proviceCode: '',
  cityCode: '',
  munuList: [],
  singleCode: ''
}
