<template>
  <div id="homepageManagment" >
    <ul class="collect_type home_nav">
      <li class="active fl">主页管理</li>
      <li class="fl home_remark">（依据下方模板添加服务）</li>
    </ul>
    <h2 class="home_hint">设定您的服务页面</h2>
    <div class="widthMain">
      <img src="../../../static/image/managementMainHear.png" alt="" />
      <div class="swiperBox por" >
        <div class="blankImg por" v-if="blankImg">
          <div class="demo-flat-button-container poa">
              <mu-flat-button label="" class="demo-flat-button" >
                <img src="../../../static/image/uplod_imgblue.png" alt="" />
                <input type="file" class="file-button" @change="picShow($event)">
              </mu-flat-button>
          </div>
        </div>
        <swiper :options="swiperOption" class="home_banner" v-else>
          <swiper-slide v-for="img in migList" >
            <img :src="img" >
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="poa disableInfo">
          <img src="../../../static/image/disableInfo.png" alt="" />
        </div>    
        <div class="replaceImgButton poa">
          <mu-raised-button class="replaceImg" label="替换图片" @click="open" />
          </mu-raised-button>
          <mu-dialog :open="dialog" title="设置banner" @close="close">
            <ul class="clearfix dialogInfo" v-for="item in uploadFile">
              <li class="fl fileUpload">
                <div class="por">
                  <span>上传文件</span>
                  <input type="file" name="" class="inputFile" value="" @change="getValue(item.id)" />
                  <button class="buttonStyle poa">选择文件</button>
                </div>
                <div class="borderBottom">
                  <mu-text-field :value="item.picName" /><br/>
                </div>
              </li>
              <li class="fl fileUrl">
                <div>
                  <span>链接地址</span>
                </div>
                <div class="borderBottom">
                  <mu-text-field hintText="" /><br/>
                </div>
              </li>
              <li class="fl fileDo">
                <div>
                  <span>操作</span>
                </div>
                <div class="borderRight">
                  <span class="jtUp" @click=""></span>
                  <span class="jtDown" @click=""></span>
                  <span class="jtDel" @click=""></span>
                </div>
              </li>
            </ul>
            <p class="uploadNote">上传图片大小建议；宽度1366px 高度380px</p>
            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="close" label="确定" />
          </mu-dialog>
        </div>
        <div class="hocoll_logo">
          <div class="hoco_logoimg">
            <img :src="logoUrl"></div>
          <p>收藏</p>
        </div>
      </div>
      <companyServiceList></companyServiceList>
      <serviceLayout2></serviceLayout2>
      <serviceLayout3></serviceLayout3>
      <serviceLayout4></serviceLayout4>
      <serviceLayout5></serviceLayout5>
      <div class="service_Summary">
        <docSummary></docSummary>
      </div>
      <companyCase></companyCase>
      <div style="clear: both">
        <compositionEditPop></compositionEditPop>
        <companyServicePop></companyServicePop>
      </div>
    </div> 
      <div class="clearfix">
        <mu-raised-button label="确认提交" class="demo-raised-button fr submit" primary/> 
      </div>
        
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import companyServiceList from '@/components/companyCenter/companyServiceList'
  import serviceLayout2 from '@/components/companyCenter/serviceLayout2'
  import serviceLayout3 from '@/components/companyCenter/serviceLayout3'
  import serviceLayout4 from '@/components/companyCenter/serviceLayout4'
  import serviceLayout5 from '@/components/companyCenter/serviceLayout5'
  import companyServicePop from '@/components/companyCenter/companyServicePop'
  import compositionEditPop from '@/components/companyCenter/compositionEditPop'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import docSummary from '@/components/company/docSummary'
  import companyCase from '@/components/companyCenter/companyCase'
  export default {
    data () {
      return {
        logoUrl: '../../../static/image/logoStyle.png',
        uploadFile: [{id: 0, picName: ''},
        {id: 1, picName: ''},
        {id: 2, picName: ''},
        {id: 3, picName: ''}
        ],
        msg1: '',
        msg0: '',
        msg2: '',
        msg3: '',
        blankImg: true,
        showButton: false,
        dialog: false,
        migList: ['../../../static/image/temp/forword.png',
          '../../../static/image/temp/sweper.jpg',
          '../../../static/image/temp/forword.png',
          '../../../static/image/temp/forword.png'
        ],
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          loop: true,
          preventClicks: false,
          autoplayDisableOnInteraction: false
        }
      }
    },
    components: {
      swiper,
      swiperSlide,
      companyServiceList,
      serviceLayout2,
      serviceLayout3,
      serviceLayout4,
      serviceLayout5,
      companyServicePop,
      serviceLabelFilter,
      compositionEditPop,
      docSummary,
      companyCase
    },
    created () {},
    mounted () {},
    computed: {},
    methods: {
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
      },
      close () {
        this.dialog = false
      },
      picShow ($event) {
        this.blankImg = !this.blankImg
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
      border-bottom: 1px solid #666;
    }
    .demo-flat-button-container.poa{
      left:50%;
      top:120px;
      height:60px;
      width:88px;
    }
    .mu-flat-button{
      height:60px;
    }
    .blankImg{
      width:900px;
      height:280px;
      background:#f2f5f8;
    }
    .blankImg img:hover{
      cursor: pointer;
    }
    .widthMain{
      width:900px;
      margin:0 auto;
      border:1px dashed #e6e6e6;
    }
    .submit{
      margin:30px 80px;
    }
    .mu-raised-button.mu-raised-button-inverse{
      color:#fff
    }
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
    }
    .home_banner {
      width: 900px;
      height: 280px;
      padding-top: 0;
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
      z-index: 11111;
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
      border-radius: 6px;
      position: absolute;
      top: 70px;
      right: 24px;
      background: #fff;
      z-index: 2;
      box-shadow: -4px 0 4px rgba(0,0,0,.256863), /*左边阴影*/ 4px 0 4px rgba(0,0,0,.256863), /*右边阴影*/ 0 -4px 4px rgba(0,0,0,.256863), /*顶部阴影*/ 0 4px 4px rgba(0,0,0,.256863);
    }
    .replaceImgButton:hover,
    .hocoll_logo:hover {
      cursor: pointer;
    }
    .swiperBox{
      
    }
    .swiperBox:hover .replaceImgButton{
      display: block;
      
    }
        .file-button{
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
    .hocoll_logo:hover P{
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
      color: #666
    }
    .replaceImg{
      background: #fff url(../../../static/image/edit.png) no-repeat 6px center;
      color:#898989;
    }
    .replaceImg:hover {
      background: #fff url(../../../static/image/editHover.png) no-repeat 6px center;
      color: #ffaa00;
    }
    .mu-raised-button.replaceImg .mu-raised-button-wrapper .mu-raised-button-label{
      padding-left:20px!important;
      padding-right:0!important;
    }
  }
  .borderRight span {
    display: inline-block;
    width: 28%;
    height: 13px;
  }
  
  .dialogInfo {
    width: 100%;
    padding-top: 20px;
  }
  
  .fileUpload,
  .fileUrl {
    width: 320px;
  }
  
  .fileDo {
    width: 80px
  }
  
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
    padding: 0
  }
  
  .buttonStyle {
    padding: 9px 15px;
    border-radius: 4px;
    background: #083c6f;
    color: #fff;
    outline: none;
    border: none;
    top: -10px;
    right: 60px;
  }
  
  .buttonStyle:hover {
    cursor: pointer
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
  .inputFile:hover{
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

  .service_Summary{position:relative;}
#homepageManagment .data_homepage .demo-raised-button{margin-right: 0 !important;}

</style>
