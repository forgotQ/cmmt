<template>
  <div class="panel">
    <panel-title>
      <el-select class="classSlt" v-model="classId" placeholder="请选择分类类型" @change="getInfo">
        <el-option v-for="item in classData" :label="item.title" :value="item.id"></el-option>
      </el-select>
      <el-select class="classSlt1"  v-model="num" placeholder="请选择第几条" @change="getInfoByNum()">
        <el-option v-for="(item,index) in infromation" :label="index+1" :value="index"></el-option>
      </el-select>
      <el-button  type="info" size="small" icon="edit" @click="edit">修改</el-button>
      <el-button  type="primary" icon="plus" size="small" @click="add">新增</el-button>
      <el-button  type="primary" size="small" @click="save">保存</el-button>
      <el-button  type="danger" size="small" icon="delete" @click="del">删除</el-button>

    </panel-title>
    <div class="panel-body">
      <div class="wrapper">
        <div class="iptWrapper">
          <el-input placeholder="请输入标题" v-model="title" style="width: 250px;"></el-input>
        </div>
        <div class="htmlWrapper">
          <html-edit @htmlinput="htmlinput" :contents="htmlDetail"></html-edit>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar, htmlEdit} from 'components'
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
        classType:'2',
        viewArr:[1],
        infromation:[],
        num:'',
        htmlDetail:'',
        title:'',
        currentInfoId:''
      }
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    methods:{
      get_class_data(){
        this.$fetch.api_raiders.typeList({
          area: this.getCityCode,
          type: this.classType
        }).then(({msg, retcode, retObj})=> {
          this.classData = retObj
        })
      },
      getInfo(){
         this.getInfromation()
      },
      getInfoByNum(){
        this.currentInfoId =  this.infromation[this.num].id
        this.title =  this.infromation[this.num].title
        this.htmlDetail =  this.infromation[this.num].content
      },
      getInfromation(){
        this.$fetch.api_raiders.infromation({
          area: this.getCityCode,
          typeId: this.classId
        }).then(({msg, retcode, retObj})=> {
          this.infromation = retObj
          this.num = ''
        })
      },
      add(){
        this.num = ''
        this.title =''
        this.htmlDetail = ''
      },
      save(){
        this.$fetch.api_raiders.infromationSave({
          area: this.getCityCode,
          typeId: this.classId,
          content: this.htmlDetail,
          title: this.title,
          sort: '1'
        }).then(({msg, retcode, retObj})=> {
          if (retcode == 0) {
            this.$message.success(msg)
            this.$fetch.api_raiders.infromation({
              area: this.getCityCode,
              typeId: this.classId
            }).then(({msg, retcode, retObj})=> {
              this.infromation = retObj
            })
          }
        })
      },
      del(){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$fetch.api_raiders.infromationDelete({
              id: this.currentInfoId
            }).then(({msg, retcode, retObj})=> {
              if (retcode == 0) {
                this.$message.success(msg)
                this.getInfromation()
                this.title =''
                this.htmlDetail = ''
              }
            })
          })
          .catch(() => {
          })
      },
      edit(){
        this.$fetch.api_raiders.infromationEdit({
          id: this.currentInfoId,
          area: this.getCityCode,
          typeId: this.classId,
          content: this.htmlDetail,
          title: this.title,
          sort: '1'
        }).then(({msg, retcode, retObj})=> {
          if (retcode == 0) {
            this.$message.success(msg)
            this.$fetch.api_raiders.infromation({
              area: this.getCityCode,
              typeId: this.classId
            }).then(({msg, retcode, retObj})=> {
              this.infromation = retObj
            })
          }
        })
      },
      htmlinput(content) {
        this.htmlDetail = content
      }
    },
    created(){
      this.get_class_data()
    },
    activated(){
      this.get_class_data()
    },
    watch:{
      'getCityCode'() {
        this.get_class_data()
      }
    },
    components: {
      panelTitle,
      htmlEdit
    },
  }
</script>
<style scoped>
  .classSlt{
    position: absolute;
    left: 10px;
  }
  .classSlt1{
    position: absolute;
    left: 220px;
  }
  .wrapper{
    overflow: hidden;
  }
  .iptWrapper{
    display: inline-block;
    float: left;
    margin-right: 50px;
  }
  .htmlWrapper{
    float: left;
  }
</style>

