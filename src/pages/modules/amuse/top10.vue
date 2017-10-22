<template>
  <div class="panel">
    <panel-title>
      <el-button v-if="addBtn" type="primary" icon="plus" size="small" @click="addPeople">添加人物</el-button>
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
        <el-table-column prop="ranking" label="编号" align="center"></el-table-column>
        <el-table-column prop="celebrityName" label="人物" align="center"></el-table-column>
        <el-table-column prop="typeDesc"  label="人物图片" align="center" >
          <template scope="scope">
            <img width="100" height="60" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template scope="props">
            <el-button v-if="delBtn" type="danger" size="small"  icon="delete" @click="delete_data(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table-dialog @getTableId="getTableId" ref="tableDialog" :type="type" :fun="fun"></table-dialog>

  </div>

</template>
<script type="text/ecmascript-6">
  import Sortable from 'sortablejs'
  import {panelTitle, bottomToolBar, tableDialog} from 'components'
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
        peopleData: [],
        pageSize:'6',
        pageNo:'1',
        pepTitle:'',
        dialog: false,
        dialogData: [],
        type: 'people',
        tableId: '',
        addBtn: false,
        editBtn: false,
        delBtn: false,
      }
    },
    methods: {
      get_class_data(){
        this.load_data = true
        this.$fetch.api_business.getTop10List({
          fun: this.fun
        }).then(({msg, retcode, retObj})=> {
          this.top10Data = retObj
          console.log(retObj);
          if (retcode == 0) {
            this.olderList = this.top10Data.map(v => v.id);
            this.newList = this.olderList.slice();
            this.$nextTick(() => {
              this.setSort()
            })
            this.$message.success(msg)
          }
          this.load_data = false
        })
          .catch(() => {
            this.load_data = false
          })
      },
      setSort() {
        const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
        this.sortable = Sortable.create(el, {
          // handle: '.drag-handler',
          onEnd: evt => {

            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
            this.newList.splice(evt.newIndex, 0, tempIndex);
            var newArr = []
            for(let i=0;i<this.newList.length;i++){
              var idObj = new Object()
              idObj.id = this.newList[i]
              idObj.ranking = i+1
              newArr.push(idObj)

            }
            var xhr = new XMLHttpRequest()
            xhr.open('post', '/apidev/channel/topten/ranking', true)
            xhr.setRequestHeader('Content-type','application/json;charset=utf-8')
            xhr.send(JSON.stringify(newArr))
            xhr.onreadystatechange(function () {
              if(this.readyState==4&&this.status==200){
                console.log(222);
              }
            })
           /* this.$fetch.api_business.ranking(newArr)
              .then(({msg, retcode, retObj})=> {

                if (retcode == 0) {
                  this.$message.success(msg)
                }
                this.get_class_data()
              })
              .catch(() => {

              })*/
          },
          onUpdate: evt => {

            /*const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
             this.newList.splice(evt.newIndex, 0, tempIndex);*/
          },
        })
      },
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {

            this.$fetch.api_business.top10Del({
              id: item
            }).then((data) => {
              console.log(data);
              this.get_class_data()
              this.$message.success(msg)
            })
              .catch(() => {
              })

          })
          .catch(() => {
          })
      },
      addPeople() {
        this.$refs.tableDialog.dialogTableVisible = true;
        this.$fetch.api_business.getPeopleList({
          fun:this.fun,
          pageSize:this.pageSize,
          pageNo:this.pageNo
        }).then((data) => {
          this.dialogData = data.retObj
        })
          .catch(() => {
          })
      },
      getTableId(item) {
       if(item){
         this.$refs.tableDialog.dialogTableVisible = false;
         this.$fetch.api_business.toptenSave({
           fun: this.fun,
           celebrityId: item.id,
           celebrityName: item.title,
           pic: item.pic,
           ranking: this.top10Data.length + 1,
           isNewRecord: true
         }).then((data) => {
           this.dialog = false
           this.get_class_data()
         })
           .catch(() => {
           })
       }
      },
      goSearch() {
        this.$fetch.api_business.searchPeople({
          title: this.pepTitle,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        }).then((data) => {
          this.peopleData = data.retObj
        })
          .catch(() => {
          })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      this.get_class_data()
      this.getBtn()
    },
    components: {
      panelTitle,
      tableDialog
    },
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .el-input{
    width: 200px;
    margin-bottom: 10px;
  }
</style>

