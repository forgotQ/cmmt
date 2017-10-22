/**
 * Created by zhaobojian on 17/4/6.
 */
import fetch from 'common/fetch'
import {port_products} from 'common/port_uri'

//banner
export function bannerlist(params) {
  return fetch({
    url: port_products.bannerlist,
    method: 'get',
    params
  })
}

//模板链接
export function linkUrls(params) {
  return fetch({
    url: port_products.linkUrls,
    method: 'get',
    params
  })
}

//banner删除
export function bannerdelete(params) {
  return fetch({
    url: port_products.bannerdelete,
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
//banner回显
export function bannerDetail(params) {
  return fetch({
    url: port_products.bannerDetail,
    method: 'get',
    params
  })
}


//banner编辑 保存
export function banneredit(params) {
  return fetch({
    url: port_products.banneredit,
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
//banner添加
export function banneresave(params) {
  return fetch({
    url: port_products.banneresave,
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

//名优企业
export function mingyoulist(params) {
  return fetch({
    url: port_products.mingyoulist,
    method: 'get',
    params
  })
}

//名优企业详情
export function mingyouDetail(params) {
  return fetch({
    url: port_products.mingyouDetail,
    method: 'get',
    params
  })
}
//名优企业详情修改
export function mingyouedit(params) {
  return fetch({
    url: port_products.mingyouedit,
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
