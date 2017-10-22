<template>
  <div class='panel'>
    <panel-title>
      <el-button @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="10">
          <el-form ref="bannerDetail" :model="bannerDetail"  label-width="100px">
            <el-form-item label="所属分类:">
              <el-select v-model="bannerDetail.classify" placeholder="请选择">
                <el-option  label="视频" value="1"></el-option>
                <el-option  label="图文" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题:" prop="title">
              <el-input v-model="bannerDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="关联人物:">
              <el-input style="width: 250px;" v-model="bannerDetail.celebrityName" @focus="openPeopleList"></el-input>
            </el-form-item>
            <el-form-item label="所属分类:">
              <el-select v-model="bannerDetail.typeId" placeholder="请选择">
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传时间:" v-show="isEdit"  prop="createDate">
              <el-date-picker
                v-model="bannerDetail.createDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="slcTitle" prop="pic">
              <el-input v-show="!isVideo" style="width: 250px;" v-model="videoTit" placeholder="点击选择视频" @focus="openVideoList"></el-input>
              <div  v-show="isVideo">
                <pics-upload :defaultImgs="defaultImgs" :postImgUrl="postImgUrl" :maxPostImgs="3"></pics-upload>
              </div>
            </el-form-item>
            <el-form-item label="费用:">
              <el-input style="width: 250px;" v-model="bannerDetail.price" ></el-input>
            </el-form-item>
            <el-form-item label="推商学院:">
              <el-radio class="radio" v-model="bannerDetail.recommendCollege" label="0">否</el-radio>
              <el-radio class="radio" v-model="bannerDetail.recommendCollege" label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="商道首页:">
              <el-radio class="radio" v-model="bannerDetail.recommend" label="0">否</el-radio>
              <el-radio class="radio" v-model="bannerDetail.recommend" label="1">是</el-radio>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :model="bannerDetail">
            <el-form-item label="内容介绍:">
              <html-edit @htmlinput="htmlinput" :contents="bannerDetail.voideContent"></html-edit>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
      <submit-btn :url="channelVideoUrl" :params="bannerDetail"></submit-btn>
    </div>
    <table-dialog @getTableId="getTableId" ref="tableDialog" :type="type"></table-dialog>
    <table-dialog @getTableId="getPeopleId" ref="tableDialog1" :type="type1"></table-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, tableDialog, picsUpload} from 'components'
  import {port_file, port_business} from 'common/port_uri'
  export default {
    data() {
      return {
        fun: 'washington',
        route_id: this.$route.params.id,
        postImgUrl: port_file.image_upload,//发送图片连接
        defaultImgs:[],
        load_data: false,
        bannerDetail:{},
        time: '',
        dialogImageUrl: '',
        dialogVisible: false,
        slcTitle:'上传视频',
        videoTit:'',
        both: false,
        isVideo:false,
        type: 'video',
        type1: 'people',
        imgUrl: port_file.image_upload,
        isUse: '1',
        isEdit: false,
        imgArr: [],
        channelVideoUrl: port_business.channelVideoAdd,
        isVideoImg:'0',
        bannerDetail: {
          title:'',
          voideContent:'',
          celebrityId:'',
          celebrityName:'',
          typeId:'',
          pic: '',
          price: '',
          videoId: '',
          isPay: '',
          recommend: '0',
          recommendCollege: '0',
          fun:'washington',
          classify:'1',
          isNewRecord: true,
        },
        classList:[],
        classId:'',
      }
    },
    components: {
      panelTitle,
      htmlEdit,
      submitBtn,
      tableDialog,
      picsUpload
    },
    methods: {
      htmlinput(content) {
        this.bannerDetail.voideContent = content
      },
      getTableId(item) {
        if (item) {
          this.$refs.tableDialog.dialogTableVisible = false;
          this.bannerDetail.videoId = item.id
          if(this.bannerDetail.classify==1){
            this.bannerDetail.pic = item.imageUrl
          }

          this.videoTit = item.title
        }
      },
      getPeopleId(item) {
        if (item) {
          this.$refs.tableDialog1.dialogTableVisible = false;
          this.pepTit = item.title
          this.bannerDetail.celebrityName = item.title
          this.bannerDetail.celebrityId = item.id
        }
      },
      openVideoList() {
        this.$refs.tableDialog.dialogTableVisible = true;
      },
      openPeopleList() {
        this.$refs.tableDialog1.dialogTableVisible = true;
      }
    },
    created() {
      this.$fetch.api_business.getClassList({
        fun: this.fun,
        classify: '2'
      }).then(({msg, retcode, retObj})=> {
        this.classList = retObj
      })
      if (this.route_id == 'add') {
        this.bannerDetail.isNewRecord = true;
        return false
      }
      this.$fetch.api_business.channelVideoDetail({
        id: this.route_id
      }).then(({msg, retcode, retObj})=> {
        if(retObj.video){
          this.videoTit = retObj.video.title
        }
        console.log(delete retObj.video)
        this.bannerDetail = retObj
        if(this.bannerDetail.pic){
          this.defaultImgs = this.bannerDetail.pic.split(',');
        }

        this.isEdit = true
      })
    },
    watch: {
      'bannerDetail.classify'(v) {
        if(v==0){
          this.isVideo = true;
          this.slcTitle = "上传缩略图";
        }else {
          this.isVideo = false;
          this.slcTitle = "上传视频";
        }
      },
      'bannerDetail.price'(v) {
        if(v!=0){
          this.bannerDetail.isPay = 1
        }else {
          this.bannerDetail.isPay =0
        }
      },
      'defaultImgs'() {
        this.bannerDetail.pic = this.defaultImgs.join(',')
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

</style>

