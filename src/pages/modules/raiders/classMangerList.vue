<template>
  <div class="panel">
    <panel-title>
      <el-select class="classSlt" v-model="classType" placeholder="请选择分类类型" @change="switchClass">
        <el-option label="概览分类" value="1"></el-option>
        <el-option label="实用信息分类" value="2"></el-option>
      </el-select>
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <el-button v-if="addBtn" type="primary" icon="plus" size="small" @click="addClass()">添加分类</el-button>
    </panel-title>
    <div class="panel-body">
      <el-table :data="bannerData"
                align="center"
                border style="width: 100%"
                v-loading="load_data"
                element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="分类名称" align="center" ></el-table-column>
        <el-table-column prop="enTitle" label="英文名称" align="center" ></el-table-column>
        <el-table-column prop="typeDesc"  label="描述" align="center" ></el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="props">
            <el-button v-if="editBtn" type="info" size="small" icon="edit" @click="editClass(props.row)">修改</el-button>
            <el-button  v-if="delBtn" type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
      </bottom-tool-bar>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="classDetil">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input  auto-complete="on" v-model="classDetil.title"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" :label-width="formLabelWidth">
          <el-input  auto-complete="on" v-model="classDetil.enTitle"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit" v-show="editMode">确 定</el-button>
        <el-button type="primary" @click="sure" v-show="addMode">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar} from 'components'
  import {Message} from 'element-ui'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'

  export default {
    data() {
      return {
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
        classType:'1',
        dialogFormVisible: false,
        dialogTitle:'分类添加',
        formLabelWidth: '80px',
        classDetil: {
          title:'',
          enTitle:'',
          sort:'',
          area:'',
          type:''
        },
        editMode: false,
        addMode: true,
        addBtn: false,
        editBtn: false,
        delBtn: false,
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
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.get_class_data()
      this.getBtn()
    },
    watch: {
      'getCityCode'(){
        this.get_class_data()
      }
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_class_data()
      },
      //获取数据
      get_class_data(){
        this.load_data = true
        this.$fetch.api_raiders.typeList({
          area: this.getCityCode,
          type: this.classType
        }).then(({msg, retcode, retObj})=> {
          this.bannerData = retObj
          if (retcode == 0) {
            this.$message.success(msg)
          }
          this.load_data = false
        })
          .catch(() => {
            this.load_data = false
          })
      },
      switchClass() {
        this.get_class_data()
      },
      addClass() {
        this.dialogFormVisible = true
        this.classDetil = {
          delFlag: '0',
          classify: '',
          title:'',
          enTitle:'',
          fun: '',
          isNewRecord: true,
          typeDesc:''
        }
      },
      editClass(data) {
        this.dialogFormVisible = true
        this.classDetil = data
        this.editMode = true
        this.addMode = false
      },
      sure() {

        this.$fetch.api_raiders.typeList({
          type: this.classType,
          area: this.getCityCode
        })
          .then(({msg, retcode, retObj})=> {
            var sort = retObj.length+1
            this.classDetil.sort = sort
            this.classDetil.type = this.classType,
            this.classDetil.area = this.getCityCode
            this.$fetch.api_raiders.typeSave(this.classDetil)
              .then(({msg, retcode, retObj})=> {
                if (retcode == 0) {
                  this.$message.success(msg)
                }
                this.dialogFormVisible = false
                this.get_class_data()
              })
              .catch(() => {
                this.dialogFormVisible = false
              })
          })
          .catch(() => {
            this.dialogFormVisible = false
          })

      },
      submit() {
        this.$fetch.api_raiders.typeEdit(this.classDetil)
          .then(({msg, retcode, retObj})=> {

          if (retcode == 0) {
            this.$message.success(msg)
          }
            this.dialogFormVisible = false
            this.get_class_data()
          })
          .catch(() => {
            this.dialogFormVisible = false
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

             this.$fetch.api_raiders.typeDel({
               id: item
             }).then((data) => {
             this.get_class_data()
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
      }
    }
  };
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .classSlt{
    position: absolute;
    left: 10px;

  }
</style>

