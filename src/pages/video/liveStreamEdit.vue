<template>
  <div>
    <el-dialog
      :title=title
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-table
        v-if="title==='推流用户' ? true : false"
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="nickname" label="推流用户" align="center"></el-table-column>
        <el-table-column label="视频图片" align="center">
          <template scope="scope">
            <img width="100%" height="80" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="props">
            <el-button type="primary" size="small" @click.native="makeSure(props.row)">确定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="title==='直播流服务' ? true : false"
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="bucketName" label="服务名称" align="center"></el-table-column>
        <el-table-column prop="bucketType" label="推拉流方式" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="props">
              <el-button type="primary" size="small" @click.native="makeSure(props.row)">确定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page" v-if="title != ''">
        <div class="block fr pageSize">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="100">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  const  pageSize = 6

  export default {
    data() {
      return {
        title:'',
        url: '',
        dialogVisible: false,
        currentPage: 1,
        pageNo: 1,
        pageSize: pageSize,
        params:{
          pageSize: pageSize,
          pageNo: 1,
          bucketName:'',
          bucketType:''
        },
        tableData: null,
      };
    },
    methods: {
      handleClose(done) {
        this.title = '';
        this.params.pageNo = 1;
        this.dialogVisible = false;
      },
      getDataList(url) {
        this.url = url;
        this.$fetch.api_fatchData.fetchData(url,this.params)
        .then(({msg, retcode, retObj}) => {
          this.tableData = retObj;
        });
      },
      makeSure(obj) {
        this.$emit("makeSure",this.title,obj);
        this.title = '';
        this.dialogVisible = false;
      },
      handleCurrentChange(val) {
        this.params.pageNo = val;
        this.getDataList(this.url);
      },
    }
  };
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .page{
    padding:  20px 0;
  }


</style>
