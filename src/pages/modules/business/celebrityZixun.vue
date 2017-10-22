<template>
  <div>
    <el-table :data="newsData"
              align="center"
              border style="width: 100%"
              v-loading="load_data"
              element-loading-text="拼命加载中">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="资讯标题" align="center" width="200"></el-table-column>
      <el-table-column  label="图片" align="center" width="200">
        <template scope="scope">
          <img width="80" height="80" :src="scope.row.pic.split(',')[0]">
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="所属分类" align="center" width="200"></el-table-column>
      <el-table-column prop="createDate" label="上传时间" width="200" align="center"></el-table-column>
      <el-table-column prop="celebrityName" label="关联人物" align="center"></el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="props">
          <router-link :to="{name: '资讯详情', params: {id: props.row.id}}" tag="span">
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
        fun: 'washington',
        pageSize:'6',
        pageNo:'1',
        newsData:[]
      }
    },
    methods: {
      getNews() {
        this.$fetch.api_business.getcChannelNews({
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
            this.$fetch.api_business.delNews({
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
    },
    created() {
      this.getNews()
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

</style>

