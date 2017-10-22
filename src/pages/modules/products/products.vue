<template>
  <div class="city-wrapper1">
    <div >
      <el-select v-model="labelName"   >
        <router-link v-model="labelName" v-for="item in youpinList" :to="{path:item.path}" >
          <el-option :label="item.name"   :value="item.num">
          </el-option>
        </router-link>
      </el-select>
    </div>
    <!--<router-view></router-view>-->
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  export default{
    props: {
    },
    data() {
      return{
        activeName:'',
        fun:'news',
        youpinList:[
          {
              name:'广告管理',
              path:'/modules/products/banner',
              num:'0',
              second:[
                {
                  name:'优品首页',
                  path:'',
                  num:'0',
                },
                {
                  name:'优品土特产品类',
                  path:'',
                  num:'1',
                },
                {
                  name:'优品家用产品类',
                  path:'',
                  num:'2',
                },
                {
                  name:'优品商用产品类',
                  path:'',
                  num:'3',
                }
              ]
          },
          {
            name:'名优企业',
            path:'/modules/products/good',
            num:'1'
          },
          {
            name:'商品列表',
            path:'/modules/products/goodslist',
            num:'2'
          },
          {
            name:'商品标签管理',
            path:'/modules/products/goodsTabManage',
            num:'3'
          },
          {
            name:'商品分类管理',
            path:'/modules/products/goodsClassifyManage',
            num:'4'
          }
        ],
        //请求时的loading效果
        load_data: true,
        cityCode:"",
        labelName:'0'
      }
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
