/**
 * Created by zhaobojian on 17/4/6.
 */
import fetch from 'common/fetch'
import {port_raiders} from 'common/port_uri'
//获取bannerList详情
export function getBannerlist(params) {
  return fetch({
    url: port_raiders.bannerlist,
    method: 'get',
    params
  })
}
//添加banner
export function addBanner(params) {
  return fetch({
    url: port_raiders.addBanner,
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
//修改banner
export function editBanner(params) {
  return fetch({
    url: port_raiders.editBanner,
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
//获取文章管理列表
export function getRecommendList(params) {
  return fetch({
    url: port_raiders.recommendList,
    method: 'get',
    params
  })
}
//获取文章管理分类
export function getRecommendClass(params) {
  return fetch({
    url: port_raiders.recommendClass,
    method: 'get',
    params
  })
}
//修改banner
export function recommendRank(params) {
  return fetch({
    url: port_raiders.recommendRank,
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
//添加文章排序查询
export function getranking(params) {
  return fetch({
    url: port_raiders.getranking,
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
//添加文章
export function recommendAdd(params) {
  return fetch({
    url: port_raiders.recommendAdd,
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
//获取文章详情
export function getRecommendDetil(params) {
  return fetch({
    url: port_raiders.recommendGet,
    method: 'get',
    params
  })
}
//修改文章
export function recommendEdit(params) {
  return fetch({
    url: port_raiders.recommendEdit,
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
//获取圈子列表
export function recommendlabelList(params) {
  return fetch({
    url: port_raiders.recommendlabelList,
    method: 'get',
    params
  })
}
//添加圈子
export function addRecommendlabel(params) {
  return fetch({
    url: port_raiders.addRecommendlabel,
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
//修改圈子
export function editRecommendlabel(params) {
  return fetch({
    url: port_raiders.editRecommendlabel,
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
//删除圈子
export function delRecommendlabel(params) {
  return fetch({
    url: port_raiders.delRecommendlabel,
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
//获取分类
export function typeList(params) {
  return fetch({
    url: port_raiders.typeList,
    method: 'get',
    params
  })
}
//获取分类下面内容
export function infromation(params) {
  return fetch({
    url: port_raiders.infromation,
    method: 'get',
    params
  })
}
//分类下面内容添加
export function infromationSave(params) {
  return fetch({
    url: port_raiders.infromationSave,
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
//分类下面内容编辑
export function infromationEdit(params) {
  return fetch({
    url: port_raiders.infromationEdit,
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
//分类下面内容编辑
export function infromationDelete(params) {
  return fetch({
    url: port_raiders.infromationDelete,
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
//自由行分类获取
export function numberdayList(params) {
  return fetch({
    url: port_raiders.numberdayList,
    method: 'get',
    params
  })
}
export function numberdayEdit(params) {
  return fetch({
    url: port_raiders.numberdayEdit,
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
export function numberdayAdd(params) {
  return fetch({
    url: port_raiders.numberdayAdd,
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
export function numberdayDel(params) {
  return fetch({
    url: port_raiders.numberdayDel,
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
//自由行分类下内容获取
export function travelList(params) {
  return fetch({
    url: port_raiders.travelList,
    method: 'get',
    params
  })
}
//获取城市景点
export function scenicsList(params) {
  return fetch({
    url: port_raiders.scenicsList,
    method: 'get',
    params
  })
}
//自由行添加
export function travelAdd(params) {
  return fetch({
    url: port_raiders.travelAdd,
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
//获取自由行详情
export function travelGet(params) {
  return fetch({
    url: port_raiders.travelGet,
    method: 'get',
    params
  })
}
//自由行删除
export function travelDel(params) {
  return fetch({
    url: port_raiders.travelDel,
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
//获取攻略列表
export function thoughtsList(params) {
  return fetch({
    url: port_raiders.thoughtsList,
    method: 'get',
    params
  })
}
//发布攻略
export function thoughtsSave(params) {
  return fetch({
    url: port_raiders.thoughtsSave,
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
//发布攻略标题保存
export function thoughtsParagSave(params) {
  return fetch({
    url: port_raiders.thoughtsParagSave,
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
//获取攻略标题文章个数
export function thoughtsContentList(params) {
  return fetch({
    url: port_raiders.thoughtsContentList,
    method: 'get',
    params
  })
}
//发布攻略标题内容保存
export function thoughtsContentSave(params) {
  return fetch({
    url: port_raiders.thoughtsContentSave,
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
//获取攻略详情
export function thoughtsGet(params) {
  return fetch({
    url: port_raiders.thoughtsGet,
    method: 'get',
    params
  })
}
//发布攻略内容修改
export function thoughtsEdit(params) {
  return fetch({
    url: port_raiders.thoughtsEdit,
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
//发布攻略删除
export function thoughtsDel(params) {
  return fetch({
    url: port_raiders.thoughtsDel,
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
//攻略列表删除
export function thoughtsListDel(params) {
  return fetch({
    url: port_raiders.thoughtsListDel,
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
//获取景区列表
export function getScenicsList(params) {
  return fetch({
    url: port_raiders.scenicsList,
    method: 'get',
    params
  })
}
//景区添加
export function scenicsAdd(params) {
  return fetch({
    url: port_raiders.scenicsAdd,
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
//获取景区详情
export function scenicsGet(params) {
  return fetch({
    url: port_raiders.scenicsGet,
    method: 'get',
    params
  })
}
export function scenicsEdit(params) {
  return fetch({
    url: port_raiders.scenicsEdit,
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
export function scenicsDelete(params) {
  return fetch({
    url: port_raiders.scenicsDelete,
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
export function typeEdit(params) {
  return fetch({
    url: port_raiders.typeEdit,
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
export function typeDel(params) {
  return fetch({
    url: port_raiders.typeDel,
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
export function typeSave(params) {
  return fetch({
    url: port_raiders.typeSave,
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
