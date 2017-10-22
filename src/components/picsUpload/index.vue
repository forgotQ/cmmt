<template>
  <div class="uploadPic">
    <div class="piclist">
      <ul class="upload-list">
        <li v-for="(item,index) in this.imgArr" class="picItem picAdded">
          <i class="el-icon-delete2" @click="deleteClick(index)"></i>
          <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
          <img class="picImg" :src="item" width="148px" height="148px">
        </li>
        <li class="picItem" v-show="imgArr.length<maxPostImgs">
          <div class="upload">
            <i class="el-icon-plus"></i>
            <input :id="fileId" type="file" name="uploadFiles" class="upload__input" @change="picAdd">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      id:'',
      maxPostImgs:{
        type: Number,
        default: 1
      },
      postImgUrl:{
        type: String,
        default: ''
      },
      defaultImgs:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        imgArr:[]
      }
    },
    created() {
      this.imgArr = this.defaultImgs;
    },
    watch:{
       'defaultImgs'() {
         console.log(23333);
         this.imgArr = this.defaultImgs;
      }
    },
    computed: {
      fileId(){
        return `file${this.id}`
      }
    },
    methods: {
      deleteClick(index) {
        this.imgArr.splice(index,1)
      },
      picAdd() {
        let that = this;
        var input = event.target;
        var formdata=new FormData( );
        formdata.append("uploadFiles" , document.getElementById(this.fileId).files[0]);
        formdata.append("filePath" , "business/banner/");

        this.httpHelper({
          type:'post',
          async:'true',
          data:formdata,
          url:'/apidev/upload/uploadFile',
          success:function(data){
            //上传成功
            console.log('successPic');
            var data = JSON.parse(data)
            console.log(data.retObj.picPath);
            that.defaultImgs.push(data.retObj.picPath);
          },
          error: function () {
            //上传失败
            document.getElementById(this.fileId).value = '';
          }
        })
      },
      httpHelper(params) {
        var request;
        if (XMLHttpRequest)
          request = new XMLHttpRequest();
        else
          request = new ActiveXObject("Microsoft.XMLHTTP");
        request.onreadystatechange = function () {
          if (request.readyState == 4) {
            if (request.status == 200) {
              if (params.success)
                params.success(request.responseText);
            }
            else if (parseInt(request.status / 100) == 4) {
              if (params.error)
                params.error(request.responseText);
            }
          }
        }
        request.open(params.type, params.url, params.async);
        try {
          request.send(params.data || null);
        } catch (e) {
          if (params.error)
            params.error(request.responseText);
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

  .uploadPic{
    display: flex;
    /*background: gainsboro;*/
    .picItem{
      float: left;
      margin-right: 5px;
      position: relative;
      text-align: center;
      font-size: 18px;
      color: white;
      .upload{
        position: relative;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        cursor: pointer;
        line-height: 146px;
        vertical-align: top;
        text-align: center;
        .upload__input{
          cursor: pointer;
          opacity: 0;
          position: absolute;
          left: 0px;
          top:0px;
          background: goldenrod;
          width: 148px;
          height: 148px;
          z-index: 10;
        }
        .el-icon-plus:before {
          content: "\E61C";
          color: #8c939d;
          font-size: 28px;
        }
      }
      .el-icon-delete2{
        position: absolute;
        width: 40px;
        height:40px;
        left: 0;
        right: 0;
        top: 12px;
        bottom: 0;
        margin: auto;
        font-weight: 400;
        display: none;

      }
      .el-icon-delete2:before{
        content: "\E624";
      }
      .picImg{
        border-radius: 8px;
      }
    }

    .picAdded:hover{
      .picImg{
        filter:alpha(Opacity=0);
      }
      .el-icon-delete2{
        display: block;
      }
    }
  }

</style>
