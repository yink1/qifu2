<template>
<div class="servic_pop">
  <div class="requirement_box" v-if="dialog"></div>
  <div class="dialog" v-if="dialog">
    <div class="require_content"> 
    <h3 class="dialog_title">设置服务</h3>
    <div class="sele_intro sele_service">
      <div class="sele_top">
        <label class="service_type">选择服务</label>
        <serviceLabelFilter ref="serviceLabelFilter" :checkPop='true' :includeAllOption='false' @setSelectService='setSelectService' :getSelectList="serviceList"></serviceLabelFilter>
      </div>
      <div class="sele_intro sele_bottom">
        <label class="service_type">上传图片</label>
        <div class="upload_service_img">
          <div class="demo-raised-button classButtonDiv">选择文件
          <formDataupload :uptoken="uploadToken" :formId="browse_button" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
          <!--<upload :browse_button='browse_button' @setUploadedFileInfo="setUploadedFileInfo">
          </upload>-->
          <!--<input type="file" name="" class="inputFile" @change="picShow($event)"/>-->
          </div>
          <p class="pos_tit">
            <img :src="servicePic" id="show"/>
            <span class="pic_title" :class="{active : singleServiceDetail[0].inverseFlag}" v-if="singleServiceDetail[0].showNameFlag">{{selectServiceTitle}}</span>
            <a class="pic_advice">上传图片大小建议：图片比例16：9（宽大于470px）</a>
          </p>
          <div class="checkbox">
          <mu-checkbox label="显示服务标题" class="demo-checkbox" id="showNameFlag" @change="setTitleShowFlag" v-model="singleServiceDetail[0].showNameFlag"/>
          <mu-checkbox label="反色显示（深色图片建议勾选）" class="demo-checkbox check_right" id="showInserve" @change="setReserveShowFlag" v-model="singleServiceDetail[0].inverseFlag"/>
          </div>
        </div>     
      </div>
    </div>
    <div class="btn_box">
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="setSingleService" label="保存"/>
    </div>
    </div>
  </div>
</div>
</template>
<script>
import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
import { required } from 'vuelidate/lib/validators'
import upload from '@/components/shared/Upload'
import formDataupload from '@/components/shared/FormDataUpload'
import qiniuService from '@/services/qiniuService'
import { showNotice } from '@/common/noticeAlertFun'
export default {
  props: ['singleServiceDetail', 'singleIndex'],
  data () {
    return {
      dialog: false,
      browse_button: 'selServicePic',
      servicePic: '../../../static/image/enter_center.png',
      popShow: false,
      selectServiceId: 0,
      selectServiceTitle: '',
      uploadToken: '',
      serviceList: []
    }
  },
  validations: {
    servicePic: {
      required
    }
  },
  created () {
    this.getQiniuToken()
  },
  watch: {
    singleServiceDetail (val) {
      this.serviceList = []
      this.serviceList.push(val[0].serviceId)
      if (val[0].picUrl !== '') {
        this.servicePic = val[0].picUrl
      }
      this.selectServiceId = val[0].serviceId
      this.selectServiceTitle = val[0].name
    }
  },
  mounted () {
  },
  methods: {
    getQiniuToken () {
      qiniuService.getQiniuToken()
      .then(response => {
        this.uploadToken = response.uptoken
      })
    },
    open () {
      this.dialog = true
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    },
    close () {
      this.dialog = false
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      document.getElementsByTagName('html')[0].style.overflow = 'auto'
    },
    setUploadedFileInfo (buttonId, fileName, restUrl) {
      document.getElementById('show').setAttribute('src', restUrl)
      this.servicePic = restUrl
    },
    setSingleService () {
      if (this.servicePic === '../../../static/image/enter_center.png') {
        showNotice('请选择图片')
      } else if (this.selectServiceId === 0) {
        showNotice('请选择服务')
      } else {
        this.$set(this.singleServiceDetail[0], 'picUrl', this.servicePic)
        this.$set(this.singleServiceDetail[0], 'serviceId', this.selectServiceId)
        this.$set(this.singleServiceDetail[0], 'name', this.selectServiceTitle)
        this.$emit('getSingleServiceDetail', this.singleServiceDetail[0], this.singleIndex)
        this.servicePic = '../../../static/image/enter_center.png'
        document.getElementById('showNameFlag').value = false
        document.getElementById('showInserve').value = false
        this.close()
      }
    },
    popClose () {
      this.popShow = false
    },
    popShow (v) {
      this.popShow = v
    },
    setTitleShowFlag () {
      this.$set(this.singleServiceDetail[0], 'showNameFlag', this.singleServiceDetail[0].showNameFlag)
    },
    setReserveShowFlag () {
      this.$set(this.singleServiceDetail[0], 'inverseFlag', this.singleServiceDetail[0].inverseFlag)
    },
    setSelectService (list) {
      if (list.length > 0) {
        this.selectServiceId = list[0].ServiceId
        this.selectServiceTitle = list[0].ServiceName
      } else {
        this.selectServiceId = 0
        this.selectServiceTitle = ''
      }
    }
  },
  components: {
    serviceLabelFilter,
    upload,
    formDataupload
  }
}
</script>
<style>
.servic_pop{
  float: left;
  margin:0 10px ;
} 
.servic_pop .require_content{
  padding: 24px 24px 20px;
  width:758px;
}
.sele_service{
  width: 100%;
  margin-top: 20px;
}
.servic_pop .sele_list_obj li, .servic_pop .omit_more{
  width: 76px;
}
.sele_list_top{
  float:left;
}
.sele_intro{
  clear: both;
  position: relative;
}
.classButtonDiv{
  width:88px;
  height:36px;
  line-height: 36px;
  background:#083C6F;
  color:#fff;
  cursor:pointer;
  text-align: center;
  border-radius: 4px;
}
.sele_intro .service_type{
  font-size: 16px;
  color: #444;
  width: 120px;
  display: block;
  float: left;
}
.sele_service .sele_list{
  float: left;
}
.sele_bottom{
  padding-top: 20px;
}
.sele_bottom .mu-raised-button-label{
  font-size: 14px;
}
.upload_service_img{
  float: left;
  position: relative;
}
.upload_service_img p{
  margin:10px 0 20px;
}
.upload_service_img p img{
  width: 205px;
  height: 110px;
}
.upload_service_img .inputFile{
  position: absolute;
  top: 0;
  left: 0;
  width: 88px;
  height: 36px;
  opacity: 0;
}
.pic_advice{
  font-size: 12px;
  color: #ffaa00;
}
.checkbox .mu-checkbox-label{
  font-size: 14px;
}
.checkbox{
  margin-bottom: 20px;
}
.checkbox .check_right{
  margin-left: 80px;
}
.btn_box{
  clear: both;
  margin-left:529px;
}
/*子项目的弹出框*/
.list_checked_pop{
  padding-left: 16px;
  width: 470px;
  border: 1px solid #ffaa00;
  max-height: 240px;
  background-color: #fff;
  position: absolute;
  left: 10px;
}
.list_checked_pop .mu-checkbox,.list_checked_pop .mu-checkbox-wrapper{
  height: 40px;
  line-height: 40px;
}
.pos_tit{position:relative;}
.pos_tit .pic_title{position:absolute; left:0; bottom:5px; width:205px; height:25%; background:rgba(230,230,230,0.5); text-align: center; color:#000;}
.pos_tit .icon-checked{display:block;}
.pic_title.active{color:#fff;text-decoration: none;}
</style>
