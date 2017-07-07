<template>
  <div id='login'>
    <div class='loginConent por'>
      <div class='poa loginBox'>
          <p class='loginButton'>
            <span :class='{active: isActive}' @click='changeBoxPhone'>手机动态登录</span>
            <i>|</i>
            <span :class='{active: !isActive}' @click='changeBoxPass'>账号密码登录</span>
          </p>
          <form class='loginInfo' action='' v-if='loginType'>
            <p>
              <img class='loginInfoImg' src='../../static/image/icon/phoneIcon.png'/>
              <mu-text-field hintText='请输入您的手机' class='loginInfofield' :errorText='errorOfPhoneNumber' v-model='userLogin.phoneNumber' @input='$v.userLogin.phoneNumber.$touch()'/><br/>
            </p>
            <p>
              <img class='loginInfoImg' src='../../static/image/icon/password.png'/>
              <mu-text-field hintText='密码' class='loginInfofield' type='password' :errorText='errorOfPassWord' v-model='userLogin.password' @blur='$v.userLogin.password.$touch()'/><br/>
            </p>
              <mu-raised-button label='登录' @click='login' class='demo-raised-button mainButton' fullWidth primary/>
          </form>
          <form class='loginInfo' action='' v-else>
            <p>
              <img class='loginInfoImg' src='../../static/image/icon/phoneIcon.png'/>
              <mu-text-field hintText='请输入您的手机' class='loginInfofield' :errorText='errorOfPhoneNumber' v-model='userLogin.phoneNumber' @blur='$v.userLogin.phoneNumber.$touch()'/><br/>
            </p>
            <p class='por' v-if="isImgCodeShow">
              <img class='loginInfoImg' src='../../static/image/icon/checkCodeIcon.png'/>
              <mu-text-field class='checkInfo' hintText='请输入图形验证码' :errorText='errorOfImgCode' v-model='userLogin.imgCode' @blur='$v.userLogin.imgCode.$touch()'/><br/>
              <img class='poa poaImg' :src='imgVlidateUrl' @click='getImgVlidate'/>
            </p>
            <p class='por'>
              <img class='loginInfoImg' src='../../static/image/icon/checkImg.png'/>
              <mu-text-field class='checkInfo' hintText='请输入验证码' v-model='userLogin.smsCode'/><br/>
              <span class='poa poaImg'>
                <mu-raised-button :label='labelTitle' class='demo-raised-button'  :disabled='isActiveButton' :primary='!isActiveButton' @click='changDisable'/>
              </span>
            </p>
              <mu-raised-button label='登录 / 注册' @click='loginWithSms' class='demo-raised-button mainButton' fullWidth primary/>
          </form>
          <p class='keepLogin clearfix'>
            <mu-checkbox label='保持我的登录状态' nativeValue="保持我的登录状态" v-model="list" @change="changState" class='demo-checkbox fl'/>
            <span class='fl forget' v-show='loginType' @click="changeTab">
                                    忘记密码？
           </span>
            <span class='fr'><router-link to='/register'>立即注册</router-link></span>
          </p>
          <p class='loginNote'>
                              温馨提示：未注册企服圈账号的手机号，登录时将自动注册，且代表您已同意
             <span>《企服圈用户协议》</span>
          </p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import userService from '@/services/userService'
  import { required, minLength, maxLength, numeric, sameAs } from 'vuelidate/lib/validators'
  import * as types from '@/store/types'
  import {showNotice} from '@/common/noticeAlertFun'
  export default {
    data () {
      return {
        timer: '',
        labelTitle: '发送验证码',
        isActive: false,
        isActiveButton: false,
        loginType: true,
        imgVlidateUrl: '',
        loginCheck: {},
//      是否显示图形验证码  第一次短信登录不显示图形验证码    之后显示
        isImgCodeShow: false,
        count: 0,
        list: ['保持我的登录状态'],
        userLogin: {
          phoneNumber: '',
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
      userLogin: {
        phoneNumber: {
          required,
          numeric,
          maxLength: maxLength(11),
          minLength: minLength(11)
        },
        password: {
          required,
          minLength: minLength(6)
        },
        imgCode: {
          required,
          numeric,
          maxLength: maxLength(4),
          minLength: minLength(4),
          sameAsImgCode: sameAs('imgVlidateCode')
        }
      }
    },
    mounted () {
    //  $('#login').css('height', localStorage.bodyHeight - 225 + 'px')
      var heightCss = localStorage.bodyHeight - 200
      document.getElementById('login').style.height = heightCss + 'px'
      console.log(heightCss)
      // 调用获取图片验证码请求
//    this.getImgVlidate()
    },
    created () {},
    computed: {
      errorOfPhoneNumber () {
        if (!this.$v.userLogin.phoneNumber.required || !this.$v.userLogin.phoneNumber.numeric || !this.$v.userLogin.phoneNumber.minLength || !this.$v.userLogin.phoneNumber.maxLength) {
          return '请输入11位字符手机号'
        }
        return ''
      },
      errorOfPassWord () {
        if (!this.$v.userLogin.password.required || !this.$v.userLogin.password.minLength) {
          return '请输入6个字符以上的密码'
        }
        return ''
      },
      errorOfImgCode () {
        if (!this.$v.userLogin.imgCode.required || !this.$v.userLogin.imgCode.numeric || !this.$v.userLogin.imgCode.minLength || !this.$v.userLogin.imgCode.maxLength) {
          return '请输入4位字符图片验证码'
        }
        if (this.userLogin.imgCode !== this.userLogin.imgVlidateCode) {
          return '请输入正确的图片验证码'
        }
        return ''
      }
    },
    methods: {
      changeTab () {
        this.isActive = true
        this.loginType = false
      },
      changState () {
        if (this.list.length > 0) {
//          return ''
        } else {
//        this.userLogin = {
//          phoneNumber: '',
//          password: '',
//          imgVlidateCode: '',
//          // 用户输入的图片验证码
//          imgCode: '',
//          smsCode: ''
//        }
//        this.setUserLoginInfo(this.userLogin)
        }
      },
      getImgVlidate () {
              // :获取图片验证码
        userService.GetImageCode({'username': this.userLogin.phoneNumber})
          .then(response => {
            this.imgVlidateUrl = response.data.url
            this.userLogin.imgVlidateCode = response.data.code
          })
      },
      changeBoxPhone () {
        this.isActive = true
        this.loginType = false
        this.isActiveButton = false
        clearInterval(this.timer)
        this.labelTitle = '发送验证码'
      },
      changeBoxPass () {
        this.isActive = false
        this.loginType = true
        this.isActiveButton = false
      },
      changDisable () {
        if (this.isImgCodeShow) {
          if (this.$v.userLogin.phoneNumber.$invalid || this.$v.userLogin.imgCode.$invalid) {
            return ''
          }
        } else {
          if (this.$v.userLogin.phoneNumber.$invalid) {
            return ''
          }
        }
//      if (this.isImgCodeShow || this.$v.userLogin.phoneNumber.$invalid || this.$v.userLogin.imgCode.$invalid) {
//        return ''
//      }
        var _this = this
        clearInterval(_this.timer)
        this.isActiveButton = true
        let sec = 30
        _this.labelTitle = sec + '秒后重新发送'
        _this.timer = setInterval(function () {
          if (sec === 0) {
            _this.labelTitle = '发送验证码'
            _this.isActiveButton = false
            clearInterval(_this.timer)
          } else {
            _this.labelTitle = sec - 1 + '秒后重新发送'
            sec--
          }
        }, 1000)
        userService.GetSmsCode({'PhoneNum': this.userLogin.phoneNumber, 'action': 'login'})
        .then(response => {
          console.log('Smslogin response')
          console.log(response)
          if (response.data.isMember === false) {
            showNotice('该手机号尚未注册，前往注册')
            this.$router.push('/register')
          }
        })
      },
      login () {
        if (this.$v.userLogin.phoneNumber.$invalid || this.$v.userLogin.password.$invalid) {
          return ''
        }
//      grant_type=password&username=15026736556&password=123456
        userService.Login({'grant_type': 'password', 'username': this.userLogin.phoneNumber, 'password': this.userLogin.password})
          .then(response => {
            this.setUserLoginInfo(response)
            console.log('Login response')
            console.log(response)
            // todo:获取用户信息
            userService.GetMemberInfo()
              .then(response => {
                this.SetUserData(response.data)
                console.log('userService.UserInfo')
                console.log(response)
                // 获取地址栏参数
                if (this.$route.query.redirect === undefined) {
                  this.$router.push('/')
                } else {
                  this.$router.push(this.$route.query.redirect)
                }
              })
          })
      },
      loginWithSms () {
        if (this.isImgCodeShow) {
          if (this.$v.userLogin.phoneNumber.$invalid || this.$v.userLogin.imgCode.$invalid) {
            return ''
          }
        } else {
          if (this.$v.userLogin.phoneNumber.$invalid) {
            return ''
          }
        }
//      grant_type=password&username=15026736556&password=0414&client_id=SMS
        userService.Login({'grant_type': 'password', 'username': this.userLogin.phoneNumber, 'password': this.userLogin.smsCode, 'client_id': 'SMS'})
          .then(response => {
            this.setUserLoginInfo(response)
            console.log('Login response666')
            // todo:获取用户信息
            userService.GetMemberInfo()
              .then(response => {
                this.SetUserData(response.data)
                console.log('userService.UserInfo667')
                console.log(response)
                // 获取地址栏参数
                if (this.$route.query.redirect === undefined) {
                  this.$router.push('/')
                  console.log('userService.UserInfo668')
                } else {
                  this.$router.push(this.$route.query.redirect)
                  console.log('userService.UserInfo669')
                }
              })
          })
        this.isImgCodeShow = true
        // 调用获取图片验证码请求
        this.getImgVlidate()
      },
      ...mapMutations({
        setUserLoginInfo: [types.SET_USER_LOGIN_INFO],
        SetUserData: [types.SET_USER_DATA]
      })
    }
  }
</script>
<style scope>
  #login{
    width:100%;
    padding-bottom:40px;
    background:#68a7b9;
    min-height: 725px;
    margin-bottom:-50px;
  }
  .mainButton{
    margin-top:10px!important;
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
  .loginBox{
    right:0;
    top:50px;
    width:350px;
    padding:30px;
    background:#fff;
    
  }
  .loginButton{
    color:#898989;
    font-size: 16px;
    font-weight: bold;
  }
  .loginButton span:hover{
    cursor:pointer
  }
  .loginButton i{
    margin:0 35px;
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
  .loginInfo p .loginInfoImg{
    position:absolute;
    left:5px;
    top:14px;
  }
  .loginInfo{
    margin:20px 0 20px!important;
  }
  .loginInfo p{
    width:290px;
    height:56px;
    position:relative
  }
  .loginInfo .loginInfofield{
    margin-left:30px;
  }
  .mu-text-field{
    font-size: 14px!important;;
  }
  .mu-checkbox-icon{
    margin-right:6px!important;
  }
  .mu-text-field.checkInfo{
    width:139px!important;
    margin-left: 32px;
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
   .poaImg .mu-raised-button.mu-raised-button-inverse{
     font-size: 14px;
     width:104px;
   }
   .mu-raised-button.mu-raised-button-inverse .mu-raised-button-label {
    vertical-align: middle;
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
  .keepLogin span a{
    color:#083C6F;
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
