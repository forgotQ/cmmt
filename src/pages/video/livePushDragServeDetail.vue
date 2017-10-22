<template>
  <div>
    <div class='panel'>
      <panel-title>
        <el-button @click="$router.back()">返回</el-button>
      </panel-title>
      <div class="panel-body">
        <el-row>
          <el-col>
            <el-form style="background: white;" label-width="100px">
              <el-form-item label="直播服务名称:" style="width: 400px;">
                <el-input v-model="title" placeholder="请输入直播服务名称">
                </el-input>
              </el-form-item>
              <el-form-item label="直播流状态:" style="width: 400px;">
                <el-select v-model="videoState" placeholder="请选择">
                  <el-option
                    v-for="item in stateoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="拉流地址:" style="width: 400px;">
                <el-input v-model="dragStreamUrl" placeholder="请输入拉流地址">
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <submit-btn></submit-btn>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import {panelTitle, htmlEdit, submitBtn, imgReader, picsUpload} from 'components'

  export default {

      data() {
          return{
            title: '',
            dragStreamUrl: '',
            stateoptions: [{
              value: '0',
              label: '推流'
            },{
              value: '1',
              label: '拉流'
            }],
            videoState: '0',//是否允许播放
          }
      },
      components: {
        panelTitle,
        submitBtn
      }

  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
