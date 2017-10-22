<template>
  <div class="btnWrapper">
    <el-button type="primary" @click="submit">确定</el-button>
    <el-button type="warning">重置</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Message} from 'element-ui'
  import axios from 'axios'
  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
      params: {
        type: Object
      },
    },
    methods: {
      submit() {
        console.log(this.params);
        var url = this.url
        var data = this.params
        axios({
          url: this.url,
          method: 'post',
          data: this.params,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(({data: {msg, retcode, retObj, success}})=> {
          console.log(retcode);
          if (retcode == 0) {
            Message.success(msg)
          }
        })

        /*fetch({
          url: this.url,
          method: 'POST',
          data:data,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then(({msg, retcode, retObj})=> {
          console.log(retcode);
          if (retcode == 0) {
            Message.success(msg)
          }
        })*/

      },
    },
    created(){
      console.log(this.params);
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .btnWrapper{
    text-align: center;
    padding-bottom: 20px;
  }
</style>

