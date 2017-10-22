<template>
  <div class="city-wrapper">
    <el-select v-model="proviceCode" placeholder="请选择省份"  @change="proChange">
      <el-option
        v-for="item in proviceData"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <el-select v-show="proviceCode" v-model="cityCode" placeholder="请选择市"  @change="cityChange">
      <el-option
        v-for="item in cityData"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import {SET_PROVICE_CODE, SET_CITY_CODE} from 'store/mutations/type'
  export default {
    data() {
      return {
        proviceCode:'',
        proviceData: [],
        cityCode:'',
        cityData: [],
        value: ''
      }
    },
    methods: {
      ...mapMutations({
        set_prove_code: SET_PROVICE_CODE,
        set_city_code: SET_CITY_CODE,
      }),
      proChange() {
        this.$fetch.api_table.demolist({
          pcode: this.proviceCode
        }).then(({msg, retcode, retObj})=> {
          this.cityData= retObj;
          this.set_prove_code(this.proviceCode)
        })
      },
      cityChange() {
        this.set_city_code(this.cityCode)
      },
      gettabs(msg) {
        this.tabs = msg;
        console.log(this.tabs);
      }
    },
    created() {
      this.$fetch.api_table.demolist({
        pcode: 0
      }).then(({msg, retcode, retObj})=> {
        this.proviceData = retObj
      })
      this.gettabs()
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .city-wrapper{
    margin-bottom: 20px;
  }
</style>

