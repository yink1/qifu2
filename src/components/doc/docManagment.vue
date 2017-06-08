<template>
  <div>
    <navigation></navigation>
    <div class="bookma_cont">
      <div class="bookma_right enter_center">
        <div class="comp_upload">
          <h4>1、上传文档</h4>
          <div class="chan_file">
            <mu-raised-button label="选择文件" class="demo-raised-button chan_file_btn" @clcik="chan_file_btn"/>
            <div class="file_tit" v-if="file_success">
              <p>将文档拖拽到此处上传</p>
              <p>支持doc\docx\xls\xlsx\ppt\pptx\pdf等格式类型</p>
            </div>
            <div class="file_success">
              <p>卢杰的紫色医疗经历了什么-21世纪经济报道.pdf</p>
              <mu-linear-progress mode="determinate" :value="value" />
            </div>
          </div>
          <h4>2、完善资料</h4>
          <ul class="info_list">
            <li><span class="info_tit"><i class="color_red">* </i>案例名称</span>
              <mu-text-field label="案例名称" labelFloat/>
            </li>
            <li><span class="info_tit">简介</span>
              <mu-text-field label="文档简介" labelFloat/>
            </li>
            <li style="clear: both;"><span class="info_tit">设定标签</span>
              <div class="info_service">
                <serviceLabelFilter></serviceLabelFilter>
              </div>
            </li>
            <li class="info_check">
              <mu-checkbox label="设为服务项目所对应案例（可多选）" class="demo-checkbox" />
            </li>
            <li><span class="info_tit">设定价格</span>
              <mu-text-field label="输入财富值的数字" type="number" class="info_text" labelFloat/><em>财富值&nbsp;&nbsp;&nbsp;&nbsp;（0默认为免费）</em></li>
            <li class="bookma_btn">
              <mu-raised-button label="确认提交" class="demo-raised-button" primary/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navigation from '@/components/shared/navigation'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  export default {
    data () {
      return {
        value: 0
      }
    },
    created () {
    },
    mounted () {
      this.value = 50
    },
    computed: {
    },
    methods: {},
    components: {
      navigation,
      serviceLabelFilter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chan_file .mu-raised-button {
  background: #083C6F;
  color: #fff;
}
.chan_file .mu-linear-progress {
  width: 430px;
  margin:0 auto;
  background: #bcbcbc;
  margin-top:40px;
}
.chan_file .mu-linear-progress-determinate {
  background: #FFAA00;
}
.color_red {
  color:#FF1919;
}
.chan_file p {
  width:430px;
  text-align: center;
  margin:0 auto;
}
.bookma_cont {
  width:940px;
  margin:0 auto;
  background: #fff;
  overflow: hidden;
}
.comp_upload h4 {
  font-size: 16px;
  color:#2d2d2d;
  padding:20px 0 20px 140px;
}
.comp_upload .chan_file {
  width:500px;
  height: 200px;
  border:2px dashed #ededed;
  background:#f4f9ff;
  margin:0 auto;
  text-align: center;
}
.chan_file .chan_file_btn {
  margin:40px 0;
}
.chan_file p {
  font-size: 14px;
  color:#666;
}
.info_list {
  padding:0 140px;
}
.info_list .info_tit {
  float: left;
  width: 140px;
  margin-right: 40px;
}
.info_list .mu-text-field {
  width: 480px;
}
.info_service {
  float:left;
}
.info_list .info_text {
  width:290px;
}
.info_list em {
  font-style: normal;
  font-size: 14px;
  color:#666;
}
.bookma_btn {
  text-align: right;
  padding-bottom: 40px;
}
.bookma_btn .mu-raised-button {
  background:#083C6F;
}
.info_list .info_service {
  background:#f4f4f4;
}
.info_check {
  padding-left:180px;
}
.info_check .mu-checkbox {
  margin-top:20px;
}
.info_check .mu-checkbox-label {
  color: #FFAA00;
}
</style>
