<template>
  <div>
    <div class='panel'>
      <panel-title>
        <el-button @click="$router.back()">返回</el-button>
        <el-button  type="primary" size="small" @click="save">保存</el-button>
      </panel-title>
      <div class="panel-body"
           v-loading="load_data"
           element-loading-text="拼命加载中">
        <el-row>
          <el-col :span="10">
            <el-form ref="bannerDetail" :model="bannerDetail"  label-width="100px">
              <el-form-item label="标题:" prop="title">
                <el-input v-model="bannerDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="英文标题:" prop="enTitle">
                <el-input v-model="bannerDetail.enTitle" placeholder="请输入英文标题"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="适用人群:" prop="fun">
                <el-select v-model="bannerDetail.fitPeople" placeholder="请选择">
                  <el-option
                    v-for="item in options"
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
              <el-form-item label="图片预览:" prop="pic">
                <pics-upload :defaultImgs="defaultImgs"  :maxPostImgs="6"></pics-upload>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form :model="bannerDetail">
              <el-form-item label="攻略前言:" prop="bannerContent">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="bannerDetail.content"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class='panel'>
      <panel-title>
        <el-button  type="primary" size="small" @click="addContent">添加大标题</el-button>
        <el-button  type="primary" size="small" @click="saveContent">保存</el-button>
      </panel-title>
      <div class="panel-body">
        <div>
          <div>
            <el-input v-model="title" placeholder="请输入标题" style="width: 250px;"></el-input>
          </div>
          <div style="margin-top: 10px">
            <el-input v-model="smallTitle" placeholder="请输入小标题" style="width: 150px;"></el-input>
            <el-input v-model="address" placeholder="请输入地址" style="width: 150px;"></el-input>
            <el-input v-model="jindu" placeholder="请输入经度" style="width: 150px;"></el-input>
            <el-input v-model="weidu" placeholder="请输入纬度" style="width: 150px;"></el-input>
            <!--<el-button style="float: right;" type="primary" size="small" @click="saveContent">保存</el-button>-->
          </div>
          <div class="htmlWrapper" >
            <html-edit @htmlinput="htmlinput" :contents="content"></html-edit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, picsUpload} from 'components'
  import {port_file, port_business} from 'common/port_uri'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'

  export default {
    data() {
      return {
        route_id: this.$route.params.id,
        load_data: false,
        time: '',
        time1: '',
        dialogImageUrl: '',
        dialogVisible: false,
        imgUrl: port_file.image_upload,
        isUse: '1',
        isEdit: false,
        bannerUrl: port_business.bannerSave,
        bannerDetail: {
          title:"",
          enTitle:'',
          content:'',
          area:"",
          pic:'',
          userId:'',
          fitPeople:''
        },
        options:[],
        defaultImgs: [],
        thisId:'',
        title:'',
        smallTitle:'',
        address:'',
        jindu:'',
        weidu:'',
        content:'',
        bigNum:'1',
        bigTitId:''
      }
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    components: {
      panelTitle,
      htmlEdit,
      submitBtn,
      picsUpload
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onSuccess:function(url, file) {
        this.bannerDetail.pic = url.retObj.picPath
      },
      htmlinput(content) {
        this.content = content
      },
      save(){
        this.bannerDetail.area = this.getCityCode
        if(!this.bannerDetail.area){
          this.$message.warning('请选择城市!')
          return
        }
        this.bannerDetail.pic = this.defaultImgs.join(',')

        this.$fetch.api_raiders.thoughtsSave(this.bannerDetail)
          .then(({msg, retcode, retObj})=> {
            if (retcode == 0) {
              this.$message.success(msg)
              this.thisId = retObj
            }
        })
      },
      saveContent(){
        if(!this.bigTitId){
          this.$fetch.api_raiders.thoughtsParagSave({
            title: this.title,
            thoughtId: this.thisId,
            sort:this.bigNum
          }).then(({msg, retcode, retObj})=> {
            this.bigTitId = retObj
            this.$fetch.api_raiders.thoughtsContentList({
              paragId:this.bigTitId
            }).then(({msg, retcode, retObj})=> {
              var num = retObj.length+1
              this.$fetch.api_raiders.thoughtsContentSave({
                title:this.title,
                address: this.address,
                longitude: this.jindu,
                latitude: this.weidu,
                paragId:this.bigTitId,
                sort: num,
                content: this.content
              }).then(({msg, retcode, retObj})=> {
                if (retcode == 0) {
                  this.smallTitle = ""
                  this.address = ""
                  this.jindu = ""
                  this.weidu = ""
                  this.content = ""
                  this.$message.success(msg)
                }else {
                  this.$message.error(msg)
                }
              })
            })
          })
        }else {
          this.$fetch.api_raiders.thoughtsContentList({
            paragId:this.bigTitId
          }).then(({msg, retcode, retObj})=> {
            var num = retObj.length+1
            this.$fetch.api_raiders.thoughtsContentSave({
              title:this.title,
              address: this.address,
              longitude: this.jindu,
              latitude: this.weidu,
              paragId:this.bigTitId,
              sort: num,
              content: this.content
            }).then(({msg, retcode, retObj})=> {
              if (retcode == 0) {
                this.$message.success(msg)
                this.smallTitle = ""
                this.address = ""
                this.jindu = ""
                this.weidu = ""
                this.content = ""
              }else {
                this.$message.error(msg)
              }
            })
          })
        }

      },
      addContent(){

        this.bigNum = parseInt(this.bigNum)+1
        this.bigTitId = ""
        this.title = ""
        this.smallTitle = ""
        this.address = ""
        this.jindu = ""
        this.weidu = ""
        this.content = ""
        console.log(parseInt(this.bigNum));
      }
    },
    created() {
      this.$fetch.api_raiders.recommendlabelList({
        category: 1
      }).then(({msg, retcode, retObj})=> {
        this.options = retObj
      })
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .btnWrapper{
    text-align: center;
    padding-bottom: 20px;
  }
  .htmlWrapper{
    margin: 15px auto;
    width: 60%;
  }
</style>

