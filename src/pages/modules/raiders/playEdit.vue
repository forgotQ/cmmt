<template>
  <div class="panel">
    <panel-title>
      <el-button @click="$router.back()">返回</el-button>
    </panel-title>
    <div class="panel-body">
      <el-row>
        <el-col :span="8">
          <span style="margin-right: 10px">自由行标题</span><el-input v-model="title" placeholder="请输入内容" style="width: 250px;"></el-input>
        </el-col>
        <el-col :span="8">
          <span style="margin-right: 10px">自由行英文标题</span><el-input v-model="enTitle" placeholder="请输入内容" style="width: 250px;"></el-input>
        </el-col>
        <el-col :span="8">
          <span style="margin-right: 10px">旅游地个数</span><el-input v-model="number" placeholder="请输入内容" style="width: 250px;"></el-input>
        </el-col>
      </el-row>
      <panel-title>
        <!--<el-button  type="primary" icon="plus" size="small" @click="addScenic">添加</el-button>-->
      </panel-title>
      <div :class="`jdWrapper${index}`" style="margin-top: 10px;overflow: hidden" v-for="(item,index) in scenic">
          <div class="iptWrapper">
            <span style="margin-right: 10px">D{{index+1}}</span><el-input  @focus="openDigol(`jdWrapper${index}`,index)" placeholder="点击选择景点" style="width: 250px;"></el-input>
          </div>
          <div class="contenWrapper">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              >
            </el-input>
          </div>
      </div>
    </div>
    <div class="btnWrapper">
      <el-button type="primary" @click="submit" >确 定</el-button>
    </div>
    <el-dialog title="选择景区" style="text-align: center" :visible.sync="dialogFormVisible">
      <el-col>
        <el-row>
          <div style="width: 100%;margin-bottom: 100px">
            <el-checkbox-group v-model="scenicIds" >
              <el-checkbox v-for="(item,index) in scenicArr" :key="item.title" :label="item.id" @change="handleChecked(item.id,item.title,index)">{{item.title}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>
      </el-col>
      <div class="btnWrapper">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {panelTitle, bottomToolBar} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_CITY_CODE} from 'store/getters/type'
  import {port_raiders} from 'common/port_uri'

  export default{
    data(){
       return{
         dialogFormVisible: false,
         scenicArr:[],
         scenicIds:[],
         scenicName:[],
         scenic:[],
         currentClass:'',
         currentIndex:'',
         bigArr:[],
         bigNameArr:[],
         title:'',
         enTitle:'',
         number:'',
         category:'1',
         area: '',
         typeId:'',
         editIds:[],
         editNames:[],
         editId:'',
         editJdIds:[]
       }
    },
    computed: {
      ...mapGetters({
          getCityCode:  GET_CITY_CODE
        }
      )
    },
    methods: {
      openDigol(val,index){
        this.currentClass = val
        this.currentIndex = index
        this.dialogFormVisible = true
        this.$fetch.api_raiders.scenicsList({
          area: this.getCityCode,
        }).then(({msg, retcode, retObj})=> {
          this.scenicArr = retObj
        })
      },
      sure() {
        var that = this
        this.dialogFormVisible = false
        $('.'+that.currentClass).find('input').val(that.scenicName.join(','))
        this.bigArr[this.currentIndex] = this.scenicIds
        this.bigNameArr[this.currentIndex] = this.scenicName
        this.scenicIds = []
        this.scenicName = []
      },
      handleChecked(id,title,index){

        if(this.scenicName.indexOf(title)!=-1){
          for(var i=0;i<this.scenicName.length;i++){
            if(this.scenicName[i] == title){
              this.scenicName.splice($.inArray(title,this.scenicName),1);
            }
          }
        }else{
          this.scenicName.push(title);
        }

      },
      addScenic(){
         this.scenic.push(1)
      },
      submit(){
        var that = this
        var everydayArr = []

        for(var i=0;i<this.bigArr.length;i++){
          var strObj = new Object
          strObj.title = 'D'+(i+1);
          strObj.number = i+1;
          strObj.scenicsIds = this.bigArr[i].join(',')
          strObj.scenicsNames = this.bigNameArr[i].join(',')
          strObj.id = this.editJdIds[i].join(',')
          strObj.travelId = this.editId
          strObj.everydayStrategy = $('.jdWrapper'+i).find('textarea').val()
          everydayArr.push(strObj)
        }

       /* if(this.bigArr.length>0){
          for(var i=0;i<this.bigArr.length;i++){
            var strObj = new Object
            strObj.title = 'D'+(i+1);
            strObj.number = i+1;
            strObj.scenicsIds = this.bigArr[i].join(',')
            strObj.scenicsNames = this.bigNameArr[i].join(',')
            strObj.everydayStrategy = $('.jdWrapper'+i).find('textarea').val()
            everydayArr.push(strObj)
          }
        }else {
          for(var i=0; i<this.editIds.length;i++){

            var strObj = new Object
            strObj.title = 'D'+(i+1);
            strObj.number = i+1;
            strObj.scenicsIds = this.editIds[i].join(',');
            strObj.scenicsNames = this.editNames[i].join(',');
            strObj.everydayStrategy = $('.jdWrapper'+i).find('textarea').val()
            everydayArr.push(strObj)
          }
        }*/


        $.ajax({
          contentType : 'application/json;charset=utf-8', //设置请求头信息
          data:JSON.stringify({
            id: that.editId,
            area: that.getCityCode,
            category: that.category,
            title: that.title,
            enTitle: that.enTitle,
            scenicsAmount: that.number,
            numberDay: that.$route.params.id,
            strategyEverydays: everydayArr
          }),
          url: port_raiders.travelEdit,
          type: "POST",
          dataType: "json",
          success:function (data) {
            if (retcode == 0) {
              that.$message.success(msg)
            }
          }
        })
      }
    },
    created(){
      var that = this
      this.$fetch.api_raiders.travelGet({
        id: this.$route.params.id,
      }).then(({msg, retcode, retObj})=> {

        this.editId = retObj.id
        this.title = retObj.title
        this.enTitle = retObj.enTitle
        this.number = retObj.scenicsAmount
        this.area = retObj.area
        this.typeId = retObj.numberDay
        this.scenic = retObj.strategyEverydays

        var len = retObj.strategyEverydays.length
        setTimeout(function () {
          for(var i=0;i<len;i++){
            $('.jdWrapper'+i).find('input').val(retObj.strategyEverydays[i].scenicsNames)
            $('.jdWrapper'+i).find('textarea').val(retObj.strategyEverydays[i].everydayStrategy)
           /* that.editIds.push(retObj.strategyEverydays[i].scenicsIds.split(','))
            that.editNames.push(retObj.strategyEverydays[i].scenicsNames.split(','))*/
            that.bigArr.push(retObj.strategyEverydays[i].scenicsIds.split(','))
            that.bigNameArr.push(retObj.strategyEverydays[i].scenicsNames.split(','))
            that.editJdIds.push(retObj.strategyEverydays[i].id.split(','))
          }
        },500)
      })
    },
    activated(){

    },
    watch:{
      'getCityCode'() {
        this.$fetch.api_raiders.scenicsList({
          area: this.getCityCode,
        }).then(({msg, retcode, retObj})=> {
          this.scenicArr = retObj
        })
      },
      'scenicIds'() {
        console.log(this.scenicIds);
      }
    },
    components: {
      panelTitle
    },
  }
</script>
<style >
  .iptWrapper{
    display: inline-block;
    float: left;
    width: 25%;
  }
  .contenWrapper{
    float: left;
    width: 70%;
  }
  .btnWrapper{
    text-align: center;
    padding-bottom: 20px;
  }
</style>

