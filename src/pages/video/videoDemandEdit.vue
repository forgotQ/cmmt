<template>
  <div>
    <div class='panel'>
      <panel-title>
        <el-button @click="$router.back()">返回</el-button>
      </panel-title>
      <div class="panel-body" v-loading=loadingState :element-loading-text=loadingText>
        <el-row>
          <el-col>
            <el-form style="background: white;" label-width="100px">
              <el-form-item label="视频名称:" style="width: 400px;">
                <el-input v-model="videoObj.title" placeholder="请输入视频名称">
                </el-input>
              </el-form-item>
              <el-form-item label="发布时间:" lstyle="width: 500px;">
                <el-date-picker
                  v-model="videoObj.createDate"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="视频状态:" style="width: 400px;">
                <el-select v-model="videostate" placeholder="请选择">
                  <el-option
                    v-for="item in stateoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="视频源址:" style="width: 800px;">
                <span class="videosource">{{videoObj.videoSource}}<i class="fr" v-show="fluenProgress || this.$route.params.id!='add'"></i></span>
              </el-form-item>
              <el-form-item  label="标清地址:" style="width: 800px;">
                <div class="progress">
                  <input type="text" disabled class="videosource" v-model="(parseInt(sdProgress)==100 || this.$route.params.id!='add') ? videoObj.sdUrl : videoObj.noVideoUrl ">
                  <i class="fr progressItem" v-show="videoObj.sdProgress" > {{parseFloat(videoObj.sdProgress).toFixed(2)}}% </i>
                </div>
              </el-form-item>
              <el-form-item label="高清地址:" style="width: 800px;">
                <div class="progress">
                  <input type="text" disabled class="videosource" v-model="(parseInt(hdProgress)==100 || this.$route.params.id!='add') ? videoObj.hdUrl : videoObj.noVideoUrl ">
                  <i class="fr progressItem" v-show="videoObj.hdProgress" >{{parseFloat(videoObj.hdProgress).toFixed(2)}}%</i>
                </div>
              </el-form-item>
              <el-form-item label="流畅地址:" style="width: 800px;">
                <div class="progress">
                  <input type="text" disabled class="videosource" v-model="(parseInt(fluenProgress)==100 || this.$route.params.id!='add') ? videoObj.fluenUrl : videoObj.noVideoUrl ">
                  <i class="fr progressItem" v-show="videoObj.fluenProgress">{{parseFloat(videoObj.fluenProgress).toFixed(2)}}%</i>
                </div>
              </el-form-item>
              <el-form-item label="视频图片:">
                <pics-upload :defaultImgs="defaultImgs" :postImgUrl="postImgUrl" :maxPostImgs="3">
                </pics-upload>
              </el-form-item>
              <el-form-item label="上传视频:" style="width: 800px;" class="videoWrap">
                <input class="fileVideo" type="file" id="file"  @change="change" :disabled="(this.$route.params.id!='add') ? true : false">
                <el-button :plain="true" @click="uploadViodeo" :disabled=this.postVideoabled>上传视频</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {panelTitle, htmlEdit, submitBtn, imgReader, picsUpload} from 'components'
