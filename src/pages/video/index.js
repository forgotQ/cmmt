/**
 * Created by zhaobojian on 17/7/28.
 */
const videoDemand = resolve => require(['./videoDemand'], resolve)
const videoDemandEdit = resolve => require(['./videoDemandEdit'], resolve)

const livebroadcast = resolve => require(['./livebroadcast'], resolve)
const liveStreamMange = resolve => require(['./liveStreamMange'], resolve)
const liveServeMange = resolve => require(['./liveServeMange'], resolve)
const liveAddMange = resolve => require(['./liveAddMange'], resolve)
const livePushDragServeDetail = resolve => require(['./livePushDragServeDetail'], resolve)

export default {
  videoDemand,
  videoDemandEdit,
  livebroadcast,
  liveStreamMange,
  liveServeMange,
  liveAddMange,
  livePushDragServeDetail
}
