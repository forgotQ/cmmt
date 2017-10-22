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
        <el-table-column prop="real_name" label="真实姓名" align="center"></el-table-column>
        <el-table-column label="图片" align="center">
          <template scope="scope">
            <img width="80" height="80" :src="scope.row.pic.split(',')[0]">
          </template>
        </el-table-column>
        <el-table-column  label="性别" align="center">
          <template scope="scope">
            <span>{{scope.row.sex==1?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template scope="props">
            <el-button v-if="editBtn" type="info" size="small" icon="edit"  @click="delete_data(props.row.id, 1)">通过</el-button>
            <el-button  v-if="delBtn" type="danger" size="small"  icon="delete" @click="delete_data(props.row.id, 2)">不通过</el-button>
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
        fun: 'washington_celebrity',
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
        addBtn: false,
        editBtn: false,
        delBtn: false,
      }
    },
    methods: {
      get_news_data(){
        this.load_data = true
        this.$fetch.api_business.getCommentCheckList({
          moduleId: this.fun,
          userId:'',
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          title: this.sTitle
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
      delete_data(item,state){
        this.$confirm('此操作将修改该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {

            this.$fetch.api_business.channelVerify({
              id: item,
              userId:'',
              moduleId: this.fun,
              verify_status: state
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





