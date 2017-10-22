<template>
  <div class="panel">
    <panel-title>
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: '攻略详情', params: {id: 'add'}}" tag="span">
        <el-button v-if="addBtn" type="primary" icon="plus" size="small" >添加</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table :data="bannerData"
                align="center"
                border style="width: 100%"
                v-loading="load_data"
                element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="名称" align="center"></el-table-column>
        <el-table-column  label="图片" align="center" width="200">
          <template scope="scope">
            <img width="80" height="80" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="发布时间" width="200" align="center"></el-table-column>
        <el-table-column label="是否推荐至首页" align="center">
          <template scope="scope">
            <span>{{scope.row.delFlag=="0"?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template scope="props">
            <router-link :to="{name: '攻略编辑', params: {id: props.row.id}}" tag="span">
              <el-button v-if="editBtn" type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button  v-if="delBtn" type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fr pageWrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="500">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar, picsUpload} from 'components'
  import {Message} from 'element-ui'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  import axios from 'axios'
  var qs = require('qs');

  export default {
    data() {
      return {
        fun: 'entertainment',
        activeName: 'first',
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 15,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: [],
        bannerData: [],
        isShow: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        dialogFormVisible: false,
        editMode: false,
        addMode: true,
        defaultImgs:[],
        editId: '',
        pageSize:'8',
      };
    },
    props: {
      getTab: {
        type: Array,
        default() {
          return [
            'first', 'first1'
          ]
        }
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      picsUpload
    },
    activated(){
      this.get_List_data()
    },
    created() {
      this.get_List_data();
      this.getBtn()
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_List_data()
      },
      //获取数据
      get_List_data(){
        this.load_data = true
        this.$fetch.api_raiders.thoughtsList({
          area:this.getCityCode,
          pageSize:this.pageSize,
          pageNo:this.currentPage
        }).then((data)=> {
          this.bannerData = []
          this.bannerData = data.retObj
          this.load_data = false
        })
          .catch(() => {
            this.load_data = false
          })
      },
      //单个删除
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$fetch.api_raiders.thoughtsListDel({
              id: item
            }).then((data) => {
              this.$message.success(data.msg)
              this.get_List_data()
            })
          })
          .catch(() => {
          })
      },
      //页码选择
      handleSizeChange(val) {
        this.pageSize = val
        this.get_List_data()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_List_data()
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_table.batch_del(this.batch_select)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      },
      handleClick(tab, event) {
        this.pTab = tab.name;
        this.tabArr = new Array();
        this.tabArr = [this.pTab];
        this.$emit('postTab', this.tabArr);
      },
      handleClick1(tab, event) {
        this.tabArr = [this.pTab, tab.name];
        console.log(tab.index);
        this.$emit('postTab', this.tabArr);
        if (tab.index === '0') {
          this.$fetch.api_business.getBannerList({
            fun: this.fun
          }).then((data)=> {
            this.bannerData = data.retObj
            this.load_data = false
          })
        }
      },
      getBtn() {
        this.$fetch.api_business.getBtn({
          pid: this.$route.params.id,
          menuSign:'2'
        }).then((data)=> {
          var btnData = data.retObj
          for(var i=0;i<btnData.length;i++){
            if(btnData[i].buttonSign==0){
              this.addBtn = true
            }else if(btnData[i].buttonSign==1){
              this.editBtn = true
            }else if(btnData[i].buttonSign==2){
              this.delBtn = true
            }
          }
        })
      },
      sure() {

        this.$fetch.api_raiders.addBanner({
          area: this.getCityCode,
          pic: this.defaultImgs.join(',')
        }).then(({msg, retcode, retObj})=> {

            if (retcode == 0) {
              this.$message.success(msg)
            }
            this.dialogFormVisible = false
            this.get_List_data()
          })
          .catch(() => {
            this.dialogFormVisible = false
          })
      },
      submit() {
        this.$fetch.api_raiders.editBanner({
          id: this.editId,
          area: this.getCityCode,
          pic: this.defaultImgs.join(',')
        }).then(({msg, retcode, retObj})=> {
          if (retcode == 0) {
            this.$message.success(msg)
          }
          this.dialogFormVisible = false
          this.get_List_data()
        })
          .catch(() => {
            this.dialogFormVisible = false
          })
      },
      addClass() {
        this.dialogFormVisible = true
      },
      editClass(data) {
        this.dialogFormVisible = true
        this.editId = data.id
        this.defaultImgs = data.pic.split(',')
        this.editMode = true
        this.addMode = false
      },
    },
    watch:{
      'getCityCode'() {
        this.get_List_data()
      }
    }
  };
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .pageWrapper{
    margin-top: 10px;

  }
  .pageWrapper .el-pagination__total{
    display: none;
  }
</style>

