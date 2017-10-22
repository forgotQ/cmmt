<template>
  <div>
    <div class='panel'>
      <panel-title>
        <el-button @click="$router.back()">返回</el-button>
      </panel-title>
      <div class="panel-body">
        <el-row>
          <el-col :span="10">
            <el-form style="background: white;" label-width="100px">
              <el-form-item label="广告名称:" style="width: 400px;">
                <el-input v-model="bannerObj.title" placeholder="请输入广告名称">
                </el-input>
              </el-form-item>
              <el-form-item label="Banner图片:">
                <pics-upload :defaultImgs="defaultImgs" :postImgUrl="postImgUrl" :maxPostImgs="1">
                </pics-upload>
              </el-form-item>
              <el-form-item label="跳转位置:" style="width: 400px;">
                <el-select v-model="bannerUrlState" placeholder="请选择">
                  <el-option
                    v-for="item in bannerObjUrl"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否开启:" style="width: 400px;">
                <el-radio class="radio" v-model="bannerObj.delFlag" label="0">开启</el-radio>
                <el-radio class="radio" v-model="bannerObj.delFlag" label="3">关闭</el-radio>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form>
              <span>广告详情:</span>
              <el-form-item prop="bannerContent">
                <html-edit @htmlinput="htmlinput" :contents="bannerObj.bannerContent"></html-edit>
              </el-form-item>
            </el-form>

          </el-col>
        </el-row>
      </div>
      <submit-btn :url="bannerPostUrl" :params="postParams"></submit-btn>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, imgReader, picsUpload} from 'components'
  import {port_dataurl, port_file} from 'common/port_uri'
  import {mapGetters} from 'vuex'
  import {GET_Single_CODE} from  'store/mutations/type'

  export default {

    data() {
      return{
        bannerObj:{
          isNewRecord:'true',  // 判断是添加还是修改   添加传true  修改传false
          id:'',               // 当为添加时传空   修改时将此条信息的id传过来
          title:'',            // banner的标题
          sort:'',             // 排序的字段
          pic:'',              // 图片的地址
          url:'',              // 跳转的链接地址
          fun:'index',         // 模块的标识  默认传index
          area:'',             // 城市的编码  就是code值
          bannerContent:'',    // banner的内容
          createDate:'',       // 上传时间
          delFlag: 0
        },
        bannerUrlState:'',
        bannerContent:'',
        postImgUrl: port_file.image_upload,//发送图片连接
        defaultImgs:[],
        dragStreamUrl: '',
        bannerPostUrl:port_dataurl.banner_save_url,
        bannerObjUrl: [],
      }
    },
    created() {

      this.$fetch.api_fatchData.fetchDataList(port_dataurl.bannerCount_get_url,{//在添加banner图之前，先调用查看当前排序的接口
        area: 110100,
        fun: 'index'
      }).then(({msg, retcode, retObj}) => {
        this.bannerObj.sort = retObj;
      });

      this.$fetch.api_fatchData.fetchDataList(port_dataurl.bannerlist_get_url,{//跳转banner位

      }).then(({msg, retcode, retObj}) => {
        this.bannerObjUrl= retObj;
        console.log('bannerObjUrl',retObj);
        this.bannerUrlState = this.bannerObjUrl[0].id;
      });
      if(this.$route.params.id=='add'){
        this.bannerObj.isNewRecord = true;
        return;
      }
      this.bannerObj.isNewRecord = false;

      this.$fetch.api_fatchData.fetchDataList(port_dataurl.bannerDetail_get_url,{
        id: this.$route.params.id
      }).then(({msg, retcode, retObj}) => {
        this.bannerObj = retObj;
        this.defaultImgs = retObj.pic.split(',');
      });
    },
    components: {
      panelTitle,
      submitBtn,
      picsUpload,
      htmlEdit
    },
    computed: {
      postParams() {
        return {
        delFlag: this.bannerObj.delFlag,
        isNewRecord: this.bannerObj.isNewRecord,
        id: this.bannerObj.id,
        title: this.bannerObj.title,
        sort: this.bannerObj.sort,
        fun: 'index',
        pic:  this.defaultImgs.join(),
        url:  this.bannerUrl,
        area: '230100',
        bannerContent: this.bannerObj.title,
        createDate: this.bannerObj.createDate
        }
      },
      bannerUrl() {
        console.log('22222',this.bannerObjUrl,this.bannerObjUrl.length);

        for (var item of this.bannerObjUrl) {

          if (item.id == this.bannerUrlState){

            console.log('item.url',item.url);
            return item.url;
          }
        }
        return '';
      }
    },
    methods: {
      ...mapGetters({
        code: GET_Single_CODE
      }),
      htmlinput(content) {
        this.bannerObj.bannerContent = content
      }
    },
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
