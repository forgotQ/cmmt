/**
 * Created by zhaobojian on 17/7/28.
 */
const handheldFtp = resolve => require(['./handheldFtp'], resolve)
const ftphomemanger = resolve => require(['./ftphomemanger'], resolve)
const ftpdemand = resolve => require(['./ftpdemand'], resolve)

export default {
  handheldFtp,
  ftphomemanger,
  ftpdemand
}
