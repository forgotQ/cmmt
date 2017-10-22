<template>
  <div class="bannerManger">
    <div class="left-wrap">
      <div class="topCity">
        <ul class="cityItem">
          <li  v-for="item in cityPro" :class="{selected:activeName === item}" @click="selectedItem(item)">{{item}}</li>
        </ul>
      </div>
      <el-tree class="elTree" :data="areaData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="content-wrap panel">
      <panel-title>
        <search :url="searchUrl" :data="searchParams" style="position: absolute; left: 210px"  @getSearch="getSearch"></search>
        <router-link :to="{name: 'homebanneradd',params: {id: 'add'}}" tag="span">
          <el-button type="primary" icon="plus" size="small">添加Banner</el-button>
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
          <el-table-column prop="title" label="广告名称" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template scope="scope">
              <img width="100%" height="80" :src="scope.row.pic">
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="上传时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="title" label="描述" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="props">
              <router-link :to="{name:'homebanneradd',params: {id: props.row.id}}">
                <el-button type="info" size="small" >修改</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {cookieStorage} from 'common/storage'

  import {panelTitle, search} from 'components'
  import {port_dataurl} from 'common/port_uri'
  import {mapMutations} from 'vuex'
  import {SET_Single_CODE} from  'store/mutations/type'
  let code = '';
  export default {
      data() {
        return {
          searchParams: {},
          cityPro:['国内','海外'],
          activeName: '国内',
          areaData: null,
          defaultProps: {
            children: 'areaList',
            label: this.$lan()
          },
          tableData:null,
          currentPage: 1,
          pageNo: 1,
          pageSize: 10,
          searchUrl:'/apidev/sys/banner/list',
          searchParams: {
            fun: 'index',
            area: ''
          },
        };
      },
      components: {
        search,
        panelTitle
      },
      computed: {

      },
      created() {
          this.getAreaList();
      },
      methods: {
        ...mapMutations({
          setCode: SET_Single_CODE,
        }),
        getAreaList() {
          this.$fetch.api_fatchData.fetchDataList(port_dataurl.sys_area_url,{
              pcode : '0',
          }).then(({msg, retcode, retObj}) => {
              this.areaData = retObj;
              this.sss = this.areaData[0];
          });
        },
        _getDataList() {
          this.$fetch.api_fatchData.fetchData(port_dataurl.banner_area_url,{
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            fun: 'index',
            area:code,
          }).then(({msg, retcode, retObj}) => {
            if(retObj.length){
              this.tableData = retObj;
              document.body.scrollTop = 0;
            }else {
              this.tableData = null;
              document.body.scrollTop = 0;
            }
          });
        },
        selectedItem(item) {
         this.activeName = item;
        },
        handleNodeClick(data) {
            if (!data.areaList){
              code = data.code;
              this.searchParams.area = code;
              this._getDataList(data.code);
              console.log(data.code);
              this.setCode(data.code);
            }
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this._getDataList();
        },
        handleCurrentChange(val) {
          this.pageNo = val;
          this._getDataList();
        },
        getSearch(retObj) {
          this.tableData = retObj;
        }
      },
      activated() {
        this.defaultProps.label = this.$lan();
        this._getDataList();
      },
    }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

  .bannerManger{
    display: flex;
    background: white;
    position: relative;
    .left-wrap{
      flex: 0 0 202px;
      overflow: hidden;

      .elTree{
        width:  200px;
      }
      .cityItem{
        overflow: hidden;
        li{
          float: left;
          width: 101px;
          height: 38px;
          background: lightgray;
          line-height: 38px;
          text-align: center;
          font-size: 14px;
          font-weight: 200;
          &.selected{
            background: gold;
            color: white;
          }

        }
      }
    }
    .content-wrap{
      flex: 1;
      height: 100%;
    }
  }

</style>
