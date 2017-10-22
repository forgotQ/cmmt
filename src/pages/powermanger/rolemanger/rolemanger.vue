<template>
  <div>
    <button style="float: right;" type="button" class="el-button el-button--success el-button--small">
      <router-link :to="{ name: url, params: {id: '0'}  }"
                   tag="span">
        添加一级角色
      </router-link>
    </button>
    <tree-grid :columns="columns" :tree-structure="true" delUrl="role" :editUrl="editUrl" :requestUrl="url" :data-source="dataSource"></tree-grid>

  </div>
</template>
<script type="text/ecmascript-6">
  import {TreeGrid} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'

  export default {
    name: 'hello',
    data () {
      return {
        columns: [
          {
            text: '角色名称',
            dataIndex: 'title'
          },
          {
            text: '角色等级',
            dataIndex: 'level'
          },
          {
            text: '角色说明',
            dataIndex: 'enTitle'
          },
          {
            text: '状态',
            dataIndex: 'enTitle'
          },
        ],
        dataSource: [],
        url:'角色详情',
        editUrl:'角色编辑'
      }
    },
    components: {
      TreeGrid
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    watch:{
      'getCityCode'() {
        this.getRoleData()
      }
    },
    methods: {
      getRoleData() {
        this.$fetch.api_power.getRoleList({
          pid:0
        }).then((data)=> {
          this.dataSource = data.retObj
        })
          .catch(() => {
            this.load_data = false
          })
      }
    },
    activated() {
      this.getRoleData()
    },
    created() {
      this.getRoleData()
    }
  }
</script>
<style>

</style>

