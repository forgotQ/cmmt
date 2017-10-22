<template>
  <div class="header-section">
   <!-- <div class="search">
      <search @search="submit_search"></search>
    </div>-->
    <topbar></topbar>
    <select class="fy" v-model="isLan" @change="change($event)">
      <option value="zh-CN">中文</option>
      <option value="en-US">英文</option>
    </select>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'
  import topbar from 'components/topbar'
  import {cookieStorage} from 'common/storage'

  export default{
    data() {
      return {
         isLan:''
      }
    },
    components: {
      menuRight,
      topbar
    },
    methods: {
      submit_search(value) {
        this.$message.success(value)
      },
      change(even){

        cookieStorage.set('language', this.isLan, 10)
        this.$i18n.locale = cookieStorage.get('language')
      }
    },
    created() {
      if(cookieStorage.get('language')){
        this.isLan = cookieStorage.get('language')
      }else {
        this.isLan = 'zh-CN'
      }

    }
  }
</script>
<style>
  .fy{
    position: absolute;
    right: 349px;
    top: 10px
  }
</style>
