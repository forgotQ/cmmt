/**
 * Created by zhaobojian on 17/4/6.
 */
import fetch from 'common/fetch'
import {port_news} from 'common/port_uri'

//top
export function getTopList(params) {
  return fetch({
    url: port_news.toplist,
    method: 'get',
    params
  })
}


//消息详情
export function newsDetail(params) {
  return fetch({
    url: port_news.newsDetail,
    method: 'get',
    params
  })
}

//头条新闻修改
export function newsDetailchange(params) {
  return fetch({
    url: port_news.newsDetailchange,
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

//头条新闻添加
export function topnewsadd(params) {
  return fetch({
    url: port_news.topnewsadd,
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

//头条新闻添加 视频列表
export function topnewsaddVideo(params) {
  return fetch({
    url: port_news.topnewsaddVideo,
    method: 'get',
    params
  })
}

//头条新闻删除
export function topdelete(params) {
  return fetch({
    url: port_news.topdelete,
    method: 'post',
    params
  })
}

//修改状态
export function changeNews(params) {
  return fetch({
    url: port_news.changeEssential,
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

//消息推荐到首页
export function changeNewsIndex(params) {
  return fetch({
    url: port_news.changeIndex,
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
//取消推荐首页index/delete
export function changeNewsIndexDel(params) {
  return fetch({
    url: port_news.changeIndexDel,
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


//专题报道
export function special(params) {
  return fetch({
    url: port_news.special,
    method: 'get',
    params
  })
}


//专题报道删除
export function specialdelete(params) {
  return fetch({
    url: port_news.specialdelete,
    method: 'post',
    params
  })
}

//专题报道修改
export function specialedit(params) {
  return fetch({
    url: port_news.specialedit,
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
//专题报道添加
export function specialadd(params) {
  return fetch({
    url: port_news.specialadd,
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
