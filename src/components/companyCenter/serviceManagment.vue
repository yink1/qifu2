<template>
  <div id="serviceManagement">
    <ul class="collect_type home_nav">
      <li class="active fl">添加服务</li>
      <li class="fl home_remark">（依据下方模板添加服务）</li>
    </ul>
    <div class='Management_box case_box1'>
    <h2>选择您的服务分类</h2>
    <serviceLabelFilter class="changWidth" :includeAllOption='false' :getSelectService='LabelId' @getServiceInfo='getServiceInfo'></serviceLabelFilter :showMore='showMore'>
    <h2>设定你的服务页面</h2>
    <div class='management_content'>
    <img src="../../../static/image/managementMainHear.png" alt="" />
    <div :class="['showImg', 'por','togglePic',{uploadTrue: servicePic !== ''}]">
      <img id="show" src="" alt="" v-show="servicePic !== ''"/>
      <div class="hocoll_logo">
        <div class="hoco_logoimg">
          <img :src="logoUrl"></div>
        <p>收藏</p>        
      </div>
      <div class="filein_upfile demo-flat-button-container">
        <!--<mu-flat-button label="" class="demo-flat-button" id="serviceTopPic" v-show="servicePic == ''">
          <img v-show="imgChange" src="../../../static/image/noteImg.png" alt="" />
          <formDataupload :uptoken="uploadToken" :formId="topFormId" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
        </mu-flat-button>-->
         <a href="javascript:;" class="filein_ppt filein_ppt1" id='serviceTopPic' v-show="servicePic == ''">
           <span>
             <formDataupload :uptoken="uploadToken" :formId="topFormId" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
           </span>
         </a>
        <!--<upload :browse_button='browse_button1' @setUploadedFileInfo="setUploadedFileInfo">
        </upload>-->
      </div>
      <a href="javascript:;" class="poa replace_ment" v-if="servicePic != ''">替换图片
        <formDataupload :uptoken="uploadToken" :formId="changeform" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
      </a>
      <!--<div class="poa replaceImgButton" v-show="servicePic != ''">
         <mu-raised-button class="demo-raised-button" label="替换图片" id="changeServiceTopPic">
           <img src="../../../static/image/editHover.png" alt="" />
           <formDataupload :uptoken="uploadToken" :formId="changeform" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
        </mu-raised-button>
        <!--<upload :browse_button='browse_button2' @setUploadedFileInfo="setUploadedFileInfo">
        </upload>-->
      <!--</div>-->
    </div>
    <div class="clearfix uploadInfo">
    	<div :class='["fl", "uploadBox", "togglePic", {uploadTrue: !introBlank}]'>
    	  <img id="showIntro" :src="serviceIntroPicShow" alt="" v-show="!introBlank"/>
    	  <div v-if="ok" class="por">
    	   <h3 v-show="introBlank">选取您上传的介绍文件类型</h3>
  	     <div class="filein_upfile  demo-flat-button-container" v-show="introBlank">
            <uploadBaidu :showBtn="false" @setUploadedFileInfo="setUploadedBaiduFileInfo" :fileFormat='true' :accept='baiduAccept'></uploadBaidu>
            <a href="javascript:;" class="filein_ppt filein_ppt1" id='introPicUp'>
              <span>
                <formDataupload :uptoken="uploadToken" :formId="introFormId" @setUploadedFileInfo="setUploadedIntroFileInfo"></formDataupload>
              </span>
            </a>
          <a href="javascript:;" class="filein_img filein_img1" id="videoUpBtn" @click='setBtnId'><span></span></a>
            <!--<mu-flat-button label="" class="demo-flat-button" id='introPicUp'>
              <img src="../../../static/image/uplod_imgblue.png" alt="" />
              <formDataupload :uptoken="uploadToken" :formId="introFormId" @setUploadedFileInfo="setUploadedIntroFileInfo"></formDataupload>
            </mu-flat-button>-->
            <!--<mu-flat-button label="" class="demo-flat-button" id="videoUpBtn" @click='setBtnId'>
              <img src="../../../static/image/video.png" alt="" />
            </mu-flat-button>-->
            <!--<upload :browse_button='browse_button3' @setUploadedFileInfo="setUploadedIntroFileInfo">
            </upload>-->
         </div>
         <a href="javascript:;" class="poa replace_ment" @click="changeIntro" v-if="!introBlank">替换内容</a>
        <!--缓冲时的圆圈-->
        </div>
        <div v-else class="por">
          <div class="poa progressBox">
            <mu-circular-progress :size="60" color="#ffaa00" :strokeWidth="5"/>            
            <p>正在上传中...</p>
          </div>
          <div class="poa replaceButton">
            <mu-raised-button class="demo-raised-button" label="替换内容">
              <img src="../../../static/image/edit_black.png" alt="" />
              <input type="file" class="file-button">
            </mu-raised-button>
          </div>
        </div>
    	</div>
    	<div class="fl uploadTitle">
  	    <div>
  	      <p class="ph4">
  	        <mu-text-field hintText="单击此处输入标题" v-model='serviceTitle'/><br/>
  	      </p>
  	      <div class="imgFooter">
            <img class="" src="../../../static/image/temp/companyIcon.png" height="16" width="16" alt="">
            <span>{{companyInfo.Name}}</span>
          </div>
          <h4>服务商所在地：{{city}}</h4>
          <div class="contentInfo">
            <mu-text-field hintText="单击此处输入服务简介" multiLine :rows="3" :rowsMax="6" v-model='serviceIntro'/><br/>
          </div>
          <mu-raised-button class="demo-raised-button changBg" label="咨询TA" icon="phone" disabled primary/>
          <mu-raised-button class="demo-raised-button" label="发布需求" icon="add" disabled primary @click="open"/>
  	    </div>
    	</div>
    </div>
    <div class="required" v-if="dialog"></div>
    <div class="requireCon" v-if="dialog">
      <img src="../../../static/image/del.png" alt="" @click="close"/>
      <requirement></requirement>
    </div>
    <div class='service_layout'>
      <h3 class="service_sele">服务详情<span class="service_select">(<span class="notice">*</span>必填)</span></h3>
      <companyServiceDetail v-for="detailData,index in detailDataList" :detailData='detailData' :detailIndex='index' @editDetailData='editDetailData' @videoUploadBtnClick='videoUploadBtnClick'></companyServiceDetail>
      <div class="service_Summary">
        <h3 class="service_sele">相关案例<span class="service_select">(非必填)</span></h3>
        <companyCase v-for="doc,index in docList" @editDoc="editDoc" :docList="docList" @setDoc='setDoc' :docIndex="index"></companyCase>
      </div>
      <!--<div class="no_comment">
        <comment></comment>
      </div>-->
      </div>
      </div>
      <div class="clearfix btn_service">
        <mu-raised-button label="确认提交" class="demo-raised-button fr submit"  @click='submitConfirm'/> 
      </div>
    </div>
  <div class="pof" v-show="dialogShowed">
       <div class="poa outBox">
         <h5>为您的服务上传一张封面图吧，若无图片的话无法在列表页面显示</h5>
         <div class="uploadBoxCheck por">
           <img src="" id="showBoxIntro" alt="" width="100%" height="100%"/>
           <p class="uploadBoxHead" v-if="showUploadP">请上传封面图</p>
           <p v-if="showUploadP">图片大小建议：图片比例16：9（宽>470px）</p>
           <p class="poa uploadBoxTitle" v-show='checkList.length'>
                                    显示标题
           </p>
         </div>
        <mu-raised-button class="demo-raised-button divButton" label="上传封面（比例16：9）">
          <formDataupload :uptoken="uploadToken" :formId="introBoxFormId" @setUploadedFileInfo="setUploadedIntroFileInfoBox"></formDataupload>
        </mu-raised-button>
         <!--<mu-checkbox label="显示服务标题" v-model="checkList" class="demo-checkbox showServiceTitle"/>
         <mu-checkbox label="反色显示（深色图片建议勾选）" class="demo-checkbox"/> <br/>-->
         <div class="clearfix">
           <mu-flat-button class="fr buttonClick" label="保存" slot="actions" primary @click="submitServiceDetail"/>
           <mu-flat-button class="fr buttonClick" label="取消" slot="actions" primary @click="closed"/>
         </div>         
       </div>
    </div>
  </div>
