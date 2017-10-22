<template>
  <div>
    <div class='panel'>
      <panel-title>
        <search :url="searchUrl" :data="searchParams" @getSearch="getSearch" style="position: absolute; left: 10px"></search>
        <div class="stateSift" style="position: absolute; left: 300px">
          <span>直播状态：</span>
          <el-select v-model="videoState" placeholder="请筛选" @change="_getVideoList">
            <el-option v-for="item in videoStateOptions"
             :key="item.value"
             :label="item.title"
             :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button @click.stop="on_refresh" size="small">
          <i class="fa fa-refresh"></i>
        </el-button>
        <router-link :to="{path: '/video/liveAddMange/add'}" tag="span">
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
        <el-table-column label="直播图片" align="center">
          <template scope="scope">
            <img width="100%" height="80" :src="scope.row.imageUrl">
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="发布时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName" label="直播用户" align="center"></el-table-column>
        <el-table-column prop="isOn" label="状态" align="center">
          <template scope="scope">
            <span>{{_liveStateTitle(scope.row.liveState)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="props">
            <router-link :to="{name: 'liveAddMange', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" >查看</el-button>
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

  export default {
    components: {
      search,
      panelTitle
    },
    data() {
      return {
        currentPage: 1,
        pageNo: 1,
        pageSize: 10,
        tableData: null,
        videoStateOptions:[{
          value: '',
          title: '全部直播'
        },{
          value: '0',
          title: '正在直播'
        },{
          value: '1',
          title: '直播结束'
        },{
          value: '2',
          title: '直播未开始'
        },{
          value: '3',
          title: '禁止直播'
        }],
        liveStates:['正在直播','直播结束','直播未开始'],
        videoState:'',
        searchUrl:'/apidev/video/list',
        searchParams:{
          pageSize: 5,
          pageNo: 1,
          videoClassify:'2',
          liveState:''
        }
      }
    },
    created (){
      this._getVideoList();
    },
    computed: {

    },
    methods: {
      _liveStateTitle(state) {
        for ( var val of this.videoStateOptions) {
          if (val.value == state){
            return val.title;
          }
        }
        return '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this._getVideoList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNo = val;
        this._getVideoList();
      },
      _getVideoList() {
        this.$fetch.api_video.getVideoList({
          title:'',
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          videoClassify:2,
          liveState:this.videoState
        }).then(({msg, retcode, retObj}) => {
          this.tableData = retObj;
        });
      },
      on_refresh() {
        this._getVideoList();
      },
      getSearch(dataObj){
        this.currentPage = 1;
        this.tableData = dataObj;
      }
    },
    watch: {
      'videoState'(v) {
        this.searchParams.liveState = this.videoState;
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

 .livestream{
   margin-top: 40px;
 }

</style>
