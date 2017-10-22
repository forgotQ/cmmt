<template>
  <div class='panel'>
    <panel-title>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="10">
          <el-form ref="bannerDetail" :model="articleDetail"  label-width="100px">
            <el-form-item label="商家名称:" prop="title">
              <el-input v-model="articleDetail.title"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="所属分类:" prop="fun">
              <el-select v-model="articleDetail.label" placeholder="请选择" @change="getranking">
                <el-option
                  v-for="item in classList"
                  :key="item.title"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商家星级:" prop="fun">
              <el-select v-model="articleDetail.grade" placeholder="请选择">
                <el-option label="★" value="1"></el-option>
                <el-option label="★★" value="2"></el-option>
                <el-option label="★★★" value="3"></el-option>
                <el-option label="★★★★" value="4"></el-option>
                <el-option label="★★★★★" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序序号:" prop="title">
              <el-input v-model="articleDetail.ranking" readonly placeholder="自动生成" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="详细电话:" prop="title">
              <el-input v-model="articleDetail.tel"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="详细地址:" prop="title">
              <el-input v-model="articleDetail.address"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="商家经纬度:" prop="title">
              <el-input class="jin" placeholder="请输入经度" v-model="articleDetail.longitude"  style="width: 250px;"></el-input>
              <el-input class="jin" placeholder="请输入纬度" v-model="articleDetail.latitude"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="推荐理由:" prop="title">
              <el-input v-model="articleDetail.reason"  style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label="上传时间:" v-show="isEdit"  prop="createDate">
              <el-date-picker
                v-model="articleDetail.createDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="推荐攻略首页:">
              <el-radio class="radio" v-model="articleDetail.isRec" label="0">否</el-radio>
              <el-radio class="radio" v-model="articleDetail.isRec" label="1">是</el-radio>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :model="articleDetail">
            <el-form-item label="简介简要:" prop="wish">
              <el-input v-model="articleDetail.wish"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="英文简要:" prop="wishE">
              <el-input v-model="articleDetail.wishE"  style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="详细介绍:" prop="synopsis">
              <el-input type="textarea" autosize v-model="articleDetail.synopsis"></el-input>
            </el-form-item>
            <el-form-item label="获奖情况:" prop="honor">
              <el-input type="textarea" autosize v-model="articleDetail.honor"></el-input>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>

      <!--<submit-btn :url="zixunUrl" :params="bannerDetail"></submit-btn>-->
    </div>
    <div class="bar"><span>展示图</span></div>
    <div class="panel-body">
      <el-col :span="8">
        <el-form :model="articleDetail">
          <el-form-item label="展示图:">
            <el-radio-group v-model="isVideoImg">
              <el-radio class="radio" label="1">视频</el-radio>
              <el-radio class="radio" label="0">图片</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="slcTitle" prop="pic" v-show="both">
            <el-input v-show="isVideo" style="width: 250px;" v-model="videoTit" placeholder="点击选择视频" @focus="openVideoList"></el-input>
            <div  v-show="!isVideo">
              <pics-upload :defaultImgs="defaultImgs5" :id="5" :postImgUrl="postImgUrl" :maxPostImgs="1"></pics-upload>

            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :model="articleDetail">
          <el-form-item label="缩略图:">
            <pics-upload :defaultImgs="defaultImgs6" :id="6" :postImgUrl="postImgUrl" :maxPostImgs="1"></pics-upload>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :model="articleDetail">
          <el-form-item label="热门推荐图:">
            <pics-upload :defaultImgs="defaultImgs7" :id="7" :postImgUrl="postImgUrl" :maxPostImgs="1"></pics-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div class="bar"><span>商家推荐</span></div>
    <panel-title>
      <el-button type="primary" @click="tjSave">保存</el-button>
    </panel-title>
    <div class="panel-body tuijList">
      <div style="float: right;">
        <el-button type="primary" icon="plus" size="small" @click="addTuijian">添加</el-button>
      </div>
      <div :class="`tjImg${index}`" v-for="(item,index) in goodList" style="margin:10px 0;">
        <div class="tjWrapper">
          <span style="margin-right: 10px">推荐商品{{index+1}}</span><el-input v-model="item.title" style="width: 250px;"></el-input>
        </div>
        <div>
          <pics-upload :defaultImgs="defaultImgs[index]"  :id="`a${index}`" :maxPostImgs="1"></pics-upload>
        </div>
      </div>
      <div :class="`tjImg${index}`" v-for="(item,index) in tuijian" style="margin:10px 0;">
        <div class="tjWrapper">
          <span style="margin-right: 10px">推荐商品</span><el-input style="width: 250px;"></el-input>
        </div>
        <div>
          <pics-upload :defaultImgs="defaultImgs[goodList.length+index]"  :id="index" :postImgUrl="postImgUrl" :maxPostImgs="1"></pics-upload>
        </div>
      </div>
    </div>
    <table-dialog @getTableId="getTableId" ref="tableDialog" :type="type"></table-dialog>
    <table-dialog @getTableId="getPeopleId" ref="tableDialog1" :type="type1"></table-dialog>
  </div>

