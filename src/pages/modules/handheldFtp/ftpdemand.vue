<template>
  <div>
    <div class='panel'>
      <panel-title>
        <search :url="searchUrl" :data="searchParams" @getSearch="getSearch" style="position: absolute; left: 10px"></search>
        <div class="stateSift" style="position: absolute; left: 250px">
          <span class="smr">视频分类：</span>
          <el-select v-model="params.pid" placeholder="请筛选" @change="_getDataList">
            <el-option v-for="item in videoClassify"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id">
            </el-option>
          </el-select>
          <span class="smr">所属专题：</span>
          <el-select v-model="params.pid" placeholder="请筛选" @change="_getDataList">
            <el-option v-for="item in subjectMatter"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id">
            </el-option>
          </el-select>
          <span class="smr">视频状态：</span>
          <el-select v-model="videoState" placeholder="请筛选" @change="_getDataList">
            <el-option v-for="item in videoStates"
                       :key="item.value"
                       :label="item.label"
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
          <el-table-column label="图片" align="center">
            <template scope="scope">
              <img width="100%" height="80" :src="scope.row.imageUrl">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="视频名称" align="center"></el-table-column>
          <el-table-column prop="title" label="上传时间" align="center"></el-table-column>
          <el-table-column prop="title" label="所属分类" align="center"></el-table-column>
          <el-table-column prop="title" label="所属专题" align="center"></el-table-column>
          <el-table-column label="视频状态" align="center">
            <template scope="scope">
              <select v-model="scope.row.delFlag" @change="openStateChange($event, scope.row)">
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {panelTitle, search} from 'components'
  import {port_dataurl} from 'common/port_uri'

  let postUrl = port_dataurl.ftplist_vod_url;

  export default {
    data() {
      return{
        videoClassify:null,
        subjectMatter:null,
        videoStates:[{
          value: 0,
          label: '启用'
        }, {
          value: 3,
          label: '禁用'
        }],
        videoState: 0,
        currentPage: 1,
        pageNo: 1,
        pageSize: 10,
        tableData: null,
        vodClassifyTypes:[],
        vodTypeState:'',
        searchUrl:'/apidev/video/list',
        searchParams:{
          pageSize: 5,
          pageNo: 1,
          videoClassify:'2',
          liveState:''
        },
        params:{
          pageNo: 1,
          pageSize: 10,
          pid: ''
        }
      }
    },
    activated() {
      this._getClassifyType();
    },
    components: {
      search,
      panelTitle
    },
    created() {
      this._getsiftType();
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this._getDataList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNo = val;
        this._getDataList();
      },
      _getClassifyType() {
        this.$fetch.api_fatchData.fetchDataList(port_dataurl.ftplist_type_url,{
          pid: 0
        }).then(({msg, retcode, retObj}) => {
          this.vodClassifyTypes = retObj;
        });
      },
      _getDataList() {
        this.$fetch.api_fatchData.fetchDataList(postUrl,this.params).then(({msg, retcode, retObj}) => {
          if (retcode === 0){
            this.tableData  = retObj;
          }
        });
      },
      on_refresh() {
        this._getVideoList();
      },
      getSearch(dataObj){
        this.currentPage = 1;
        this.tableData = dataObj;
      },
      openStateChange(event,item) {//是否开启认证
        this.$fetch.api_fatchData.fetchData(port_dataurl.liveStream_updateAuth_url,{
          id: item.id,
          bucketName: item.bucketName,
          upAuthEnabled: event.target.value
        }).then(({msg, retcode, retObj}) => {
          console.log(msg, retcode, retObj);
        });
      },
      _getsiftType() {
        this.$fetch.api_fatchData.fetchData(port_dataurl.ftpVodType_list_url,{//视频分类

        }).then(({msg, retcode, retObj}) => {

        });
        this.$fetch.api_fatchData.fetchData(port_dataurl.ftpVodTopic_Matter_url,{//所属专题

        }).then(({msg, retcode, retObj}) => {
          console.log('xxxxx');
          console.log(retObj);
          this.subjectMatter = retObj;
        });
      },

    }

  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .smr{
    margin-left: 20px;
  }

</style>
