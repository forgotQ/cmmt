/**
 * Created by 7888 on 2017/7/28.
 */
const news = resolve => require(['./news'], resolve)//头条消息
const newsDetail = resolve => require(['./newsDetail'], resolve)//头条消息详情
// const tvNews =resolve => require(['../pages/modules/news/tv'], resolve)
const topnews = resolve => require(['./topnews'], resolve)//头条消息
const tv = resolve => require(['./tv'], resolve)//头条消息
const special = resolve => require(['./special'], resolve)//头条消息
const addtopnews = resolve => require(['./addtopnews'], resolve)//头条消息添加
const addtvnews = resolve => require(['./addtvnews'], resolve)//电视消息添加

export default {
  news,
  newsDetail,
  topnews,
  tv,
  special,
  addtopnews,
  addtvnews
}