</template>
<script>
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import requirement from '@/components/shared/requirement'
  import companyServiceDetail from '@/components/companyCenter/companyServiceDetail'
  import companyCase from '@/components/companyCenter/companyCase'
  import docSummary from '@/components/company/docSummary'
  import comment from '@/components/shared/comment'
  import upload from '@/components/shared/Upload'
  import formDataupload from '@/components/shared/FormDataUpload'
  import service from '@/services/service'
  import { showNotice } from '@/common/noticeAlertFun'
  import { uploadVideo } from '@/../static/tencentUpload.js'
  import qiniuService from '@/services/qiniuService'
  import uploadBaidu from '@/components/shared/uploadBaidu'
  import docService from '@/services/docService'
  import companyService from '@/services/companyService'
  export default {
    data () {
      return {
        showMore: true,
        showUploadP: true,
        imgChange: true,
        dialog: false,
        dialoged: false,
        dialogShowed: false,
        topPopup: false,
        introBlank: true,
        ok: true,
        checkList: [],
        baiduAccept: 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
        city: '',
        upBtnId: 'videoUpBtn',
        logoUrl: '../../../static/image/logoStyle.png',
        uploadImgList: ['../../../static/image/ppt.png',
          '../../../static/image/uplod_imgblue.png',
          '../../../static/image/video.png'
        ],
        serviceTitle: '',
        serviceIntro: '',
        servicePic: '',
        serviceType: '',
        serviceVendor: '',
        serviceIntroPic: '',
        serviceIntroPicShow: '',
        serviceIntroType: '',
        serviceIntroVendor: '',
        browse_button1: 'serviceTopPic',
        browse_button2: 'changeServiceTopPic',
        browse_button3: 'introPicUp',
        detailDataList: [{
          id: '',
          imgBtnId: 'detailImg1',
          type: '',
          content: '',
          status: 0
        }],
        docList: [{id: '',
          title: '',
          documentId: '',
          format: '',
          picUrl: '',
          introduce: '',
          favoriteFlg: false,
          userName: '',
          clickCount: 0
        }],
        uploadToken: '',
        topFormId: 'serviceTopPicForm',
        introBoxFormId: 'introBoxFormId',
        changeform: 'changeServiceTopPicForm',
        introFormId: 'introPicForm',
        changeintroFormId: 'changeintroForm',
        introId: 0,
        videoFileId: '',
        detailIndex: 0,
        id: '',
        dataList: [],
        companyInfo: {},
        LabelId: 0,
        serviceDisplayPic: ''
      }
    },
    components: {
      serviceLabelFilter,
      requirement,
      companyServiceDetail,
      companyCase,
      docSummary,
      comment,
      upload,
      formDataupload,
      uploadBaidu
    },
    created () {
      this.getQiniuToken()
    },
    mounted () {
      uploadVideo(this.upBtnId, true, true, '/api/payment/videoCallback', this)
      var id = ''
      if (this.$route.params.id) {
        console.log('this.$route.params.id')
        console.log(this.$route.params.id)
        id = this.$route.params.id
      }
      this.get(id)
      this.getCompanyInfo()
    },
    watch: {
      videoFileId (val) {
        if (val === 'compute' && this.upBtnId === 'videoUpBtn') {
          this.introBlank = false
          this.serviceIntroPicShow = '../../../static/image/service_main.gif'
        } else if (val !== 'compute' && this.upBtnId === 'videoUpBtn') {
          this.serviceIntroType = 'video'
          this.serviceIntroVendor = 'tencent'
          this.serviceIntroPic = val
          this.serviceIntroPicShow = '../../../static/image/videoDone.png'
        } else if (this.upBtnId !== 'videoUpBtn' && val === 'compute') {
          this.detailDataList[this.detailIndex].content = val
          this.detailDataList[this.detailIndex].type = 'video'
        } else if (this.upBtnId !== 'videoUpBtn' && val !== 'compute') {
          this.detailDataList[this.detailIndex].content = val
          this.detailDataList[this.detailIndex].type = 'video'
          this.detailDataList[this.detailIndex].status = 202
        }
      }
    },
    computed: {
    },
    methods: {
      closed () {
        this.dialogShowed = false
      },
      getQiniuToken () {
        qiniuService.getQiniuToken()
        .then(response => {
          this.uploadToken = response.uptoken
        })
      },
      getValue (e) {
        console.log(e.target.value)
      },
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      setUploadedFileInfo (buttonId, fileName, restUrl) {
        console.log('restUrl')
        console.log(restUrl)
        document.getElementById('show').setAttribute('src', restUrl)
        this.servicePic = restUrl
        this.serviceType = 'pic'
        this.serviceVendor = 'qiniu'
      },
      setUploadedIntroFileInfo (buttonId, fileName, restUrl) {
        this.serviceIntroPicShow = restUrl
        this.serviceIntroPic = restUrl
        this.introBlank = false
        this.serviceIntroType = 'pic'
        this.serviceIntroVendor = 'qiniu'
      },
      setUploadedIntroFileInfoBox (buttonId, fileName, restUrl) {
        document.getElementById('showBoxIntro').setAttribute('src', restUrl)
        this.showUploadP = false
        this.serviceDisplayPic = restUrl
      },
      editDetailData (operateType, itemIndex) {
        var item1 = ''
        var item2 = ''
        if (operateType === 'up' && itemIndex !== 0) {
          item1 = this.detailDataList[itemIndex - 1]
          item2 = this.detailDataList[itemIndex]
          this.$set(this.detailDataList, itemIndex, item1)
          this.$set(this.detailDataList, itemIndex - 1, item2)
        } else if (operateType === 'down' && itemIndex !== this.detailDataList.length - 1) {
          item1 = this.detailDataList[itemIndex]
          item2 = this.detailDataList[itemIndex + 1]
          this.$set(this.detailDataList, itemIndex, item2)
          this.$set(this.detailDataList, itemIndex + 1, item1)
        } else if (operateType === 'delete') {
          if (this.detailDataList.length > 1) {
            this.detailDataList.splice(itemIndex, 1)
          } else {
            this.detailDataList = [{
              id: '',
              imgBtnId: 'detailImg1',
              type: '',
              content: '',
              status: 0
            }]
          }
        } else if (operateType === 'add') {
          this.detailDataList.push({
            id: '',
            imgBtnId: 'detailImg' + (itemIndex + 2),
            type: '',
            content: '',
            status: 0
          })
        }
      },
      editDoc (operateType, itemIndex) {
        var item1 = ''
        var item2 = ''
        if (operateType === 'up' && itemIndex !== 0) {
          item1 = this.docList[itemIndex - 1]
          item2 = this.docList[itemIndex]
          this.$set(this.docList, itemIndex, item1)
          this.$set(this.docList, itemIndex - 1, item2)
        } else if (operateType === 'down' && itemIndex !== this.docList.length - 1) {
          item1 = this.docList[itemIndex]
          item2 = this.docList[itemIndex + 1]
          this.$set(this.docList, itemIndex, item2)
          this.$set(this.docList, itemIndex + 1, item1)
        } else if (operateType === 'delete') {
          if (this.docList.length > 1) {
            this.docList.splice(itemIndex, 1)
          } else {
            this.docList = [{id: '',
              title: '',
              documentId: '',
              format: '',
              picUrl: '',
              introduce: '',
              favoriteFlg: false,
              userName: '',
              clickCount: 0
            }]
          }
        } else if (operateType === 'add') {
          this.docList.push({id: '',
            status: '',
            title: '',
            documentId: '',
            format: '',
            score: '',
            picUrl: '',
            introduce: ''
          })
        }
      },
      setDoc (data) {
        this.$set(this.docList, this.docList, data)
      },
      submitConfirm () {
        this.dialogShowed = true
      },
      submitServiceDetail () {
        var materials = []
        var serviceCase = []
        if (this.LabelId === 0 || this.LabelId === '') {
          showNotice('请选择您的服务分类')
        } else if (this.servicePic === '') {
          showNotice('请设定您的服务Banner')
        } else if (this.serviceIntroPic === '') {
          showNotice('请上传您的介绍文件')
        } else if (this.detailDataList.length === 0) {
          showNotice('请设定您的服务详情')
        }
        if (this.serviceIntroPic !== '') {
          materials.push({
            id: this.introId,
            orderNum: 0,
            mainMaterialFlag: true,
            format: this.serviceIntroType,
            mediaId: this.serviceIntroPic,
            para1: '',
            para2: '',
            saveVendor: this.serviceIntroVendor
          })
        }
        for (var i = 0; i < this.detailDataList.length; i++) {
          var mediaId = ''
          var para2 = ''
          var saveVendor = ''
          if (this.detailDataList[i].type !== 'txt') {
            mediaId = this.detailDataList[i].content
            if (this.detailDataList[i].type === 'pic') {
              saveVendor = 'qiniu'
            } else if (this.detailDataList[i].type === 'video') {
              saveVendor = 'tencent'
              if (this.detailDataList[i].content === 'compute') {
                alert('视频正在上传中，请稍后提交')
                this.closed()
                return
              }
            } else {
              saveVendor = 'baidu'
            }
          } else {
            para2 = this.detailDataList[i].content
            saveVendor = 'local'
          }
          materials.push({
            id: this.detailDataList[i].id,
            orderNum: i + 1,
            mainMaterialFlag: 0,
            format: this.detailDataList[i].type,
            mediaId: mediaId,
            para1: '',
            para2: para2,
            saveVendor: saveVendor
          })
        }
        for (var k = 0; k < this.docList.length; k++) {
          serviceCase.push({
            docId: this.docList[k].id,
            orderNum: k + 1
          })
        }
        var submitData = {
          id: this.id,
          name: this.serviceTitle,
          picUrl: this.serviceDisplayPic,
          showNameFlag: false,
          inverseFlag: false,
          city: this.city,
          introduce: this.serviceIntro,
          bannerPic: this.servicePic,
          labelId: this.LabelId,
          labelName: '',
          materials: materials,
          serviceCase: serviceCase
        }
        service.editServiceInfo(submitData)
          .then(response => {
            if (response.msg === 'ok') {
              showNotice('提交成功')
              this.closed()
            } else {
              showNotice(response.msg)
            }
          })
      },
      changeIntro () {
        this.introBlank = !this.introBlank
        this.serviceIntroPicShow = ''
      },
      getServiceInfo (labelId) {
        this.LabelId = labelId
      },
      setUploadedBaiduFileInfo (val) {
        this.introBlank = false
        this.serviceIntroPicShow = '../../../static/image/baiduDone.png'
        this.serviceIntroType = val.data.format
        this.serviceIntroVendor = 'baidu'
        this.serviceIntroPic = val.data.documentId
      },
      videoUploadBtnClick (index) {
        document.getElementById('videoUpBtn').click()
        this.upBtnId = 'videoUploadBtn' + index
        this.detailIndex = index
      },
      setBtnId () {
        this.upBtnId = 'videoUpBtn'
      },
      getCompanyInfo () {
        let _this = this
        companyService.getCompanyInfo()
        .then(response => {
          this.companyInfo = response.data
          this.companyInfo.City.filter(function (item) {
            _this.city = _this.city + ' ' + item
          })
        })
      },
      get (id) {
        this.id = id
        let _this = this
        if (id !== '') {
          service.getServiceInfo({id: this.id})
            .then(response => {
              this.dataList = response.data
              if (this.dataList.length > 0) {
                document.getElementById('show').setAttribute('src', this.dataList[0].bannerPic)
                this.servicePic = this.dataList[0].bannerPic
                this.LabelId = this.dataList[0].LabelId
                this.serviceTitle = this.dataList[0].Name
                this.serviceIntro = this.dataList[0].Introduce
                document.getElementById('showBoxIntro').setAttribute('src', this.dataList[0].PicUrl)
                this.showUploadP = false
                this.serviceDisplayPic = this.dataList[0].PicUrl
                _this.detailDataList = []
                console.log('this.dataList[0].Materials')
                console.log(this.dataList[0].Materials)
                this.dataList[0].Materials.filter(function (item) {
                  if (item.MainMaterialFlag === true) {
                    _this.introId = item.id
                    _this.serviceIntroType = item.Format
                    _this.serviceIntroPic = item.MediaId
                    _this.serviceIntroVendor = item.SaveVendor
                    if (item.SaveVendor === 'baidu') {
                      _this.introBlank = false
                      if (item.Status === 200) {
                        _this.serviceIntroPicShow = '../../../static/image/pptDone.jpg'
                      } else if (item.Status === 102) {
                        _this.serviceIntroPicShow = '../../../static/image/pptTrans.png'
                      } else if (item.Status === 205) {
                        _this.serviceIntroPicShow = '../../../static/image/pptError.png'
                      }
                    } else if (item.SaveVendor === 'tencent') {
                      _this.introBlank = false
                      if (item.Status === 200) {
                        _this.serviceIntroPicShow = '../../../static/image/videoDone.png'
                      } else if (item.Status === 202) {
                        _this.serviceIntroPicShow = '../../../static/image/videoTransMain.png'
                      } else if (item.Status === 205) {
                        _this.serviceIntroPicShow = '../../../static/image/videoError.png'
                      }
                    } else {
                      _this.introBlank = false
                      _this.serviceIntroPicShow = item.MediaId
                    }
                  } else if (item.MainMaterialFlag === false) {
                    var type = ''
                    var content = ''
                    if (item.SaveVendor === 'tencent') {
                      type = 'video'
                      content = item.MediaId
                    } else if (item.SaveVendor === 'local') {
                      type = 'txt'
                      content = item.Para2
                    } else if (item.SaveVendor === 'qiniu') {
                      type = 'pic'
                      content = item.MediaId
                    }
                    _this.detailDataList.push({
                      id: item.Id,
                      imgBtnId: 'detailImg' + item.OrderNum,
                      type: type,
                      content: content,
                      status: item.Status
                    })
                  }
                })
              }
            })
          docService.GetDocList({page: 0, pageNum: 0, serviceId: this.id})
            .then(response => {
              if (response.data.length > 0) {
                this.docList = response.data
              }
            })
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      // 这里判断是否重复打开的同一服务页
      next(vm => {
        if (to.params.id !== undefined) {
          if (to.params.id !== vm.id) {
            if (to.params.id) {
              vm.id = to.params.id
            } else {
              vm.id = ''
            }
            vm.get(vm.id)
            vm.getCompanyInfo()
          }
        }
      })
    }
  }
</script>
<style lang='less'>
  .pof{
    position: fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background:rgba(0,0,0,.3);
    z-index:111111111113;
  }
  .buttonClick.mu-flat-button{
    margin:0 10px;
  }
  .uploadBoxHead{
    padding:80px 0 10px;
    font-size: 14px;
  }
  .showServiceTitle{
    margin:0 40px 0 236px;
  }
  .uploadBoxTitle{
    width:100%;
    height:40px;
    line-height: 40px;
    background:rgba(230,230,230,.8);
    font-size: 14px;
    color:#444;
  }
  .outBox{
    width:760px;
    height:420px;
    left:50%;
    top:50%;
    margin-left:-380px;
    margin-top:-210px;
    background:#fff;
    box-shadow:-10px 0 10px rgba(0,0,0,.117647), /*左边阴影*/  
    10px 0 10px rgba(0,0,0,.117647), /*右边阴影*/  
    0 -10px 10px rgba(0,0,0,.117647), /*顶部阴影*/  
    0 10px 10px rgba(0,0,0,.117647); /*底边阴影*/ 
  }
  .uploadBoxCheck{
    width:280px;
    height:158px;
    margin:10px auto 10px;
    background:#f2f9ff;
    color:#898989;
    font-size: 12px;
    text-align: center;
  }
  .outBox h5{
    width:100%;
    text-align: center;
    height:50px;
    line-height: 50px;
    margin:10px 0 10px;
    font-size: 20px;
  }
  .divButton{
    width:250px;
    border-radius: 4px;
    margin:20px auto;
    font-size: 18px;
    height:50px;
    line-height: 50px;
    text-align: center;
    background:#083C6F;
    color:#fff;
  }
  #serviceManagement .divButton.demo-raised-button {
    margin-right: 0px;
    width:280px;
    border-radius: 4px;
    margin:20px auto;
    font-size: 18px;
    height:36px;
    line-height: 36px;
    text-align: center;
    background:#083C6F;
    color:#fff;
    display: block;
}
  #serviceManagement .button_share{
    margin-left: 5px !important;
  }
  .upload_baidu{display: inline;}
  .dn{
    display: none;
  }
  .Management_box{
    background-color: #fff;
  }
  .Management_box .sele_list{
    width: 900px !important;
    margin-left: 20px;
  }
  .required{
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity: 0.4;
    background-color: rgb(0, 0, 0);
    position: fixed;
    z-index: 20141233;
  }
  .requireCon{
    position: fixed;
    padding-top:10px;
    left:50%;
    top:50%;
    width:256px;
    height:380px;
    margin-left:-128px;
    margin-top:-190px;
    z-index: 20141234;
    background:#fff;
    
  }
  .requireCon img{
    position: absolute;
    right:10px;
    top:10px;
    width:10px;
    height:10px;
  }
  .requireCon img:hover{
    cursor:pointer;
  }
  .widthDialog{
    width:304px;
  }
    #serviceManagement {
      .replaceButton{
        top:0;
        right:-20px;
      }
      .replaceImgButton{
        top:0;
        right:-20px;
        display: none;
      }
      .replaceImgButton .mu-raised-button {
        color:#ffaa00;
      }
      .replaceButton .mu-raised-button-label,.replaceImgButton .mu-raised-button-label{
        padding-left:4px;
        padding-right:0;
      }
      .uploadTitle .mu-raised-button.mu-raised-button-inverse.disabled{
        margin-top: 10px;
      }
      .requireCon .mu-raised-button{
        color:#fff;
      }
      .mu-raised-button {
        color: #000;
      }
      .wrimod .wrimod_right .module{
        width: 782px;
      }
      .no_comment .module{
        background-color: #e6e6e6;
      }
      .mu-text-field-line{
        background-color: #bcbcbc;
      }
      .revmod{
        padding-left: 20px;
      }
      .revmod .wrimod .wrimod_left, .revmod .wrimod .single_left{
        width: 58px;
        height: 58px;
      }
      .changBg.mu-raised-button-primary{
        background:#ffaa00;
      }
      .replaceButton .mu-raised-button:hover,.replaceImgButton .mu-raised-button:hover {
        background:rgba(0,0,0,0.12);
      }
      .ph4{
        font-weight: bold;
        font-size: 18px;
        color:#2D2D2D;
        height:50px;
        overflow: hidden;
      }
      .contentInfo{
        width:100%;
        font-size: 14px;
        color: #444;
        line-height: 20px;
        height:120px;
        margin-bottom:10px;
      }
    .mu-text-field{
      width: 100%;
    }
    .imgFooter{
      padding: 0;
    }
    .checked_pop_right{
      width: 804px;
    }
    .sele_list_title{
      width: 84px;
      margin-left:10px ;
    }
    .sele_list .service_sum{
      border-bottom: 1px dashed #e6e6e6;
    }
    .collect_type {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #bebebe;
    }
    .replaceButton .mu-raised-button,.replaceImgButton .mu-raised-button{
      background:#fff;
    }
    .mu-raised-button.mu-raised-button-inverse{
      color:#fff
    }
    .mu-raised-button.mu-raised-button-inverse.disabled{
      color:#898989;
      background: #e6e6e6;
    }
    .btn_service .submit .mu-raised-button-label{
      color: #fff;
    }
    img {
      display: block;
    }
    /*#show {
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      display: block;
    }*/
    .home_nav {
      margin-bottom: 20px;
    }
    .collect_type li.active {
      color: #083C6F;
      border-bottom: 2px solid #083C6F;
    }
    .collect_type li {
      width: 130px;
      text-align: center;
      font-size: 16px;
      color: #666;
      font-weight: bold;
      box-sizing: border-box;
      height: 100%;
      text-decoration: none;
    }
    li.home_remark {
      font-weight: normal;
      font-size: 12px;
      width: auto;
    }
    .home_hint {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #2d2d2d;
      font-weight: bold;
    }
    h2{
      font-size: 16px;
      color:#2d2d2d;
      text-indent: 20px;
      height:50px;
      line-height: 50px;
      clear: both;
    }
    .poa{position: absolute;}
    .uploadInfo .por{position: static;}
    .showImg{
      width:900px;
      height:62px;
      overflow: hidden;
      border:1px dashed #e6e6e6;
      background:#f2f9ff;
      text-align: center;
    }
    .showImg>img{
      width: 100%;
      height: 100%;
    }
    .showImg:hover .replaceImgButton{
      display: block;
    }
    .hocoll_logo {
      position: relative;
      width: 70px;
      height: 58px;
      box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);;
      border-radius: 2px;
      position: absolute;
      top: 0px;
      left: 20px;
      background: #fff;
      z-index: 2;
    }
    .showImg span{
      display: inline-block;
    }
    .replaceImg:hover,
    .hocoll_logo:hover {
      cursor: pointer;
    }
    .swiperBox{
      
    }
    .swiperBox:hover .replaceImg{
      display: block;
      
    }
    .hocoll_logo .hoco_logoimg {
      height: 38px;
      text-align: center;
      line-height: 38px;
      padding-top: 3px;
      box-sizing: border-box;
    }
    .hocoll_logo p {
      border-radius:6px;
      width:60px;
      display: inline-block;
      line-height: 20px;
      height: 19px;
      border-top: 1px solid #e6e6e6;
      font-size: 12px;
      color: #fff;
      background: #ffaa00 url(../../../static/image/smallaterWhite.png) no-repeat 4px center;
      padding-left: 10px;
    }
    /*.hocoll_logo:hover p{
      background:#ffbb33 url(../../../static/image/smallaterWhite.png) no-repeat 4px center;
    }*/
    .hoco_logoimg img {
      display: inline-block;
    }
    .replaceImg {
      display: none;
      right: 46px;
      top: 20px;
      width: 28px;
      height: 30px;
      line-height: 30px;
      border-radius: 3px;
      opacity: 0.8;
      padding-left: 6px;
      z-index: 2;
      background: #fff url(../../../static/image/edit.png) no-repeat 6px center;
      color: #666
    }
    .uploadInfo{
      margin:10px;
    }
    .file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
    .uploadBox>img{
      width: 100%;
      height: 100%;
    }
    .uploadTrue {
      border: 1px solid #e6e6e6 !important;
    }
    .uploadBox{
      width:550px;
      height:308px;
      border:1px dashed #ccc;
      background:#f2f9ff;
      overflow: hidden;
      h3{
        font-size: 14px;
        color:#444;
        padding:10px 0 0 20px;
        
      }
    }
    h4{
      font-size: 14px;
        color:#444;
        margin-bottom:16px;
    }
    .uploadBox .demo-flat-button-container{
      margin:100px 136px 0;
    }
    .demo-raised-button{
      margin-right:20px;
    }
    .mu-flat-button{
      height:56px;
    }
    .uploadBox{
      position: relative;
    }
    /*#showIntro{
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
      height: 100%;
    }*/
    .uploadTitle{
      margin-left:20px;
      width:310px;
    }
    .imgFooter{
      color:#ffaa00;
      margin:12px 0 16px;
    }
    .imgFooter img{
      display: inline-block;
      vertical-align: -2px;
    }
    button:hover{
      cursor:pointer
    }
    .progressBox{
      width:100%;
      height:100%;
      text-align: center;
      top:80px;
      left:0;
    }
    .progressBox p{
      margin-top:15px;
    }
    .uploadBox .por{
      width:100%;
      height:100%;
    }
    .changWidth>div{
      overflow: hidden;
    }
    .sele_list_top{
      float:left;
    }
    .sele_list_bottom{
      width:800px;
    }
    .sele_list {
    background-color: #f4f4f4;
    width: 100%;
    }
    .sele_list_bottom{
      float:left;
    }
    }
