

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'


import business from '../pages/modules/business'
import amuse from '../pages/modules/amuse'
import raiders from '../pages/modules/raiders'
import video from '../pages/video/index'
import powerModus from '../pages/powermanger/modusmanger/index'
import powerRole from '../pages/powermanger/rolemanger/index'
import powerOrganization from '../pages/powermanger/organization/index'
import powerUser from '../pages/powermanger/usermanger/index'
import news from '../pages/modules/news'//新闻
import products from '../pages/modules/products'//优品
import handheldFtp from '../pages/modules/handheldFtp'
import homemanger from '../pages/sysmanger/homemanger'

const Opportunity = resolve => require(['../pages/modules/opportunity/opportunity'], resolve)

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  },{
    path: '/table/base',
    name: 'tableBase',
    component: baseTableComponent,
    meta: {
      title: "基本表格",
      auth: true
    }
  }, {
    path: '/table/sort',
    name: 'tableSort',
    component: sortTableComponent,
    meta: {
      title: "排序表格",
      auth: true
    }
  }, {
    path: '/table/update/:id',
    name: 'tableUpdate',
    component: saveTableComponent,
    meta: {
      title: "数据修改",
      auth: true
    }
  }, {
    path: '/table/add',
    name: 'tableAdd',
    component: saveTableComponent,
    meta: {
      title: "添加数据",
      auth: true
    }
  },]
},
  {
    path: '/modules/',
    redirect: '/modules/business',
    component: viewPageComponent,
    children: [
      {
      path: '/modules/business/',
      name: '商道',
      component: business.Business,
      meta: {
        title: "商道",
        auth: true,
        keepAlive: true
      },
      children:[
        {
          path: '/business/bannerList/:id',
          name: 'banner管理',
          component: business.business_bannerList,
          meta: {
            title: "banner列表",
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/business/classList/:id',
          name: '分类管理',
          component: business.classList,
          meta: {
            title: "分类列表",
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/business/top10/:id',
          name: 'Top10管理',
          component: business.top10,
          meta: {
            title: "Top10列表",
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/business/news/:id',
          name: '资讯列表',
          component: business.news,
          meta: {
            title: "资讯列表",
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/business/celebrity/:id',
          name: '名流列表',
          component: business.celebrity,
          meta: {
            title: "名流列表",
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/business/celebrityCheck/:id',
          name: '名流审核列表',
          component: business.celebrityCheck,
          meta: {
            title: "名流审核列表",
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/business/college/:id',
          name: '商学院',
          component: business.college,
          meta: {
            title: "学院",
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '/business/dinnerLsit/:id',
          name: '饭局',
          component: business.dinnerList,
          meta: {
            title: "饭局",
            auth: true,
            keepAlive: true
          }
        },
      ]
    },
      //娱道
      {
        path: '/modules/amuse/',
        name: '娱道',
        component: amuse.Business,
        meta: {
          title: "娱道",
          auth: true,
          keepAlive: true
        },
        children:[
          {
            path: '/amuse/bannerList/:id',
            name: 'banner管理',
            component: amuse.business_bannerList,
            meta: {
              title: "banner列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/amuse/classList/:id',
            name: '分类管理',
            component: amuse.classList,
            meta: {
              title: "分类列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/amuse/top10/:id',
            name: 'Top10管理',
            component: amuse.top10,
            meta: {
              title: "Top10列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/amuse/news/:id',
            name: '资讯列表',
            component: amuse.news,
            meta: {
              title: "资讯列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/amuse/celebrity/:id',
            name: '明星列表',
            component: amuse.celebrity,
            meta: {
              title: "明星列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/amuse/celebrityCheck/:id',
            name: '明星审核列表',
            component: amuse.celebrityCheck,
            meta: {
              title: "明星审核列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/amuse/college/:id',
            name: '明星学院',
            component: amuse.college,
            meta: {
              title: "明星学院",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/amuse/dinnerLsit/:id',
            name: '探班',
            component: amuse.dinnerList,
            meta: {
              title: "探班",
              auth: true,
              keepAlive: true
            }
          },
        ]
      },
      //攻略
      {
        path: '/modules/raiders/',
        name: '攻略',
        component: raiders.Raiders,
        meta: {
          title: "攻略",
          auth: true,
          keepAlive: true
        },
        children:[
          {
            path: '/raiders/bannerList/:id',
            name: 'banner管理',
            component: raiders.BannerList,
            meta: {
              title: "banner列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/article/:id',
            name: '文章管理',
            component: raiders.Article,
            meta: {
              title: "文章管理列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/circle/:id',
            name: '圈子管理',
            component: raiders.ClassList,
            meta: {
              title: "圈子管理",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/overview/:id',
            name: '概览',
            component: raiders.About,
            meta: {
              title: "概览",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/practical/:id',
            name: '实用信息',
            component: raiders.Practical,
            meta: {
              title: "实用信息",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/travel/:id',
            name: '自由行',
            component: raiders.Walk,
            meta: {
              title: "自由行",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/tour/:id',
            name: '跟团游',
            component: raiders.Play,
            meta: {
              title: "跟团游",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/thoughts/:id',
            name: '攻略列表',
            component: raiders.Strategy,
            meta: {
              title: "攻略列表",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/scenics/:id',
            name: '景区管理',
            component: raiders.scenics,
            meta: {
              title: "景区管理",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/typeclass/:id',
            name: '概览实用信息分类管理',
            component: raiders.classMangerList,
            meta: {
              title: "概览实用信息分类管理",
              auth: true,
              keepAlive: true
            }
          },
          {
            path: '/raiders/numberdayclass/:id',
            name: '攻略行程分类',
            component: raiders.classMList,
            meta: {
              title: "攻略行程分类",
              auth: true,
              keepAlive: true
            }
          },
        ]
      },
      // 优品
      {
        path: '/modules/products/banner',
        name: '优品',
        component: products.products,
        meta: {
          title: "优品",
          auth: true,
          keepAlive:false
        },children:[
        {
          path: '/modules/products/banner',
          name: '广告管理',
          component: products.products_banner,
          meta: {
            title: "banner管理",
            auth: true,
            keepAlive:true
          }
        },{
          path: '/modules/products/good',
          name: '名优企业',
          component: products.products_good,
          meta: {
            title: "名优企业",
            auth: true,
            keepAlive:true
          }
        },{
          path: '',
          name: '名优企业详情',
          component: products.products_mingyou,
          meta: {
            title: "名优企业详情",
            auth: true,
            keepAlive:true
          }
        },
        {
          path: '/modules/products/goodslist',
          name: '商品列表',
          component: products.products_goodslist,
          meta: {
            title: "商品列表",
            auth: true,
            keepAlive:true
          }
        },
        {
          path: '/modules/products/goodsTabManage',
          name: '商品标签管理',
          component: products.products_goodsTabManage,
          meta: {
            title: "商品标签管理",
            auth: true,
            keepAlive:true
          }
        },
        {
          path: '/modules/products/goodsClassifyManage',
          name: '商品分类管理',
          component: products.products_goodsClassifyManage,
          meta: {
            title: "商品分类管理",
            auth: true,
            keepAlive:true
          }
        }
      ]
      },
      {
        path: '/modules/products/products/banneredit/:id',
        name: '优品广告管理详情',
        component: products.products_bannerDetail,
        meta: {
          title: "优品广告管理详情",
          auth: true,
          keepAlive:false
        }
      },
      {
        path: '/modules/products/products/banneradd',
        name: '优品广告管理添加',
        component: products.products_banneradd,
        meta: {
          title: "优品广告管理添加",
          auth: true,
          keepAlive:false
        }
      },
      {
        path: '/modules/news',
        name: '新闻',
        component: news.news,
        meta: {
          title: "新闻",
          auth: true,
          keepAlive:false
        }
      },
      {
        path: '/modules/news',
        name: '新闻',
        redirect: '/topnews',
        component: news.news,
        meta: {
          title: "新闻",
          auth: true,
          keepAlive:false
        },
        children:[
          {
            path: '/modules/news/topnews',
            name: '头条新闻',
            component: news.topnews,
            meta: {
              title: "头条新闻",
              auth: true,
              keepAlive:true
            }
          },
          {
            path: '/modules/news/tv',
            name: '电视新闻',
            component: news.tv,
            meta: {
              title: "电视新闻",
              auth: true,
              keepAlive:true
            }
          },
          {
            path: '/modules/news/special',
            name: '专题报道',
            component: news.special,
            meta: {
              title: "专题报道",
              auth: true,
              keepAlive:true
            }
          }
        ]
      },
      {
        path: '/modules/news/topnews/newsDetail/:id',
        name: '新闻详情',
        component: news.newsDetail,
        meta: {
          title: "新闻详情",
          auth: true,
          keepAlive:false
        }
      },
      {
        path: '/modules/news/topnews/addtopnews',
        name: '头条新闻添加',
        component: news.addtopnews,
        meta: {
          title: "头条新闻添加",
          auth: true,
          keepAlive:false
        }
      },
      {
        path: '/modules/news/topnews/addtvnews',
        name: '电视新闻添加',
        component: news.addtvnews,
        meta: {
          title: "电视新闻添加",
          auth: true,
          keepAlive:false
        }
      },
      {
      path: '/modules/opportunity',
      name: '商机',
      component: Opportunity,
      meta: {
        title: "商机",
        auth: true
      }
    },
      // 商道
      {
        path: '/business/banner/:id',
        name: 'bannerDetil',
        component: business.business_banner,
        meta: {
          title: "banner修改",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/business/newsDetil/:id',
        name: '资讯详情',
        component: business.newsDetil,
        meta: {
          title: "资讯详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/business/celebrity/:id',
        name: '名流详情',
        component: business.celebrityDetil,
        meta: {
          title: "名流详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/business/celebrityVideo/:id',
        name: '名流课堂添加',
        component: business.ketangDetil,
        meta: {
          title: "名流课堂添加",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/business/celebrityEdit/:id',
        name: '名流编辑详情',
        component: business.celebrityEdit,
        redirect: '/celebrityEdit/celebrity/:id',
        meta: {
          title: "名流编辑详情",
          auth: true,
          keepAlive: false
        },
        children:[
          {
            path: '/celebrityEdit/celebrity/:id',
            name: '名流信息',
            component: business.celebrityDetil,
            meta: {
              title: "banner列表",
              auth: true
            }
          },
          {
            path: '/celebrityEdit/celebrityZixun/:id',
            name: '个人资讯',
            component: business.celebrityZixun,
            meta: {
              title: "个人资讯列表",
              auth: true
            }
          },
          {
            path: '/celebrityEdit/celebrityClass/:id',
            name: '名流课堂',
            component: business.celebrityClass,
            meta: {
              title: "名流课堂",
              auth: true
            }
          },
          {
            path: '/celebrityEdit/commonList/:id',
            name: '名流课堂评论',
            component: business.commentList,
            meta: {
              title: "名流课堂评论",
              auth: true
            }
          },
        ]
      },
      {
        path: '/business/dinnerDetil/:id/:userid',
        name: '饭局详情',
        component: business.dinnerDetil,
        meta: {
          title: "饭局详情",
          auth: true,
          keepAlive: false
        }
      },
      //娱道
      {
        path: '/amuse/banner/:id',
        name: '娱道banner',
        component: amuse.business_banner,
        meta: {
          title: "banner修改",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/amuse/newsDetil/:id',
        name: '娱道资讯详情',
        component: amuse.newsDetil,
        meta: {
          title: "娱道资讯详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/amuse/celebrityDetil/:id',
        name: '明星详情',
        component: amuse.celebrityDetil,
        meta: {
          title: "明星详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/amuse/celebrityVideo/:id',
        name: '明星课堂添加',
        component: amuse.ketangDetil,
        meta: {
          title: "明星课堂添加",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/amuse/celebrityEdit/:id',
        name: '明星编辑详情',
        component: amuse.celebrityEdit,
        redirect: '/celebrityEdit/amuseCelebrity/:id',
        meta: {
          title: "明星编辑详情",
          auth: true,
          keepAlive: false
        },
        children:[
          {
            path: '/celebrityEdit/amuseCelebrity/:id',
            name: '明星信息',
            component: amuse.celebrityDetil,
            meta: {
              title: "banner列表",
              auth: true
            }
          },
          {
            path: '/celebrityEdit/amuseCelebrityZixun/:id',
            name: '明星资讯',
            component: amuse.celebrityZixun,
            meta: {
              title: "个人资讯列表",
              auth: true
            }
          },
          {
            path: '/celebrityEdit/amuseCelebrityClass/:id',
            name: '明星课堂',
            component: amuse.celebrityClass,
            meta: {
              title: "明星课堂",
              auth: true
            }
          },
          {
            path: '/celebrityEdit/amuseCommonList/:id',
            name: '明星课堂评论',
            component: amuse.commentList,
            meta: {
              title: "明星课堂评论",
              auth: true
            }
          },
        ]
      },
      {
        path: '/amuse/dinnerDetil/:id/:userid',
        name: '探班详情',
        component: amuse.dinnerDetil,
        meta: {
          title: "探班详情",
          auth: true,
          keepAlive: false
        }
      },
      //攻略
      {
        path: '/raiders/article/articleDetil/:id',
        name: '文章详情',
        component: raiders.ArticleDetil,
        meta: {
          title: "文章详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/article/articleEdit/:id',
        name: '编辑文章',
        component: raiders.ArticleEdit,
        meta: {
          title: "编辑文章",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/travel/travelDetil/:id',
        name: '自由行详情',
        component: raiders.walkDetil,
        meta: {
          title: "自由行详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/travel/travelEdit/:id',
        name: '自由行编辑',
        component: raiders.walkEdit,
        meta: {
          title: "自由行编辑",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/play/playDetil/:id',
        name: '跟团游详情',
        component: raiders.playDetil,
        meta: {
          title: "跟团游详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/play/playEdit/:id',
        name: '跟团游编辑',
        component: raiders.playEdit,
        meta: {
          title: "跟团游编辑",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/strategy/strategyDetil/:id',
        name: '攻略详情',
        component: raiders.strategyDetil,
        meta: {
          title: "攻略详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/strategy/strategyEdit/:id',
        name: '攻略编辑',
        component: raiders.strategyEdit,
        meta: {
          title: "攻略编辑",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/raiders/scenicsDetil/:id',
        name: '景区详情',
        component: raiders.scenicsDetil,
        meta: {
          title: "景区详情",
          auth: true,
          keepAlive: false
        }
      },
    ]
  },
  {
    path: '/sysmanger/',
    redirect: '/sysmanger/homebannermanger',
    component: viewPageComponent,
    children: [{
      path: '/sysmanger/homebannermanger',
      name: '首页banner管理',
      component: homemanger.homeBannerManger,
      meta: {
        title: '首页banner管理',
        auth: true,
        keepAlive: true
      }
    },{
      path: '/sysmanger/homebanneradd/:id',
      name: 'homebanneradd',
      component: homemanger.homebanneradd,
      meta: {
        title: '首页banner添加',
        auth: true,
        keepAlive: false
      }
    }]
  },
  {
    path: '/video/',
    redirect: '/video/livebroadcast',
    component: viewPageComponent,
    children: [{
      path: '/video/livebroadcast',
      redirect: '/video/liveStreamMange',
      component: video.livebroadcast,
      meta: {
        name: '直播',
        auth: true,
        keepAlive: true
      },
      children:[{//直播流管理
        path: '/video/liveStreamMange',
        name: '直播流管理',
        component: video.liveStreamMange,
        meta: {
          title: "直播流管理",
          auth: true,
          keepAlive: true
        },
      },{//直播服务管理
        path: '/video/liveServeMange',
        name: '直播服务管理',
        component: video.liveServeMange,
        meta: {
          title: "直播服务管理",
          auth: true,
          keepAlive: true
        }
      },]
    },{
      path: '/video/videoDemand',
      component: video.videoDemand,
      meta: {
        name: '点播',
        auth: true,
        keepAlive: true
      },
    }]
  },
  {
    path: '/video/',
    redirect: '/video/livebroadcast',
    component: viewPageComponent,
    children:[{
      path: '/video/liveAddMange/:id',
      name: 'liveAddMange',
      component: video.liveAddMange,
      meta: {
        title: "添加直播流",
        auth: true,
        keepAlive: true
      },
    },{
      path: '/video/videoDemandEdit/:id',
      name: 'videoDemandEdit',
      component: video.videoDemandEdit,
      meta: {
        title: "添加直播流",
        auth: true,
        keepAlive: false
      }
    },{
      path: '/video/livePushDragServeDetail',
      name: '直播流管理',
      component: video.livePushDragServeDetail,
      meta: {
        title: "直播流管理",
        auth: true,
        keepAlive: true
      }
    }]
  },
  //1、权限管理
  //1.1、模块管理
  {
    path: '/power',
    redirect: '/power/modules',
    component: viewPageComponent,
    children:[
      {
      path: '/power/modules',
      name: '模块管理',
      component: powerModus.modusmanger,
      meta: {
        title: "模块管理",
        auth: true,
        keepAlive: true
        }
      },
      {
        path: '/power/modulesDetil/:id',
        name: '模块详情',
        component: powerModus.addmodus,
        meta: {
          title: "模块详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/power/modulesEdit/:id',
        name: '模块编辑',
        component: powerModus.editmodus,
        meta: {
          title: "模块编辑",
          auth: true,
          keepAlive: false
        }
      }
    ]
  },
  //1.2、角色管理
  {
    path: '/power',
    redirect: '/power/rolemanger',
    component: viewPageComponent,
    children:[
      {
        path: '/power/rolemanger',
        name: '角色管理',
        component: powerRole.rolemanger,
        meta: {
          title: "角色管理",
          auth: true,
          keepAlive: true
        }
      },
      {
        path: '/power/roleDetil/:id',
        name: '角色详情',
        component: powerRole.addrole,
        meta: {
          title: "角色详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/power/roleEdit/:id',
        name: '角色编辑',
        component: powerRole.editRole,
        meta: {
          title: "角色编辑",
          auth: true,
          keepAlive: false
        }
      },
    ]
  },
  //1.3、组织架构管理
  {
    path: '/power',
    redirect: '/power/organization',
    component: viewPageComponent,
    children:[
      {
        path: '/power/organization',
        name: '组织架构管理',
        component: powerOrganization.organization,
        meta: {
          title: "组织架构管理",
          auth: true,
          keepAlive: true
        }
      },
      {
        path: '/power/organizationDetil/:id',
        name: '组织架构详情',
        component: powerOrganization.addOrganiza,
        meta: {
          title: "组织架构详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/power/organizationEdit/:id',
        name: '组织架构编辑',
        component: powerOrganization.editOrganiza,
        meta: {
          title: "组织架构编辑",
          auth: true,
          keepAlive: false
        }
      },
    ]
  },
  //1.3、用户管理
  {
    path: '/power',
    redirect: '/power/usermanger',
    component: viewPageComponent,
    children:[
      {
        path: '/power/usermanger',
        name: '用户管理',
        component: powerUser.userManger,
        meta: {
          title: "用户管理",
          auth: true,
          keepAlive: true
        }
      },
      {
        path: '/power/userDetil/:id',
        name: '用户详情',
        component:  powerUser.addUser,
        meta: {
          title: "用户详情",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: '/power/organizationEdit/:id',
        name: '组织架构编辑',
        component: powerOrganization.editOrganiza,
        meta: {
          title: "组织架构编辑",
          auth: true,
          keepAlive: false
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login
  // let is_login = true

  //next()

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
