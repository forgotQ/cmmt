<template>
  <div>
    <div class='panel'>
      <panel-title>
        <span class="pl">基本信息</span>
        <el-button @click="$router.back()">返回</el-button>
        <el-button  type="primary" size="small" @click="save">保存</el-button>
      </panel-title>
      <div class="panel-body"
           v-loading="load_data"
           element-loading-text="拼命加载中">
        <el-row>
          <el-col :span="10">
            <el-form ref="bannerDetail" :model="bannerDetail"  label-width="100px">
              <el-form-item label="用户名:" prop="title">
                <el-input v-model="bannerDetail.title" placeholder="请输入用户名" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="enTitle">
                <el-input v-model="bannerDetail.enTitle" placeholder="请输入密码"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="性别:" prop="fun">
                <el-select v-model="bannerDetail.fitPeople" placeholder="请选择">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="头像预览:" prop="pic">
                <pics-upload :defaultImgs="defaultImgs"  :maxPostImgs="1"></pics-upload>
              </el-form-item>
              <el-form-item label="姓名:" prop="enTitle">
                <el-input v-model="bannerDetail.enTitle" placeholder="请输入姓名"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="职务:" prop="enTitle">
                <el-input v-model="bannerDetail.enTitle" placeholder="请输入职务"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="手机:" prop="enTitle">
                <el-input v-model="bannerDetail.enTitle" placeholder="请输入手机"  style="width: 250px;"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form :model="bannerDetail">
              <el-form-item label="邮箱:" prop="enTitle">
                <el-input v-model="bannerDetail.enTitle" placeholder="请输入邮箱"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="联系地址:" prop="enTitle">
                <el-input v-model="bannerDetail.enTitle" placeholder="请输入联系地址"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="地区限制:" prop="enTitle">
                <el-radio class="radio" v-model="isCity" label="0">无</el-radio>
                <el-radio class="radio" v-model="isCity" label="1">有</el-radio>              </el-form-item>
              <el-form-item label="备注信息:" prop="bannerContent">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="bannerDetail.content"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class='panel'>
      <panel-title>
        <span class="pl">选择组织架构和角色</span>
      </panel-title>
      <div class="panel-body">
        <div class="zuzhi">
          <ul style="float:left;" id="tree" class="ztree"></ul>
        </div>
        <div class="zuzhi1">
          <ul style="float:left;" id="tree1" class="ztree"></ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, picsUpload} from 'components'
  import {port_file, port_business} from 'common/port_uri'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'

  export default {
    data() {
      return {
        route_id: this.$route.params.id,
        load_data: false,
        bannerDetail: {
          title:"",
          enTitle:'',
          content:'',
          area:"",
          pic:'',
          userId:'',
          fitPeople:''
        },
        options:[],
        defaultImgs: [],
        thisId:'',
        isCity:'0',
        treeData:[],
        treeData1:[],
        zTreeObj:'',
        zTreeObj1:''
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
      htmlEdit,
      submitBtn,
      picsUpload
    },
    methods: {
      save(){
        var nodeArr = this.zTreeObj.getCheckedNodes(true);
        var nodeArr1 = this.zTreeObj1.getCheckedNodes(true);

        this.bannerDetail.area = this.getCityCode
        if(!this.bannerDetail.area){
          this.$message.warning('请选择城市!')
          return
        }
        this.bannerDetail.pic = this.defaultImgs.join(',')

        this.$fetch.api_raiders.thoughtsSave(this.bannerDetail)
          .then(({msg, retcode, retObj})=> {
            if (retcode == 0) {
              this.$message.success(msg)
              this.thisId = retObj
            }
        })
      }
    },
    created() {
      this.$fetch.api_power.getOfficeList({

      }).then(({msg, retcode, retObj})=> {
        this.treeData = retObj
        if(retcode==0){
          var that = this
          var zTree;
          var setting = {
            view: {
              selectedMulti: false,
            },
            check:{
              enable: true,
              autoCheckTrigger: true,   //true / false 分别表示 触发 / 不触发 事件回调函数
              chkStyle: "checkbox",   //勾选框类型(checkbox 或 radio）
              chkboxType: { "Y": "ps", "N": "s" }
            },
            edit: {
              enable: true,
              showRemoveBtn: false,
              showRenameBtn: false,
            },
            data:{
              key:{
                name:"title"
              },
              simpleData: {
                pIdKey: 'pid',
                idKey: 'id',
                enable: true,
                rootPId: 0
              },
            }
          };
          this.zTreeObj = $.fn.zTree.init($("#tree"), setting, that.treeData);
        }
      })

      this.$fetch.api_power.getRoleList({

      }).then(({msg, retcode, retObj})=> {
        this.treeData1 = retObj
        if(retcode==0){
          var that = this
          var zTree;
          var setting = {
            view: {
              selectedMulti: false,
            },
            check:{
              enable: true,
              autoCheckTrigger: true,   //true / false 分别表示 触发 / 不触发 事件回调函数
              chkStyle: "checkbox",   //勾选框类型(checkbox 或 radio）
              chkboxType: { "Y": "ps", "N": "s" }
            },
            edit: {
              enable: true,
              showRemoveBtn: false,
              showRenameBtn: false,
            },
            data:{
              key:{
                name:"title"
              },
              simpleData: {
                pIdKey: 'pid',
                idKey: 'id',
                enable: true,
                rootPId: 0
              },
            }
          };
          this.zTreeObj1 = $.fn.zTree.init($("#tree1"), setting, that.treeData1);
        }
      })
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .btnWrapper{
    text-align: center;
    padding-bottom: 20px;
  }
  .htmlWrapper{
    margin: 15px auto;
    width: 60%;
  }
  .pl{
    position: absolute;
    left: 10px;
  }
  .zuzhi{
    width: 50%;
    overflow: hidden;
    float: left;
  }
  .zuzhi1{
    width: 50%;
    overflow: hidden;
    display: inline-block;
  }
</style>

