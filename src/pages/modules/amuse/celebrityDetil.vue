<template>
  <div class="panel">
    <panel-title>
      <el-button v-show="!isEdit" @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="10">
          <el-form ref="bannerDetail" :model="bannerDetail"  label-width="100px">
            <el-form-item label="人物名称:" prop="title">
              <el-input v-model="bannerDetail.title"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="人物星级:" prop="fun">
              <el-select v-model="bannerDetail.star" placeholder="请选择">
                <el-option  label="1" value="1"></el-option>
                <el-option  label="2" value="2"></el-option>
                <el-option  label="3" value="3"></el-option>
                <el-option  label="4" value="4"></el-option>
                <el-option  label="5" value="5"></el-option>
                <el-option  label="6" value="6"></el-option>
                <el-option  label="7" value="7"></el-option>
                <el-option  label="8" value="8"></el-option>
                <el-option  label="9" value="9"></el-option>
                <el-option  label="10" value="10"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人物排名:" prop="sort">
              <el-input v-model="bannerDetail.sort"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="人物职称:">
              <el-input style="width: 250px;" v-model="bannerDetail.starDesc"></el-input>
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
            <el-form-item label="上传时间:" v-show="isEdit"  prop="createDate">
              <el-date-picker
                v-model="bannerDetail.createDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="上传图片" prop="pic">
              <pics-upload :defaultImgs="defaultImgs" :postImgUrl="postImgUrl" :maxPostImgs="1"></pics-upload>
            </el-form-item>
            <el-form-item label="语录显示:">
              <el-radio class="radio" v-model="bannerDetail.isTeamwork" label="0">否</el-radio>
              <el-radio class="radio" v-model="bannerDetail.isTeamwork" label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否加V:">
              <el-radio class="radio" v-model="bannerDetail.isCert" label="0">否</el-radio>
              <el-radio class="radio" v-model="bannerDetail.isCert" label="1">是</el-radio>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :model="bannerDetail">
            <el-form-item label="人物标签:">
              <el-input type="textarea"  v-model="bannerDetail.content"></el-input>
            </el-form-item>
            <el-form-item label="经典语录:">
              <html-edit @htmlinput="htmlinput" :contents="bannerDetail.classicQuote"></html-edit>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
      <submit-btn :url="zixunUrl" :params="bannerDetail"></submit-btn>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, tableDialog, picsUpload} from 'components'
  import {port_file, port_business} from 'common/port_uri'

  export default {
    data() {
      return {
        fun: 'entertainment',
        route_id: this.$route.params.id,
        postImgUrl: port_file.image_upload,//发送图片连接
        defaultImgs:[],
        load_data: false,
        bannerDetail:{},
        time: '',
        dialogImageUrl: '',
        dialogVisible: false,
        isUse: '1',
        isEdit: false,
        imgArr: [],
        zixunUrl: port_business.celebrityAdd,
        isVideoImg:'0',
        bannerDetail: {
          title:'',
          content:'',
          starDesc:'',
          typeId:'',
          classicQuote:'',
          isTeamwork:'0',
          pic: '',
          isCert: "0",
          star: "",
          sort: "",
          fun:'entertainment',
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
        this.bannerDetail.classicQuote = content
      }
    },
    created() {
      this.$fetch.api_business.getClassList({
        fun: this.fun,
        classify: '3'
      }).then(({msg, retcode, retObj})=> {
        this.classList = retObj
      })
      if (this.route_id == 'add') {
        this.bannerDetail.isNewRecord = true;
        this.$fetch.api_business.celebrityMax({
          fun: this.fun,
        }).then(({msg, retcode, retObj})=> {
          this.bannerDetail.sort = retObj+1
        })
        return false
      }
      this.$fetch.api_business.getCelebrity({
        id: this.route_id
      }).then(({msg, retcode, retObj})=> {
        this.bannerDetail = retObj
        console.log(retObj);
        if (this.bannerDetail.pic) {
          this.defaultImgs = this.bannerDetail.pic.split(',');
        }

        this.isEdit = true
      })
    },
    watch: {
      'defaultImgs'() {
        this.bannerDetail.pic = this.defaultImgs.join(',')
      },

    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .tabs{
    position: absolute;
    left: 0;
  }
</style>

