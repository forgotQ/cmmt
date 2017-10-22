<template>
  <div>
    <div class='panel'>
      <panel-title>
        <search :url="searchUrl" :data="searchParams" style="position: absolute; left: 10px"  @getSearch="getSearch"></search>
        <el-button @click.stop="on_refresh" size="small">
          <i class="fa fa-refresh"></i>
        </el-button>
        <router-link :to="{name: 'videoDemandEdit',params:{id:'add'}}" tag="span">
          <el-button type="primary" icon="plus" size="small">添加数据</el-button>
        </router-link>
      </panel-title>
      <div class="panel-body">
       <el-table
         ref="multipleTable"
         :data="tableData"
         border
         tooltip-effect="dark"
         style="width: 100%">
         <el-table-column type="selection" align="center" width="55"></el-table-column>
         <el-table-column prop="title" label="名称" align="center"></el-table-column>
         <el-table-column label="视频图片" align="center">
           <template scope="scope">
             <img width="100%" height="80" :src="scope.row.imageUrl">
           </template>
         </el-table-column>
         <el-table-column prop="createDate" label="发布时间" align="center" show-overflow-tooltip></el-table-column>
         <el-table-column label="状态" align="center" show-overflow-tooltip>
           <template scope="scope">
             <span>{{scope.row.isOn==false?"允许播放":"不允许播放"}}</span>
           </template>
         </el-table-column>
         <el-table-column label="操作" align="center">
           <template scope="props">
             <router-link :to="{name:'videoDemandEdit',params: {id: props.row.id}}">
               <el-button type="info" size="small" >编辑</el-button>
             </router-link>
           </template>
         </el-table-column>
       </el-table>
     </div>
   </div>
    <div class="block fr pageSize">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size=this.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import {panelTitle, search} from 'components'
  const  pageSize = 10
  export default {
    components: {
      search,
      panelTitle
    },
    data() {
      return {
        currentPage: 1,
        pageNo: 1,
        pageSize: pageSize,
        tableData: null,
        multipleSelection: [],
        searchUrl:'/apidev/video/list',
        searchParams:{
          title:'',
          pageSize: pageSize,
          pageNo: 1,
          videoClassify:'1',
          liveState:''
        },
        pageNum: 2
      }
    },
    activated (){
      this._getVideoList();
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this._getVideoList();
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this._getVideoList();
      },
      _getVideoList() {
        this.$fetch.api_video.getVideoList({
          title:this.searchParams.title,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          videoClassify:1
        }).then(({msg, retcode, retObj}) => {
          this.tableData = retObj;
        });
      },
      on_refresh() {
        this._getVideoList();
      },
      getSearch(dataObj){

        this.currentPage = 1;
        console.log(this.currentPage);
        return;
        this.tableData = dataObj;
        let that = this;
        this.$nextTick(() => {
          that.currentPage = 1;
        })
      },
    },
  }

</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .pageSize{
    margin-top: 15px
  }
  .pannel-wrap .scan{
    width: 100px;
    height: 20px;
    color: #15a9ed;
  }

</style>

