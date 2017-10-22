/**
 * Created by 7888 on 2017/7/28.
 */
/**
 * Created by 7888 on 2017/7/28.
 */
const products =  resolve => require(['./products'], resolve)//banner
const products_banner =  resolve => require(['./banner'], resolve)//banner
const products_good =  resolve => require(['./good'], resolve)//名优企业
const products_goodslist =  resolve => require(['./goodslist'], resolve)//商品列表
const products_goodsTabManage =  resolve => require(['./goodsTabManage'], resolve)//商品标签管理
const products_goodsClassifyManage =  resolve => require(['./goodsClassifyManage'], resolve)//商品分类管理
const products_bannerDetail =  resolve => require(['./banneredit'], resolve)//banner详情
const products_banneradd = resolve => require(['./banneradd'], resolve)//banner添加
const products_mingyou = resolve => require(['./goodDetail'], resolve)//名优企业详情

export default {
  products,
  products_banner,
  products_good,
  products_goodslist,
  products_goodsTabManage,
  products_goodsClassifyManage,
  products_bannerDetail,
  products_banneradd,
  products_mingyou
}
