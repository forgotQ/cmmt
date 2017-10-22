<template>
  <div class="panel">
    <panel-title>
      <div class="search">
        <span style="margin-left:20px;margin-right:10px">搜索:</span>
        <el-input
          placeholder="请输入名称"
          icon="search"
          v-model="sTitle"
          @keyup.enter.native="goSearch"
        >
        </el-input>
        <span style="margin-left:20px;margin-right:10px">分类:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
            @change="slcCelebrityList($event)"
          >
          </el-option>
        </el-select>
        <span style="margin-left:20px;margin-right:10px">星级:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option>
          <el-option label="10" value="10"></el-option>
        </el-select>
      </div>
      <router-link :to="{name: '名流详情', params: {id: 'add'}}" tag="span">
        <el-button v-if="addBtn" type="primary" icon="plus" size="small" >添加名流</el-button>
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
        <el-table-column prop="createDate" label="发布时间" align="center"></el-table-column>
        <el-table-column  label="是否加V" align="center">
          <template scope="scope">
            <select v-model="scope.row.isCert" @change="setEssential($event)">
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column prop="celebrityName" label="星级" align="center">
          <template scope="scope">
            <select v-model="scope.row.star">
              <option value="0">请选择</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
          <template scope="scope">
            <el-input  size="small" v-model="scope.row.sort"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template scope="props">
            <router-link :to="{name: '名流编辑详情', params: {id: props.row.id}}" tag="span">
              <el-button v-if="editBtn" type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button  v-if="delBtn" type="danger" size="small"  icon="delete" @click="delete_data(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fr">
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
        sTitle:'',
        classList:[],
        value:'',
        addBtn: false,
        editBtn: false,
        delBtn: false,
      }
    },
    methods: {
      get_news_data(){
        this.load_data = true
        this.$fetch.api_business.getCelebrityDetil({
          fun: this.fun,
          pageSize:this.pageSize,
          pageNo:this.pageNo
        }).then(({msg, retcode, retObj})=> {
          this.top10Data = retObj
          console.log(retObj);
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

            this.$fetch.api_business.celebrityDel({
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
        this.$fetch.api_business.searchCelebrity({
          fun: this.fun,
          title:this.sTitle,
          pageSize:this.pageSize,
          pageNo:this.pageNo
        }).then((data) => {
          this.top10Data = data.retObj
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
        this.pageNo = val
        this.get_news_data()
      },
      getClass(classify) {
        this.$fetch.api_business.getClassList({
          fun: this.fun,
          classify: classify
        }).then(({msg, retcode, retObj})=> {
          this.classList = retObj
        })
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
    created(){
      this.get_news_data()
      this.getClass(3)
      this.getBtn()
    },
    components: {
      panelTitle
    },
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  /*.panel-body{
    margin-bottom: 10px;
  }*/
  .el-pagination .el-pagination__total{
    display: none;
  }
  .el-input{
    width: 80px;
  }
  .search{
    position: absolute;
    left: 0;
    top: 123px;
    .el-input{
      width: 140px;
    }
  }
</style>



