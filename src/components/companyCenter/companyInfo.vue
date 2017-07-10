<template>
  <div class="companyInfo_box">
    <p class="companyInfo">
      <span>企业信息</span>
    </p>
    <form class="info_form">
      <div class="info_list">
        <label>企业名称</label>
        <mu-text-field hintText="企业名称" :errorText='errorOfCompanyName' v-model='addCompanyInfoData.name' v-if='!isChooseCompanyInfo'/>
        <p class="company_link company_name" v-else>{{addCompanyInfoData.name}}</p>
      </div>
      <div class="info_list">
        <label>简称</label>
        <mu-text-field hintText="企业名简称" :errorText='errorOfCompanyShortName' v-model='addCompanyInfoData.shortName'/>
      </div>
      <div class="info_list">
        <label>企业LOGO</label>
        <div class="info_button">
          <a class="select_flie select_flie_a">选择文件<br/>
            <formDataupload :uptoken="uploadToken" :trigger="trigger" :formId="browse_button" @setUploadedFileInfo="setUploadedFileInfo" class="companyPics"></formDataupload>
          </a>
          <!--<upload :browse_button='browse_button' @setUploadedFileInfo="setUploadedFileInfo" class="companyPics">
          </upload>-->
          <span>上传图片大小建议：图片比例16：9</span>
        </div>
        <mu-raised-button class="previewImgId prowed" ref='buttoned'>
        <!--首次进入服务商入驻，显示替代图片，之后显示上传的图片-->       
          <img id="previewImg" src="../../../static/image/enter_center.png" v-if="addCompanyInfoData.logoUrl.length===0"/>
          <img id="previewImg" :src="addCompanyInfoData.logoUrl" v-if="addCompanyInfoData.logoUrl.length>0"/>
        </mu-raised-button>
      </div>
      <div class="info_list">
        <label>个性域名</label>
        <div v-if='!isChooseCompanyInfo'>
          <span class="url_before">www.qifuquan.com/</span>
        <mu-text-field hintText="个性域名" :errorText='errorOfCompanyWebSite' v-model='addCompanyInfoData.webSite' class='special_url'/>
        </div>
        <div class="info_link">
          <input class="company_link" v-if='isChooseCompanyInfo' :value='addCompanyInfoData.webSite'/>
          <div class="link_introduce">
            <a href="javscript:;" v-if='isChooseCompanyInfo' @click="copyUrl()">复制链接</a>
            <a href="javascript:;" class="abort_QR" @click="showQR()" v-if='isChooseCompanyInfo'>
                                  获取企业二维码
              <div class="QR_coad" v-if="qrImgShow">
                <!--<img src="../../../static/image/enter_center.png"/>-->
                <qrcode :background="background" :size="size" :cls="qrCls" :type="type" :value="addCompanyInfoData.webSite" ref="qrcode"></qrcode>
                <mu-raised-button label="下载" class="demo-raised-button" @click="downImg()"/>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="info_list">
        <label>所在城市</label>
        <div class="info_link address_box">
          <mu-float-button icon="add" mini class="demo-float-button" v-model='addCompanyInfoData.name' @click="addArea"/>
            <cascadingAdress @confirm="confirmCity" :twoSelect="true" :showInput="false" ref="cascadingAdress" class='choose_area'></cascadingAdress>
          <span v-if="addCompanyInfoData.city.length === 0" class="note_address">添加您企业办事处所在地</span>
          <div class='area'>
            <mu-chip v-for="(chooseCity,i) in addCompanyInfoData.city" class="demo-chip"  @delete="handleClose(i)" showDelete>
              {{chooseCity}}
            </mu-chip>
          </div>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>企业简介</label>
        <div class="info_link">
          <mu-text-field hintText="企业简介" multiLine :rows="3" :rowsMax="6" :errorText='errorOfCompanyIntroduce' v-model='addCompanyInfoData.introduce'/>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>电话</label>
        <div class="info_link">
          <mu-text-field hintText="企业电话" v-model='addCompanyInfoData.phoneNum' :errorText='errorOfCompanyPhoneNumber'/>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>邮箱</label>
        <div class="info_link">
          <mu-text-field hintText="企业邮箱" v-model='addCompanyInfoData.email' :errorText='errorOfCompanyEmail'/>
        </div>
      </div>
      <div class="info_list company_intro">
        <label>收件地址</label>
        <div class="info_link">
          <mu-text-field hintText="企业收件地址" multiLine :rows="3" :rowsMax="6" v-model='addCompanyInfoData.mailingAddress' :errorText='errorOfCompanyAddress'/>
        </div>
      </div>
      <mu-raised-button label="确认提交" @click="addCompanyInfo" class="demo-raised-button submit"/>
    </form>
  </div>
