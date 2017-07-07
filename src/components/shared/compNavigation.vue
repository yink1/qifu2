<template>
  <div>
    <div class="demo-step-container">
      <mu-stepper :activeStep="activeStep">
        <mu-step>
          <mu-step-label> 认证手机</mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>填写企业信息</mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>上传营业执照</mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>完成注册</mu-step-label>
        </mu-step>
      </mu-stepper>
    </div>
  </div>
</template>
<script>
export default {
  props: ['activeStep'],
// data () {
//  return {
//    activeStep: 1
//  }
// },
  computed: {},
  methods: {}
}
</script>
<style>
.RegisterStep .active {
  text-decoration: none !important;
}
.RegisterStep .mu-step-label.completed .mu-step-label-icon, .mu-step-label.active .mu-step-label-icon {
  color: #FFAA00 !important;
}
.RegisterStep .mu-step-label {
  color: #444;
}
.RegisterStep .mu-step {
  color:#898989;
}
.RegisterStep .mu-step-label-circle {
  color:#fff;
}
.RegisterStep .mu-step-label.completed .mu-step-label-circle, .mu-step-label.active .mu-step-label-circle {
  background-color: #FFAA00 !important;
  color: #fff;
}
.RegisterStep .companyInfo_box {
  width: 940px;
  margin:0 auto;
}
.RegisterStep1 .demo-step-container {
  width: 100%;
  max-width:940px !important;
  margin: auto;
}
.RegisterStep1 .demo-step-content {
  margin: 0 16px;
}
.RegisterStep1 .demo-step-button {
  margin-top: 12px;
  margin-right: 12px;
}
</style>
