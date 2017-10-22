<template>
  <div>
    <button style="float: right;" type="button" class="el-button el-button--success el-button--small">
      <router-link :to="{ name: url, params: {id: '0'}  }"
                   tag="span">
        添加一级树结构
      </router-link>
    </button>
    <tree-grid :columns="columns" :tree-structure="true" delUrl="organ" :editUrl="editUrl" :requestUrl="url" :data-source="dataSource"></tree-grid>

  </div>
</template>
<script type="text/ecmascript-6">
  import {TreeGrid} from 'components'
  import {port_power} from 'common/port_uri'
  export default {
    name: 'hello',
    data () {
      return {
        columns: [
          {
            text: '名称',
            dataIndex: 'title'
          },
          {
            text: '编码',
            dataIndex: 'code'
          },
          {
            text: '负责人',
            dataIndex: 'leaderTitle'
          },
          {
            text: '电话',
            dataIndex: 'tel'
          },
        ],
        dataSource: [],
        url:'组织架构详情',
        editUrl:"组织架构编辑",
        del: port_power.officeDel
      }
    },
    components: {
      TreeGrid
    },
    activated() {
      this.$fetch.api_power.officeList({
        pid: 0
      }).then((data)=> {
        this.dataSource = data.retObj
      })
        .catch(() => {
          this.load_data = false
        })
    },
    created() {
      this.$fetch.api_power.officeList({
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

