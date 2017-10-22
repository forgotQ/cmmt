<template>
  <div class="view-page">
    <left-slide></left-slide>
    <main-content>
      <cityselect ></cityselect>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main-content>
  </div>
</template>
<script type="text/javascript">
  import {mainContent, leftSlide, cityselect} from 'components'

  export default{
    name: 'page',
    components: {
      mainContent,
      leftSlide,
      cityselect
    },
    data() {
      return {
        tabArr: ''
      }
    },
    methods:{
      postTab(msg) {
        this.tabArr = msg;
      }
    }
  }
</script>
