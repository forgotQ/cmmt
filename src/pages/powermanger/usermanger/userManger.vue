<template>
  <div class="bannerManger">
    <div class="left-wrap">
      <div class="topCity">
        <ul class="cityItem">
          组织架构
        </ul>
      </div>
      <el-tree class="elTree" :data="userData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="content-wrap panel">
      <panel-title>
        <search :url="searchUrl" :data="searchParams" style="position: absolute; left: 210px"  @getSearch="getSearch"></search>
        <router-link :to="{name: '用户详情',params: {id: 'add'}}" tag="span">
          <!--<el-button type="primary" icon="plus" size="small" v-show="userOperateStates.add">{{$t('common_add')}}</el-button>-->
          <el-button type="primary" icon="plus" size="small">{{$t('common_add')}}</el-button>

        </router-link>
      </panel-title>
      <div class="panel-body">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          fit
          highlight-current-row>
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="account" label="用户名" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="createDate" label="角色" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="position" label="职务" align="center"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="props">
              <router-link :to="{name:'homebanneradd',params: {id: props.row.id}}">
                <el-button type="info" size="small"  icon="edit">{{$t('common_edit')}}</el-button>
              </router-link>
              <el-button type="danger" size="small"  icon="delete" @click="_deleteBannerList(props.row.id,1)">{{$t('common_del')}}</el-button>
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
  let code = '110100';
  export default {
      data() {
        return {
          searchParams: {},
          userData: null,
          defaultProps: {
            children: 'selfs',
            label: 'title'
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
          userOperateStates:{//String buttonSign;//按钮标识:0添加,1编辑,2删除,3启用禁用
            add: false,
            edit: false,
            delete: false,
            open: false
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
          this.getUserList();
      },
      methods: {
        ...mapMutations({
          setCode: SET_Single_CODE,
        }),
        _getOperateAuthority(pid) {
          console.log('pid',pid);
          this.$fetch.api_fatchData.fetchUserAuthority({//跳转banner位
            pid: pid
          }).then(({msg, retcode, retObj}) => {
            if (retcode === 0){
              for (var btn of retObj){
                switch (parseInt(btn.buttonSign)){
                  case 0:
                    this.userOperateStates.add = true;
                    break
                  case 1:
                    this.userOperateStates.edit = true;
                    break
                  case 2:
                    this.userOperateStates.delete = true;
                    break
                  case 3:
                    this.userOperateStates.open = true;
                    break
                }
              }
            }
          });
        },
        getUserList() {
          this.$fetch.api_power.officeList({
            pid: 0
          }).then((data)=> {

            this.userData = data.retObj;

          })
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
        getUserData(id){
          this.$fetch.api_power.userList({
            officeId: id
          }).then((data)=> {
            this.tableData = data.retObj
          })
        },
        handleNodeClick(data) {
          if (!data.selfs){
              this.getUserData(data.id)
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
        },
      },
      activated() {
//        this.defaultProps.label = this.$lan();
//        this.defaultProps.label = this.$t('name');
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
        /*background: red;*/
      }
      .cityItem{
        overflow: hidden;
        height: 45px;
        line-height: 45px;
        text-align: center;
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
