
import * as type from 'store/getters/type'

export default {
  //获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.user_info
  },
  //获取省份code
  [type.GET_PROVICE_CODE]: state => {
    return state.proviceCode
  },
  //获取城市code
  [type.GET_CITY_CODE]: state => {
    return state.cityCode
  },
  [type.GET_Single_CODE]: state => {
    return state.singleCode
  },
}
