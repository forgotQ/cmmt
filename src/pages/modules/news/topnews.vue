<template>
  <div class="panel-body" style="">
    <div class="panel">
      <el-input id="values"
        placeholder="请输入搜索内容" style="width: 20%;float: left;margin-top: -3px"
        icon="search"
        v-model="title"
        :on-icon-click="datas">
      </el-input>
      <panel-title>
        <el-button @click.stop="on_refresh" size="small">
          <i class="fa fa-refresh"></i>
        </el-button>
        <router-link :to="{name:'头条新闻添加'}" tag="span">
          <el-button type="primary" icon="plus" size="small">添加数据</el-button>
        </router-link>
      </panel-title>
    </div>
    <el-table :data="toplist"
              align="center"
              border style="width: 100%"
              v-loading="load_data"
              element-loading-text="拼命加载中">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column  label="图片" align="center">
        <template scope="scope">
          <img width="80" height="80" :src="scope.row.pics.split(',')[0]">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" align="center" ></el-table-column>

      <el-table-column prop="createDate" label="发布时间" align="center"></el-table-column>

      <el-table-column prop="havearea" label="所属地区" align="center"></el-table-column>

      <el-table-column prop="source" label="发布单位" align="center"></el-table-column>
      <el-table-column label="是否置顶" align="center">
        <template scope="scope">
          <select name="" :data-id="scope.row.id"  @change="top(scope.row.id,$event,scope.row.isTop)">
            <option value="0" :selected="scope.row.isTop==0">否</option>
            <option value="1" :selected="scope.row.isTop==1">是</option>
          </select>
        </template>
      </el-table-column>
      <el-table-column label="是否精品" align="center">
        <template scope="scope">
          <select  :data-id="scope.row.id"  @change="jingpin(scope.row.id,$event,scope.row.isEssential)">
            <option value="0" :selected="scope.row.isEssential==0">否</option>
            <option value="1" :selected="scope.row.isEssential==1">是</option>
          </select>
        </template>
      </el-table-column>
      <el-table-column label="是否首页" align="center">
        <template scope="scope">
          <select  :data-id="scope.row.id" id="" @change="isIndex(scope.row.id,$event,scope.row.isAdmin,scope.row.title,scope.row.pics,scope.row.videoUrl)">
            <option value="0" :selected="scope.row.isAdmin==0">否</option>
            <option value="1" :selected="scope.row.isAdmin==1">是</option>
          </select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180"  align="center">
        <template scope="props">
          <router-link :to="{name:'新闻详情', params: {id: props.row.id}}" >
            <el-button type="info" size="small" icon="edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view></router-view>
    <div class="block" style="text-align: center;margin-top: 20px">
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="pageSize" layout="prev, pager, next, jumper" :total="500">
      </el-pagination>
    </div>
  </div>

</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'

  export default{
    props: {
    },
    data() {
      return{
        activeName:'',
        fun:'news',
        toplist:[],
        //请求时的loading效果
        load_data: true,
        cityCode:"",
        total:0,
        pageNo:1,
        pageSize:10,
        pageNoSearch:1,
        title:'',
        currentPage3:1
      }
    },
    activated(){
      this.datas();
    },
    methods:{
      handleCurrentChange(val){
        this.pageNo = val
        this.datas()
      },
//      handleIconClick() {//搜索
//        var vals = document.getElementById('values')
//        vals = vals.getElementsByTagName("input");
//        vals = vals[0]._value
//        this.$fetch.api_news.getTopList({
//          newsType:1,
//          pageNo:this.pageNo,
//          pageSize:this.pageNoSearch,
//          area:this.getCityCode,
//          title:vals
//        }).then((data)=>{
//          this.toplist = data.retObj
//          this.load_data = false
//
//        })
//      },
      on_refresh(){//刷新
        this.datas()
      },
      datas() {
        this.$fetch.api_news.getTopList({
          fun:this.fun,
          newsType:1,
          pageNo:this.pageNo,
          pageSize:this.pageSize,
          area:this.getCityCode,
          title:this.title
        }).then((data)=>{
          this.toplist = data.retObj
          this.load_data = false
          this.total = this.toplist.length+1
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
            this.$fetch.api_news.topdelete({
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
        }).then(({msg,retcode,retObj})=>{
          if(retcode==0){
            this.$message.success(msg);
          }else{
            this.$message.error(msg);
          }
        })
      },
      jingpin(id,event,state){
        if(state==0){
          state=1
        }else{
          state=0
        }
        this.$fetch.api_news.changeNews({
          id:id,
          isEssential:state
        }).then(({msg,retcode,retObj})=>{
          if(retcode==0){
            this.$message.success(msg);
          }else{
            this.$message.error(msg);
          }
        })
      },
      isIndex(id,event,state,title,imageUrl,videoUrl){
        if(state === "0" || state===0){
          this.$prompt('请输入此条信息的简介', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: ''
//            inputErrorMessage: '请输入此条信息的简介'
          }).then(({ value }) => {
            this.$fetch.api_news.changeNewsIndex({
              objId:id,
              area:this.getCityCode,
              objType:this.fun,
              number:3,
              title:title,
              imageUrl:imageUrl,
              indexDesc:value,
              videoUrl:videoUrl?videoUrl:''
            }).then(({msg,retcode,retObj})=>{
              if(retcode==0){
                this.$message.success(msg);
              }else{
                this.$message.error(msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }else{
          this.$fetch.api_news.changeNewsIndexDel({
            objId:id
          }).then(({msg,retcode,retObj})=>{
            if(retcode==0){
              this.$message.success(msg);
            }else{
              this.$message.error(msg);
            }
          })
        }
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
        console.log(this.getCityCode);
        this.cityCode = this.getCityCode;
        this.datas()
      }
    },
    components:{
      panelTitle,
      bottomToolBar
    }
  }
</script>

