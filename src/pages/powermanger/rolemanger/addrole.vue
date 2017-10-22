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

                <el-form-item label="角色名称:" prop="title">
                  <el-input v-model="modusDetail.title" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="状态:" prop="isEnabled">
                  <el-select  placeholder="请选择" v-model="modusDetail.isEnabled">
                    <el-option label="开启" value="0"></el-option>
                    <el-option label="关闭" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="模块操作权限:" prop="title">
                  <ul style="float:left;" id="tree" class="ztree"></ul>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <div class="btnWrapper">
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button type="warning">重置</el-button>
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, submitBtn} from 'components'
  import {port_business} from 'common/port_uri'
//  import $ from 'jquery'
  import {port_power} from 'common/port_uri'
  export default {
    data() {
      return {
        postUrl:port_power.addRole,
        modusDetail:{
          title: '',
          enTitle: '',
          code: '',
          pid: this.$route.params.id,
          isEnabled: '0',
          url: '',
          menuSign: '',
          permission: '',
          sort: '',
          buttonSigns:'',
          pic:''
        },
        checkList: [],
        last:'1',
        treeData:[],
        zTreeObj:''
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
      getfunlist() {
        this.$fetch.api_power.getfunlist({
          roleId: 0
        }).then(({msg, retcode, retObj})=> {
          this.treeData = retObj;
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
      },
      submit() {
        var that = this
        var nodeArr = this.zTreeObj.getCheckedNodes(true);
        var funs = [];
        nodeArr.forEach(function (item) {
          var obj = {};
          obj.id = item.id;
          funs.push(obj);
        });

        $.ajax({
          contentType : 'application/json;charset=utf-8',
          type:"post",
          url: that.postUrl,
          data:JSON.stringify({
            pid:that.$route.params.id,
            title: that.modusDetail.title,
            funs: funs
          }),
          success:function (data) {
            if(data.retcode==0){
              that.$message.success(data.msg)
            }
          }
        })

      }
    },
    created() {
      this.getfunlist()

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

