<template>
  <div>
    <div class="classWrapper">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: '明星课堂添加', params: {id: 'add'}}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加课堂</el-button>
      </router-link>
    </div>
    <el-table :data="newsData"
              align="center"
              border style="width: 100%"
              v-loading="load_data"
              element-loading-text="拼命加载中">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" align="center" ></el-table-column>
      <el-table-column  label="图片" align="center" >
        <template scope="scope">
          <img width="80" height="80" :src="scope.row.pic.split(',')[0]">
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="所属分类" align="center" ></el-table-column>
      <el-table-column prop="createDate" label="上传时间"  align="center"></el-table-column>
      <el-table-column prop="celebrityName" label="关联人物" align="center"></el-table-column>
      <el-table-column  label="模块属性" align="center">
        <template scope="scope">
          <span>{{scope.row.classify="1"?"视频":"图文"}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="推荐娱道首页" align="center" >
        <template scope="scope">
          <select v-model="scope.row.recommend" @change="setRecommend($event, scope.row.id)">
            <option value="1">是</option>
            <option value="0">否</option>
          </select>
        </template>
      </el-table-column>
      <el-table-column  label="推荐明星学院" align="center" >
        <template scope="scope">
          <select v-model="scope.row.recommendCollege" @change="setEssential($event,scope.row.id)">
            <option value="1">是</option>
            <option value="0">否</option>
          </select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="props">
          <router-link :to="{name: '明星课堂添加', params: {id: props.row.id}}" tag="span">
            <el-button type="info" size="small" icon="edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        load_data: true,
        fun: 'entertainment',
        pageSize:'6',
        pageNo:'1',
        newsData:[]
      }
    },
    methods: {
      getNews() {
        this.$fetch.api_business.getcChannelVideo({
          fun: this.fun,
          celebrityId: this.$route.params.id,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        }).then(({msg, retcode, retObj})=> {
          this.load_data = false
          this.newsData = retObj
        })
      },
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$fetch.api_business.channelVideoDel({
              id: item
            }).then((data) => {
              this.getNews()
              this.$message.success(msg)
            })
              .catch(() => {
              })

          })
          .catch(() => {
          })
      },
      setRecommend(even, id) {
        this.$fetch.api_business.isRecommend({
          id: id,
          recommend: even.target.value,
          celebrityId: this.$route.params.id
        }).then(({msg, retcode, retObj})=> {
          if(retcode==0){
            this.$message.success(msg)
          }
        })
      },
      setEssential(even, id) {
        this.$fetch.api_business.isRecommend({
          id: id,
          recommendCollege: even.target.value,
          celebrityId: this.$route.params.id
        }).then(({msg, retcode, retObj})=> {
          if(retcode==0){
            this.$message.success(msg)
          }
        })
      },
      on_refresh(){
        this.getNews()
      },
    },
    created() {
      this.getNews()
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .classWrapper{
    float: right;
    margin-bottom: 10px;
    margin-right: 20px;
  }
</style>

