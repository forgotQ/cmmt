/**
 * @file: index.
 * @intro: 数据请求统一封装.
 *
 */

//导入模块
import axios from 'axios'
import {port_code} from 'common/port_uri'
import router from 'src/router'
import {Message} from 'element-ui'
import store from 'store'
import {SET_USER_INFO} from 'store/actions/type'
import {server_base_url} from 'common/config'

//设置用户信息action
const setUserInfo = function (user) {
  store.dispatch(SET_USER_INFO, user)
}

export default function fetch(options, header) {
  return new Promise((resolve, reject) => {
    let arrHeader
    if(header=='arr'){
      arrHeader = {contentType : 'application/json;charset=utf-8'}
    }else {
      arrHeader = {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url,
      //设置请求超时设置
      timeout: 2000,
      //设置请求时的header
      headers: arrHeader
    })
    /*const config = {
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }
    options = Object.assign(config, options)*/

    //请求处理

    instance(options)
      .then((res) => {
        //请求成功时,根据业务判断状态
        if (res.data.retcode === port_code.unlogin) {
          setUserInfo(null)
          router.replace({name: "login"})
          return false;
        }
        else if (res.data.retcode === port_code.success) {
          if(res.data.retObj && res.data.msg){
            resolve(res.data)
          }else {
            resolve(res.data)
          }
          return false
        }
        else {
          resolve(res.data);
          return false
        }
      })
      .catch((error) => {
        //请求失败时,根据业务判断状态
        if (error.response) {
          let resError = error.response
          let resCode = resError.status
          let resMsg = error.message
          Message.error('操作失败！错误原因 ' + resMsg)
          reject(error.data)
        }
      })

    //请求处理
   /* instance(options)
      .then(({data: {code, msg, data}}) => {
        //请求成功时,根据业务判断状态
        if (code === port_code.success) {
          resolve({code, msg, data})
          return false
        } else if (code === port_code.unlogin) {
          setUserInfo(null)
          router.replace({name: "login"})
        }
        Message.warning(msg)
        reject({code, msg, data})
      })
      .catch((error) => {
        //请求失败时,根据业务判断状态
        if (error.response) {
          let resError = error.response
          let resCode = resError.status
          let resMsg = error.message
          Message.error('操作失败！错误原因 ' + resMsg)
          reject({code: resCode, msg: resMsg})
        }
      })*/
  })
}
