/**
 * Created by zhaobojian on 17/4/6.
 */
import fetch from 'common/fetch'
import {port_business} from 'common/port_uri'

//banner列表
export function getBannerList(params) {
  return fetch({
    url: port_business.bannerlist,
    method: 'get',
    params
  })
}
//banner详情
export function getBannerDetail(params) {
  return fetch({
    url: port_business.bannerDetail,
    method: 'get',
    params
  })
}
//修改banner详情
export function saveBannerDetail(params) {
  return fetch({
    url: port_business.bannerSave,
    method: 'get',
    params
  })
}
//删除banner
export function edlBanner(params) {
  return fetch({
    url: port_business.bannerDel,
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
// 获取class列表
export function getClassList(params) {
  return fetch({
    url: port_business.classList,
    method: 'get',
    params
  })
}
//修改分类
export function editClass(params) {
  return fetch({
    url: port_business.classEdit,
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
export function addClass(params) {
  return fetch({
    url: port_business.classAdd,
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
export function delClass(params) {
  return fetch({
    url: port_business.classDel,
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
// 获取top10列表
export function getTop10List(params) {
  return fetch({
    url: port_business.toptenList,
    method: 'get',
    params
  })
}
export function ranking(params) {
  return fetch({
    url: port_business.ranking,
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
export function top10Del(params) {
  return fetch({
    url: port_business.toptenDel,
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
// 获取人物列表
export function getPeopleList(params) {
  return fetch({
    url: port_business.celebrityList,
    method: 'get',
    params
  })
}
// 搜索人物
export function searchPeople(params) {
  return fetch({
    url: port_business.celebritySearch,
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
// 保存人物
export function toptenSave(params) {
  return fetch({
    url: port_business.toptenSave,
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
// 获取资讯列表
export function getNewsList(params) {
  return fetch({
    url: port_business.newsList,
    method: 'get',
    params
  })
}
// 获取资讯详情
export function getNewsDetil(params) {
  return fetch({
    url: port_business.zixunDetil,
    method: 'get',
    params
  })
}
// 删除资讯
export function delNews(params) {
  return fetch({
    url: port_business.zixunDelt,
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
// 获取视频列表
export function getVideoList(params) {
  return fetch({
    url: port_business.videoList,
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
// 获取视频详情
export function getVideoDetil(params) {
  return fetch({
    url: port_business.videoDetil,
    method: 'post',
    params
  })
}
// 获取名流列表
export function getCelebrityDetil(params) {
  return fetch({
    url: port_business.celebrityList,
    method: 'get',
    params
  })
}
// 名流列表搜索
export function searchCelebrity(params) {
  return fetch({
    url: port_business.searchCelebrity,
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
// 名流列表
export function celebrityDel(params) {
  return fetch({
    url: port_business.celebrityDel,
    method: 'post',
    params
  })
}
// 添加名流最大排名值
export function celebrityMax(params) {
  return fetch({
    url: port_business.celebrityMax,
    method: 'post',
    params
  })
}
// 获取名流详情
export function getCelebrity(params) {
  return fetch({
    url: port_business.getCelebrity,
    method: 'get',
    params
  })
}
//个人资讯列表
export function getcChannelNews(params) {
  return fetch({
    url: port_business.channelNewsList,
    method: 'get',
    params
  })
}
//个人课堂列表
export function getcChannelVideo(params) {
  return fetch({
    url: port_business.channelVideoList,
    method: 'get',
    params
  })
}
//个人课堂推荐
export function isRecommend(params) {
  return fetch({
    url: port_business.videoIsRecommend,
    method: 'post',
    params
  })
}
//名流课堂添加
export function channelVideoAdd(params) {
  return fetch({
    url: port_business.channelVideoAdd,
    method: 'post',
    params
  })
}
//名流课堂详情
export function channelVideoDetail(params) {
  return fetch({
    url: port_business.channelVideoDetail,
    method: 'get',
    params
  })
}
//名流课堂删除
export function channelVideoDel(params) {
  return fetch({
    url: port_business.channelVideoDel,
    method: 'post',
    params
  })
}
//课堂评论列表
export function getCommentList(params) {
  return fetch({
    url: port_business.getCommentList,
    method: 'get',
    params
  })
}
//名流审核列表
export function getCommentCheckList(params) {
  return fetch({
    url: port_business.getCommentCheckList,
    method: 'get',
    params
  })
}
//名流通不通过
export function channelVerify(params) {
  return fetch({
    url: port_business.channelVerify,
    method: 'get',
    params
  })
}
//商学院列表
export function channelVideoList(params) {
  return fetch({
    url: port_business.channelVideoList,
    method: 'get',
    params
  })
}
//商学院是否置顶
export function channelVideoIstop(params) {
  return fetch({
    url: port_business.channelVideoIstop,
    method: 'post',
    params
  })
}
//饭局列表
export function channelDinnerList(params) {
  return fetch({
    url: port_business.channelDinnerList,
    method: 'get',
    params
  })
}
//饭局添加
export function channelDinnerAdd(params) {
  return fetch({
    url: port_business.channelDinnerAdd,
    method: 'post',
    params
  })
}
//饭局详情
export function channelDinnerGet(params) {
  return fetch({
    url: port_business.channelDinnerGet,
    method: 'get',
    params
  })
}
//饭局修改
export function channelDinnerUpdate(params) {
  return fetch({
    url: port_business.channelDinnerUpdate,
    method: 'post',
    params
  })
}
//顶部菜单栏
export function topFunList(params) {
  return fetch({
    url: port_business.topFunList,
    method: 'get',
    params
  })
}
//获取页面按钮
export function getBtn(params) {
  return fetch({
    url: port_business.getBtn,
    method: 'get',
    params
  })
}
//获取模块列表
export function getModuslist(params) {
  return fetch({
    url: port_business.getModuslist,
    method: 'get',
    params
  })
}
//获取模块排名
export function getModusSort(params) {
  return fetch({
    url: port_business.getModusSort,
    method: 'get',
    params
  })
}
//获取模块详情
export function getModus(params) {
  return fetch({
    url: port_business.getModus,
    method: 'get',
    params
  })
}
//添加模块
export function addModus(params) {
  return fetch({
    url: port_business.addModus,
    method: 'post',
    params
  })
}
//删除模块
export function delModus(params) {
  return fetch({
    url: port_business.delModus,
    method: 'post',
    params
  })
}
