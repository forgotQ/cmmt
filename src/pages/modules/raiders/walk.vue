<template>
  <div class="panel">
    <panel-title>
      <el-select class="classSlt" v-model="classId" placeholder="请选择分类类型" @change="getInfo">
        <el-option v-for="item in classData" :label="item.title" :value="item.id"></el-option>
      </el-select>
      <router-link  :to="{name: '自由行详情', params: {id: classId}}" tag="span">
        <el-button  type="primary" icon="plus" size="small">添加</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table :data="walkData"
                align="center"
                border style="width: 100%"
                @selection-change="on_batch_select"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="名称" align="center" ></el-table-column>
        <el-table-column prop="scenicsAmount" label="包含景点数量"  align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template scope="props">
            <router-link :to="{name: '自由行编辑', params: {id: props.row.id}}" tag="span">
              <el-button  type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button  type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'

  export default{
    data() {
      return{
        addBtn: false,
        editBtn: false,
        delBtn: false,
        classId:'',
        classData: [],
        classType:'0',
        viewArr:[1],
        infromation:[],
        num:'',
        htmlDetail:'',
        title:'',
        currentInfoId:'',
        walkData:[]
      }
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    methods: {
      get_class_data(){
        this.$fetch.api_raiders.numberdayList({
          area: this.getCityCode,
          category: this.classType
        }).then(({msg, retcode, retObj})=> {
          this.classData = retObj
        })
      },
      getInfo(){
        this.$fetch.api_raiders.travelList({
          area: this.getCityCode,
          numberDay: this.classId,
          category: this.classType
        }).then(({msg, retcode, retObj})=> {
          this.walkData = retObj
        })
      },
      //批量选择
      on_batch_select(val){

        var arr = []
        for(var i=0;i<val.length;i++){
          arr.push(val[i].id)
        }
        this.batch_select = arr
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
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {

            this.$fetch.api_raiders.travelDel({
              id: item
            }).then((data) => {
              this.getInfo()
              this.$message.success(msg)
            })
              .catch(() => {
              })

          })
          .catch(() => {
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
      this.getBtn()
      this.get_class_data()
    },
    activated(){
      this.getBtn()
      this.get_class_data()
    },
    watch:{
      'getCityCode'() {
        this.get_class_data()
      }
    },
    components: {
      panelTitle
    },
  }
</script>
<style scoped>
  .classSlt{
    position: absolute;
    left: 10px;
  }
</style>

