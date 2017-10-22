
<template>
  <el-input class="searchView"
    placeholder="输入搜索的内容"
    icon="search"
    v-model="input"
    :on-icon-click="handleIconClick"
    @keyup.enter.native="goSearch"
  >
  </el-input>
</template>

<script type="text/ecmascript-6">
  //输入url,data;输出方法getSearch
  export default {
    props: {
      url:{
        type:String,
        default:''
      },
      data:{
        type:Object,
        default() {
          return {

          }
        }
      }
    },
    data() {
      return {
        input:''
      }
    },
    methods:{
      handleIconClick() {
        this._search();
      },
      goSearch() {
        this._search();
      },
      _search() {
        console.log(this.data);
//          const postObj = Object.assign({title:this.input},this.data);
          this.data.title = this.input;
          this.$fetch.api_search.search(this.url,this.data).then(({msg, retcode, retObj})=> {
              console.log(`搜索结果${retObj} ${msg} ${retcode}`);
            this.$emit("getSearch",retObj);
          })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.searchView{

  width: 200px;
}
</style>
