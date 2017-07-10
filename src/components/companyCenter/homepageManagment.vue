<template>
  <div id="homepageManagment" >
    <ul class="collect_type home_nav">
      <li class="active fl">主页管理</li>
      <li class="fl home_remark">（依据下方模板添加服务）</li>
    </ul>
    <div style="background: #fff;">
    <h2 class="home_hint">设定您的服务页面</h2>
    <div class="case_box1 widthMain">
      <img src="../../../static/image/managementMainHear.png" alt="" />
      <div class="swiperBox por" >
        <a href="javascript:;" class="poa replace_ment" @click="openBanner" v-if="!blankImg">替换图片</a>
        <div class="blankImg por" v-if="blankImg">
          <div class="demo-flat-button-container poa">
              <mu-flat-button label="" class="demo-flat-button" @click="open">
                <img src="../../../static/image/uplod_imgblue.png" alt="" />
              </mu-flat-button>
          </div>
        </div>
        <swiper :options="swiperOption" class="home_banner" v-if='!blankImg'>
          <swiper-slide v-for="banner in uploadFile" v-if="banner.picUrl != ''">
            <img :src="banner.picUrl">
          </swiper-slide>
        </swiper>
        <div class="poa disableInfo">
          <img src="../../../static/image/disableInfo.png" alt="" />
        </div>       
        <!--<div class="replaceImgButton poa">
          <mu-raised-button class="replaceImg" v-if="!blankImg" label="替换图片" @click="openBanner" />
        </mu-raised-button>-->
<!--        </div>-->
        <div class="hocoll_logo">
          <div class="hoco_logoimg">
            <img :src="logoUrl"></div>
          <p>收藏</p>
        </div>
      </div>
      <div class="homeManageContent">
      <div class="company_service_list">
      <h2 class="service_sele">相关服务</h2>
      <companyServiceList v-for="service,index in serviceList" :layoutId="service.layoutId" :serviceIndex="index" :detailData="service.detailData" @changeServiceInfo="changeServiceInfo"></companyServiceList>
      </div>
      <div class="service_Summary">
        <h2 class="service_sele">相关案例</h2>
        <companyCase v-for="doc,index in docList" @editDoc="editDoc" :docList="docList" @setDoc='setDoc' :docIndex="index"></companyCase>
      </div>
      <div class="service_list_box case_box case_box1" ref="buttoned" id="bottomUrl">
          <ul class="service_list">
            <li class="layout_self">
              <p class="filein_upfile1">
                <a v-show="bottomImgUrl == ''" href="javascript:;" class="filein_ppt filein_ppt1" ><span>
                  <formDataupload :uptoken="uploadToken" :formId="bottomImgForm" :trigger="trigger" v-if='trigger' @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
                </span></a>
                <!--<upload :browse_button='bottomImg' @setUploadedFileInfo="setUploadedFileInfo">
                </upload>-->
              </p>
              <img v-show="bottomImgUrl != ''" id="bottomImgShow" class="upfile1_img" src="" width="100%" height="100%">
              <a href="javascript:;" class="replace_ment" v-if='bottomImgUrl !== ""' @click='changeBottom'>替换图片</a>
            </li>
          </ul>
        </div>
    </div> 
    </div>
    <div class="clearfix">
      <mu-raised-button label="确认提交" class="demo-raised-button fr submit" primary @click="submitHomePageInfo"/> 
    </div>
    </div>
      <div class="requirement_box" v-if="dialog" style='z-index: 9999999;'></div>
      <div class="dialog" v-if="dialog" style='z-index: 9999999;'>
        <div class="require_content"> 
        <h3 class="dialog_title">设置服务</h3>
        <ul class="clearfix dialogInfo" v-for="item,index in uploadFile">
          <li class="fl fileUpload">
            <div class="por" id="video_container">
              <span>上传文件</span>