</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, tableDialog, picsUpload} from 'components'
  import {port_file, port_business} from 'common/port_uri'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  import $ from 'jquery'
  import {port_raiders} from 'common/port_uri'
  export default {
    data() {
      return {
        route_id: this.$route.params.id,
        postImgUrl: port_file.image_upload,//发送图片连接
        defaultImgs:[
          [],
          [],
          [],
          [],
          []
        ],
        defaultImgs5:[],
        defaultImgs6:[],
        defaultImgs7:[],
        load_data: false,
        time: '',
        dialogImageUrl: '',
        dialogVisible: false,
        slcTitle:'上传视频',
        videoTit:'',
        both: false,
        isVideo:false,
        type: 'video',
        type1: 'people',
        isUse: '1',
        isEdit: false,
        imgArr: [],
        zixunUrl: port_business.zixunSave,
        isVideoImg:'1',
        articleDetail: {
          id:'',
          title:'',
          area:'',
          pic:'',
          recPic:'',
          thumbnail:'',
          label:'',
          reason: '',
          grade: "",
          longitude: "",
          latitude: "",
          tel: "",
          address: "",
          wish: "",
          wishE: "",
          synopsis:'',
          classify:'',
          videoId:'',
          videoName:'',
          honor:'',
          ranking:'',
          isRec:'0',
          star:''
        },
        classList:[],
        tuijian:[],
        goodList:[],
        recommendId:''
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
        this.articleDetail.content = content
      },
      getTableId(item) {
        if (item) {
          this.$refs.tableDialog.dialogTableVisible = false;
          this.$fetch.api_business.getVideoDetil({
            id: item.id
          }).then(({msg, retcode, retObj})=> {

            this.bannerDetail.hdUrl = retObj.hdUrl
            this.bannerDetail.sdUrl = retObj.sdUrl
            this.bannerDetail.fluenUrl = retObj.fluenUrl
            this.videoTit = retObj.title
          })
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
      addTuijian() {
         if(this.tuijian.length>=4){
           this.$message({
             message: '最多添加4个推荐',
             type: 'warning'
           });
           return
         }
         this.tuijian.push(1)
      },
      get_class_data(){
        this.$fetch.api_raiders.getRecommendClass({
          category: 0
        }).then(({msg, retcode, retObj})=> {
          this.classList = retObj
        })
      },
      getranking() {
        /*this.$fetch.api_raiders.getranking({
          area: this.getCityCode,
          label: this.articleDetail.label
        }).then(({msg, retcode, retObj})=> {
          this.articleDetail.ranking = retObj
        })*/
      },
      save() {

        this.articleDetail.pic = this.defaultImgs5.join(',')
        this.articleDetail.recPic = this.defaultImgs6.join(',')
        this.articleDetail.thumbnail = this.defaultImgs7.join(',')
        this.$fetch.api_raiders.recommendEdit(this.articleDetail)
          .then(({msg, retcode, retObj})=> {
            if (retcode == 0) {
             this.$message.success(msg)
              this.recommendId = retObj
             }
          })
      },
      tjSave() {
        var that = this
        var addGoodsList = []
        var ipts = $(".tuijList").find(".el-input input");
        ipts.each(function (i) {
          var shopObj = new Object();
          shopObj.title = $(this).val();
          shopObj.pic = that.defaultImgs[i].join(',');
          shopObj.recommendId = that.articleDetail.id
          addGoodsList.push(shopObj)
        })
        $.ajax({
          contentType : 'application/json;charset=utf-8', //设置请求头信息
          data: JSON.stringify(addGoodsList),
          url: port_raiders.recommendgoodsAdd,
          type: "POST",
          dataType: "json",
          success:function (data) {
            console.log(data.retObj);

          }
        })
      }
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    created() {
      this.get_class_data()

      this.$fetch.api_raiders.getRecommendDetil({
        id: this.route_id
      }).then(({msg, retcode, retObj})=> {
          console.log(retObj)
          this.articleDetail.ranking = retObj.ranking
          this.articleDetail.id = retObj.id
          this.articleDetail.area = retObj.area
          this.articleDetail.title = retObj.title
          this.articleDetail.pic = retObj.pic
          this.articleDetail.recPic = retObj.recPic
          this.articleDetail.thumbnail = retObj.thumbnail
          this.articleDetail.label = retObj.label
          this.articleDetail.reason = retObj.reason
          this.articleDetail.grade = retObj.grade
          this.articleDetail.longitude = retObj.longitude
          this.articleDetail.latitude = retObj.latitude
          this.articleDetail.tel = retObj.tel
          this.articleDetail.address = retObj.address
          this.articleDetail.wish = retObj.wish
          this.articleDetail.wishE = retObj.wishE
          this.articleDetail.synopsis = retObj.synopsis
          this.articleDetail.classify = retObj.classify
          this.articleDetail.videoId = retObj.videoId
          this.articleDetail.honor = retObj.honor
          this.articleDetail.isRec = retObj.isRec
          this.articleDetail.star = retObj.star
          this.defaultImgs5 = retObj.pic.split(',')
          this.defaultImgs6 = retObj.recPic.split(',')
          this.defaultImgs7 = retObj.thumbnail.split(',')
          if(retObj.classify==1){
            this.isVideoImg == 1
            this.both = true
            this.isVideo = true;
            this.slcTitle = "上传视频";
          }else if(retObj.classify==0){
            this.isVideoImg == 0
            this.both = true
            this.isVideo = false;
            this.slcTitle = "上传图片";
          }
          if(retObj.goodsList){
            this.goodList = retObj.goodsList
            console.log(this.goodList.length);
            for(var i = 0;i<this.goodList.length;i++){
                this.defaultImgs[i] = this.goodList[i].pic.split(',')
            }
          }
      })
    },
    watch: {
      'isVideoImg'(){
        if (this.isVideoImg == 1) {
          this.both = true
          this.isVideo = true;
          this.slcTitle = "上传视频";
          this.classify = 1
        } else if (this.isVideoImg == 0) {
          this.both = true
          this.isVideo = false;
          this.slcTitle = "上传图片";
           this.classify = "0"

        } else {
          this.both = false;
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
  .jin{
    width: 100px !important;
  }
  .bar{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #EFF0F4;
    padding-left: 10px;
  }
  .tjWrapper{
    display: inline-block;
    float: left;
    margin-right: 30px;
  }
</style>

