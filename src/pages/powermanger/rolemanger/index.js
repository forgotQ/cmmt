/**
 * Created by ningsong on 17/8/1.
 */
const rolemanger = resolve => require(['./rolemanger'], resolve)
const addrole = resolve => require(['./addrole'], resolve)
const editRole = resolve => require(['./editRole'], resolve)

export default {
  rolemanger,
  addrole,
  editRole
}
