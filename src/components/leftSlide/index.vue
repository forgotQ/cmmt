<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo@2x.png" alt="cmmt">
      </router-link>
      <el-menu class="menu-box" theme="dark" router :default-active="$route.path" @click.native="clickMenu">
        <!--<div v-for="(item, index) in nav_menu_data" :key="index">
          <el-menu-item class="menu-list" v-if="typeof item.child === 'undefined'" :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.name" class="text"></span>
          </el-menu-item>
          <el-submenu :index="item.path" v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.name" class="text"></span>
            </template>
            <el-menu-item class="menu-list" v-for="(sub_item, sub_index) in item.child" :index="sub_item.path" :key="sub_index">
              &lt;!&ndash;<i class="icon fa" :class="sub_item.icon"></i>&ndash;&gt;
              <span v-text="sub_item.name" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>-->
        <div v-for="(item, index) in nav_menu_data" :key="index">
          <el-menu-item class="menu-list" v-if="typeof item.funs === 'undefined'" index="item.url">
            <i class="icon fa " :class="item.pic"></i>
            <span v-text="item[$t('lan')]" class="text"></span>
          </el-menu-item>
          <el-submenu :index="item.url" v-else>
            <template slot="title">
              <i class="icon fa" :class="item.pic"></i>
              <span v-text="item[$t('lan')]" class="text"></span>
            </template>
            <el-menu-item class="menu-list" v-for="(sub_item, sub_index) in item.funs" :index="sub_item.url" :key="sub_index" @click="getId(sub_item.id)">
              <span v-text="sub_item[$t('lan')]" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>

    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    data(){
      return {
        nav_menu_data: null,
      }
    },
    methods: {
      clickMenu() {
        this.tabArr = [];
        this.$emit('postTab', this.tabArr);
      },
      getMenu() {
        this.$fetch.api_user.getMenulist({
          menuSign:0,
          pid  :0,
        }).then((data)=> {
          this.nav_menu_data = data.retObj
        })
      },
      getId(id) {
        sessionStorage.setItem('menuId', id);
      }
    },
    created() {
      this.getMenu();
    },
    activated() {
      this.lanName = this.$lan();
      this.getMenu();
    },
  }


  /* {
   name: "个人主页",
   path: "/home",
   icon: "fa-home"
   },
   {
   title: "频道管理",
   name: "频道管理",
   path: "/modules",
   icon: "fa-table",
   child: [{
   title: "商道管理",
   name: "商道",
   path: "/modules/business"
   }, {
   name: "娱道",
   path: "/modules/amuse"
   }, {
   name: "商机",
   path: "/modules/opportunity"
   },{
   name: "运营管理",
   path: "/table/sort"
   }]
   },
   {
   name: "视频管理",
   path: "/video",
   icon: "fa-video",
   child: [{
   title: "直播",
   name: "直播",
   path: "/video/livetelecast"
   },{
   title: "点播",
   name: "点播",
   path: "/video/livetelecast"
   }]
   },
   {
   name: "财务管理",
   path: "/charts",
   icon: "fa-bar-chart-o",
   child: [{
   name: "柱状图表",
   path: "/charts/bar"
   }]
   }*/
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
