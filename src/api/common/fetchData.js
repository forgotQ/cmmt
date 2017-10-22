/**
 * Created by zhaobojian on 17/4/6.
 */
import fetch from 'common/fetch'
import {port_video} from 'common/port_uri'

//搜索
export function fetchDataList(url,params) {
  return fetch({
    url: url,
    method: 'get',
    params
  })
}

export function fetchData(url,params) {
  console.log(url, params);

  return fetch({
    url: url,
    method: 'post',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  })
}
