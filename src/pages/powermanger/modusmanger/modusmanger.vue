<template>
  <div>
    <button style="float: right;" type="button" class="el-button el-button--success el-button--small">
      <router-link :to="{ name: url, params: {id: '0'}  }"
                   tag="span">
        添加一级树结构
      </router-link>
    </button>
    <tree-grid :columns="columns" :tree-structure="true" delUrl="modul" :editUrl="editUrl" :requestUrl="url" :data-source="dataSource"></tree-grid>

  </div>
</template>
<script type="text/ecmascript-6">
  import {TreeGrid} from 'components'

  export default {
    name: 'hello',
    data () {
      return {
        columns: [
          /*{
            text: '唯一标识',
            dataIndex: 'code'
          },*/
          {
            text: '名称',
            dataIndex: 'title'
          },
          {
            text: '英文名称',
            dataIndex: 'enTitle'
          },
        ],
        dataSource: [],
        url:'模块详情',
        editUrl:"模块编辑"
      }
    },
    components: {
      TreeGrid
    },
    activated() {
      this.$fetch.api_business.getModuslist({
        pid: 0
      }).then((data)=> {
        this.dataSource = data.retObj
      })
        .catch(() => {
          this.load_data = false
        })
    },
    created() {
      this.$fetch.api_business.getModuslist({
        pid: 0
      }).then((data)=> {
        this.dataSource = data.retObj
      })
        .catch(() => {
          this.load_data = false
        })
    }
  }
</script>
<style>

</style>

