<template>
    <div class="pupOutBg por">
            <div class="poa pupOut popPassword ">
              <h4>修改密码</h4>
              <span class="checkPhoneSpan">将发送验证码到您的手机：{{phoneNumber | replaceValue}}</span>
              <p class="clearfix">
                <span class="popTitle fl">验证码</span>
                <mu-text-field hintText="请输入验证码" class="fl" :errorText="errorOfImgCode" v-model="userChangeInfo.smsCode"  @blur="$v.userChangeInfo.smsCode.$touch()"/>
                <mu-raised-button :label="labelTitle" class="demo-raised-button clickButtonCheck fl"  :disabled="isActiveButton" :primary="!isActiveButton" @click="changDisable"/>
              </p>
              <p class="clearfix">
                <span class="popTitle fl">输入新密码</span>
                <mu-text-field hintText="请输入新密码" class="fl" type="password" :errorText="errorOfPassword" v-model="userChangeInfo.password"  @blur="$v.userChangeInfo.password.$touch()"/>
              </p>
            <div class="clearfix">
              <mu-flat-button class="fr" slot="actions" @click="closed(1)" primary label="确定"/>
              <mu-flat-button class="fr" slot="actions" primary @click="closed(0)" label="取消"/>
            </div>
            </div>
        </div>
</template>
<script>
  import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
  import userService from '@/services/userService'
  import {showNotice} from '@/common/noticeAlertFun'
  export default {
    data () {
      return {
        timer: '',
        isActiveButton: false,
        labelTitle: '获取短信验证码',
        userChangeInfo: {
          password: '',
          // 用户输入的验证码
          smsCode: ''
        }
      }
    },
    validations: {
      userChangeInfo: {
        password: {
          required,
          minLength: minLength(6)
        },
        smsCode: {
          required,
          numeric,
          maxLength: maxLength(4),
          minLength: minLength(4)
        }
      }
    },
    props: ['dialoged', 'phoneNumber'],
    created () {},
    mounted () {},
    computed: {
      errorOfPassword () {
        if (!this.$v.userChangeInfo.password.required || !this.$v.userChangeInfo.password.minLength) {
          return '请输入6个字符以上的密码'
        }
        return ''
      },
      errorOfImgCode () {
        if (!this.$v.userChangeInfo.smsCode.required || !this.$v.userChangeInfo.smsCode.numeric || !this.$v.userChangeInfo.smsCode.minLength || !this.$v.userChangeInfo.smsCode.maxLength) {
          return '请输入4位字符验证码'
        }
        return ''
      }
    },
    methods: {
      changePassword () {
        userService.changePassword({newPassword: this.userChangeInfo.password, code: this.userChangeInfo.smsCode})
        .then(response => {
          console.log(14, response)
        })
      },
      closed (i) {
        if (i === 0) {
          this.dialoged.value = false
          clearInterval(this.timer)
          this.labelTitle = '获取短信验证码'
          this.isActiveButton = false // 获取短信验证码 button置灰
        } else {
          clearInterval(this.timer)
          this.labelTitle = '获取短信验证码'
          this.isActiveButton = false // 获取短信验证码 button置灰
          this.dialoged.value = true
          if (this.errorOfImgCode !== '') {
            showNotice('请输入验证码！')
            this.dialoged.value = true
          } else if (this.errorOfPassword !== '') {
            this.dialoged.value = true
            showNotice('请输入新密码！')
          } else {
            this.dialoged.value = false
            this.changePassword()
            showNotice('修改密码成功！')
          }
        }
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
        //      请求短信验证码，需要手机号和图片验证码
        userService.GetSmsCode({'phoneNum': this.phoneNumber, 'action': 'login'})
        .then(response => {
          console.log('Smslogin response')
          console.log(response)
        })
      }
    },
    filters: {
      replaceValue (val) {
        console.log(1222, typeof (val))
        var value = val.split('')
        value.splice(3, 4, '*', '*', '*', '*')
        val = value
        return val.join('')
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
