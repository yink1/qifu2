<template>
  <div id='register'>
    <div class="loginConent por">
      <div class="poa loginBox">
          <p class="loginButton">
            <span class="active">注册账号</span>
          </p>
          <form class="loginInfo" action="">
            <p>
              <img class="loginInfoImg" src="../../static/image/icon/phoneIcon.png"/>
              <mu-text-field hintText="请输入您的手机" class="loginInfofield" :errorText="errorOfPhoneNumber" v-model="userRegister.phoneNumber" @blur="$v.userRegister.phoneNumber.$touch()"/><br/>
            </p>
            <p class="por">
              <img class="loginInfoImg" src="../../static/image/icon/checkCodeIcon.png"/>
              <mu-text-field class="checkInfo" hintText="请输入图形验证码" :errorText="errorOfImgCode" v-model="imgCodeVal" @blur="$v.imgCodeVal.$touch()"/><br/>
              <img class="poa poaImg" :src="registerCheck.data.url"/>
            </p>
            <p class="por">
              <img class="loginInfoImg" src="../../static/image/icon/checkImg.png"/>
              <mu-text-field class="checkInfo" hintText="请输入验证码" v-model="smsCodeVal"/><br/>
              <span class="poa poaImg">
                <mu-raised-button :label="labelTitle" class="demo-raised-button" :disabled="isActive" :primary="!isActive" @click="changDisable"/>
              </span>
            </p>
            <p>
              <img class="loginInfoImg" src="../../static/image/icon/nameIcon.png"/>
              <mu-text-field hintText="请输入昵称" class="loginInfofield" :errorText="errorOfName" v-model="userRegister.name" @blur="$v.userRegister.name.$touch()"/><br/>
            </p>
            <p>
              <img class="loginInfoImg" src="../../static/image/icon/password.png"/>
              <mu-text-field hintText="请设置登录密码" class="loginInfofield" type="password" :errorText="errorOfPassword" v-model="userRegister.password"  @blur="$v.userRegister.password.$touch()"/><br/>
            </p>
              <mu-raised-button label="确认提交" @click="register" class="demo-raised-button" fullWidth primary/>
          </form>
          <p class="keepLogin clearfix">
            <mu-checkbox label="保持我的登录状态" class="demo-checkbox fl"/>
            <span class="fr">立即注册</span>
          </p>
          <p class="loginNote">
                              温馨提示：未注册企服圈账号的手机号，登录时将自动注册，且代表您已同意
             <span>《企服圈用户协议》</span>
          </p>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import userService from '@/services/userService'
  import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        timer: '',
        labelTitle: '发送验证码',
        isActive: false,
        imgCodeVal: '',
        smsCodeVal: '',
        registerSmsCode: '',
        registerCheck: {},
        userRegister: {
          phoneNumber: '',
          name: '',
          password: ''
        }
      }
    },
    validations: {
      userRegister: {
        phoneNumber: {
          required,
          numeric,
          maxLength: maxLength(11),
          minLength: minLength(11)
        },
        name: {
          required,
          minLength: minLength(4)
        },
        password: {
          required,
          minLength: minLength(6)
        }
      },
      imgCodeVal: {
        required,
        numeric,
        maxLength: maxLength(4),
        minLength: minLength(4)
      }
    },
    created () {},
    mounted () {
      $('#register').css('height', localStorage.bodyHeight - 225 + 'px')
            // :获取图片验证码
      userService.GetImageCode({'username': this.userRegister.phoneNumber})
        .then(response => {
          this.registerCheck = response
          // 在图形验证码前面拼接 ‘http：//’
          this.registerCheck.data.url = 'http://' + this.registerCheck.data.url
        })
    },
    computed: {
      errorOfPhoneNumber () {
        if (!this.$v.userRegister.phoneNumber.required) {
          return '请输入手机号'
        }
        if (!this.$v.userRegister.phoneNumber.numeric) {
          return '手机号必须全为数字'
        }
        if (!this.$v.userRegister.phoneNumber.minLength) {
          return '请输入11位字符手机号'
        }
        if (!this.$v.userRegister.phoneNumber.maxLength) {
          return '请输入11位字符手机号'
        }
        return ''
      },
      errorOfName () {
        if (!this.$v.userRegister.name.required) {
          return '请输入昵称'
        }
        if (!this.$v.userRegister.name.minLength) {
          return '请输入4个字符以上的昵称'
        }
        return ''
      },
      errorOfPassword () {
        if (!this.$v.userRegister.password.required) {
          return '请输入密码'
        }
        if (!this.$v.userRegister.password.minLength) {
          return '请输入6个字符以上的密码'
        }
        return ''
      },
      errorOfImgCode () {
        if (!this.$v.imgCodeVal.required) {
          return '请输入图片验证码'
        }
        if (!this.$v.imgCodeVal.numeric) {
          return '图片验证码必须全为数字'
        }
        if (!this.$v.imgCodeVal.minLength) {
          return '请输入4位字符图片验证码'
        }
        if (!this.$v.imgCodeVal.maxLength) {
          return '请输入4位字符图片验证码'
        }
        return ''
      }
    },
    methods: {
      changDisable () {
        if (this.imgCodeVal !== this.registerCheck.data.code) {
          return ''
        }
        if (this.userRegister.phoneNumber.length !== 11) {
          return ''
        }
        var _this = this
        clearInterval(_this.timer)
        this.isActive = true
        let sec = 30
        _this.labelTitle = sec + '秒后重新发送'
        _this.timer = setInterval(function () {
          if (sec === 0) {
            _this.labelTitle = '发送验证码'
            _this.isActive = false
          } else {
            _this.labelTitle = sec - 1 + '秒后重新发送'
            sec--
          }
        }, 1000)
        userService.GetSmsCode({'PhoneNum': this.userRegister.phoneNumber})
        .then(response => {
          console.log('Smslogin response')
          console.log(response)
        })
      },
      register () {
        if (this.userRegister.phoneNumber.length !== 11) {
          return ''
        }
        alert(this.$v.$invalid)
        console.log('this.smsCodeVal')
        console.log(this.smsCodeVal)
        userService.Regist({'UserName': this.userRegister.name, 'PhoneNumber': this.userRegister.phoneNumber, 'Password': this.userRegister.password, 'Code': this.smsCodeVal})
          .then(response => {
            if (response.msg === 'ok') {
              alert('注册成功，前往登录')
              // 注册成功跳转登录页面
              this.$router.push('/login')
            } else {
              alert('注册失败')
            }
          })
      }
    }
  }
