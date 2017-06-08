<template>
    <div class="pupOutBg por">
            <div class="poa pupOut popPassword ">
              <h4>修改密码</h4>
              <span class="checkPhoneSpan">将发送验证码到您的手机：{{replaceValue}}</span>
              <p class="clearfix">
                <span class="popTitle fl">验证码</span>
                <mu-text-field class="fl" hintText="请输入验证码"/>
                <mu-raised-button :label="labelTitle" class="demo-raised-button clickButtonCheck fl"  :disabled="isActiveButton" :primary="!isActiveButton" @click="changDisable"/>
              </p>
              <p class="clearfix">
                <span class="popTitle fl">请输入新密码</span>
                <mu-text-field hintText="请输入新密码" class="fl"/>
              </p>
            <div class="clearfix">
              <mu-flat-button class="fr" slot="actions" @click="closed" primary label="确定"/>
              <mu-flat-button class="fr" slot="actions" primary @click="closed" label="取消"/>
            </div>
            </div>
        </div>
</template>
<script>
  export default {
    data () {
      return {
        timer: '',
        phoneNumber: 14567892343,
        isActiveButton: false,
        labelTitle: '获取短信验证码'
      }
    },
    props: ['dialoged'],
    created () {},
    mounted () {},
    computed: {
      replaceValue () {
        let val = this.phoneNumber.toString().split('')
        val.splice(3, 4, '*', '*', '*', '*')
        return val.join('')
      }
    },
    methods: {
      closed () {
        this.dialoged.value = false
        clearInterval(this.timer)
        this.labelTitle = '获取短信验证码'
        this.isActiveButton = false
      },
      changDisable () {
        var _this = this
        clearInterval(_this.timer)
        this.isActiveButton = true
        let sec = 30
        _this.labelTitle = sec + '秒后重新发送'
        _this.timer = setInterval(function () {
          if (sec === 0) {
            _this.labelTitle = '获取短信验证码'
            _this.isActiveButton = false
            clearInterval(_this.timer)
          } else {
            _this.labelTitle = sec - 1 + '秒后重新发送'
            sec--
          }
        }, 1000)
      }
    }
  }
</script>
<style>
 .pupOutBg{
  width:100%;
  height:100%;
  left:0;
  top:0;
  z-index: 1111111111111;
  position:fixed;
  background:rgba(0,0,0,0.3)
}
.pupOutBg h4{
  font-size: 22px;
  color:#2d2d2d;
}
.pupOutBg p{
  margin:15px 0 10px;
}
.popPassword p{
  margin:0;
}
.popPassword .mu-text-field{
  width:140px!important;
  }
  .popPassword{
  height:260px;
  margin-top:-130px;
} 
</style>
