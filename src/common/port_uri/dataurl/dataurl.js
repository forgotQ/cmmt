/**
 * Created by zhaobojian on 17/7/21.
 */

//直播
exports.pushStream_user_url = "/apidev/sys/user/register/list" //推流用户
exports.liveStream_serve_url = "/apidev/vod/stream/list" //推流用户
exports.liveStream_save = "/apidev/video/save" //添加直播

exports.liveStream_menulist_url = "/apidev/vod/stream/list" //直播服务管理
exports.liveStream_delete_url = "/apidev/vod/stream/batch" //直播服务管理
exports.liveStream_updateAuth_url = "/apidev/vod/stream/updateAuth" //直播服务管理
exports.sys_area_url = "/apidev/sys/area/allArea" // 国内传0  海外传-1
exports.banner_area_url = "/apidev/sys/banner/list" // 国内传0  海外传-1
exports.bannerDetail_get_url = "/apidev/sys/banner/get" // 国内传0  海外传-1
exports.bannerlist_get_url = "/apidev/sys/bannerurl/list" // 跳转位置
exports.bannerCount_get_url = "/apidev/sys/banner/getCount" // 跳转位置
exports.ftplist_type_url = "/apidev/vod/type/list" // 掌视分类
exports.ftplist_vod_url = "/apidev/vod/type/list"             // 掌视分类管理列表
exports.ftp_vodTopic_url = "/apidev/vod/topic/list"           // 掌视专题管理列表


//视频点播
exports.ftpVodType_list_url = "/apidev/vod/type/list"            //视频分类
exports.ftpVodTopic_Matter_url = "/apidev/vod/topic/list"           //所属专题

//commonUrl
exports.delete_url = "/apidev/vod/stream/batch" // 删除
exports.banner_save_url = "/apidev/sys/banner/save"
