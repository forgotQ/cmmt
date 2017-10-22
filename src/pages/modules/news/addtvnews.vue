<template>
  <div class="panel">
    <panel-title>
      <el-button @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="拼命加载中">
      <el-row>
        <el-col >
          <el-form  label-width="100px" >
            <el-form-item label="标题" scope="scope" >
              <el-input id="title" v-model="newsDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <!--<el-form ref="newsDetail" :model="newsDetail" label-width="100px">-->
            <!--<el-form-item label="当前城市" prop="name">-->
              <!--<el-input id="name" v-model="newsDetail.name" placeholder="请输入内容" style="width: 250px;"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <el-form label-width="100px">
            <el-form-item label="新闻描述" >
              <el-input id="newsDesc" v-model="newsDetail.newsDesc" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form  label-width="100px">
            <el-form-item label="新闻来源">
              <el-input id="source" v-model="newsDetail.source" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form  label-width="100px">
            <el-form-item label="新闻点击率">
              <el-input id="counts" v-model="newsDetail.counts" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form  label-width="100px">
            <el-form-item label="新闻专题" >
              <!--@change="proChange(labelName,$event,item.id)"    :model="labelName"-->
              <el-select  placeholder="请选择专题"  v-model="newsDetail.id"  >
                  <el-option  v-for="item in spaciallist"  :label="item.title"  :value="item.id">
                  </el-option>
              </el-select>
              <!--<el-input id="zhuanti" v-model="newsDetail.reportId" placeholder="请输入内容" style="width: 250px;"></el-input>-->
            </el-form-item>
          </el-form>

          <el-form  :model="newsDetail" label-width="100px">
            <el-form-item label="发布时间">
              <el-input v-model="newsDetail.createDate" :disabled="true" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="newsDetail" label-width="100px">
            <el-form-item label="是否精品">
              <el-radio class="radio" v-model="newsDetail.isEssential" label="0">否</el-radio>
              <el-radio class="radio" v-model="newsDetail.isEssential" label="1">是</el-radio>
            </el-form-item>
          </el-form>
          <el-form :model="newsDetail" label-width="100px">
            <el-form-item label="是否置顶" >
              <el-radio class="radio" v-model="newsDetail.isTop" label="0">否</el-radio>
              <el-radio class="radio" v-model="newsDetail.isTop" label="1">是</el-radio>
            </el-form-item>
          </el-form>

          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="视频地址" prop="counts">
              <el-input id="videos" v-model="videoUrl" readonly="readonly" placeholder="" style="width: 250px;"></el-input>
              <el-button @click="dialogTableVisible=true">视频列表</el-button>
            </el-form-item>

          </el-form>
          <!--<el-form ref="newsDetail" :model="newsDetail" label-width="100px">-->
          <!--<el-form-item label="上传预览" prop="counts">-->
          <!--</el-form-item>-->
          <!--</el-form>-->
          <el-form ref="newsDetail" :model="newsDetail" label-width="100px">
            <el-form-item label="新闻详情">
              <el-col :span="8">
                <el-form :model="newsDetail">
                  <el-form-item prop="newsDetail">
                    <html-edit @htmlinput="htmlinput"   :contents="newsDetail.content"></html-edit>
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

      <!--弹框-->
      <el-dialog title="视频列表" style="text-align: center" :visible.sync="dialogTableVisible">
        <el-table
          :data="videolist"
          height="400"
          border
          style="width: 100%;">
          <el-table-column prop="title" label="名称"  align="center" >

          </el-table-column>
          <el-table-column  label="图片" align="center">
            <template scope="scope">
              <img width="80" height="80" v-show="scope.row.imageUrl!=''" :src="scope.row.imageUrl">
              <span v-show="scope.row.imageUrl==''">无</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="发布时间" align="center" >

          </el-table-column>
          <el-table-column  align="center" label="状态"  >
            <template scope="scope" >
              <span v-show="scope.row.delFlag==0">允许播放</span>
              <span v-show="scope.row.delFlag!=0">禁止播放</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"  align="center">
            <template scope="scope" >
               <div style="cursor: pointer;color: #0D9BF2;" @click="chooseUrl(scope.row.hdUrl,scope.row.imageUrl)">选择</div>
            </template>
          </el-table-column>
        </el-table>
        <!--<div class="btnWrapper">-->
          <!--<el-button type="warning" @click="dialogTableVisible=false;">取消</el-button>-->
        <!--</div>-->
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, picsUpload} from 'components'
  import {port_file} from 'common/port_uri'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  var code = ''
  export default{
    data(){
      return{
        load_data:false,
        labelName:'请选择专题',
        cityCode:"",
        videoUrl:'',
        spaciallist:[],
        newsDetail:{
          area:code,
          title:'',
          source:'',
//          name:'',//地区
          pics:'',
          counts:'',
          createDate:'',
          content:'',
          newsDesc:'',
          videoUrl:'',
          isTop:'0',
          isEssential:'0',
          newsType:1,
          classify:'2',
          reportId:''
        },
        newsUrl:'port_news.newsDetail',
        array_pics:[],
        dialogTableVisible: false,
        videolist:'',
        videourlImg:''
      }
    },
    created(){
        this.spacial()
      this.video()
      code = this.getCityCode;
      var oDate = new Date(); //实例一个时间对象；
      var year = oDate.getFullYear();   //获取系统的年；
      var month = oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
      var date = oDate.getDate(); // 获取系统日，
      var hours = oDate.getHours(); //获取系统时，
      var minutes = oDate.getMinutes(); //分
      var seconds = oDate.getSeconds(); //秒
      hours = hours<10?'0'+hours:hours;
      minutes = minutes<10?'0'+minutes:minutes;
      seconds = seconds<10?'0'+seconds:seconds;
      this.newsDetail.createDate = (year+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds);
    },
    methods:{
      spacial(){
        this.$fetch.api_news.special({
          newsType:3,
          area:this.getCityCode
        }).then(({msg,retcode,retObj})=>{
          this.spaciallist = retObj
        })
      },
      video(){
        this.$fetch.api_news.topnewsaddVideo({
          videoClassify:1
        }).then((data)=>{
          this.videolist = data.retObj
        })
      },
      reset(){ //重置
        this.$router.go(0)
//        this.labelName = '请选择专题'
//        this.newsDetail.title=''
//        this.videoUrl =''
//        this.array_pics=[]
//        this.newsDetail.title=''
//        this.newsDetail.source=''
//        this.newsDetail.pics=''
//        this.newsDetail.counts=''
//        this.newsDetail.content=''
//        this.newsDetail.newsDesc=''
//        this.newsDetail.videoUrl=''
//        this.newsDetail.isTop='0'
//        this.newsDetail.isEssential='0'
//        this.newsDetail.classify='0'//图片样式
//        this.newsDetail.videoUrl=''
      },
      htmlinput(content) {
        this.newsDetail.content = content
      },
      chooseUrl(url,img){
          this.videoUrl = url;
          this.videourlImg = img;
          this.dialogTableVisible = false;
      },
      submit(){
          if(code==''){
            this.$message({
              message: '请选择城市',
              type: 'warning'
            });
            return false;
          }
          if(this.labelName==="请选择专题"){
              this.labelName ="";
          }
          if(this.newsDetail.title==''){
            this.$message.error("标题不能为空");
            return false;
          }

          var classify_submit= '';//1为三张,0无图，2一张，3视频
            if(this.videoUrl==''){
              this.$message.error("请选择需要上传的视频");
              return false;
            }
            this.array_pics=[];
            this.array_pics.push(this.videourlImg)
            classify_submit=3
          if(this.newsDetail.content==''){
            this.$message.error("详情不能为空");
            return false;
          }
        this.$fetch.api_news.topnewsadd({
          area:code,
          title:this.newsDetail.title,
          source:this.newsDetail.source,
          name:'',//地区
          pics:this.array_pics,
          counts:this.newsDetail.counts,
          createDate:this.newsDetail.createDate,
          content:this.newsDetail.content,
          newsDesc:this.newsDetail.newsDesc,
          videoUrl:this.videoUrl,
          isTop:this.newsDetail.isTop,
          isEssential:this.newsDetail.isEssential,
          newsType:2,
          classify:classify_submit,
          reportId:this.labelName//this.labelName==="请选择专题"?'':this.labelName
        }).then(({msg,retcode,retObj})=>{
          if(retcode=="0"){
            this.$message.success(msg);
          }else{
            this.$message.error(msg);
          }

//            this.newsDetail = retObj;
//            this.pics=retObj.pics.split(',')
        })
      }
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    components: {
      ElButton,
      panelTitle,
      htmlEdit,
      picsUpload
    },
    watch:{
      'getCityCode'() {
        code = this.getCityCode;
        this.spacial()
      }
    }
  }
</script>
<style>
  form{
    width: 35%;
  }
  form:nth-child(10){
    width: 100%;
  }
</style>


