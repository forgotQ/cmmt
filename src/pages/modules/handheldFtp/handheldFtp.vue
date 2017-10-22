<template>
  <div>
    <!--<p>{{ $t("hello") }}</p>-->
    <!--<span>{{this.$lan()}}</span>-->

    <!--<div @click="zhlanguage()">中文</div>-->
    <!--<div @click="chlanguage()">英文</div>-->


    <ul class="videoManger">
      <li class="manger_item">
        <router-link :to="{path: '/modules/ftphomemanger'}" replace>首页管理</router-link>
      </li>
      <li class="manger_item">
        <router-link :to="{path: '/modules/ftpdemand'}" replace>视频点播</router-link>
      </li>
      <li class="manger_item">
        <router-link :to="{path: '/video/liveStreamMange'}" replace>视频直播</router-link>
      </li>
      <li class="manger_item">
        <router-link :to="{path: '/video/liveServeMange'}" replace>电视直播</router-link>
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {cookieStorage} from 'common/storage'

  export default {
    methods:{
//      zhlanguage() {
//        console.log('zhlanguage');
//        cookieStorage.set('language', 'zh-CN', 10);
//        this.$i18n.locale = cookieStorage.get('language')
////        this.$router.go(0);
//      },
//      chlanguage() {
//        console.log('chlanguage');
//        cookieStorage.set('language', 'en-US', 10)
//        this.$i18n.locale = cookieStorage.get('language')
////        this.$router.go(0);
//      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .router-link-active{
    color: dodgerblue;
  }

  .videoManger{
    display: flex;
    padding: 0 15px;
    color: #535351;
    height: 38px;
    background: white;
    line-height: 38px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
    .manger_item{
      margin-right: 20px;
    }
  }
</style>