import {port_file, port_video} from 'common/port_uri'
export default{
    data() {
      return {
        videoPostUrl: '',
        videostate: '0',//是否允许播放
        postVideoabled : false,//是否允许上传视频
        postImgUrl: port_file.image_upload,//发送图片连接
        dialogVisible: false,//上传中
        loadingState: false,
        loadingText: '',
        defaultImgs:[],
        videoObj: {
            id: '',
            title: '',
            createDate: '',
            imageUrl:'',
            videoClassify:'',
            videoSource: '',//视频源址
            delFlag:'0',
            noVideoUrl: '无',
            fluenUrl:'',
            sdUrl: '',
            hdUrl: '',
            isNewRecord:true
        },
        progress:'0',
        fluenProgress: 0,
        sdProgress: 0,
        hdProgress: 0,
        isvisible: false,
        file: '',
        stateoptions: [{
          value: '0',
          label: '允许播放'
        },{
          value: '1',
          label: '禁止播放'
        }],
      };
    },
    computed() {
      if(this.$route.params.id=='add') {
       this.videoPostUrl = 'upload/uploadFile';
      }
      this.file = document.getElementById("file").value;
    },
    components: {
        panelTitle,
        submitBtn,
        picsUpload
    },
    created() {
      console.log('activated');

      var that = this
      document.addEventListener('uploaded', function(e) {
        that.addLog(e.detail);
      });
      if(this.$route.params.id=='add'){
          return;
      }

      console.log('网络请求');
      this.$fetch.api_video.getVideoDetailMsg({
        id: this.$route.params.id
      }).then(({msg, retcode, retObj})=> {
          this.videoObj = retObj;
          console.log(this.videoObj);
          this.defaultImgs = this.videoObj.imageUrl.split(',');
      })
    },
    methods: {
      uploadViodeo() {

        if(!this.videoObj.imageUrl){
            this.$message({
              message: '请选择视频图片',
              type: 'warning'
            });
            return;
          }
          console.log(`视频：${this.file}`);
        if (!this.file && this.$route.params.id=='add'){
            this.$message({
              message: '请选择视频文件',
              type: 'warning'
            });
            return;
        }
        if(this.$route.params.id=='add') {
          this._videoPost();
        }
        else {//编辑
         this._videoAddEditPost();
        }

      },

      _videoPost() {
        this.loadingState = true;
        this.loadingText = '上传视频中...';
        this.isvisible = true;
        var ext = '.' + document.getElementById('file').files[0].name.split('.').pop();
        var config = {
          bucket: 'zgzsvideo',
          expiration: parseInt((new Date().getTime() + 3600000) / 1000),
          // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
          form_api_secret: 'FJsQjeVjGz/NNbZ2r8ByTDaXBkQ='
        };
        var instance = new Sand(config);
        var options = {
          'notify_url': 'http://upyun.com'
        };
        instance.setOptions(options);
        var posturl = '/upload/test' + parseInt((new Date().getTime() + 3600000) / 1000) + ext;
        instance.upload(posturl);
      },
      addLog(data) {//视频传输完毕
        this.postVideoabled = true;
        let elem = document.createElement("ul");
        for (var key in data) {
            if(key === 'path') {
              this.progress = '100'
              this.isvisible = false
              this.videoObj.videoSource = "https://zgzsvideo.b0.upaiyun.com"+ data[key]
              console.log(`视频传输完毕:${this.videoUrl}`);
              this.zhuanma();
            }
          }
      },
      zhuanma () {
        console.log('开始转码');
        this.loadingText = '视频转码...';
        let that = this;
        this.$fetch.api_video.videoTransfor({
          videoSource:that.videoObj.videoUrl
        }).then(({msg, retcode, retObj:{videoSource, fluenUrl, sdUrl, hdUrl, fluenTaskid, hdTaskid, sdTaskid}}) => {

          let f1 = function () {
            return new Promise((resolve, reject) => {
              var time1 = setInterval(function () {

                that.$fetch.api_video.videoTransforState({
                  taskids: fluenTaskid,
                }).then((data) => {
                  var mesg = JSON.parse(data.msg);
                  var task = mesg.tasks
                  for (var k in task) {
                    console.log(task[k]);
                    that.fluenProgress = task[k];
                    console.log(`流畅进度：${that.fluenProgress}`);
                    if (task[k] == 100) {
                      clearInterval(time1);
                      that.fluenUrl = fluenUrl;
                      resolve('sucess');
                      return false;
                    } else if (task[k] == -1) {
                      clearInterval(time1);
                      that.fluenUrl = "";
                      /* swal("标清转码失败!","可能视频清晰度不够!", "error");*/
                      reject('fail');
                      return false;
                    }
                  }
                });

              }, 1000)
            })

          }
          let f2 = function () {
            return new Promise((resolve, reject) => {
              var time2 = setInterval(function () {
                that.$fetch.api_video.videoTransforState({
                  taskids: hdTaskid,
                }).then((data) => {
                  var mesg = JSON.parse(data.msg);
                  var task = mesg.tasks
                  for (var k in task) {
                    that.hdProgress = task[k];
                    if (task[k] == 100) {
                      clearInterval(time2);
                      that.videoObj.hdUrl = hdUrl;
                      resolve('sucess');

                      return false;
                    } else if (task[k] == -1) {
                      clearInterval(time2);
                      that.videoObj.hdUrl = "";
                      /* swal("标清转码失败!","可能视频清晰度不够!", "error");*/
                      reject('fail');

                      return false;
                    }
                  }
                });
              }, 1000)
            })
           }
          let f3 = function () {
            return new Promise((resolve, reject) => {
              var time3 = setInterval(function () {
                that.$fetch.api_video.videoTransforState({
                  taskids:sdTaskid,
                }).then((data) => {
                  var mesg = JSON.parse(data.msg);
                  var task = mesg.tasks
                  for(var k in task){
//                    console.log(task[k]);
                    that.sdProgress = task[k];
                    if(task[k]==100){
                      clearInterval(time3);
                      that.videoObj.sdUrl = sdUrl;
                      resolve('sucess');
                      return false;
                    }else if(task[k]==-1){
                      clearInterval(time3);
                      that.videoObj.sdUrl = "";
                      /* swal("标清转码失败!","可能视频清晰度不够!", "error");*/
                      reject('fail');
                      return false;
                    }
                  }
                });
              },1000);
            })

          }
          Promise.all([f1(),f2(),f3()]).then(function () {
            that._videoAddEditPost();
          });
        });

      },
      beforeVideoPicUpload(file) {
        const isPic = file.type === 'image/png' || 'image/jpeg' || 'image/jpg';
        const isPicM = file.size / 1024 / 1024  < 2;
        if (!isPic){
          this.$message.error('上传图片格式不正确')
          return false;
        }
        if(!isPicM){
          this.$message.error('上传图片不能大于2MB')
        }
        return isPic && isPicM;
      },
      handleRemove(file, fileList) {
        this.$refs.uploadPic.getElementsByClassName('el-upload')[0].style.display = 'block';
      },
      handlePictureCardPreview(file) {
        console.log('pic success');
        this.videoObj.imageUrl = file.url;
        this.dialogVisible = true;
      },
      postPicSuccess(obj) {
        this.videoObj.imageUrl = obj.retObj.picPath;
        console.log(`上传图片成功:${this.videoObj.imageUrl}`);
//        this.$refs.uploadPic.getElementsByClassName('el-upload')[0].style.display = 'none';
      },
      change(e) {
        return this.isVideoType();
      },
      isVideoType() {
        var typeValue = document.getElementById("file").value;
        var type = typeValue.substring(typeValue.indexOf('.'));
        if (type!='.mp4' && type!='.avi' && type!='.rmvb' && type !='.ts'){
          this.$message.error('视频格式不正确')
          document.getElementById("file").value = ''
          return false;
        }
        this.postVideoabled = document.getElementById("file").value ? false : true;
        this.file = document.getElementById("file").value;
        var index = this.file.lastIndexOf("\\");
        this.videoObj.title = this.file.substring(index + 1, this.file.length);
        console.log(`选择了视频：${this.file}`);
        return true;
      },
      _videoAddEditPost() {

        console.log('终极操作');

        this.loadingState = true;


        console.log(this.defaultImgs.join());
        if(this.$route.params.id=='add') {
          this.videoObj.isNewRecord = true;
        }else {
          this.videoObj.isNewRecord = false;
        }

          this.videoObj.imageUrl = this.defaultImgs.join();
        console.log(this.videoObj.imageUrl);
        this.$fetch.api_video.videoSave({
          id:this.videoObj.id,
          videoClassify:"1",
          title:this.videoObj.title,
          videoSource:this.videoObj.videoSource,
          sdUrl:this.videoObj.sdUrl,
          fluenUrl:this.videoObj.fluenUrl,
          hdUrl:this.videoObj .hdUrl,
          imageUrl:this.defaultImgs.join(),
          delFlag:this.videostate,//是否允许播放
          isNewRecord:false
        }).then(({msg, retcode, retObj}) => {
          console.log(`${msg} + ${retObj} + ${retcode}`);
          this.loadingState = false;
          this.loadingText = '';
          this.$message.success('上传成功');
        });
      }
    },
    computed: {

    },


}
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

.videosource{
  display: block;
  padding-left: 10px;
  width:  700px;
  height: 35px;
  border: 1px solid #535351;
  border-radius: 4px;
}
.fontSize{
  font-size: 0;
}
.videoWrap{
  margin-top: -10px;
}
.progress{
  position: relative;
  display: flex;
}
.progressItem{
 position: absolute;
  right: 5px;
}
</style>

