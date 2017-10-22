/**
 * Created by zhaobojian on 17/4/6.
 */
import fetch from 'common/fetch'
import {port_power} from 'common/port_uri'

//banner列表
export function getRoleList(params) {
  return fetch({
    url: port_power.getRoleList,
    method: 'get',
    params
  })
}
//功能模块列表
export function getfunlist(params) {
  return fetch({
    url: port_power.getfunlist,
    method: 'get',
    params
  })
}
export function addRole(params) {
  return fetch({
    url: port_power.addRole,
    method: 'post',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
//获取角色详情
export function getRoleDetil(params) {
  return fetch({
    url: port_power.getRoleDetil,
    method: 'get',
    params
  })
}
//获取已有功能模块
export function getRoleFun(params) {
  return fetch({
    url: port_power.getRoleFun,
    method: 'get',
    params
  })
}
export function editRole(params) {
  return fetch({
    url: port_power.editRole,
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
//删除角色
export function delRole(params) {
  return fetch({
    url: port_power.delRole,
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
//获取组织架构列表
export function officeList(params) {
  return fetch({
    url: port_power.officeList,
    method: 'get',
    params
  })
}
//获取用户列表
export function userList(params) {
  return fetch({
    url: port_power.userList,
    method: 'get',
    params
  })
}
//获取组织架构列表
export function getOfficeList(params) {
  return fetch({
    url: port_power.getOfficeList,
    method: 'get',
    params
  })
}
//组织架构添加
export function officeSave(params) {
  return fetch({
    url: port_power.officeSave,
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
//获取机构详情
export function officeGet(params) {
  return fetch({
    url: port_power.officeGet,
    method: 'get',
    params
  })
}
//机构详情修改
export function officeEdit(params) {
  return fetch({
    url: port_power.officeEdit,
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
//机构删除
export function officeDel(params) {
  return fetch({
    url: port_power.officeDel,
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
