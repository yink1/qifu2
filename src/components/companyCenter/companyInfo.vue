<template>
  <div class="companyInfo_box">
    <p class="companyInfo">
      <span>企业信息</span>
    </p>
    <form class="info_form">
      <div class="info_list">
        <label>企业名称</label>
        <mu-text-field hintText="企业名称"/>
      </div>
      <div class="info_list">
        <label>简称</label>
        <mu-text-field hintText="企业名简称"/>
      </div>
      <div class="info_list">
        <label>企业LOGO</label>
        <div class="info_button">
          <mu-raised-button label="选择文件" class="demo-raised-button select_flie" @click='fileToggle()'/><br/>
          <input type="file" name="companyPic" style="display: none;" class="companyPics">
          <span>上传图片大小建议：图片比例16：9</span>
        </div>
        <img src="../../../static/image/enter_center.png"/>
      </div>
      <div class="info_list">
        <label>个性域名</label>
        <div class="info_link">
          <p class="company_link">www.siqi.com</p>
          <div class="link_introduce">
            <a href="javscript:;">复制链接</a>
            <a href="javascript:;" class="abort_QR" @click="showQR()">
                                  获取企业二维码
              <div class="QR_coad">
                <img src="../../../static/image/enter_center.png"/>
                <mu-raised-button label="下载" class="demo-raised-button"/>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="info_list">
        <label>所在城市</label>
        <div class="info_link">
          <mu-float-button icon="add" mini class="demo-float-button"/>
          <span>添加您公司办事处所在地</span>
          <mu-chip class="demo-chip"  @delete="handleClose" showDelete>
                              上海
          </mu-chip>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>公司简介</label>
        <div class="info_link">
          <mu-text-field hintText="公司简介" multiLine :rows="3" :rowsMax="6"/>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>电话</label>
        <div class="info_link">
          <mu-text-field hintText="企业电话"/>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>邮箱</label>
        <div class="info_link">
          <mu-text-field hintText="企业邮箱"/>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>收件地址</label>
        <div class="info_link">
          <mu-text-field hintText="企业收件地址" multiLine :rows="3" :rowsMax="6"/>
        </div>
      </div>
      <mu-raised-button label="确认提交" class="demo-raised-button submit"/>
    </form>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    methods: {
      fileToggle () {
        $('.companyPics').trigger('click')
      },
      showQR () {
        $('.QR_coad').toggleClass('showQR')
      }
    }
  }
</script>

<style>
.companyInfo_box{
  width: 940px;
}
.companyInfo{
  font-size: 16px;
  color: #083c6f;
  font-weight: bold;
  border-bottom:1px solid #bebebe;
  margin-bottom: 20px;
}
.companyInfo span{
  border-bottom:2px solid #083C6F;
  height:30px;
  display: block;
  width:130px ;
  text-align: center;
}
.info_form{
  padding: 20px 140px;
  background-color: #fff;
}
.info_form .info_list{
  padding: 0;
}
.info_list>label{
  font-size: 16px;
  color: #444;
  height: 48px;
  line-height: 48px;
  float: left;
  width: 180px;
}
.info_list .mu-text-field{
  width: 480px;
  float: left;
}
.info_list .mu-text-field-hint.show{
  font-size: 14px;
}
.info_list .mu-text-field-input{
  color: #444;
  font-size: 14px;
}
.info_list .mu-raised-button,.info_button{
  width: 116px;
  float: left;
}
.info_list .mu-raised-button{
  margin: 10px 40px 10px 0;
}
.info_button>span{
 font-size: 12px;
 color: #666;
 line-height: 1.5;
}
.info_list>img{
  float: left;
  display: block;
  width: 160px;
  height: 90px;
  margin: 10px 0 20px 40px;
}
.info_link{
  float: left;
}
.company_link{
  font-size: 14px;
  color: #2d2d2d;
  font-weight: bold;
}
.link_introduce a{
  margin:20px 80px 20px 0;
  display: block;
  float: left;
  font-weight: bold;
  text-decoration: underline;
  color: #ffaa00;
}
.info_link .mu-float-button{
  margin: 0 20px 20px 0;
  float: left;
}
.info_link span{
  line-height:40px;
  display: block;
  float:right;
}
.company_intro{
  clear: both;
}
.companyInfo_box .submit{
  margin:20px 0 40px 544px;
  width: 116px;
}
.info_link .mu-chip{
  float: left;
  margin:6px;
}
/*二维码*/
.abort_QR{
  position: relative;
}
.QR_coad{
  position: absolute;
  width: 160px;
  padding: 10px;
  z-index: 999;
  left: -30px;
  display: none;
}
.QR_coad img{
  display: block;
  width: 140px;
  height: 140px;
}
.QR_coad .mu-raised-button{
  width: 100%;
}
.showQR{
  display: block;
}
</style>
