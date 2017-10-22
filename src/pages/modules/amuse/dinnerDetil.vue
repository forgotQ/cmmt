<template>
  <div class="panel">
    <panel-title>
      <el-button  @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="10">
          <el-form ref="bannerDetail" :model="bannerDetail"  label-width="100px">
            <el-form-item label="发布人:" >
              <el-input v-model="pepTit"  style="width: 250px;" @focus="openPeopleList"></el-input>
            </el-form-item>
            <el-form-item label="饭局标题:" prop="title">
              <el-input v-model="bannerDetail.title"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="饭局分类:">
              <el-select v-model="bannerDetail.dinner_type" placeholder="请选择">
                <el-option
                  v-for="item in classList"
                  :key="item.title"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间:">
              <el-date-picker
                v-model="time"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发起总金额:">
              <el-input style="width: 250px;" v-model="bannerDetail.total"></el-input>
            </el-form-item>

            <el-form-item label="目标人数:" >
              <el-input style="width: 250px;" v-model="bannerDetail.expect_number"></el-input>
            </el-form-item>
            <el-form-item label="每份金额:">
              <el-input style="width: 250px;" v-model="bannerDetail.price"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="pic">
              <pics-upload :defaultImgs="defaultImgs" :postImgUrl="postImgUrl" :maxPostImgs="1"></pics-upload>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :model="bannerDetail">
            <!--<el-form-item label="参与人:">
              <el-input style="width: 250px;" v-model="bannerDetail.starDesc"></el-input>
            </el-form-item>-->
            <el-form-item label="饭局地址:">
              <el-input style="width: 250px;" v-model="bannerDetail.address"></el-input>
            </el-form-item>
            <el-form-item label="人物标签:">
              <el-input type="textarea"  v-model="bannerDetail.remarks"></el-input>
            </el-form-item>
           <!-- <el-form-item label="经典语录:">
              <html-edit @htmlinput="htmlinput" :contents="bannerDetail.classicQuote"></html-edit>
            </el-form-item>-->
          </el-form>

        </el-col>
      </el-row>
      <submit-btn :url="channelDinnerAdd" :params="bannerDetail"></submit-btn>
    </div>
    <table-dialog @getTableId="getPeopleId" ref="tableDialog1" :type="type1"></table-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {GET_PROVICE_CODE, GET_CITY_CODE, GET_USER_INFO} from 'store/getters/type'
  import {panelTitle, htmlEdit, submitBtn, tableDialog, picsUpload} from 'components'
  import {port_file, port_business} from 'common/port_uri'
  var that;
  export default {
    data() {
      var that = this
      return {
        fun: 'washington',
        route_id: this.$route.params.id,
        postImgUrl: port_file.image_upload,//发送图片连接
        defaultImgs:[],
        load_data: false,
        time: '',
        pepTit: '',
        dialogImageUrl: '',
        dialogVisible: false,
        isUse: '1',
        isEdit: false,
        type1: 'people',
        imgArr: [],
        channelDinnerAdd: port_business.channelDinnerAdd,
        isVideoImg:'0',
        bannerDetail: {
          userId:'',
          moduleId:'washington',
          celebrity_id:'',
          dinner_type:'',
          start_date:'',
          pic:'',
          title:'',
          total:'',
          price:'',
          expect_number:'',
          pcode:'',
          code: '',
          address:'',
          remarks:''
        },
        classList:[],
      }
    },
    computed: {
      ...mapGetters({
        'cityCode': GET_CITY_CODE,
        'proviceCode': GET_PROVICE_CODE,
        'get_user_info': GET_USER_INFO,
      }),
      userId() {
        return this.get_user_info.id
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
      },
      getPeopleId(item) {
        if (item) {
          this.$refs.tableDialog1.dialogTableVisible = false;
          this.pepTit = item.title
          this.bannerDetail.celebrity_id = item.id
        }
      },
      openPeopleList() {
        this.$refs.tableDialog1.dialogTableVisible = true;
      }
    },
    created() {
      this.bannerDetail.code = this.cityCode
      this.bannerDetail.pcode = this.proviceCode
      this.bannerDetail.userId = this.userId
      this.$fetch.api_business.getClassList({
        fun: this.fun,
        classify: '4'
      }).then(({msg, retcode, retObj})=> {
        this.classList = retObj
      })
      if (this.route_id == 'add') {
        if(!this.cityCode){
          this.$message({
            message: '请先选择城市！',
            type: 'warning'
          });
        }
        return false
      }
      this.$fetch.api_business.channelDinnerGet({
        id: this.route_id,
        userId:this.$route.params.userid,
      }).then(({msg, retcode, retObj})=> {
        this.pepTit = retObj.celebrity.title
        delete retObj.celebrity
        this.bannerDetail = retObj
        this.time = retObj.start_date
        if (this.bannerDetail.pic) {
          this.defaultImgs = this.bannerDetail.pic.split(',');
        }
        this.channelDinnerAdd = port_business.channelDinnerUpdate
        this.bannerDetail.id = this.route_id
        this.isEdit = true
      })
    },
    watch: {
      'defaultImgs'() {
        this.bannerDetail.pic = this.defaultImgs.join(',')
      },
      'time'() {
        if(this.route_id == 'add'){
          this.bannerDetail.start_date = this.$dateFormat(this.time, "yyyy-MM-dd hh:mm:ss.S")
        }else {
          this.bannerDetail.start_date = this.time
        }

      },
      'cityCode'() {
        this.bannerDetail.code = this.cityCode
      },
      'proviceCode'() {
        this.bannerDetail.pcode = this.proviceCode
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .tabs{
    position: absolute;
    left: 0;
  }
</style>

