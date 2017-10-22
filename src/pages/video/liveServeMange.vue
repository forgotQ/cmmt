<template>
  <div>
    <div class='panel'>
      <panel-title>
        <search :url="searchUrl" :data="searchParams" @getSearch="getSearch" style="position: absolute; left: 10px"></search>
        <div class="stateSift" style="position: absolute; left: 300px">
          <span>直播状态：</span>
          <el-select v-model="videoState" placeholder="请筛选" @change="_getVideoList" >
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
        <router-link :to="{path: '/video/livePushDragServeDetail'}" tag="span">
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
          <el-table-column prop="bucketName" label="名称" align="center"></el-table-column>
          <el-table-column prop="bucketType" label="推拉流方式" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="是否开启认证" align="center">
            <template scope="scope">
              <select v-model="scope.row.upAuthEnabled" @change="certifyAuthChange($event, scope.row)">
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="props">
              <el-button type="info" size="small"  @click="deleteliveStream( props.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {port_dataurl} from 'common/port_uri'
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
          title: '全部'
        },{
          value: '0',
          title: '推流'
        },{
          value: '1',
          title: '拉流'
        }],
        certifyOptions:[{
          value: '0',
          title: '是',
        },{
          value: '1',
          title: '否',
        }],
        liveStates:['推流','拉流'],
        certifyStates:['是','否'],
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
        this.$fetch.api_fatchData.fetchData(port_dataurl.liveStream_menulist_url,this.params)
        .then(({msg, retcode, retObj}) => {
          this.tableData = retObj;
        });
      },
      on_refresh() {
        this._getVideoList();
      },
      getSearch(dataObj){
        this.currentPage = 1;
        this.tableData = dataObj;
      },
      deleteliveStream(item) {
        this.$fetch.api_fatchData.fetchData(port_dataurl.liveStream_delete_url,{
            deFlag: 1,
            id: item.id
        })
        .then(({msg, retcode, retObj}) => {
            console.log(msg, retcode, retObj);
        });
      },
      certifyAuthChange(event,item) {//是否开启认证
        this.$fetch.api_fatchData.fetchData(port_dataurl.liveStream_updateAuth_url,{
          id: item.id,
          bucketName: item.bucketName,
          upAuthEnabled: event.target.value
        })
        .then(({msg, retcode, retObj}) => {
          console.log(msg, retcode, retObj);
        });
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