</template>

<script>
// import $ from 'jquery'
  import companyService from '@/services/companyService'
  import { required, minLength, maxLength, numeric, email } from 'vuelidate/lib/validators'
  import upload from '@/components/shared/Upload'
  import Qrcode from 'v-qrcode/src/index'
  import cascadingAdress from '@/components/shared/cascadingAddress'
  import {showNotice} from '@/common/noticeAlertFun'
  import qiniuService from '@/services/qiniuService'
  import formDataupload from '@/components/shared/FormDataUpload'
//  require('file-saver/FileSaver.js')
  export default {
    data () {
      return {
        browse_button: 'fileToggled',
      //        二维码的参数
        qrCls: 'qrcode',
        qrText: 'Read VueJS Feed daily',
        size: 200,
        type: 'image',
        background: '#DDDDDD',
        uploadToken: '',
        addCompanyInfoData: {
//        上传企业信息的参数
          name: '',
          shortName: '',
          introduce: '',
          webSite: '',
          logoUrl: '',
          city: [],
          phoneNum: '',
          email: '',
          mailingAddress: ''
        },
        trigger: null,
        qrImgShow: false,
        downloadButton: false,
//      是否是更改企业信息    false为服务商入驻情况下首次上传企业信息    通过mounted获取的路由信息来判断
        isChooseCompanyInfo: true
      }
    },
    validations: {
      addCompanyInfoData: {
        name: {
          required
        },
        shortName: {
          required
        },
        introduce: {
          required
        },
        phoneNum: {
          required,
          numeric,
          maxLength: maxLength(11),
          minLength: minLength(7)
        },
        email: {
          required,
          email
        },
        mailingAddress: {
          required
        },
        webSite: {
          required
        }
      }
    },
    created () {
      this.getQiniuToken()
    },
    methods: {
      getQiniuToken () {
        qiniuService.getQiniuToken()
        .then(response => {
          this.uploadToken = response.uptoken
        })
      },
//    图片上传七牛并且预览，返回Url
      setUploadedFileInfo (buttonId, fileName, restUrl) {
        document.getElementById('previewImg').setAttribute('src', restUrl)
        this.addCompanyInfoData.logoUrl = restUrl
      },
      showQR () {
//      $('.QR_coad').toggleClass('showQR')
        this.qrImgShow = !this.qrImgShow
      },
      downImg () {
        console.log('downImg')
//      qrcode
//      var MIME_TYPE = 'image/png'
        var dlLink = document.createElement('a')
        dlLink.download = 'qifuquan.png'
        // dlLink.href = this.$refs.qrcode.$el.firstChild.toDataURL('image/png')
        dlLink.href = this.$refs.qrcode.$el.firstChild
        // dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.href].join(':')
        dlLink.dataset.downloadurl = this.$refs.qrcode.$el.firstChild.getAttribute('src').replace('data:')
        document.body.appendChild(dlLink)
        dlLink.click()
        document.body.removeChild(dlLink)
      },
      addArea () {
        this.$refs.cascadingAdress.open()
        console.log('this.addCompanyInfoData.city')
        console.log(this.addCompanyInfoData.city)
      },
      confirmCity (data) {
        console.log('data.city')
        console.log(data.city)
//      判断是否重复选择
        console.log('this.addCompanyInfoData.city.indexOf(data.city)')
        console.log(this.addCompanyInfoData.city.indexOf(data.city))
        if (!(this.addCompanyInfoData.city.indexOf(data.city) === -1)) {
//        返回-1代表数组中不存在该元素，否则返回元素在该数组中的下标
          showNotice('选择重复')
        } else if (this.addCompanyInfoData.city.length > 4) {
          showNotice('最多只能添加五个')
        } else {
//        初次进入时,数组需要赋值一下
          if (this.addCompanyInfoData.city.length === 0) {
            this.addCompanyInfoData.city = [data.city]
          } else {
            //        数组添加城市
            this.addCompanyInfoData.city.push(data.city)
          }
        }
      },
      handleClose (removeCityIndex) {
//      删除城市
        this.addCompanyInfoData.city.splice(removeCityIndex, 1)
      },
      addCompanyInfo () {
        if (this.$v.addCompanyInfoData.name.$invalid ||
          this.$v.addCompanyInfoData.shortName.$invalid ||
          this.$v.addCompanyInfoData.introduce.$invalid ||
          this.$v.addCompanyInfoData.webSite.$invalid ||
          this.$v.addCompanyInfoData.phoneNum.$invalid ||
          this.$v.addCompanyInfoData.email.$invalid ||
          this.$v.addCompanyInfoData.mailingAddress.$invalid) {
          showNotice('请完善企业信息')
          return ''
        }
        if (this.addCompanyInfoData.city.length === 0) {
          showNotice('请选择城市')
          return ''
        }
        if (this.addCompanyInfoData.logoUrl === '') {
          showNotice('请上传企业Logo')
          return ''
        }
//      关于个性域名,需要判断是服务商入驻,还是修改企业信息,如果是服务商入驻,需要拼接域名
        var companyWebSite = ''
        if (this.isChooseCompanyInfo === true) {
          companyWebSite = this.addCompanyInfoData.webSite
        } else {
          companyWebSite = 'www.qifuquan.com/' + this.addCompanyInfoData.webSite
        }

//      首先做判断,是修改企业信息,还是服务商入驻
        var editCompanyInfoProgram = {
          name: this.addCompanyInfoData.name,
          shortName: this.addCompanyInfoData.shortName,
          introduce: this.addCompanyInfoData.introduce,
          webSite: companyWebSite,
          logoUrl: this.addCompanyInfoData.logoUrl,
          city: this.addCompanyInfoData.city,
          phoneNum: this.addCompanyInfoData.phoneNum,
          email: this.addCompanyInfoData.email,
          mailingAddress: this.addCompanyInfoData.mailingAddress
        }
        companyService.editCompanyInfo(editCompanyInfoProgram)
        .then(response => {
          if (response.msg === 'ok') {
            if (this.isChooseCompanyInfo === true) {
              showNotice('企业信息修改成功')
            } else {
              this.$router.push('/companyregisterStep2')
            }
          }
        })
      },
      copyUrl () {
        var url = document.getElementsByClassName('company_link')[1]
        console.log('url')
        console.log(url)
        url.select()
        document.execCommand('copy')
        showNotice('复制成功')
      }
    },
    mounted () {
      this.trigger = this.$refs.buttoned.$el
      companyService.getCompanyInfo()
      .then(response => {
//          首次请求企业信息,赋值
        this.addCompanyInfoData.name = response.data.Name
        this.addCompanyInfoData.shortName = response.data.ShortName
        this.addCompanyInfoData.introduce = response.data.Introduce
        this.addCompanyInfoData.logoUrl = response.data.LogoUrl
        this.addCompanyInfoData.city = response.data.City
        this.addCompanyInfoData.phoneNum = response.data.PhoneNum
        this.addCompanyInfoData.email = response.data.Email
        this.addCompanyInfoData.mailingAddress = response.data.MailingAddress
//      个性域名赋值需要判断是否为修改企业信息 如果是服务商入驻，赋值则需要截取字符串
//     根据页面进来的路由信息来设置isChooseCompanyInfo值
//     /companyCenter/companyInfo为修改信息页面  进入页面时需要做一次获取企业信息请求
//     /companyregisterStep1为设置企业信息
        if (this.$route.path === '/companyCenter/companyInfo') {
          this.isChooseCompanyInfo = true
          this.addCompanyInfoData.webSite = response.data.WebSite
        } else {
          this.isChooseCompanyInfo = false
          this.addCompanyInfoData.webSite = response.data.WebSite.slice(17)
        }
      })
    },
    components: {
      upload,
      Qrcode,
      cascadingAdress,
      formDataupload
    },
    computed: {
      errorOfCompanyName () {
        if (!this.$v.addCompanyInfoData.name.required) {
          return '请输入企业名'
        }
        return ''
      },
      errorOfCompanyShortName () {
        if (!this.$v.addCompanyInfoData.shortName.required) {
          return '请输入企业简称'
        }
        return ''
      },
      errorOfCompanyIntroduce () {
        if (!this.$v.addCompanyInfoData.introduce.required) {
          return '请输入企业简介'
        }
        return ''
      },
      errorOfCompanyPhoneNumber () {
        if (!this.$v.addCompanyInfoData.phoneNum.required || !this.$v.addCompanyInfoData.phoneNum.numeric || !this.$v.addCompanyInfoData.phoneNum.minLength || !this.$v.addCompanyInfoData.phoneNum.maxLength) {
          return '请输入联系方式'
        }
        return ''
      },
      errorOfCompanyEmail () {
        if (!this.$v.addCompanyInfoData.email.required || !this.$v.addCompanyInfoData.email.email) {
          return '请输入企业邮箱'
        }
        return ''
      },
      errorOfCompanyAddress () {
        if (!this.$v.addCompanyInfoData.mailingAddress.required) {
          return '请输入企业收件地址'
        }
        return ''
      },
      errorOfCompanyWebSite () {
        if (!this.$v.addCompanyInfoData.webSite.required) {
          return '请输入个性域名'
        }
        return ''
      }
    }
  }
