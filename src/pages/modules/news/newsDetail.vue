<template>
  <div class="panel">
    <panel-title>
      <el-button @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="拼命加载中">
      <el-row>
        <el-col >
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px" >
            <el-form-item label="标题" prop="title" scope="scope" >
              <el-input id="title" v-model="newsDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="当前城市" prop="name">
              <el-input id="name" v-model="newsDetail.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="新闻描述" prop="newsDesc">
              <el-input id="newsDesc" v-model="newsDetail.newsDesc" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="新闻来源" prop="source">
              <el-input id="source" v-model="newsDetail.source" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="新闻点击率" prop="counts">
              <el-input id="counts" v-model="newsDetail.counts" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="发布时间" prop="counts">
              <el-input v-model="newsDetail.createDate" :disabled="true" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="是否精品" prop="counts">
              <el-radio class="radio" v-model="newsDetail.isEssential" label="0">否</el-radio>
              <el-radio class="radio" v-model="newsDetail.isEssential" label="1">是</el-radio>
            </el-form-item>
          </el-form>
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="是否置顶" prop="counts">
              <el-radio class="radio" v-model="newsDetail.isTop" label="0">否</el-radio>
              <el-radio class="radio" v-model="newsDetail.isTop" label="1">是</el-radio>
            </el-form-item>
          </el-form>
          <!--<el-form ref="newsDetail" :model="newsDetail" label-width="100px">-->
            <!--<el-form-item label="图片详情" prop="counts">-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px" >
            <el-form-item label="修改图片" prop="counts">
              <!--<picsUpload></picsUpload>-->
              <picsUpload :defaultImgs="array_pics"  :postImgUrl="postImgUrl" :maxPostImgs="3"></picsUpload>
            </el-form-item>
          </el-form>
          <!--<el-form ref="newsDetail" :model="newsDetail" label-width="100px">-->
            <!--<el-form-item label="上传预览" prop="counts">-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="新闻详情" prop="counts">
              <el-col :span="8">
                <el-form :model="newsDetail">
                  <el-form-item prop="newsDetail">
                    <html-edit  @htmlinput="htmlinput" :contents="newsDetail.content"></html-edit>
                  </el-form-item>
                </el-form>
              </el-col>
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
            source:'',
            name:'',//地区
            pics:[],
            counts:'',
            createDate:'',
            content:'',
            newsDesc:'',
            videoUrl:'',
            isTop:'',
            isEssential:'',
            defaultImgs:''
          },
          newsUrl:'port_news.newsDetail',
          array_pics:[]
        }
      },
      created(){
        this.details()
      },
      methods:{
        details(){//回显
          this.$fetch.api_news.newsDetail({
            id: this.route_id,
            area:this.getCityCode
          }).then(({msg,retcode,retObj})=>{
            this.newsDetail = retObj;
            this.array_pics=retObj.pics.split(',')
            this.newsDetail.pics = this.array_pics
          })
        },
        submit(){
          this.$fetch.api_news.newsDetailchange(this.newsDetail).then(({msg,retcode,retObj})=>{
              this.$message.success(msg)
//            this.newsDetail = retObj;
//            this.pics=retObj.pics.split(',')
          })
        },
        htmlinput(content) {
          this.newsDetail.content = content
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
</style>


