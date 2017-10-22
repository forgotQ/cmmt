<template>
  <!--<div>-->
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane class="el-tabs__active-bar" v-for="item in navList" :label="item.label" :name="item.name" type="card">-->

      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  <div class="city-wrapper1">
    <div >
      <el-select v-model="labelName"   >
        <router-link :to="{name:'头条新闻'}" >
          <el-option label="头条新闻"  value="0">
          </el-option>
        </router-link>
        <router-link :to="{name:'电视新闻'}" >
          <el-option label="电视新闻" value="1">
          </el-option>
        </router-link>
        <router-link :to="{name:'专题报道'}" >
          <el-option label="专题报道" value="2">
          </el-option>
        </router-link>
      </el-select>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  export default{
    props: {
//      getTab: {
//        type: Array,
//        default() {
//          return [
//          ]
//        }
//      }
    },
    data() {
        return{
          activeName:'',
          fun:'news',
          toplist:[],
          //请求时的loading效果
          load_data: true,
          cityCode:"",
          labelName:'0'
        }
    },
    activated(){
      this.labelName='0';
    },
    methods:{

    },
    components:{
      panelTitle,
      bottomToolBar
    },
    computed: {
      ...mapGetters({
        getCityCode:  GET_CITY_CODE
        }
      )
    },
    watch:{
      'getCityCode'() {
        console.log(this.getCityCode);
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .el-tabs__item{
    width: 90px;
    text-align: center;
  }
  .panel{
    text-align: right;
    padding: 10px;
    margin-top: 20px
  }
</style>
