<template>
  <div class="RegisterStep RegisterStep2">
    <compNavigation :activeStep="activeStep"></compNavigation>
    <div class="register2">
            <div class="register2_box">
              <h2 class="register2_tit">您已完成注册，请上传营业执照扫描件认证您的信息</h2>
              <p class="register2_p1">示例：</p>
              <mu-raised-button class="register2_pot por" ref='imgBtn'>
                <img id="previewImg" src="../../static/image/companyHeader.jpg" v-if="previewImgUrl.length === 0"/>
                <img id="previewImg" :src="previewImgUrl" v-if="previewImgUrl.length > 0"/>
              </mu-raised-button>
              <div class="register2_xzBox cl">
                <mu-raised-button label="选择文件" class="demo-raised-button fl">
                  <formDataupload :uptoken="uploadToken" :formId="browse_button" :trigger="trigger" v-if='trigger' @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
                </mu-raised-button>
                <!--<upload :browse_button='browse_button' @setUploadedFileInfo="setUploadedFileInfo" class="companyPics">
                </upload>-->
                <p class="fl">请上传有效证件照片，证件号码必须清晰可识别。支持jpg、jpeg、png文件，最大5M。</p>
              </div>
              <div class="cl"><mu-raised-button label="确认提交" @click="editCompanyCertificationImg" class="demo-raised-button register_btn2 fl"/></div>
              <p class="register2_p3 cl"><mu-checkbox label="我接受并同意" :value="true" class="demo-checkbox fl"/><a class="fl" href="javascript:;">《************协议》</a></p>
            </div>
          </div>
  </div>
</template>
<script>
import compNavigation from '@/components/shared/compNavigation'
import upload from '@/components/shared/Upload'
import companyService from '@/services/companyService'
import qiniuService from '@/services/qiniuService'
import formDataupload from '@/components/shared/FormDataUpload'
import {showNotice} from '@/common/noticeAlertFun'
export default {
  data () {
    return {
      browse_button: 'fileToggle',
      certificationImgUrl: '',
      previewImgUrl: '',
      uploadToken: '',
//    上传等待UI是否显示
      trigger: null,
      activeStep: 2
    }
  },
  computed: {},
  components: {
    compNavigation,
    upload,
    formDataupload
  },
  created () {
    this.getQiniuToken()
    this.getCertificationImg()
  },
  mounted () {
    this.trigger = this.$refs.imgBtn.$el
  },
  methods: {
    getCertificationImg () {
      companyService.getCompanyCertificationInfo()
      .then(response => {
        console.log('getCompanyCertificationInfo')
        console.log(response)
        this.previewImgUrl = response.data.CertificationUrl
      })
    },
    getQiniuToken () {
      qiniuService.getQiniuToken()
      .then(response => {
        this.uploadToken = response.uptoken
      })
    },
//    图片上传七牛并且预览，返回Url
    setUploadedFileInfo (buttonId, fileName, restUrl) {
      document.getElementById('previewImg').setAttribute('src', restUrl)
      this.certificationImgUrl = restUrl
      console.log('this.certificationImgUrl')
      console.log(this.certificationImgUrl)
    },
//  上传三证图片
    editCompanyCertificationImg () {
      console.log('this.certificationImgUrl' + '   ' + this.certificationImgUrl + '   ' + '    ' + 'previewImgUrl' + this.previewImgUrl)
      if (this.certificationImgUrl === '' && this.previewImgUrl === null) {
        showNotice('请上传营业执照扫描件')
        return ''
      }
      companyService.editCompanyCertification({certificationUrl: this.certificationImgUrl})
      .then(response => {
        console.log('editCompanyCertificationImg response')
        console.log(response)
        if (response.msg === 'ok') {
          this.$router.push('/companyregisterStep3')
        }
      })
    }
  }
}
</script>
<style>
.RegisterStep2 {
  width: 940px;
  margin: 0 auto;
}
.dn{display: none;
    margin:50px auto;
}
.RegisterStep2 .mu-raised-button.mu-raised-button-inverse {
  background:#083C6F;
}
.mu-checkbox-label {
  font-size: 12px;
  color:#444;
}
.cl {
  overflow: hidden;
}
.fl {
  float:left;
}
.fr {
  float:right;
}
.register2 {
  padding:40px 0 40px 280px;
  background: #fff;
}
.register2 .register2_tit {
  font-size: 18px;
  font-weight: bold;
  color: #2d2d2d;
  line-height: 26px;
}
.register2 .register2_p1 {
  font-size: 14px;
  color:#444444;
  padding-bottom: 5px;
}
.register2 .register2_pot {
  position: relative;
  background: #f2f9ff;
  margin-bottom:20px;
  width: 280px;
  height: 158px;
  border:1px solid #e6e6e6;
  overflow: hidden;
  text-align: center;
}
.register2 .register2_pot img {
  max-height: 100%;
  max-width: 100%;
  z-index: 2;
}
.register2_pot .mu-circular-progress {
  position:absolute;
  margin-top:42px;
  left:40%;
}
.register2_xzBox {
  margin-bottom:30px;
}
.register2_xzBox input {
  width: 120px;
  height: 36px;
  text-align: center;
  background:#083c6f;
  font-size: 14px;
  color:#fff;
  margin-right: 10px;
}
.register2_xzBox p {
  width: 310px;
  font-size: 12px;
  color:#666;
  padding-left:10px;
}
.register2 .register2_p2 {
  padding-top:20px;
  font-size: 14px;
  color: #444;
  font-weight:bold;
}
.register2 .register2_p2 span {
  margin-right: 20px;
}
.register_btn2 {
  width: 280px !important;
}
.register2_p3 {
  margin-top:20px;
}
.register2 .register2_p2 a,.register2_p3 a {
  font-size: 12px;
  font-weight: normal;
  color:#083c6f;
  text-decoration: underline;
}
.register2 .register2_btn {
  margin:30px 0 20px 0;
  color: #fff;
}
.register2_p3 span {
  padding-left:18px;
  font-size: 12px;
  color: #444;
}

</style>
