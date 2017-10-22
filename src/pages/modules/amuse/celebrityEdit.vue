<template>
 <div class="panel">
   <panel-title>
     <el-button @click="$router.back()">返回</el-button>
   </panel-title>
   <div class="panel-body">
      <div class="foodTab">
        <ul>
          <router-link :to="{name: '明星信息', params: {id: id}}" tag="li" replace>明星信息</router-link>
          <router-link :to="{name: '明星资讯', params: {id: id}}"  tag="li" replace>个人资讯</router-link>
          <router-link :to="{name: '明星课堂', params: {id: id}}"  tag="li" replace>明星课堂</router-link>
          <router-link :to="{name: '明星课堂评论', params: {id: id}}" tag="li" replace>明星课堂评论</router-link>
        </ul>
      </div>
   </div>
   <router-view></router-view>
 </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar} from 'components'
  export default {
    data() {
      return {
        id: this.$route.params.id
      }
    },
    components: {
      panelTitle
    },
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .foodTab {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: #eff0f4;
  }
  .foodTab ul li {
    width: 10%;
    display: inline-block;
    float: left;
    text-align: center;
  }
  .router-link-active {
    background-color: #1498ED;
  }
</style>

