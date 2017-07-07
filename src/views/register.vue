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
              <mu-text-field class="checkInfo" hintText="请输入图形验证码" :errorText="errorOfImgCode" v-model="userRegister.imgCode" @blur="$v.userRegister.imgCode.$touch()"/><br/>
              <img class="poa poaImg" :src="imgVlidateUrl" @click='getImgVlidate'/>
            </p>
            <p class="por">
              <img class="loginInfoImg" src="../../static/image/icon/checkImg.png"/>
              <mu-text-field class="checkInfo" hintText="请输入验证码" :errorText="errorOfSmsCode" v-model="userRegister.smsCode"/><br/>
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
            <!--<mu-checkbox label="保持我的登录状态" nativeValue="保持我的登录状态" v-model="list" @change="changState" class="demo-checkbox fl"/>-->
            <span class="fr">
              <router-link to='/login'>已有账号</router-link>
            </span>
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
  import userService from '@/services/userService'
  import { required, minLength, maxLength, numeric, sameAs } from 'vuelidate/lib/validators'
  import {showNotice} from '@/common/noticeAlertFun'
  export default {
    data () {
      return {
        list: ['保持我的登录状态'],
        timer: '',
        labelTitle: '发送验证码',
        isActive: false,
        registerSmsCode: '',
          // 网络请求获得
        imgVlidateUrl: '',
        userRegister: {
          phoneNumber: '',
          name: '',
          password: '',
          // 网络请求获得
          imgVlidateCode: '',
          // 用户输入的图片验证码
          imgCode: '',
          smsCode: ''
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
          required
        },
        password: {
          required,
          minLength: minLength(6)
        },
        imgCode: {
          'sameAsCode': true,
          required,
          numeric,
          maxLength: maxLength(4),
          minLength: minLength(4),
          sameAsImgCode: sameAs('imgVlidateCode')
        },
        smsCode: {
          required,
          numeric,
          maxLength: maxLength(4),
          minLength: minLength(4)
        }
      }
    },
    created () {},
    mounted () {
      var heightCss = localStorage.bodyHeight - 200
      document.getElementById('register').style.height = heightCss + 'px'
            // :获取图片验证码
      this.getImgVlidate()
//    userService.GetImageCode({'username': this.userRegister.phoneNumber})
//      .then(response => {
//        this.imgVlidateUrl = response.data.url
//        this.userRegister.imgVlidateCode = response.data.code
//      })
    },
    computed: {
      errorOfPhoneNumber () {
        if (!this.$v.userRegister.phoneNumber.required || !this.$v.userRegister.phoneNumber.numeric || !this.$v.userRegister.phoneNumber.minLength || !this.$v.userRegister.phoneNumber.maxLength) {
          return '请输入11位字符手机号'
        }
        return ''
      },
      errorOfName () {
        if (!this.$v.userRegister.name.required) {
          return '请输入昵称'
        } else if (this.userRegister.name.replace(/^\s+|\s+$/g, '').length === 0) {
          console.log(121255, this.userRegister.name.length)
          return '请输入昵称'
        } else {
          return ''
        }
      },
      errorOfPassword () {
        if (!this.$v.userRegister.password.required || !this.$v.userRegister.password.minLength) {
          return '请输入6个字符以上的密码'
        }
        return ''
      },
      errorOfImgCode () {
        if (!this.$v.userRegister.imgCode.required || !this.$v.userRegister.imgCode.numeric || !this.$v.userRegister.imgCode.minLength || !this.$v.userRegister.imgCode.maxLength) {
          return '请输入4位字符图片验证码'
        }
        if (this.userRegister.imgCode !== this.userRegister.imgVlidateCode) {
          return '请输入正确的图片验证码'
        }
        return ''
      },
      errorOfSmsCode () {
        if (!this.$v.userRegister.smsCode.required || !this.$v.userRegister.smsCode.numeric || !this.$v.userRegister.smsCode.minLength || !this.$v.userRegister.smsCode.maxLength) {
          return '请输入4位字符短信验证码'
        }
        return ''
      }
    },
    methods: {
      changState () {},
      getImgVlidate () {
            // :获取图片验证码
        userService.GetImageCode({'username': this.userRegister.phoneNumber})
          .then(response => {
            this.imgVlidateUrl = response.data.url
            this.userRegister.imgVlidateCode = response.data.code
          })
      },
      changDisable () {
        if (this.$v.userRegister.phoneNumber.$invalid) {
          showNotice('请输入手机号码')
          return ''
        } else if (this.$v.userRegister.imgCode.$invalid) {
          showNotice('请输入图像验证码')
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
//      请求短信验证码，需要手机号和图片验证码
        userService.GetSmsCode({'PhoneNum': this.userRegister.phoneNumber, 'Action': this.userRegister.imgCode})
        .then(response => {
          console.log('Smslogin response')
          console.log(response)
          if (response.data.isMember === true) {
            showNotice('该手机号已注册，前往登录')
            this.$router.push('/login')
//          跳转之后,刷新图片验证码
            this.getImgVlidate()
          }
        })
      },
      register () {
        if (this.$v.userRegister.phoneNumber.$invalid || this.$v.userRegister.imgCode.$invalid) {
          return ''
        }
        console.log('this.smsCode')
        console.log(this.smsCode)
        userService.Regist({'UserName': this.userRegister.name, 'PhoneNumber': this.userRegister.phoneNumber, 'Password': this.userRegister.password, 'Code': this.userRegister.smsCode})
          .then(response => {
            if (response.msg === 'ok') {
              showNotice('注册成功，前往登录')
              // 注册成功跳转登录页面
              this.$router.push('/login')
            } else {
              showNotice('注册失败')
            }
          })
        // 调用获取图片验证码请求
        this.getImgVlidate()
      }
    }
  }
</script>
<style>
  #register{
    width:100%;
    padding-bottom:40px;
    background:#68a7b9;
    min-height: 725px;
    margin-bottom:-50px;
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
