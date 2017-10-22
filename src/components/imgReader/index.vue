<template>
  <div>
    <span v-if="!imgArr[0]">暂无</span>
    <img  v-else v-for="item in imgArr" :src="item" class="imgReader">
  </div>
</template>

<script type="text/ecmascript-6">
  //输入 imgUrl;
  export default{
      props:{
          imgUrl:{
              type:String,
              default:''
          }
      },
      computed:{
          imgArr() {
              return this.imgUrl.split(",");
          }
      },
      created() {
        console.log(this.imgUrl);
      }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .imgReader{
    width: 140px;
    height: 90px;
    margin-right: 15px;
  }
</style>
