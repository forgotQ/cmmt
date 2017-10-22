<template>
    <div>
      <ul class="videoManger">
        <li class="manger_item">
          <router-link :to="{path: '/video/liveStreamMange'}" replace>直播流管理</router-link>
        </li>
        <li class="manger_item">
          <router-link :to="{path: '/video/liveServeMange'}" replace>直播服务管理</router-link>
        </li>
      </ul>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

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
