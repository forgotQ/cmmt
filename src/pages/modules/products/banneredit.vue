<template>
  <div class="panel">
    <panel-title>
      <el-button @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="拼命加载中">
      <el-row>
        <el-col >
          <el-form :model="newsDetail" label-width="100px" >
            <el-form-item label="标题" prop="title" scope="scope" >
              <el-input id="title" v-model="newsDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form  label-width="100px">
            <el-form-item label="所属模块" >
              <el-select v-model="newsDetail.fun"  id="values"  >
                <el-option label="优品首页"  value="superpro">
                </el-option>
                <el-option label="优品土特产品类" value="superpro_specialty">
                </el-option>
                <el-option label="优品家用产品类" value="superpro_domestic">
                </el-option>
                <el-option label="优品商用产品类" value="superpro_commercial">
                </el-option>
              </el-select>
              <!--<el-input id="zhuanti" v-model="newsDetail.reportId" placeholder="请输入内容" style="width: 250px;"></el-input>-->
            </el-form-item>
          </el-form>
          <el-form :model="newsDetail" label-width="100px">
            <el-form-item label="当前城市" prop="name">
              <el-input id="name" readonly="readonly" v-model="newsDetail.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="newsDetail" label-width="100px">
            <el-form-item label="发布时间" prop="counts">
              <el-input v-model="newsDetail.createDate" :disabled="true" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>

          <el-form :model="newsDetail" label-width="100px" >
            <el-form-item label="修改图片" prop="counts">
              <!--<picsUpload></picsUpload>-->
              <picsUpload :defaultImgs="array_pics"  :postImgUrl="postImgUrl" :maxPostImgs="1"></picsUpload>
            </el-form-item>
          </el-form>
          <el-form  label-width="100px">
            <el-form-item label="跳转位置" >
              <el-select v-model="newsDetail.url"  id="url"  >
                <el-option :label="item.title" v-for="item in linkUrl"  :value="item.url">
                </el-option>
              </el-select>
              <!--<el-input id="zhuanti" v-model="newsDetail.reportId" placeholder="请输入内容" style="width: 250px;"></el-input>-->
            </el-form-item>
          </el-form>

          <el-form :model="newsDetail" label-width="100px">
            <el-form-item label="广告详情" prop="counts">
              <el-col :span="8">
                <el-form :model="newsDetail">
                  <el-form-item prop="newsDetail">
                    <html-edit  @htmlinput="htmlinput" :contents="newsDetail.bannerContent"></html-edit>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-form-item>
          </el-form>
          <el-form :model="newsDetail" label-width="100px">
            <el-form-item label="是否开启" prop="counts">
              <el-radio class="radio" v-model="newsDetail.delFlag" label="0">否</el-radio>
              <el-radio class="radio" v-model="newsDetail.delFlag" label="3">是</el-radio>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="btnWrapper">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, picsUpload} from 'components'
  import {port_file} from 'common/port_uri'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  export default{
    data(){
      return{
        route_id:this.$route.params.id,
        load_data:false,
        postImgUrl:port_file.image_upload,
        newsDetail:{
          id: this.route_id,
          area:this.getCityCode,
          title:'',
          name:'',//地区
          pic:[],
          createDate:'',
          bannerContent:'',
          newsDesc:'',
          fun:'',
          url:[],
          delFlag:'',
          isNewRecord:''
        },
        array_pics:[],
        linkUrl:[]

      }
    },
    created(){
      this.details();
      this.linkUrls();
    },
    methods:{
      linkUrls(){
        this.$fetch.api_products.linkUrls({
        }).then(({msg,retcode,retObj})=>{
            this.linkUrl = retObj
        })
      },
//      change(fun){
//          alert(fun)
//      },
      details(){//回显
        this.$fetch.api_products.bannerDetail({
          id: this.route_id
        }).then(({msg,retcode,retObj})=>{
          this.newsDetail = retObj;
          this.array_pics=retObj.pic.split(',')
          this.newsDetail.pic = this.array_pics;
          this.newsDetail.name = retObj.areao.name;
        })
      },
      submit(){
        this.$fetch.api_products.banneredit({
          id:this.newsDetail.id,
          fun:this.newsDetail.fun,
          area:this.getCityCode,
          title:this.newsDetail.title,
          pic:this.newsDetail.pic,
          url:this.newsDetail.url,
          bannerContent:this.newsDetail.bannerContent,
          delFlag:this.newsDetail.delFlag,
          isNewRecord:this.newsDetail.isNewRecord
        }).then(({msg,retcode,retObj})=>{
          this.$message.success(msg)
//            this.newsDetail = retObj;
//            this.pics=retObj.pics.split(',')
        })
      },
      htmlinput(bannerContent) {
        this.newsDetail.bannerContent = bannerContent
      },
      reset(){ //重置
        this.details();
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
      picsUpload
    },
    watch:{
    }
  }
</script>
<style>
  form{
    width: 35%;
  }
  form:nth-child(9){
    width: 100%;
  }
  .piclist{
    margin-left: 105px;
  }
  #textWrapper{
    margin-left: 105px;
  }
</style>


