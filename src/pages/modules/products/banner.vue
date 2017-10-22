<template>
  <div class="panel-body" style="">
    <div class="panel">
      <!--<el-input id="values"-->
                <!--placeholder="请输入搜索内容" style="width: 20%;float: left;margin-top: -3px"-->
                <!--icon="search"-->
                <!--v-model="title"-->
                <!--:on-icon-click="datas">-->
      <!--</el-input>-->
      <el-select v-model="labelName"  id="values"  style="float: left" @change="change(labelName)">
          <el-option label="优品首页"  value="superpro">
          </el-option>
          <el-option label="优品土特产品类" value="superpro_specialty">
          </el-option>
          <el-option label="优品家用产品类" value="superpro_domestic">
          </el-option>
          <el-option label="优品商用产品类" value="superpro_commercial">
          </el-option>
      </el-select>
      <panel-title>
        <el-button @click.stop="on_refresh" size="small">
          <i class="fa fa-refresh"></i>
        </el-button>
        <router-link :to="{name:'优品广告管理添加'}" tag="span">
          <el-button type="primary" icon="plus" size="small">添加数据</el-button>
        </router-link>
      </panel-title>
    </div>
    <el-table :data="bannerlist"
              align="center"
              border style="width: 100%"
              v-loading="load_data"
              element-loading-text="拼命加载中">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="广告名称" align="center" ></el-table-column>
      <el-table-column  label="图片" align="center">
        <template scope="scope">
          <img width="80" height="80" :src="scope.row.pic.split(',')[0]">
        </template>
      </el-table-column>
      <el-table-column prop="havearea" label="所属地区" align="center"></el-table-column>
      <el-table-column prop="createDate" label="上传时间" align="center"></el-table-column>

      <el-table-column label="操作" width="180"  align="center">
        <template scope="props">
          <router-link :to="{name:'优品广告管理详情', params: {id: props.row.id}}" >
            <el-button type="info" size="small" icon="edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view></router-view>
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
        bannerlist:[],
        //请求时的loading效果
        load_data: true,
        cityCode:"",
        total:0,
        pageNo:1,
        pageSize:10,
        pageNoSearch:1,
        title:'',
        currentPage3:1,
        labelName:'superpro',
        delFlag:''
      }
    },
    activated(){
      this.datas();
    },
    methods:{
      on_refresh(){//刷新
        this.datas()
      },
      change(name){
        this.datas()
        this.labelName=name
      },
      handleCheckAllChange(event) {
      },
      datas() {
//        if(this.getCityCode==''){
//          this.$message({
//            message: '请选择城市',
//            type: 'warning'
//          });
//          this.load_data = false
//          return false;
//        }
        this.$fetch.api_products.bannerlist({
          fun:this.labelName,
          pageNo:this.pageNo,
          pageSize:this.pageSize,
          area:this.getCityCode,
        }).then((data)=>{
          this.bannerlist = data.retObj
          this.load_data = false
        })
      },
      delete_data(id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_products.bannerdelete({
              id: id,
              delFlag: 1
            }).then((data)=>{
              console.log(JSON.stringify(data));
              this.$message.success(data.msg)
              this.datas()
            })
          })
          .catch(() => {
          })
      }
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
        this.cityCode = this.getCityCode;
        this.datas()
      }
    },
    components:{
      panelTitle,
      bottomToolBar
    }
  }
</script>

