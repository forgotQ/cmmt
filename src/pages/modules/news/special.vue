<template>
  <div class="panel-body" style="">
    <div class="panel">
      <panel-title>
        <el-button @click.stop="on_refresh" size="small">
          <i class="fa fa-refresh"></i>
        </el-button>
        <!--<router-link :to="{name: 'tableAdd'}" tag="span">-->
          <el-button type="primary" icon="plus" size="small" @click="add('add')">添加数据</el-button>
        <!--</router-link>-->
      </panel-title>
    </div>
    <el-table :data="spaciallist"
              align="center"
              border style="width: 100%"
              v-loading="load_data"
              element-loading-text="拼命加载中">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column  label="图片" align="center">
        <template scope="scope">
          <img width="80" height="80" :src="scope.row.pics">
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" align="center" ></el-table-column>

      <el-table-column label="状态" align="center">
        <template scope="scope">
          <select name="" :data-id="scope.row.id"  @change="top(scope.row.id,$event,scope.row.delFlag)">
            <option value="0" :selected="scope.row.delFlag==0">开启</option>
            <option value="1" :selected="scope.row.delFlag==1">禁用</option>
          </select>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180"  align="center">
        <template scope="props">
          <!--<router-link :to="{name:'新闻详情', params: {id: props.row.id}}" >-->
            <el-button type="info" size="small" icon="edit" @click="change(props.row.title,props.row.pics,props.row.id)">修改</el-button>
          <!--</router-link>-->
          <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
        </template>


      </el-table-column>
    </el-table>
    <el-dialog title="专题详情" style="text-align: center" :visible.sync="dialogTableVisible">
        <el-col>
         <el-row>
            <el-form label-width="100px">
              <el-form-item label="名称" :model="detail_title" >
                <el-input id="add_val"  v-model="is_add==true?'':detail_title" placeholder="请输入内容" style="width: 250px;"></el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="上传图片" >
                <!--<picsUpload></picsUpload>-->
                <picsUpload :defaultImgs="detail_pics" :postImgUrl="postImgUrl" :maxPostImgs="1"></picsUpload>
              </el-form-item>
            </el-form>
         </el-row>
        </el-col>
        <div class="btnWrapper">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button type="warning" @click="dialogTableVisible=false;detail_pics=[]">取消</el-button>
        </div>
    </el-dialog>
    <!--<el-dialog title="专题详情" style="text-align: center" :visible.sync="dialogTableVisible">-->
      <!--<el-table :data="gridData">-->
        <!--<el-form ref="newsDetail" :model="newsDetail" label-width="100px">-->
          <!--<el-form-item label="名称" prop="title" scope="scope">-->
            <!--<el-input v-model="newsDetail.title" placeholder="请输入内容" style="width: 250px;"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-table>-->
    <!--</el-dialog>-->
    <router-view></router-view>
    <div class="block" style="text-align: center;margin-top: 20px">
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="pageSize" layout="prev, pager, next, jumper" :total="500">
      </el-pagination>
    </div>
  </div>

</template>
<script type="text/javascript">
  import {panelTitle, htmlEdit, imgReader} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  import {port_file} from 'common/port_uri'
  import picsUpload from '../../../components/picsUpload/index'
  export default{
    props: {
//      getTab: {
//        type: Array,
//        default() {
//          return [
//          ]
//        }
//      }
    },
    data() {
      return{
        id:'',
        activeName:'',
        fun:'news',
        spaciallist:[],
        //请求时的loading效果
        load_data: true,
        cityCode:"",
        labelName:'',
        dialogTableVisible: false,
        detail_title:'',
        postImgUrl:port_file.image_upload,
        detail_pics:[],
        is_add:true,
        pageNo:1,
        pageSize:10
      }
    },
    activated(){
      this.datas();

    },
    methods:{
      on_refresh(){//刷新
        this.datas()
      },
      handleCurrentChange(val){
        this.pageNo = val
        this.datas()
      },
      add(){//添加
          this.dialogTableVisible=true
          var add_val = document.getElementById('add_val')
          add_val = add_val.getElementsByTagName("input")
          add_val.value = ''
          this.is_add=true;
      },
      submit(){
        if(this.is_add==true){
          var add_val = document.getElementById('add_val')
          add_val = add_val.getElementsByTagName("input")
          add_val = add_val[0]._value
          if(this.detail_pics==''){
              return
          }
          this.$fetch.api_news.specialadd({
            newsType:3,
            area:this.getCityCode,
            pics:this.detail_pics,
            title:add_val
          }).then((data)=>{
            console.log(JSON.stringify(data));
            this.$message.success(data.msg);
            if(data.msg=="操作成功"){
              this.datas();
              this.dialogTableVisible=false
            }
          })
          this.detail_pics=[]
        }else{
          this.$fetch.api_news.specialedit({
            id:this.id,
            newsType:3,
            area:this.getCityCode,
            pics:this.detail_pics,
            title:this.detail_title
          }).then((data)=>{
            console.log(JSON.stringify(data));
            this.$message.success(data.msg);
            if(data.msg=="操作成功"){
              this.datas();
              this.dialogTableVisible=false
            }
            this.detail_pics=[]
          })
        }

      },
      change(title,pics,id){
        this.is_add=false
        this.dialogTableVisible=true
        this.detail_title = title
        this.detail_pics.push(pics);
        this.id=id
      },
      datas() {
        this.$fetch.api_news.special({
//          fun:this.fun,
          newsType:3,
          pageNo:this.pageNo,
          pageSize:this.pageSize,
          area:this.getCityCode
        }).then((data)=>{
          this.spaciallist = data.retObj
          this.load_data = false

        })
      },
      delete_data(id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_news.specialdelete({
              id:id
            }).then((data)=>{
              console.log(JSON.stringify(data));
              this.$message.success(data.msg)
              this.datas()

            })
//            this.$fetch.api_news.topdelete(id)
//              .then(({msg}) => {
//                this.datas()
//                this.$message.success(msg)
//              })
//              .catch(() => {
//              })
          })
          .catch(() => {
          })
      },
      top(id,event,state){
        if(state==0){
          state=1
        }else{
          state=0
        }
        this.$fetch.api_news.changeNews({
          id:id,
          isTop:state
        }).then((data)=>{
          console.log(JSON.stringify(data));
          if(data.retcode==0){
            alert("操作成功")
          }else{
            alert(data.msg)
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
    watch:{
      'getCityCode'() {
        this.datas()
        console.log(this.getCityCode);
        this.cityCode = this.getCityCode;
      }
    },
    components:{
      panelTitle,
      htmlEdit,
      imgReader,
      picsUpload
    }
  }
</script>
<style>

  .upload-list{
    margin-left: 80px;
  }
  .el-dialog__headerbtn{
    display: none;
  }
</style>