<!--                  <input type="file" name="" class="inputFile" value="" @change="getValue(item.id)" />-->
              <!--<button class="buttonStyle poa">选择文件</button>-->
              <div label="选择文件"  class="buttonStyle poa">选择文件<br>
                <formDataupload :uptoken="uploadToken" :formId="item.buttunId" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
                <!--<upload :browse_button='item.buttunId' @setUploadedFileInfo="setUploadedFileInfo">
                </upload>-->
              </div>
            </div>
            <div class="borderBottom">
              <mu-text-field :value="item.picName" :disabled='true'/><br/>
            </div>
          </li>
          <li class="fl fileUrl">
            <div>
              <span>链接地址</span>
            </div>
            <div class="borderBottom">
              <mu-text-field hintText="" v-model="item.bannerLink" /><br/>
            </div>
          </li>
          <li class="fl fileDo">
            <div>
              <span>操作</span>
            </div>
            <div class="borderRight">
              <span class="jtUp" @click="changeBannerIndex('up', index)"></span>
              <span class="jtDown" @click="changeBannerIndex('down', index)"></span>
              <span class="jtDel" @click="changeBannerIndex('delete', index)"></span>
            </div>
          </li>
        </ul>
        <p class="uploadNote">上传图片大小建议；宽度1366px 高度380px</p>
        <div class='btn_box'>
          <!--<mu-flat-button slot="actions" @click="closeBanner" primary label="取消" />-->
          <mu-flat-button slot="actions" primary @click="setBanner" label="确定" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import companyServiceList from '@/components/companyCenter/companyServiceList'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import companyCase from '@/components/companyCenter/companyCase'
  import upload from '@/components/shared/Upload'
  import companyService from '@/services/companyService'
  import { showNotice } from '@/common/noticeAlertFun'
  import qiniuService from '@/services/qiniuService'
  import formDataupload from '@/components/shared/FormDataUpload'
  export default {
    data () {
      return {
        logoUrl: '../../../static/image/logoStyle.png',
        uploadFile: [{id: 0, buttunId: 'pickfiles1', picName: '', picUrl: '', bannerLink: ''},
        {id: 1, buttunId: 'pickfiles2', picName: '', picUrl: '', bannerLink: ''},
        {id: 2, buttunId: 'pickfiles3', picName: '', picUrl: '', bannerLink: ''},
        {id: 3, buttunId: 'pickfiles4', picName: '', picUrl: '', bannerLink: ''}
        ],
        oldUploadFile: [],
        bottomImg: 'bottomImg',
        bottomImgUrl: '',
        blankImg: true,
        oldBlankImg: true,
        showButton: false,
        dialog: false,
        migList: [],
        uploadToken: '',
        bottomImgForm: 'bottomImgForm',
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          loop: true,
          preventClicks: false,
          autoplayDisableOnInteraction: false
        },
        serviceList: [{
          layoutId: 1,
          detailData: [{
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 1
          },
          {
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 2
          },
          {
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 3
          },
          {
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 4
          },
          {
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 5
          },
          {
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 6
          },
          {
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 7
          },
          {
            picUrl: '',
            serviceId: 0,
            name: '',
            showNameFlag: false,
            inverseFlag: false,
            orderNum: 8
          }]
        }],
        docList: [{id: '',
          status: '',
          title: '',
          documentId: '',
          format: '',
          score: '',
          picUrl: '',
          introduce: ''
        }],
        trigger: null
      }
    },
    components: {
      swiper,
      swiperSlide,
      companyServiceList,
      serviceLabelFilter,
      companyCase,
      upload,
      formDataupload
    },
    created () {
      this.getQiniuToken()
      this.get()
    },
    mounted () {
      console.log('this.$refs.buttoned.$el')
      console.log(this.$refs.buttoned)
      // this.trigger = this.$refs.buttoned.$el
      this.trigger = document.getElementById('bottomUrl')
    },
    computed: {},
    methods: {
      get () {
        companyService.getHomepageInfo({id: ''})
         // 接收请求返回值
        .then(response => {
          console.log('response.data.banners')
          console.log(response.data.banners)
          let _this = this
          if (response.data.banners.length > 0) {
            _this.uploadFile = []
            _this.blankImg = false
            var bannerIndex = 0
            var bannerList = response.data.banners.filter(function (item) {
              return item.category === 'homePageTop'
            })
            for (var i = 0; i < 4; i++) {
              if (bannerIndex < bannerList.length && i === bannerList[bannerIndex].bannerNum - 1) {
                _this.uploadFile.push({
                  id: i,
                  buttunId: 'pickfiles' + (i + 1),
                  picName: bannerList[bannerIndex].picUrl,
                  picUrl: bannerList[bannerIndex].picUrl,
                  bannerLink: bannerList[bannerIndex].bannerUrl
                })
                bannerIndex++
              } else {
                _this.uploadFile.push({id: i, buttunId: 'pickfiles' + (i + 1), picName: '', picUrl: '', bannerLink: ''})
              }
            }
          }
          console.log('response.data.homePageBottom')
          console.log(response.data.homePageBottom)
          var bottomBanner = response.data.homePageBottom
          if (bottomBanner !== null && bottomBanner !== undefined) {
            this.bottomImgUrl = bottomBanner
            document.getElementById('bottomImgShow').src = bottomBanner
          }
          console.log('response.data.services')
          console.log(this.uploadFile)
          if (response.data.services.length > 0) {
            _this.serviceList = []
            for (var j = 0; j < response.data.services.length; j++) {
              var detailData = []
              var services = response.data.services[j]
              var serviceIndex = 0
              for (var k = 0; k < 8; k++) {
                if (serviceIndex < services.serviceList.length && k === services.serviceList[serviceIndex].orderNum - 1) {
                  detailData.push({
                    picUrl: services.serviceList[serviceIndex].picUrl,
                    serviceId: services.serviceList[serviceIndex].serviceId,
                    name: services.serviceList[serviceIndex].title,
                    showNameFlag: services.serviceList[serviceIndex].showNameFlag,
                    inverseFlag: services.serviceList[serviceIndex].inverseFlag,
                    orderNum: services.serviceList[serviceIndex].orderNum
                  })
                  serviceIndex++
                } else {
                  detailData.push({
                    picUrl: '',
                    serviceId: 0,
                    name: '',
                    showNameFlag: false,
                    inverseFlag: false,
                    orderNum: k + 1
                  })
                }
              }
              _this.serviceList.push({
                layoutId: response.data.services[j].layoutId,
                detailData: detailData
              })
            }
          }
          console.log('response.data.docs')
          console.log(this.serviceList)
          if (response.data.docs.length > 0) {
            _this.docList = []
            response.data.docs.filter(function (item) {
              _this.docList.push({
                id: item.id,
                status: '',
                title: item.title,
                documentId: '',
                format: '',
                score: '',
                picUrl: item.picUrl,
                introduce: item.introduce
              })
            })
          }
          console.log('response.data.end')
        })
      },
      getQiniuToken () {
        qiniuService.getQiniuToken()
        .then(response => {
          this.uploadToken = response.uptoken
        })
      },
      getValue (i) {
        var ivalue = document.getElementsByClassName('inputFile')[i]
        this.uploadFile[i].picName = ivalue.value
      },
      changButton () {
        this.showButton = true
      },
      upchangButton () {
        this.showButton = false
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
      picShow ($event) {
        this.blankImg = !this.blankImg
      },
      openBanner () {
        this.$set(this.oldUploadFile, this.oldUploadFile, this.uploadFile)
        this.oldBlankImg = this.blankImg
        this.open()
      },
      closeBanner () {
        this.$set(this.uploadFile, this.uploadFile, this.oldUploadFile)
        this.blankImg = this.oldBlankImg
        this.close()
      },
      setBanner () {
//      this.migList = []
//      for (var i = 0; i <= this.uploadFile.length - 1; i++) {
//        if (this.uploadFile[i].picUrl !== '') {
//          this.migList.push(this.uploadFile[i].picUrl)
//        }
//      }
        this.close()
      },
      setUploadedFileInfo (buttonId, fileName, restUrl) {
        if (buttonId.indexOf('pickfiles') >= 0) {
          for (var i = 0; i <= this.uploadFile.length - 1; i++) {
            if (this.uploadFile[i].buttunId === buttonId) {
              this.uploadFile[i].picName = fileName
              this.uploadFile[i].picUrl = restUrl
              if (this.blankImg === true) {
                this.picShow()
              }
            }
          }
        } else if (buttonId === this.bottomImgForm) {
          this.bottomImgUrl = restUrl
          document.getElementById('bottomImgShow').src = restUrl
        }
      },
      changeBannerIndex (type, itemIndex) {
        var item1 = ''
        var item2 = ''
        console.log(JSON.stringify(this.uploadFile))
        if (type === 'up' && itemIndex !== 0) {
          item1 = this.uploadFile[itemIndex - 1]
          item2 = this.uploadFile[itemIndex]
          this.$set(this.uploadFile, itemIndex, item1)
          this.$set(this.uploadFile, itemIndex - 1, item2)
        } else if (type === 'down' && itemIndex !== this.uploadFile.length - 1) {
          item1 = this.uploadFile[itemIndex]
          item2 = this.uploadFile[itemIndex + 1]
          this.$set(this.uploadFile, itemIndex, item2)
          this.$set(this.uploadFile, itemIndex + 1, item1)
        } else if (type === 'delete') {
          console.log('delete')
          console.log(itemIndex)
          this.$set(this.uploadFile, itemIndex, {id: itemIndex, buttunId: 'pickfiles' + (itemIndex + 1), picName: '', picUrl: '', bannerLink: ''})
          var hasBannerList = this.uploadFile.filter(function (item) {
            return item.picUrl !== '' && item.bannerLink !== ''
          })
          if (hasBannerList.length === 0) {
            this.blankImg = true
          }
          console.log(this.uploadFile)
        }
        console.log(JSON.stringify(this.uploadFile))
      },
      changeServiceInfo (operateType, itemIndex, layoutId) {
        var item1 = ''
        var item2 = ''
        if (operateType === 'up' && itemIndex !== 0) {
          item1 = this.serviceList[itemIndex - 1]
          item2 = this.serviceList[itemIndex]
          this.$set(this.serviceList, itemIndex, item1)
          this.$set(this.serviceList, itemIndex - 1, item2)
        } else if (operateType === 'down' && itemIndex !== this.serviceList.length - 1) {
          item1 = this.serviceList[itemIndex]
          item2 = this.serviceList[itemIndex + 1]
          this.$set(this.serviceList, itemIndex, item2)
          this.$set(this.serviceList, itemIndex + 1, item1)
        } else if (operateType === 'change') {
          this.$set(this.serviceList[itemIndex], 'layoutId', layoutId)
        } else if (operateType === 'delete') {
          if (this.serviceList.length > 1) {
            this.serviceList.splice(itemIndex, 1)
          } else {
            this.serviceList[0].detailData = [{
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 1
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 2
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 3
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 4
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 5
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 6
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 7
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 8
            }]
          }
        } else if (operateType === 'add') {
          this.serviceList.push({'layoutId': layoutId,
            'detailData': [{
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 1
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 2
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 3
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 4
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 5
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 6
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 7
            },
            {
              picUrl: '',
              serviceId: 0,
              name: '',
              showNameFlag: false,
              inverseFlag: false,
              orderNum: 8
            }]
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
              status: '',
              title: '',
              documentId: '',
              format: '',
              score: '',
              picUrl: '',
              introduce: ''
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
      changeBottom () {
        this.bottomImgUrl = ''
        document.getElementById('bottomImgShow').src = ''
      },
      submitHomePageInfo () {
        var banners = []
        var services = []
        var docs = []
        for (var i = 0; i < this.uploadFile.length; i++) {
          if (this.uploadFile[i].picUrl !== '') {
            banners.push({
              category: 'homePageTop',
              picUrl: this.uploadFile[i].picUrl,
              bannerUrl: this.uploadFile[i].bannerLink,
              bannerNum: i + 1
            })
          }
        }
        console.log('this.serviceList')
        console.log(this.serviceList)
        var hasDetail = false
        for (var j = 0; j < this.serviceList.length; j++) {
          services.push({
            layoutId: this.serviceList[j].layoutId,
            layoutOrderNum: j + 1,
            serviceList: this.serviceList[j].detailData
          })
          var detailCntList = this.serviceList[j].detailData.filter(function (item) {
            return item.serviceId !== 0
          })
          console.log('detailCntList')
          console.log(this.serviceList[j].detailData)
          console.log(detailCntList)
          if (detailCntList !== undefined && detailCntList.length > 0) {
            hasDetail = true
          }
        }
        for (var k = 0; k < this.docList.length; k++) {
          docs.push({
            docId: this.docList[k].id,
            docNum: k + 1
          })
        }
        console.log('hasDetail')
        console.log(hasDetail)
        if (banners.length === 0) {
          showNotice('请设定您的Banner')
          return
        } else if (services.length === 0 || hasDetail === false) {
          showNotice('请设定相关服务')
          return
        }
        if (this.bottomImgUrl !== '') {
          banners.push({
            category: 'homePageBottom',
            picUrl: this.bottomImgUrl,
            bannerUrl: '',
            bannerNum: 0
          })
        }
        var submitData = {
          companyId: '',
          banners: banners,
          services: services,
          docs: docs
        }
        companyService.editHomepageInfo(submitData)
          .then(response => {
            if (response.msg === 'ok') {
              showNotice('提交成功')
            } else {
              showNotice(response.msg)
            }
          })
      }
    }
  }
</script>
<style lang='less' scoped> 
#homepageManagment {
.collect_type {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #bebebe;
 }
.demo-flat-button-container.poa {
  left:50%;
  top:120px;
  height:60px;
  width:88px;
}
.mu-flat-button {
  height:60px;
}
.blankImg {
  width:900px;
  height:280px;
  background:#f2f9ff;
}
.blankImg img:hover {
  cursor: pointer;
}
.widthMain {
  width:900px !important;
  margin:0 30px 0 10px;
  height: auto !important;
  padding-bottom: 20px; 
  border:1px dashed #e6e6e6;
}
.submit {
  margin:20px 30px 40px;
}
.mu-raised-button.mu-raised-button-inverse {
  color:#fff }
img {
  display: block;
}
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
  text-indent: 20px;
  ; }
.home_banner {
  width: 900px;
  height: 280px;
  padding-top: 0;
  position: relative;
  border:2px dashed #e6e6e6;
}
.swiper-slide {
  font-size: 18px;
  background: #fff;
  width: 100%;
  height: 100%;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
.swiper-container {
  margin: 0;
}
.swiper-container .swiper-pagination-bullet-active {
  background-color: #007aff;
}
.swiper-container .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
}
.por {
  position: relative;
}
.poa {
  position: absolute;
}
.disableInfo {
  z-index: 11;
  left: 1px;
  top: 1px;
  width: 246px;
  height: 278px;
  opacity: 0.9;
  overflow: hidden;
}
.hocoll_logo {
  width: 70px;
  height: 58px;
  border-radius: 4px;
  position: absolute;
  top: 40px;
  right: 12px;
  background: #fff;
  z-index: 2;
  box-shadow:0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451)
}
.replaceImgButton:hover, .hocoll_logo:hover {
  cursor: pointer;
}
.swiperBox {
  }
.swiperBox:hover .replaceImgButton {
  display: block;
}
.file-button {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
.hocoll_logo .hoco_logoimg {
  height: 38px;
  text-align: center;
  line-height: 38px;
  padding-top: 3px;
  box-sizing: border-box;
}
.hocoll_logo p {
  text-align: center;
  line-height: 20px;
  height: 20px;
  border-top: 1px solid #e6e6e6;
  font-size: 12px;
  color: #666;
  background: url(../../../static/image/smallater_gray.png) no-repeat 10px center;
  padding-left: 10px;
}
.hocoll_logo:hover P {
  color:#ffaa00;
  background: url(../../../static/image/smallaterHover_gray.png) no-repeat 10px center;
}
.hoco_logoimg img {
  display: inline-block;
}
.replaceImg .mu-raised-button {
  background: #fff;
  color:rgba(0,0,0,0.87)
}
.replaceImgButton {
  display: none;
  right: 18px;
  top: 20px;
  border-radius: 3px;
  opacity: 0.8;
  padding-left: 6px;
  z-index: 2;
  color: #666 }
.replaceImg {
  background: #fff url(../../../static/image/edit.png) no-repeat 6px center;
  color:#898989;
}
.replaceImg:hover {
  background: #fff url(../../../static/image/editHover.png) no-repeat 6px center;
  color: #ffaa00;
}
.mu-raised-button.replaceImg .mu-raised-button-wrapper .mu-raised-button-label {
  padding-left:20px!important;
  padding-right:0!important;
}
} .borderRight span {
  display: inline-block;
  width: 28%;
  height: 13px;
}
.dialogInfo {
  width: 100%;
  padding-top: 20px;
}
.fileUpload, .fileUrl {
  width: 320px;
}
.fileDo {
  width: 80px }
.jtUp {
  background: url(../../../static/image/icon/jtUp.png) no-repeat center;
}
.jtUp:hover {
  cursor: pointer;
  background: url(../../../static/image/icon/jtUphover.png) no-repeat center;
}
.jtDown {
  background: url(../../../static/image/icon/jtDown.png) no-repeat center;
}
.jtDown:hover {
  background: url(../../../static/image/icon/jtDownhover.png) no-repeat center;
}
.jtDel {
  background: url(../../../static/image/icon/del.png) no-repeat center;
}
.jtDel:hover {
  background: url(../../../static/image/icon/delhover.png) no-repeat center;
}
.borderRight {
  height: 56px;
  line-height: 56px;
}
* {
  margin: 0;
  padding: 0 }
.buttonStyle {
  border-radius: 4px;
  background: #083c6f;
  color: #fff;
  outline: none;
  border: none;
  top: -10px;
  right: 60px;
  width:105px;
  height:36px;
  text-align: center;
  line-height: 36px;
}
.inputFile {
  opacity: 0;
  position: absolute;
  right: 60px;
  top: -40px;
  width: 94px;
  height: 72px;
  z-index: 4;
}
.inputFile:hover {
  cursor:pointer;
}
.uploadNote {
  color: #ffaa00;
  font-size: 12px;
}
.por {
  position: relative;
}
.poa {
  position: absolute;
}
.service_Summary {
  position:relative;
}
#homepageManagment .data_homepage .demo-raised-button {
  margin-right: 0 !important;
}
.company_service_list {
  background-color: #fff;
}
.case_box1,.layout_self {
  height: 160px !important;
  width: 884px !important;
}
.case_box1 .filein_upfile1 {
  text-align: center;
  margin-top: 55px;
  position: relative;
  width: 100%;
}
.case_box1 .filein_upfile1 a {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 60px;
  background-position: center !important;
  background-repeat: no-repeat !important;
  margin-right: 0 !important;
}
.case_box1 .filein_upfile1 .filein_ppt {
  background-image: url(../../../static/image/noteImg.png);
  margin-right: 40px;
}
.case_box1 .filein_upfile1 span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
}
.case_box1 .upfile1_img {
  position: absolute;
  left: 0;
  top: 0;
}
#homepageManagment .submit.mu-raised-button.mu-raised-button-inverse{
  background:#083C6F;
}
.require_content{
  padding: 14px 24px !important;
}
.btn_box{margin-left: 620px;}
.homeManageContent{padding: 0 10px;}
.homeManageContent .service_sele{width: 100%;}
.swiperBox .replace_ment,.layout_self .replace_ment{display: none;}
.swiperBox:hover .replace_ment,.layout_self:hover .replace_ment{display: block;}
.case_box1{border:none;}
/*.caseSum_box{border: 1px dashed #e6e6e6;margin: 0 10px;}*/
</style>
<style>
  #homepageManagment .datpage_btn2 .button_share{
    margin-left: 0 !important;
  }
  #homepageManagment  #selServicePic{
    position: absolute;
    top: 0px;
    width: 88px;
    overflow: hidden;
    height: 36px;
  }
  .case_box1 .replace_ment {
  width: 80px;
  height: 24px;
  padding-left: 25px;
  box-sizing: border-box;
  line-height: 24px;
  font-size: 12px;
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 1px;
  border: 1px solid #bcbcbc;
  color: #444;
  z-index: 9;
  background-color: rgba(230,230,230,0.8);
  background-position: 5px center;
  background-repeat: no-repeat;
  background-image: url(../../../static/image/edit.png);
}
.case_box1 .replace_ment:hover {
  background-color: rgba(255, 170, 0, 0.8);
  color: #fff;
  background-image: url(../../../static/image/edit_white.png);
  border: none;
}
.dialog,.requirement_box{
  z-index:11;
}
.company_service_list>div{
  height: 260px;
  margin-bottom: 4px;
}
</style>