</script>
<style>
  .select_flie_a{
    display: block;
    overflow: hidden;
    width: 116px;
    height: 36px;
    position: relative;
    background:#083C6F;
    color:#fff;
    text-align: center;
    line-height: 36px;
    border-radius: 4px;
    margin:12px 0;
  }
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
.company_name{
  float: left;
}
.info_list{
  clear: both;
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
.previewImgId.mu-raised-button{
  float: left;
  display: block;
  width: 160px;
  height: 90px;
  margin: 10px 0 20px 40px;
  cursor:pointer!important;
  background: none
}
.previewImgId.mu-raised-button.prowed{
  cursor:text!important;
}
#previewImg{
  display: block;
  width: 160px;
  height: 90px;
}
.info_link{
  float: left;
  position: relative;
}
.choose_area{
  position: absolute;
}
.company_link{
  font-size: 14px;
  color: #2d2d2d;
  font-weight: bold;
  margin-top: 12px;
  overflow: hidden;
  background: none;
  border: none;
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
.url_before{
  display: block;
  margin:10px 20px 0 0;
  float: left;
  font-size: 14px;
  color: #2d2d2d;
  font-weight: bold;
}
.special_url{
  width:324px !important;
  float: left !important;
}
.area{
  float: left;
  width: 420px;
}
.address_box{
  width: 480px;
}
.note_address{
  float: left !important;
}
.select_flie .mu-raised-button-label{
  color: #fff !important;
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
  background-color: #f4f4f4;
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
<link href="zyzn_1.css" type="text/css" rel="stylesheet">
