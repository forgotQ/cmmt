<template>
  <div class="father">
    <el-menu router  class="el-menu-demo" mode="horizontal">
      <div  v-for="(item,index) in funData">
        <el-submenu :index="`${item.url}${index}`"  v-if="item.funs">
          <template v-if="item.funs" slot="title">{{item[$t('lan')]}}</template>
          <el-menu-item  :index="`${subItem.url}/${subItem.id}`" v-for="subItem in item.funs">{{subItem[$t('lan')]}}</el-menu-item>
          <!-- <el-menu-item index="/business/classList">分类管理</el-menu-item>
           <el-menu-item index="/business/top10">Top10排名</el-menu-item>
           <el-menu-item index="/business/news">资讯管理</el-menu-item>-->
        </el-submenu>
        <el-menu-item  v-if="!item.funs" :index="`${item.url}/${item.id}`">{{item[$t('lan')]}}</el-menu-item>
      </div>

     <!-- <el-submenu index="2">
        <template slot="title">名流</template>
        <el-menu-item index="/business/celebrity">名流列表</el-menu-item>
        <el-menu-item index="/business/celebrityCheck">名流审核列表</el-menu-item>
      </el-submenu>-->

      <!--<el-submenu index="4">
        <template slot="title">饭局</template>
        <el-menu-item index="/business/dinnerLsit">饭局列表</el-menu-item>
        <el-menu-item index="/business/celebrityCheck">饭局审核列表</el-menu-item>
      </el-submenu>-->
    </el-menu>

    <!--<keep-alive>

    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <router-view ></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar} from 'components'
  export default {
    data() {
      return {
        id:'',
        fun: 'washington',
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
        funData: null,
      }
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
      bottomToolBar
    },
    activated(){
      this.get_table_data();
      this.activeName = this.getTab[0]?this.getTab[0]:"first";
      this.activeName1 = this.getTab[1]?this.getTab[1]:"first1";

      this.$fetch.api_business.getBannerList({
        fun: this.fun
      }).then((data)=> {
        this.bannerData = data.retObj
        this.load_data = false
      })
      if(sessionStorage.getItem('menuId')){
        this.$fetch.api_business.topFunList({
          pid: sessionStorage.getItem('menuId'),
          menuSign:'1'
        }).then((data)=> {
          this.funData = data.retObj
        })
      }

    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取数据
      get_table_data(){
        this.load_data = true
        this.$fetch.api_table.list({
          page: this.currentPage,
          length: this.length
        })
          .then(({data: {result, page, total}}) => {
            this.table_data = result
            this.currentPage = page
            this.total = total
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
            this.load_data = true
            this.$fetch.api_table.del(item)
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
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
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
        this.$emit('postTab', this.tabArr);
        if(tab.index==='0'){
          this.$fetch.api_business.getBannerList({
            fun: this.fun
          }).then((data)=> {
            this.bannerData = data.retObj
            this.load_data = false
          })
        }
      },
      trans() {
        if(this.$i18n.locale=='zh-CN'){
          this.$i18n.locale = 'en-US'
        }else {
          this.$i18n.locale = 'zh-CN'
        }
      }
    },
    created() {

    }
  };
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .el-tabs__item{
    width: 90px;
    text-align: center;
  }
  .father{
    min-height: 300px;
  }
</style>

