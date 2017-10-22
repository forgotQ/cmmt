<template>
  <div class="panel">
    <panel-title>
      <router-link :to="{name: '资讯详情', params: {id: 'add'}}" tag="span">
        <el-button v-if="addBtn" type="primary" icon="plus" size="small" >添加资讯</el-button>
      </router-link>

    </panel-title>
    <div class="panel-body">
      <el-table :data="top10Data"
                align="center"
                border
                style="width: 100%"
                v-loading="load_data"
                element-loading-text="拼命加载中"
                fit
                highlight-current-row >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="名称" align="center"></el-table-column>
        <el-table-column label="图片" align="center">
          <template scope="scope">
            <img width="80" height="80" :src="scope.row.pic.split(',')[0]">
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="所属分类" align="center"></el-table-column>
        <el-table-column prop="celebrityName" label="关联人物" align="center"></el-table-column>
        <el-table-column prop="createDate" label="发布时间" align="center"></el-table-column>
        <el-table-column  label="是否精品" align="center">
          <template scope="scope">
              <select v-model="scope.row.isEssential" @change="setEssential($event)">
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
          </template>
        </el-table-column>
        <el-table-column prop="celebrityName" label="是否置顶" align="center">
          <template scope="scope">
            <select v-model="scope.row.isTop">
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column prop="celebrityName" label="模块首页" align="center">
          <template scope="scope">
            <select v-model="scope.row.recommend">
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column prop="typeDesc"  label="App首页" align="center" >
          <template scope="scope">
            <select v-model="scope.row.isAdmin">
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template scope="props">
            <router-link :to="{name: '资讯详情', params: {id: props.row.id}}" tag="span">
              <el-button v-if="editBtn" type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button  v-if="delBtn" type="danger" size="small"  icon="delete" @click="delete_data(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fr ">
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
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar} from 'components'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        top10Data: [],
        classType: '3',
        fun: 'washington',
        load_data: true,
        olderList: [],
        newList: [],
        dialogTableVisible: false,
        peopleData: [],
        pageSize:'10',
        pageNo:'1',
        pepTitle:'',
        currentPage: 1,
        addBtn: false,
        editBtn: false,
        delBtn: false,
      }
    },
    methods: {
      get_news_data(){
        this.load_data = true
        this.$fetch.api_business.getNewsList({
          fun: this.fun,
          pageSize:this.pageSize,
          pageNo:this.currentPage
        }).then(({msg, retcode, retObj})=> {
          this.top10Data = retObj
          if (retcode == 0) {
            this.$message.success(msg)
          }
          this.load_data = false
        })
          .catch(() => {
            this.load_data = false
          })
      },
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {

            this.$fetch.api_business.delNews({
              id: item
            }).then((data) => {
              this.get_news_data()
              this.$message.success(msg)
            })
              .catch(() => {
              })

          })
          .catch(() => {
          })
      },
      goSearch() {
        this.$fetch.api_business.searchPeople({
          title:this.pepTitle,
          pageSize:this.pageSize,
          pageNo:this.pageNo
        }).then((data) => {
          this.peopleData = data.retObj
        })
          .catch(() => {
          })
      },
      sure(item) {
        this.$fetch.api_business.toptenSave({
          fun:this.fun,
          celebrityId:item.id,
          celebrityName:item.title,
          pic: item.pic,
          ranking:this.top10Data.length+1,
          isNewRecord: true
        }).then((data) => {
          this.get_news_data()
        })
          .catch(() => {
          })
      },
      setEssential(even) {
        console.log(even.currentTarget.value);
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.get_news_data()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_news_data()
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
      }
    },
    activated() {
      this.get_news_data()
      this.getBtn()
    },
    created() {
      this.get_news_data()
      this.getBtn()
    },
    components: {
      panelTitle
    },
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .panel-body{
    margin-bottom: 10px;
  }
  .el-pagination .el-pagination__total{
    display: none;
  }
  .pageContent{
    margin-bottom: 30px;
  }
</style>