</script>
<style>
  #register{
    width:100%;
    padding-bottom:40px;
    background:#68a7b9;
  }
  .mu-raised-button.disabled {
    color: rgba(0, 0, 0, 0.87)!important;
    background-color: #e6e6e6!important;
}
  .loginConent{
    width:1200px;
    height:510px;
    padding-bottom:40px;
    margin:0 auto;
    background:url(../../static/image/loginBg.jpg) no-repeat 60px top;
  }
  .por{position: relative;}
  .poa{position:absolute;}
  .active{
    color:#FFAA00;
    text-decoration: underline;
  }
  #register .loginBox{
    right:0;
    top:50px;
    width:350px;
    padding:20px 30px;
    background:#fff;
  }
  .loginButton{
    color:#898989;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .loginButton span:hover{
    cursor:pointer
  }
  .loginNote{
    font-size: 12px;
    color:#898989;
  }
  .loginNote span{
    color:#083c6f;
    text-decoration: underline;
    cursor:pointer;
  }
  #register .loginInfo{
    margin:0px 0 20px!important;
  }
  .mu-text-field{
    font-size: 14px!important;;
  }
  .mu-checkbox-icon{
    margin-right:6px!important;
  }
   .poaImg{
     right:0;
     top:0;
     cursor:pointer;
   }
   .loginInfo img.poaImg{
     width:104px;
     height:36px;
     margin-right:0;
   }
   span.poaImg{
     display: inline-block;
     width:104px;
     height:36px;
     line-height: 36px;
     text-align: center;
     color:#fff;
     border-radius: 4px;
   }
   .poaImg .mu-raised-button.mu-raised-button-inverse,.poaImg .mu-raised-button.disabled{
     font-size: 14px;
     width:104px;
   }
   .mu-raised-button.mu-raised-button-inverse .mu-raised-button-label,.mu-raised-button.disabled .mu-raised-button-label {
    padding-right: 0px;
    padding-left: 0px;
  }
  .keepLogin{
    font-size: 12px;
    margin-bottom:15px;
  }
  .keepLogin span{
    color:#083C6F;
    text-decoration: underline;
    cursor:pointer;
    margin-top:3px;
  }
  .forget{
    margin-left:45px;
  }
  .mu-raised-button.mu-raised-button-inverse{
    background:#FFAA00;
    color:#fff!important;
    font-size: 16px;
  }
  .clearfix {
    *zoom: 1;
  }
  
  .clearfix:after {
    display: table;
    content: '';
    clear: both;
  }
  
  .auto {
    width: 960px;
    margin: 0 auto;
  }
  
  .fl {
    float: left;
  }
  
  .fr {
    float: right;
  }
</style>
