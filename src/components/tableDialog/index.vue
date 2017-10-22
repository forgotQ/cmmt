<template>
  <el-dialog :visible.sync="dialogTableVisible">
    <el-input
      placeholder="请输入名称"
      icon="search"
      v-model="pepTitle"
      @keyup.enter.native="goSearch"
    >
    </el-input>

    <el-table :data="peopleData">
      <el-table-column property="title" label="名称" align="center"></el-table-column>
      <el-table-column property="name" label="图片" align="center">
        <template scope="scope">
          <img width="80" height="80" :src="type=='people'?scope.row.pic:scope.row.imageUrl">
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" align="center">
        <template scope="props">
          <el-button type="info" size="small" icon="edit" @click="sure(props.row)">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fr" style="margin:10px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="6"
        layout="prev, pager, next, jumper"
        :total="5000">
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      type:{
        type:String,
        default:'people'
      },
      isShow:{
        type:Boolean,
        default:false
      },
      listData:{
        type:Array,
        default() {
          return []
        }
      },
      fun:{
        type:String,
        default:'washington'
      },
    },
    data() {
      return {
        dialogTableVisible: false,
        peopleData: [],
        pageSize:'6',
        pageNo:'1',
        pepTitle:'',
        currentPage: 1,
        showTable:false
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val
        this. getPeopleList()
      },
      goSearch() {
        if(this.type=="people"){
          this.$fetch.api_business.searchPeople({
            title:this.pepTitle,
            pageSize:this.pageSize,
            pageNo:this.pageNo
          }).then((data) => {
            this.peopleData = data.retObj
          })
            .catch(() => {
            })
        }else if(this.type=="video"){
          this. getPeopleList()
        }
      },
      getPeopleList() {
        if(this.type=="people"){
          this.$fetch.api_business.getPeopleList({
            fun:this.fun,
            pageSize:this.pageSize,
            pageNo:this.currentPage
          }).then((data) => {
            this.peopleData = data.retObj
          })
            .catch(() => {
            })
        }else if(this.type=="video"){
          this.$fetch.api_business.getVideoList({
            videoClassify: "1",
            pageSize:this.pageSize,
            pageNo:this.currentPage,
            title:this.pepTitle,
          }).then((data) => {
            console.log(data);
            this.peopleData = data.retObj
          })
            .catch(() => {
            })
        }
      },
      sure(item) {
        // this.dialogTableVisible = false
        this.$emit("getTableId", item);
      },
    },
    created() {
      var that = this;
      this.getPeopleList()
      /*setTimeout(()=>{
       that.peopleData = that.listData;
       console.log('yanchi',that.listData);
       },1000)*/
    },
    /*watch:{
     'peopleData'(v) {
     console.log('p',v)
     },
     'listData'(v) {
     this.peopleData = v;
     console.log('li',v)
     }
     }*/
  }
</script>
<style scoped>
.el-input{
    width: 200px;
    margin-bottom: 10px;
  }
</style>

