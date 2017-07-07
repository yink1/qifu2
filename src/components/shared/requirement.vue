<template>
  <div class="require">
    <p class="require_title">请留下您的需求与联系方式，客服将于1小时内与您联系！</p>
    <form class="require_describe">
      <mu-text-field hintText="需求描述"  multiLine :rows="3":rowsMax="3" v-model='requireData.Description' :errorText='errorOfDescription' @focus='clickFocus'/><br/>
      <mu-text-field hintText="姓名" v-model='requireData.AuthorName' :errorText='errorOfAuthorName' @focus='clickFocus'/><br/>
      <mu-text-field hintText="公司" v-model='requireData.AuthorCompanyName' :errorText='errorOfAuthorCompanyName' @focus='clickFocus'/><br/>
      <mu-text-field hintText="联系方式" v-model='requireData.AuthorPhoneNumber' :errorText='errorOfAuthorPhoneNumber' @focus='clickFocus' v-on:blur="handleInputTelephone"/><br/>
      <div class="require_submit">
       <mu-raised-button class="demo-raised-button require_button" label="发布需求" @click="addRequirement"/>
      </div>
    </form>
  </div>
</template>
<script>
  import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
  import {showNotice} from '@/common/noticeAlertFun'
  import requirementService from '@/services/requirementService'
  import { mapGetters } from 'vuex'
  import * as types from '@/store/types'
  import router from '@/router/router'
  export default {
    props: ['companyId', 'ServiceId'],
    data () {
      return {
        requireData: {
          Description: '',
          AuthorName: '',
          AuthorCompanyName: '',
          AuthorPhoneNumber: '',
          CompanyId: '',
          AssignedServiceId: ''
        }
      }
    },
    validations: {
      requireData: {
        Description: {
          required
        },
        AuthorName: {
          required
        },
        AuthorCompanyName: {
          required
        },
        AuthorPhoneNumber: {
          required,
          numeric,
          maxLength: maxLength(11),
          minLength: minLength(11)
        }
      }
    },
    methods: {
      handleInputTelephone (tele) {
        var reform = /^1[3|4|5|8][0-9]\d{4,8}$/
        this.inputErrorText = reform.test(tele) ? '' : '手机号输入有误'
      },
      clickFocus () {
        if (!this.userLoginStatus) {
          router.replace({
            path: '/login',
            query: {
              redirect: this.$route.path
            }
          })
        }
      },
      addRequirement () {
        if (!this.userLoginStatus) {
          router.replace({
            path: '/login',
            query: {
              redirect: this.$route.path
            }
          })
          return ''
        }
        if (this.requireData.Description === '') {
          showNotice('请输入需求描述')
          return ''
        }
        if (this.requireData.AuthorName === '') {
          showNotice('请输入姓名')
          return ''
        }
        if (this.requireData.AuthorCompanyName === '') {
          showNotice('请输入公司')
          return ''
        }
        if (this.requireData.AuthorPhoneNumber === '') {
          showNotice('请输入联系方式 ')
          return ''
        }
        this.requireData.CompanyId = this.companyId
        this.requireData.AssignedServiceId = this.ServiceId
        requirementService.AddRequirement(this.requireData)
        .then(response => {
          console.log('response')
          console.log(response)
          if (response.msg === 'ok') {
            showNotice('发布成功! ')
            this.requireData.Description = ''
            this.requireData.AuthorName = ''
            this.requireData.AuthorCompanyName = ''
            this.requireData.AuthorPhoneNumber = ''
            // 子组件传递数据给父组件
            this.$emit('child-say', 'ok')
          }
        })
      }
    },
    computed: {
      ...mapGetters(
        {
          userLoginStatus: [types.GET_USER_LOGIN_STATUS]
        }
      ),
      errorOfDescription () {
        if (!this.$v.requireData.Description.required) {
          return '请输入需求描述'
        }
        return ''
      },
      errorOfAuthorName () {
        if (!this.$v.requireData.AuthorName.required) {
          return '请输入姓名'
        }
        return ''
      },
      errorOfAuthorCompanyName () {
        if (!this.$v.requireData.AuthorCompanyName.required) {
          return '请输入公司'
        }
        return ''
      },
      errorOfAuthorPhoneNumber () {
        if (!this.$v.requireData.AuthorPhoneNumber.required || !this.$v.requireData.AuthorPhoneNumber.numeric || !this.$v.requireData.AuthorPhoneNumber.minLength || !this.$v.requireData.AuthorPhoneNumber.maxLength) {
          return '请输入11位字符手机号'
        }
        return ''
      }
    }
  }
</script>
<style>
  .require{
    width: 256px;
    height: 380px;
    background-color: #fff;
    padding:16px 0;
  }
  .require .mu-raised-button.require_button{
    width:100%;
  }
  .require_title{
    line-height: 20px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
    margin-bottom: 8px;
  }
  .require_describe .mu-text-field{
    width:236px;
    margin:0 10px;
  }
  .require_describe .mu-text-field-input{
    color:#898989;
  }
  .require .mu-text-field.focus-state{
    color: #444 !important;
  }
  .require_submit{
    width: 100%;
    padding: 0 10px;
    margin-top: 20px;
  }
  .require_button{
    width: 100%;
  }
</style>
