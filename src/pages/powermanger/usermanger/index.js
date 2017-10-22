/**
 * Created by ningsong on 17/8/11.
 */
const userManger = resolve => require(['./userManger'], resolve)
const addUser = resolve => require(['./addUser'], resolve)

export default {
  userManger,
  addUser
}
