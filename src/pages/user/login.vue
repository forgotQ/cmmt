<template>
  <div class="login-body">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
      <div class="login-title">
        <img src="./images/logo@2x.png"/>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="account" class="login-item">
            <el-input v-model="form.account" placeholder="请输入账户：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="passwd" class="login-item">
            <el-input type="password" v-model="form.passwd" placeholder="请输入密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" class="form-submit" @click="submit_form">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions, mapMutations} from 'vuex'
  import {port_user, port_code} from 'common/port_uri'
  import {SET_USER_INFO} from 'store/actions/type'
  import {SET_MUNU_List} from 'store/mutations/type'

  export default{
    data(){
      return {
        form: {
          account: null,
          passwd: null,
          timestamp: new Date().getTime()
        },
        rules: {
          account: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          passwd: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        //请求时的loading效果
        load_data: false
      }
    },
    methods: {
      ...mapActions({
        set_user_info: SET_USER_INFO
      }),
      ...mapMutations({
        set_munu_list: SET_MUNU_List
      }),
      getMenu() {
        this.$fetch.api_user.getMenulist({
          menuSign:0,
          pid  :0,
        }).then((data)=> {
          console.log(data);
          this.set_munu_list(data.retObj)
        })
      },
      //提交
      submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.load_data = true
          //登录提交
          this.$fetch.api_user.login(this.form)
            .then((data) => {
                this.set_user_info(Object.assign(data.retObj,{login: true}))
                this.$message.success(data.msg)
                this.getMenu()
               setTimeout(this.$router.push({path: '/'}), 500)
            })
            /*.catch(({code}) => {
              this.load_data = false
              if (code === port_code.error) {
                this.$notify.info({
                  title: '温馨提示',
                  message: '账号和密码都为：admin'
                })
              }
            })*/
        })
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(./images/bgImg@2x.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      width: 300px;
      padding: 25px 15px;
      margin: 100px auto;
      background-color: rgba(0,0,0,0.4);
      border-radius: 5px;
      .login-title {
        margin-bottom: 25px;
        text-align: center;
      }
      .login-item {
        .el-input{
          width: 100% !important;
        }
        .el-input__inner {
          margin: 0 !important;
        }
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border-color: #15a9ed;
        background: #15a9ed;
        &:active, &:hover {
          border-color: #6bc5a4;
          background: #6bc5a4;
        }
      }
    }
  }

</style>