#serviceManagement .uploadBox .por .mu-flat-button{float: left;}
#showBoxIntro{position: absolute; left: 0;top:0;}
.management_content{
  margin: 0 29px 0 9px;
  padding:0 0 20px 0;
  border: 1px dashed #e6e6e6;
  clear: both;
}
.service_layout{
  padding:0 9px;
}
.btn_service{
  padding: 20px 0 40px;
}
.service_sele .service_select{
  font-size: 12px;
  color: #666;
  margin-left: 10px;
}
.service_sele .service_select .notice{
  color:#ff1919;
}
.uploadTitle .mu-raised-button {
  width: 116px;
}
.uploadTitle .mu-raised-button .mu-icon{
  margin-left: 10px;
  color: #444;
}
.uploadTitle .mu-raised-button .mu-raised-button-label{
  padding-right: 10px !important;
  padding-left: 5px !important;
  color: #444;
}
.uploadBox .poa{
  display: none;
}
.uploadBox:hover .poa{
  display: block;
}
#serviceManagement .wrimod .wrimod_right .module{
  width: 782px;
}
#serviceManagement .no_comment .module{
  background-color: #e6e6e6;
}
#serviceManagement .mu-text-field-line{
  background-color: #bcbcbc;
}
#serviceManagement .revmod .wrimod .wrimod_left,#serviceManagement .revmod .wrimod .single_left{
  width: 58px;
  height: 58px;
}
.togglePic .replace_ment{
  display: none;
}
.togglePic:hover .replace_ment{
  display: block;
}
.btn_service{
  padding-right: 10px;
}
.showImg .filein_upfile{
  margin-top:5px;
}
#serviceManagement .showImg .filein_upfile span{
  display: none;
}
#serviceManagement .showImg .filein_upfile a:hover span{display: block;}
#serviceManagement .uploadBox .demo-flat-button-container{text-align: left;}
#serviceManagement #selServicePic{position: absolute;top: 0;left:0;right:0;bottom:0;opacity: 0;}
</style>
