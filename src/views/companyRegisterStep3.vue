<template>
  <div class="RegisterStep RegisterStep3">
    <compNavigation :activeStep="activeStep"></compNavigation>
    <div class="Step3_info">
    <h2>感谢您提交注册信息！</h2>
    <p>我们将在三个工作日内审核您提交的信息。</p>
    <mu-raised-button label="返回首页" @click='returnHomePage' class="demo-raised-button register_btn2"/>
    </div>
  </div>
</template>
<script>
import compNavigation from '@/components/shared/compNavigation'
export default {
  data () {
    return {
      activeStep: 3
    }
  },
  computed: {},
  components: {
    compNavigation
  },
  methods: {
    returnHomePage () {
      this.$router.push('/')
    }
  }
}
</script>
<style>
.RegisterStep3 {
  width: 940px;
  margin:0 auto;
}
.Step3_info {
  background:#fff;
  height:380px;
  text-align: center;
}
.Step3_info h2 {
  padding-top:70px;
  line-height: 30px;
  padding-left: 50px;
  background: url(../../static/image/reg_icon_03.png) no-repeat 354px 70px;
  font-size: 18px;
  font-weight: bold;
  color: #2d2d2d;
}
.Step3_info p {
  padding:30px 0 50px;
  font-size: 14px;
  color: #444;
}

</style>
