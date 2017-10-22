<template>
  <div class="panel">
    <panel-title>
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <el-button  v-if="addBtn" type="primary" icon="plus" size="small" @click="addClass()">{{$t("common_add")}}</el-button>
    </panel-title>
    <div class="panel-body">
      <el-table :data="bannerData"
                align="center"
                border style="width: 100%"
                v-loading="load_data"
                element-loading-text="拼命加载中">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column  label="图片" align="center" width="200">
          <template scope="scope">
            <img width="80" height="80" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="上传时间" width="200" align="center"></el-table-column>
        <el-table-column label="是否开启" align="center">
          <template scope="scope">
            <span>{{scope.row.delFlag=="0"?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
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
    <el-dialog title="banner详情" :visible.sync="dialogFormVisible">
      <pics-upload :defaultImgs="defaultImgs" :maxPostImgs="1"></pics-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit" v-show="editMode">确 定</el-button>
        <el-button type="primary" @click="sure" v-show="addMode">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar, picsUpload} from 'components'
  import {Message} from 'element-ui'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  import axios from 'axios'
  var qs = require('qs');

  export default {
    data() {
      return {
        fun: 'entertainment',
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
        addBtn: false,
        editBtn: false,
        delBtn: false,
        dialogFormVisible: false,
        editMode: false,
        addMode: true,
        defaultImgs:[],
        editId: ''
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
    components: {
      panelTitle,
      bottomToolBar,
      picsUpload
    },
    activated(){
      this.get_List_data()
    },
    created() {
      this.get_List_data();
      this.getBtn()
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_List_data()
      },
      //获取数据
      get_List_data(){
        this.load_data = true
        this.$fetch.api_raiders.getBannerlist({
          area:this.getCityCode
        }).then((data)=> {
          this.bannerData = []
          this.bannerData.push(data.retObj)
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
            console.log(item);
            var that = this;
            var ids = [];
            var idsObj = new Object();
            idsObj.id = item;
            ids.push(idsObj)
            var batch = new Object();
            batch.delFlag = 1;
            batch.banners = ids;
            this.load_data = true
            /* this.$fetch.api_business.edlBanner(batch).then((data) => {
             console.log(data);
             this.get_List_data()
             this.$message.success(msg)
             })
             .catch(() => {
             })*/
            console.log(batch);
            /*axios({
             url: '/apidev/sys/banner/batch',
             method: 'post',
             data: JSON.stringify(batch),
             headers: {
             'content-Type': 'application/json;charset=utf-8'
             },
             }).then(({data: {msg, retcode, retObj, success}})=> {
             console.log(retcode);
             if (retcode == 0) {
             Message.success(msg)
             }
             })*/

            var xhr = new XMLHttpRequest()
            xhr.open('post', '/apidev/sys/banner/batch', true)
            xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8')
            xhr.send(JSON.stringify(batch))
            xhr.onreadystatechange(function () {
              if (this.readyState == 4 && this.status == 200) {
                console.log(222);
              }
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
      },
      sure() {

        this.$fetch.api_raiders.addBanner({
          area: this.getCityCode,
          pic: this.defaultImgs.join(',')
        }).then(({msg, retcode, retObj})=> {

            if (retcode == 0) {
              this.$message.success(msg)
            }
            this.dialogFormVisible = false
            this.get_List_data()
          })
          .catch(() => {
            this.dialogFormVisible = false
          })
      },
      submit() {
        this.$fetch.api_raiders.editBanner({
          id: this.editId,
          area: this.getCityCode,
          pic: this.defaultImgs.join(',')
        }).then(({msg, retcode, retObj})=> {
          if (retcode == 0) {
            this.$message.success(msg)
          }
          this.dialogFormVisible = false
          this.get_List_data()
        })
          .catch(() => {
            this.dialogFormVisible = false
          })
      },
      addClass() {
        this.dialogFormVisible = true
      },
      editClass(data) {
        this.dialogFormVisible = true
        this.editId = data.id
        this.defaultImgs = data.pic.split(',')
        this.editMode = true
        this.addMode = false
      },
    },
    watch:{
      'getCityCode'() {
        this.get_List_data()
      }
    }
  };
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>

