/**
 * Created by zhaobojian on 17/4/6.
 */
import fetch from 'common/fetch'
import {port_video} from 'common/port_uri'

//video列表
export function getVideoList(params) {
  return fetch({
    url: port_video.videolist_url,
    method: 'get',
    params
  })
}


//video detailMsg
export function getVideoDetailMsg(params) {
  return fetch({
    url: port_video.videoDetail_url,
    method: 'get',
    params
  })
}


//video save
export function videoSave(params) {
  return fetch({
    url: port_video.videoSave_url,
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

//video transfor
export function videoTransfor(params) {
  return fetch({
    url: port_video.videoTransfor_url,
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

export function videoTransforState(params) {
  return fetch({
    url: port_video.videoTransforState_url,
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

