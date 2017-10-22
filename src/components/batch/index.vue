<template>
  <div>
    <el-select v-model="delFlag" placeholder="请选择" class="wid80">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button class="ml15" @click="goBatch">确定</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  //输入 url,ids;输出retCode
    export default {
        props:{
          url:{
            type:String,
            default:''
          },
          ids:{
              type:Array,
              default() {
                  return []
              }
          }
        },
        data() {
            return {
              options: [{
                value: 0,
                label: '启用'
              }, {
                value: 3,
                label: '禁用'
              }, {
                value: 1,
                label: '删除'
              }],
              delFlag:0
            }

        },
        methods:{
            goBatch() {
              const postObj =  {delFlag:this.delFlag,ids:this.ids};
              this.$fetch.api_batch.batch(this.url,postObj).then(({msg, retcode, retObj})=> {
                this.$emit("getBatch",retcode);
              })
            }
        }
    }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .ml15{
   margin-left:15px;
  }
  .wid80{
    width: 80px;
    height:32px;
    border-radius: 2px;
  }
</style>
