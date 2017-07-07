<template>
  <div class="companyDetailInfo">
    <div class="company_detail_logo">
      <img :src="companyInfo.LogoUrl"/>
    </div>
    <div class="company_detail_info">
      <h2>{{companyInfo.Name}}</h2>
      <a href="javascript:;" @click="opened">修改密码</a>
      <p>
        <span class="split">|</span>
        <span>(<a href="javascript:;">3</a>)</span>
      </p>
      <div class="company_add" v-if='!companyInfo.HomePageFlag'>
        您尚未提交您的主页页面，
        <router-link to="/companyCenter/homepageManagment">单击此处</router-link>设置您的主页页面
      </div>
      <div class="company_add" v-else>
        您的资料已经完善，您可以继续
        <router-link to="/companyCenter/serviceManagment">上传服务</router-link>或
        <router-link to="/companyCenter/docManagment">添加案例</router-link>
      </div>
    </div>
    <changePassword v-show="dialoged.value" :phoneNumber='companyInfo.PhoneNum' v-if='companyInfo.PhoneNum' :dialoged="dialoged" @test='closed'></changePassword>
  </div>
</template>
<script>
  import changePassword from '@/components/shared/changePassword'
  import companyService from '@/services/companyService'
  export default {
    data () {
      return {
        dialoged: {value: false},
        companyInfo: {}
      }
    },
    created () {
      this.get()
    },
    methods: {
      get () {
        companyService.getCompanyInfo()
        .then(response => {
          this.companyInfo = response.data
          console.log('getCompanyInfo')
          console.log(response)
        })
      },
      opened () {
        this.dialoged.value = true
      },
      closed () {
        this.dialoged.value = false
      }
    },
    components: {
      changePassword
    }
  }
</script>
<style>
  .company_detail_logo img{
    width: 160px;
    height: 90px;
    margin:0 20px 0px 0;
  }
  .company_detail_logo,.company_detail_info{
    float: left;
  }
  .company_detail_info h2{
    font-size: 24px;
    color: #2d2d2d;
    font-weight: bold;
    display: inline;
    margin-right: 40px;
  }
  .company_detail_info a{
    font-size: 12px;
    text-decoration: underline;
  }
  .company_detail_info p{
    background: url(../../../static/image/icon/message.png) left center no-repeat;
    padding-left: 20px;
  }
  .company_detail_info p span{
    line-height: 40px;
  }
  .company_detail_info p a{
    font-size: 14px;
  }
  .split{
    margin: 0 10px;
  }
  .company_add{
    font-size: 14px;
    color: #444;
  }
  .company_add a{
    font-weight: bold;
    font-size: 14px;
  }
</style>
