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
                <el-form-item label="唯一标识:" prop="code">
                  <el-input v-model="modusDetail.code" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="名称:" prop="title">
                  <el-input v-model="modusDetail.title" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="英文名称:" prop="enTitle">
                  <el-input v-model="modusDetail.enTitle" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="权限标识:" prop="permission">
                  <el-input v-model="modusDetail.permission" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="链接:" prop="url">
                  <el-input v-model="modusDetail.url" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="图标:" prop="pic">
                  <el-input v-model="modusDetail.pic" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="排序号:" prop="sort">
                  <el-input v-model="modusDetail.sort" readonly style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="位置:" prop="menuSign">
                  <el-select  placeholder="请选择" v-model="modusDetail.menuSign">
                    <el-option label="左边栏" value="0"></el-option>
                    <el-option label="上边栏" value="1"></el-option>
                    <el-option label="页面按钮" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="按钮:">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="0">添加</el-checkbox>
                    <el-checkbox label="1">编辑</el-checkbox>
                    <el-checkbox label="2">删除</el-checkbox>
                    <el-checkbox label="3">启禁用</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="状态:" prop="isEnabled">
                  <el-select  placeholder="请选择" v-model="modusDetail.isEnabled">
                    <el-option label="开启" value="0"></el-option>
                    <el-option label="关闭" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="最后一项:" >
                  <el-select  placeholder="请选择" v-model="last">
                    <el-option label="是" value="0"></el-option>
                    <el-option label="否" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <submit-btn :url="postUrl" :params="modusDetail"></submit-btn>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, submitBtn} from 'components'
  import {port_business} from 'common/port_uri'
  export default {
    data() {
      return {
        postUrl:port_business.editModus,
        modusDetail:{
          title: '',
          enTitle: '',
          code: '',
          pid: '',
          isEnabled: '0',
          url: '',
          menuSign: '',
          permission: '',
          sort: '',
          buttonSigns:'',
          pic:''
        },
        checkList: [],
        last:'1'
      }
    },
    methods:{
      getSoet() {
        this.$fetch.api_business.getModus({
          id: this.$route.params.id
        }).then(({msg, retcode, retObj})=> {
          this.modusDetail= retObj
        })
      }
    },
    created() {
       this.getSoet()
    },
    activated() {
      this.getSoet()
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

