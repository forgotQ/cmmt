<template>
  <div class="panel">
    <panel-title>
      <el-button @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body">
        <div class="panel-middle">
          <el-row>
            <el-col :span="14">
              <el-form ref="bannerDetail" :model="modusDetail" label-width="100px">
                <el-form-item label="编码:" prop="code">
                  <el-input v-model="modusDetail.code" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="名称:" prop="title">
                  <el-input v-model="modusDetail.title" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="分类:" prop="type">
                  <el-select v-model="modusDetail.type" placeholder="请选择">
                    <el-option label="分公司" value="0"></el-option>
                    <el-option label="分部门" value="1"></el-option>
                    <el-option label="子部门" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主负责任:" prop="leaderTitle">
                  <el-input v-model="modusDetail.leaderTitle"  @focus="openDigol" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="副主管:" prop="managerTitle">
                  <el-input v-model="modusDetail.managerTitle" @focus="openDigol1" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="电话:" prop="tel">
                  <el-input v-model="modusDetail.tel" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="状态:" prop="delFlag">
                  <el-select  placeholder="请选择" v-model="modusDetail.delFlag">
                    <el-option label="开启" value="0"></el-option>
                    <el-option label="关闭" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注:" >
                  <el-input type="textarea" v-model="modusDetail.officeDesc"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <submit-btn :url="postUrl" :params="modusDetail"></submit-btn>
        </div>
    </div>
    <el-dialog title="用户列表" :visible.sync="dialogTableVisible">
      <el-table :data="userData">
        <el-table-column property="account" label="登录名"></el-table-column>
        <el-table-column property="name" label="用户名"></el-table-column>
        <el-table-column  label="操作">
          <template scope="props">
            <el-button type="info" size="small" icon="edit" v-show="first" @click="sure(props.row)">确定</el-button>
            <el-button type="info" size="small" icon="edit" v-show="last" @click="sure1(props.row)">确定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, submitBtn} from 'components'
  import {port_power} from 'common/port_uri'
  export default {
    data() {
      return {
        postUrl:port_power.officeEdit,
        modusDetail:{
          code: '',
          title: '',
          enTitle: '',
          pid: this.$route.params.id,
          type: '0',
          leaderId: '',
          leaderTitle: '',
          managerId: '',
          managerTitle: '',
          tel:'',
          officeDesc:'',
          delFlag:''
        },
        dialogTableVisible: false,
        userData: [],
        first: false,
        last: false,

      }
    },
    methods:{
      getSoet() {
        this.$fetch.api_business.getModusSort({
          pid: this.$route.params.id
        }).then(({msg, retcode, retObj})=> {
          this.modusDetail.sort = retObj
        })
      },
      openDigol(){
         this.first = true
         this.last = false
         this.dialogTableVisible = true
        this.$fetch.api_power.userList({
          area: ''
        }).then(({msg, retcode, retObj})=> {
          this.userData = retObj
        })
      },
      openDigol1(){
        this.first = false
        this.last = true
        this.dialogTableVisible = true
        this.$fetch.api_power.userList({
          area: ''
        }).then(({msg, retcode, retObj})=> {
          this.userData = retObj
        })
      },
      sure(data) {
        this.modusDetail.leaderId = data.id
        this.modusDetail.leaderTitle = data.name
        this.dialogTableVisible = false
      },
      sure1(data) {
        this.modusDetail.managerId = data.id
        this.modusDetail.managerTitle = data.name
        this.dialogTableVisible = false
      },
    },
    created() {
      this.$fetch.api_power.officeGet({
        id: this.$route.params.id
      }).then(({msg, retcode, retObj})=> {
        this.modusDetail = retObj
      })
    },
    components: {
      submitBtn,
      panelTitle
    },
    watch:{
      'checkList':function(){
        this.modusDetail.buttonSigns = this.checkList.join(',')
      }
    },
  }
</script>
<style scoped>
  .panel-middle{
    width:50%;
    margin: 0 auto;
  }
</style>

