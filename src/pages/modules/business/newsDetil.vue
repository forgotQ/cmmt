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
            <el-form-item label="资讯标题:" prop="title">
              <el-input v-model="bannerDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="关联人物:">
              <el-input style="width: 250px;" v-model="bannerDetail.celebrityName" @focus="openPeopleList"></el-input>
            </el-form-item>
            <el-form-item label="所属分类:" prop="fun">
              <el-select v-model="bannerDetail.typeId" placeholder="请选择">
                <el-option
                  v-for="item in classList"
                  :key="item.title"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图片视频:">
              <el-radio-group v-model="isVideoImg">
                <el-radio class="radio" label="0">无</el-radio>
                <el-radio class="radio" label="1">有视频</el-radio>
                <el-radio class="radio" label="2">有图片</el-radio>
              </el-radio-group>

            </el-form-item>
            <el-form-item label="上传时间:" v-show="isEdit"  prop="createDate">
              <el-date-picker
                v-model="bannerDetail.createDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="slcTitle" prop="pic" v-show="both">
              <el-input v-show="isVideo" style="width: 250px;" v-model="videoTit" placeholder="点击选择视频" @focus="openVideoList"></el-input>
             <div  v-show="!isVideo">
               <pics-upload :defaultImgs="defaultImgs" :postImgUrl="postImgUrl" :maxPostImgs="3"></pics-upload>

             </div>
            </el-form-item>
            <el-form-item label="是否精品:">
              <el-radio class="radio" v-model="bannerDetail.isEssential" label="0">否</el-radio>
              <el-radio class="radio" v-model="bannerDetail.isEssential" label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否置顶:">
              <el-radio class="radio" v-model="bannerDetail.isTop" label="0">否</el-radio>
              <el-radio class="radio" v-model="bannerDetail.isTop" label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="App首页:">
              <el-radio class="radio" v-model="bannerDetail.isAdmin" label="0">否</el-radio>
              <el-radio class="radio" v-model="bannerDetail.isAdmin" label="1">是</el-radio>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :model="bannerDetail">
            <el-form-item >
              <html-edit @htmlinput="htmlinput" :contents="bannerDetail.content"></html-edit>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
      <submit-btn :url="zixunUrl" :params="bannerDetail"></submit-btn>
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
        zixunUrl: port_business.zixunSave,
        isVideoImg:'0',
        bannerDetail: {
          title:'',
          content:'',
          celebrityId:'',
          celebrityName:'',
          typeId:'',
          pic: '',
          fluenUrl: "",
          sdUrl: "",
          hdUrl: "",
          isEssential: "0",
          isTop: "0",
          recommend: "0",
          isAdmin: "0",
          fun:'washington',
          classify:'',
          isNewRecord: true,
        },
        classList:[]
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
        this.bannerDetail.content = content
      },
      getTableId(item) {
        console.log(item);
        if (item) {
          this.$refs.tableDialog.dialogTableVisible = false;
          this.$fetch.api_business.getVideoDetil({
            id: item.id
          }).then(({msg, retcode, retObj})=> {
            console.log(retObj);
            this.bannerDetail.hdUrl = retObj.hdUrl
            this.bannerDetail.sdUrl = retObj.sdUrl
            this.bannerDetail.fluenUrl = retObj.fluenUrl
            this.videoTit = retObj.title
          })
        }
      },
      getPeopleId(item) {
        console.log(item);
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
        classify: '1'
      }).then(({msg, retcode, retObj})=> {
        this.classList = retObj
      })
      if (this.route_id == 'add') {
        this.bannerDetail.isNewRecord = true;
        return false
      }
      this.$fetch.api_business.getNewsDetil({
        id: this.route_id
      }).then(({msg, retcode, retObj})=> {
        this.bannerDetail = retObj
        this.defaultImgs = this.bannerDetail.pic.split(',');
        this.bannerDetail.classify = retObj.classify
        if(retObj.classify=='3'){
          this.isVideoImg = '1'
        }else {
          this.isVideoImg = '2'
        }
        this.isEdit = true
      })
    },
    watch: {
      'isVideoImg'(){
        if (this.isVideoImg == 1) {
          this.both = true
          this.isVideo = true;
          this.slcTitle = "上传视频";
          this.classify = 3
        } else if (this.isVideoImg == 2) {
          this.both = true
          this.isVideo = false;
          this.slcTitle = "上传图片";
          /* this.classify = ""*/

        } else {
          this.both = false;
        }
      },
      'defaultImgs'() {
        this.bannerDetail.pic = this.defaultImgs.join(',')
        if (this.defaultImgs.length == 3) {
          this.bannerDetail.classify = "1"
        } else if (this.defaultImgs.length == 1) {
          this.bannerDetail.classify = "2"
        } else {
          this.bannerDetail.classify = ""
        }
      },

    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .btnWrapper{
    text-align: center;
    padding-bottom: 20px;
  }
</style>

