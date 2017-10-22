<template>
  <div>
    <div class='panel'>
      <panel-title>
        <el-button @click="$router.back()">返回</el-button>
        <el-button  type="primary" size="small" @click="save">保存</el-button>
      </panel-title>
      <div class="panel-body"
           v-loading="load_data"
           element-loading-text="拼命加载中">
        <el-row>
          <el-col :span="10">
            <el-form  :model="scenicData"  label-width="100px">
              <el-form-item label="景区名称:" prop="title">
                <el-input v-model="scenicData.title" placeholder="请输入内容" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="游玩时间:" prop="sightseeingDuration">
                <el-input v-model="scenicData.sightseeingDuration" placeholder="请输入游玩时间"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="详细地址:" prop="scenicsSite">
                <el-input v-model="scenicData.scenicsSite" placeholder="请输入详细地址"  style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="经纬度:">
                <el-input v-model="scenicData.longitude" placeholder="请输入经度"  style="width: 150px;"></el-input>
                <el-input v-model="scenicData.latitude" placeholder="请输入纬度"  style="width: 150px;"></el-input>
              </el-form-item>
              <el-form-item label="图片预览:" prop="pic">
                <pics-upload :defaultImgs="defaultImgs"  :maxPostImgs="1"></pics-upload>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form :model="scenicData">
              <el-form-item label="景区介绍:" prop="bannerContent">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="scenicData.scenicsSynopsis"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, submitBtn, picsUpload} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'

  export default {
    data() {
      return {
        route_id: this.$route.params.id,
        load_data: false,
        dialogImageUrl: '',
        dialogVisible: false,
        isUse: '1',
        isEdit: false,
        scenicData: {
          title:"",
          sightseeingDuration:'',
          scenicsSite:'',
          area:"",
          pic:'',
          longitude:'',
          latitude:'',
          scenicsSynopsis:''
        },
        options:[],
        defaultImgs: [],
        editCode:''
      }
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    components: {
      panelTitle,
      submitBtn,
      picsUpload
    },
    methods: {
      htmlinput(content) {
        this.content = content
      },
      save(){

        if(this.defaultImgs.length>0){
          this.scenicData.pic = this.defaultImgs.join(',')
        }
        if(this.$route.params.id =="add"){
          this.scenicData.area = this.getCityCode
          if(!this.scenicData.area){
            this.$message.warning('请选择城市!')
            return
          }
          this.$fetch.api_raiders.scenicsAdd(this.scenicData)
            .then(({msg, retcode, retObj})=> {
              if (retcode == 0) {
                this.$message.success(msg)
              }else {
                this.$message.error(msg)
              }
            })
        }else {
          this.$fetch.api_raiders.scenicsEdit(this.scenicData)
            .then(({msg, retcode, retObj})=> {
              if (retcode == 0) {
                this.$message.success(msg)
              }else {
                this.$message.error(msg)
              }
            })
        }

      },
    },
    created() {
       if(this.$route.params.id!="add"){
         this.$fetch.api_raiders.scenicsGet({
          id:this.$route.params.id
          }).then(({msg, retcode, retObj})=> {
            this.scenicData = retObj
           console.log(this.scenicData);
           this.defaultImgs = retObj.pic.split(',')
          })
       }

    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .btnWrapper{
    text-align: center;
    padding-bottom: 20px;
  }
  .htmlWrapper{
    margin: 15px auto;
    width: 60%;
  }
</style>

