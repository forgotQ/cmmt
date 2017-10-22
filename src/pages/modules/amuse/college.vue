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
        <el-select v-model="classValue" placeholder="请选择"   @change="slcCelebrityList($event)">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>

      </div>

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
        <el-table-column prop="createDate" label="上传时间" align="center"></el-table-column>
        <el-table-column  label="是否置顶" align="center">
          <template scope="scope">
            <select v-model="scope.row.isTop" @change="setEssential($event, scope.row)">
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template scope="props">
            <router-link :to="{name: '明星课堂添加', params: {id: props.row.id}}" tag="span">
              <el-button v-if="editBtn" type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button v-if="delBtn" type="danger" size="small"  icon="delete" @click="delete_data(props.row.id)">删除</el-button>
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
        fun: 'entertainment',
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
        classValue:'',
        addBtn: false,
        editBtn: false,
        delBtn: false,
      }
    },
    methods: {
      get_news_data(){
        this.load_data = true
        this.$fetch.api_business.channelVideoList({
          fun: this.fun,
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          typeId:this.classValue,
          title:this.sTitle
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

            this.$fetch.api_business.channelVideoDel({
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
        this.get_news_data()
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
      setEssential(even,item) {
        this.$fetch.api_business.channelVideoIstop({
          isTop: even.currentTarget.value,
          id:item.id,
          typeId:item.typeId
        }).then(({msg, retcode, retObj})=> {
          if (retcode == 0) {
            this.$message.success(msg)
          }
          this.load_data = false
        })
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
      slcCelebrityList() {
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
    created(){
      this.get_news_data()
      this.getClass(2)
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



