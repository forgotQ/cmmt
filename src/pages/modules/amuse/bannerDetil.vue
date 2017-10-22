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
            <el-form-item label="广告名称:" prop="title">
              <el-input v-model="bannerDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="所属模块:">
              <el-input  placeholder="娱道" readonly style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="banner位:" prop="fun">
              <el-select v-model="bannerDetail.fun" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="banner位:" prop="fun">
              <el-select v-model="bannerDetail.url" placeholder="请选择">
                <el-option
                  label="跳转位置"
                  value="/mobile/banner.html">
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
              <img-reader :imgUrl="bannerDetail.pic"></img-reader>
              <el-upload
                :action= imgUrl
                list-type="picture-card"
                name="uploadFiles"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="onSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img class="img" width="100%" :src="bannerDetail.pic" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="是否开启:">
              <el-radio class="radio" v-model="bannerDetail.delFlag" label="0">开启</el-radio>
              <el-radio class="radio" v-model="bannerDetail.delFlag" label="3">关闭</el-radio>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :model="bannerDetail">
            <el-form-item prop="bannerContent">
              <html-edit @htmlinput="htmlinput" :contents="bannerDetail.bannerContent"></html-edit>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <submit-btn :url="bannerUrl" :params="bannerDetail"></submit-btn>
    </div>

  </div>

</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, imgReader} from 'components'
  import {port_file, port_business} from 'common/port_uri'

  export default {
    data() {
      return {
        route_id: this.$route.params.id,
        load_data: false,
        bannerDetail:{},
        time: '',
        dialogImageUrl: '',
        dialogVisible: false,
        imgUrl: port_file.image_upload,
        isUse: '1',
        isEdit: false,
        bannerUrl: port_business.bannerSave,
        bannerDetail: {
          delFlag:"0",
          fun:'entertainment',
          url:'/mobile/banner.html',
          createDate:"",
        },
        options:[{value: 'entertainment', label: '娱道首页'},{value: 'entertainment_college', label: '明星学院首页'}]
      }
    },
    components: {
      panelTitle,
      htmlEdit,
      submitBtn,
      imgReader
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
        console.log(this.imgUrl);
      },
      htmlinput(content) {
        this.bannerDetail.bannerContent = content
      }
    },
    created() {
      console.log(this.route_id);
      if (this.route_id == 'add') {
        this.bannerDetail.isNewRecord = true;
        return false
      }
      this.$fetch.api_business.getBannerDetail({
        id: this.route_id
      }).then(({msg, retcode, retObj})=> {
        this.bannerDetail = retObj
        this.isEdit = true
      })
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .btnWrapper{
    text-align: center;
    padding-bottom: 20px;
  }
</style>

