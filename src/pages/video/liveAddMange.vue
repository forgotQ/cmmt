<template>
  <div>
    <div class='panel'>
      <panel-title>
        <el-button @click="$router.back()">返回</el-button>
      </panel-title>
      <div class="panel-body">
        <el-row>
          <el-col>
            <el-form style="background: white;" label-width="100px">
              <el-form-item label="直播流名称:" style="width: 400px;">
                <el-input v-model="videoSaveParams.title" placeholder="请输入视频名称">
                </el-input>
              </el-form-item>
              <el-form-item label="直播流状态:" style="width: 400px;">
                <el-select v-model="videoState" placeholder="请选择">
                  <el-option
                    v-for="item in stateoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="推流用户:" style="width: 400px;">
                <el-input  v-model="pushStreamUser.nickname" placeholder="请选择推流用户" @focus="_selectClick('推流用户')">
                </el-input>
              </el-form-item>
              <el-form-item label="直播流服务:" style="width: 400px;">
                <el-input  v-model="liveStreamServe.bucketName" placeholder="请选择直播流服务"  @focus="_selectClick('直播流服务')">
                </el-input>
              </el-form-item>
              <el-form-item label="直播时间:" lstyle="width: 500px;">
                <el-date-picker
                  id="startTime"
                  v-model="startTime"
                  type="datetime"
                  placeholder="选择开始时间"
                  @focus="_timeFocus($event)">
                </el-date-picker>
                <el-date-picker
                  id="endTime"
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择结束时间"
                  @focus="_timeFocus($event)">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="视频图片:">
                <pics-upload :defaultImgs="defaultImgs" :postImgUrl="postImgUrl" :maxPostImgs="1">
                </pics-upload>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <submit-btn v-show="this.$route.params.id=='add'" :url="liveUrl" :params="videoSaveParam"></submit-btn>
      </div>
      <stream-edit ref="streamEdit" @makeSure="makeSure"></stream-edit>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, imgReader, picsUpload} from 'components'
  import {port_dataurl} from 'common/port_uri'
  import streamEdit from './liveStreamEdit'

  var tempTime = '';
  var preTime = '';
  export default {
    props: {},
    data() {
      return {
        liveUrl:port_dataurl.liveStream_save,
        videoSaveParams:{
          title:'',
          startTime:'',
          endTime:'',
          userId:'',
          imageUrl:'',
          streamName:'',
          serviceId:'',
          videoClassify:'2',
          liveState:'',
          isNewRecord:'true'
        },
        stateoptions: [{
          value: '0',
          label: '正在直播'
        },{
          value: '1',
          label: '直播结束'
        },{
          value: '2',
          label: '直播未开始'
        },{
          value: '3',
          label: '禁止直播'
        }],
        startTime: '',
        endTime: '',
        videoState: '0',//是否允许播放
        postImgUrl:'',
        defaultImgs:[],
        pushStreamUser:{},
        liveStreamServe:{}
      }
    },
    components: {
      panelTitle,
      submitBtn,
      picsUpload,
      streamEdit
    },
    computed: {
      videoSaveParam() {
          return {
            title: this.videoSaveParams.title,
            startTime:   this.$dateFormat(this.startTime, "yyyy-MM-dd hh:mm:ss.S"),
            endTime:   this.$dateFormat(this.endTime, "yyyy-MM-dd hh:mm:ss.S"),
            imageUrl: this.defaultImgs.join(),
            videoClassify: 2,
            liveState: this.videoState,
            isNewRecord: true,
            userId:  this.pushStreamUser.id,
            'liveStream.serviceId': this.liveStreamServe.id,
            'liveStream.streamName': this.videoSaveParams.title,
            'liveStream.userId': this.pushStreamUser.id,
            'liveStream.app': 'liveCity',
          }
      }
    },
    created() {
      var that = this
      document.addEventListener('uploaded', function(e) {
        that.addLog(e.detail);
      });
      if(this.$route.params.id=='add'){
        return;
      }
      this.$fetch.api_video.getVideoDetailMsg({
        id: this.$route.params.id
      }).then(({msg, retcode, retObj})=> {
        this.videoSaveParams = retObj;
        this.videoState = retObj.liveState;
        this.pushStreamUser.nickname = retObj.userName;
        if(retObj.imageUrl){
          console.log('gjlsdjgldsjglksg');
          this.defaultImgs = retObj.imageUrl.split(',');
        }
        this.startTime = retObj.startTime;
        this.endTime = retObj.endTime;
        this.liveStreamServe.bucketName = retObj.liveServiceName;
      })
    },
    methods: {
       _selectClick(msg) {
         this.$refs.streamEdit.title = msg;
         this.$refs.streamEdit.dialogVisible = true;
         if (msg === '推流用户'){
           this.$refs.streamEdit.getDataList(port_dataurl.pushStream_user_url);
         }else {
           this.$refs.streamEdit.getDataList(port_dataurl.liveStream_serve_url);
         }
       },
       _checkTime() {
         if(this.startTime == "" || this.endTime == ""){
            return ;
         }
         console.log(this._getDate(this.startTime),this._getDate(this.startTime));
         if((this._getDate(this.startTime)-this._getDate(this.endTime)>=0)){
           alert("结束时间需大于开始时间");
           if (tempTime == 'startTime'){
             this.startTime = '';
           }else {
             this.endTime = '';
           }
           return false;
         }
       },
      _getDate(date) {
        var tempDate = this.$dateFormat(date, "yyyy-MM-dd hh:mm:ss.S");
        return tempDate.replace(/[-.: ]/g, '').slice(0,12);
      },
      _timeFocus(e) {
        tempTime = e.$el.id;
      },
      makeSure(type, obj) {
        if (type === '推流用户'){
            this.pushStreamUser = obj;

        }else {
          console.log(this.liveStreamServe.id);
          this.liveStreamServe = obj;
        }
      }
    },
    watch: {
        'startTime'() {
          this._checkTime();
        },
        'endTime'() {
          this._checkTime();
          tempTime = 'end';
        }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
