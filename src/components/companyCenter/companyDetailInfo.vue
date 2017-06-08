<template>
  <div class="companyDetailInfo">
    <div class="company_detail_logo">
      <img src="../../../static/image/enter_center.png"/>
    </div>
    <div class="company_detail_info">
      <h2>上海云云企业技术有限公司</h2>
      <a href="javascript:;">修改密码</a>
      <p>
        <span class="split">|</span>
        <span>(<a href="javascript:;">3</a>)</span>
      </p>
      <div class="company_add">
        您的资料已经完善，您可以继续<a href="javascript">上传服务</a>或<a href="javascript:;">添加案例</a>
      </div>
    </div>
  </div>
</template>
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
