/**
 * Created by ningsong on 17/7/17.
 */
const Business = resolve => require(['./business'], resolve)
const business_banner = resolve => require(['./bannerDetil'], resolve)
const business_bannerList = resolve => require(['./bannerList'], resolve)
const classList = resolve => require(['./classList'], resolve)
const top10 = resolve => require(['./top10'], resolve)
const news = resolve => require(['./news'], resolve)
const newsDetil = resolve => require(['./newsDetil'], resolve)
const celebrity = resolve => require(['./celebrity'], resolve)
const celebrityDetil = resolve => require(['./celebrityDetil'], resolve)
const celebrityEdit = resolve => require(['./celebrityEdit'], resolve)
const celebrityZixun = resolve => require(['./celebrityZixun'], resolve)
const celebrityClass = resolve => require(['./celebrityClass'], resolve)
const ketangDetil = resolve => require(['./ketangDetil'], resolve)
const commentList = resolve => require(['./commentList'], resolve)
const celebrityCheck = resolve => require(['./celebrityCheck'], resolve)
const college = resolve => require(['./college'], resolve)
const dinnerList = resolve => require(['./dinnerList'], resolve)
const dinnerDetil = resolve => require(['./dinnerDetil'], resolve)

export default {
  Business,
  business_banner,
  business_bannerList,
  classList,
  top10,
  news,
  newsDetil,
  celebrity,
  celebrityDetil,
  celebrityEdit,
  celebrityZixun,
  celebrityClass,
  ketangDetil,
  commentList,
  celebrityCheck,
  college,
  dinnerList,
  dinnerDetil
}
