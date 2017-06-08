<template>
  <div id="serviceManagement">
    <ul class="collect_type home_nav">
      <li class="active fl">添加服务</li>
      <li class="fl home_remark">（依据下方模板添加服务）</li>
    </ul>
    <serviceLabelFilter class="changWidth"></serviceLabelFilter>
    <h2>设定你的服务页面</h2>
    <img src="../../../static/image/managementMainHear.png" alt="" />
    <div class="showImg por">
      <img id="show" src="" alt="" />
      <div class="hocoll_logo">
        <div class="hoco_logoimg">
          <img :src="logoUrl"></div>
        <p>收藏</p>        
      </div>
      <div class="demo-flat-button-container">
              <mu-flat-button label="" class="demo-flat-button" >
                <img v-show="imgChange" src="../../../static/image/noteImg.png" alt="" />
                <input type="file" class="file-button" @change="picShow($event)">
              </mu-flat-button>
      </div>
      <div class="poa replaceImgButton" >
         <mu-raised-button class="demo-raised-button" label="替换图片" >
           <img src="../../../static/image/editHover.png" alt="" />
          <input type="file" class="file-button" @change="picShow($event)">
        </mu-raised-button>
      </div>
    </div>
    <div class="clearfix uploadInfo">
    	<div class="fl uploadBox">
    	  <div v-if="ok" class="por">
    	   <h3>选取您上传的介绍文件类型</h3>
  	     <div class="demo-flat-button-container">
            <mu-flat-button label="" class="demo-flat-button" v-for="it in uploadImgList" >
              <img :src="it" alt="" />
              <input type="file" class="file-button" >
            </mu-flat-button>
         </div>
          <div class="poa replaceButton">
            <mu-raised-button class="demo-raised-button" label="替换内容">
              <img src="../../../static/image/edit_black.png" alt="" />
              <input type="file" class="file-button">
            </mu-raised-button>
          </div>
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
    	  <div v-if="!ok">
      	  <mu-text-field label="单击此处输入标题" labelFloat/><br/>
      	  <div class="imgFooter">
            <img class="" src="../../../static/image/temp/companyIcon.png" height="16" width="16" alt="">
            <span>思齐圈</span>
          </div>
          <h4>服务商所在地：{{zero}}</h4>
      	  <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="3"/><br/>
      	  <mu-raised-button class="demo-raised-button changBg" label="咨询TA" icon="phone" primary/>
      	  <mu-raised-button class="demo-raised-button" label="发布需求" icon="add" @click="open" primary/>
      	  </div>
      	  <div v-else>
      	    <div>
      	      <p class="ph4">
      	         vue v-for循环默认选中第一个 vue.js Mehoo 3月14日提问 关注 4 关注 收藏...为什么样式是第
      	      </p>
      	      <div class="imgFooter">
                <img class="" src="../../../static/image/temp/companyIcon.png" height="16" width="16" alt="">
                <span>思齐圈</span>
              </div>
              <h4>服务商所在地：{{zero}}</h4>
              <div class="contentInfo">
                vue v-for循环默认选中第一个 vue.js Mehoo 3月14日提问 关注 4 关注 收藏...为什么样式是第
                vue v-for循环默认选中第一个 vue.js Mehoo 3月14日提问 关注 4 关注 收藏...为什么样式是第
                vue v-for循环默认选中第一个 vue.js Mehoo 3月14日提问 关注 4 关注 收藏...为什么样式是第
                vue v-for循环默认选中第一个 vue.js Mehoo 3月14日提问 关注 4 关注 收藏...为什么样式是第
              </div>
              <mu-raised-button class="demo-raised-button changBg" label="咨询TA" icon="phone" disabled primary/>
              <mu-raised-button class="demo-raised-button" label="发布需求" icon="add" disabled primary @click="open"/>
      	    </div>
      	  </div>
    	</div>
    </div>
    <div class="required" v-if="dialog"></div>
    <div class="requireCon" v-if="dialog">
      <img src="../../../static/image/del.png" alt="" @click="close"/>
      <requirement></requirement>
    </div>
    <companyServiceDetail></companyServiceDetail>
    <companyCase></companyCase>
    <div class="service_Summary">
      <docSummary></docSummary>
    </div>
    <div class="no_comment">
      <comment></comment>
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
  export default {
    data () {
      return {
        imgChange: true,
        dialog: false,
        topPopup: false,
        ok: true,
        zero: '上海',
        logoUrl: '../../../static/image/logoStyle.png',
        uploadImgList: ['../../../static/image/ppt.png',
          '../../../static/image/uplod_imgblue.png',
          '../../../static/image/video.png'
        ]
      }
    },
    components: {
      serviceLabelFilter,
      requirement,
      companyServiceDetail,
      companyCase,
      docSummary,
      comment
    },
    created () {},
    mounted () {},
    computed: {
    },
    methods: {
      getValue (e) {
        console.log(e.target.value)
      },
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      picShow (e) {
        this.imgChange = false
        var file = e.currentTarget.files[0]
        var reader = new FileReader()
        reader.onload = function (evt) {
          document.getElementById('show').setAttribute('src', evt.target.result)
          console.log(evt.target.result)
        }
        reader.readAsDataURL(file)
      }
    },
    watch: {}
  }
</script>
<style lang='less'>
  .dn{
    display: none;
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
      .requireCon .mu-raised-button{
        color:#fff;
      }
      .mu-raised-button {
        color: #000;
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
        height:54px;
        overflow: hidden;
      }
      .contentInfo{
        width:100%;
        font-size: 14px;
        color: #444;
        line-height: 20px;
        height:120px;
        overflow-y: auto;
        margin-bottom:10px;
      }
    .collect_type {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #666;
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
    }
    h2{
      font-size: 16px;
      color:#2d2d2d;
      text-indent: 20px;
      height:50px;
      line-height: 50px;
    }
    .poa{position: absolute;}
    .por{position: relative;}
    .showImg{
      width:900px;
      height:60px;
      overflow: hidden;
      border:1px solid #ccc;
      background:#f2f9ff;
      text-align: center;
    }
    .showImg:hover .replaceImgButton{
      display: block;
    }
    .hocoll_logo {
      width: 70px;
      height: 58px;
      border: 1px solid #e6e6e6;
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
      width:50px;
      display: inline-block;
      line-height: 20px;
      height: 20px;
      border-top: 1px solid #e6e6e6;
      font-size: 12px;
      color: #666;
      background: url(../../../static/image/smallater_gray.png) no-repeat 4px center;
      padding-left: 10px;
    }
    .hocoll_logo:hover p{
      color:#fff;
      background:#ffaa00 url(../../../static/image/smallaterWhite.png) no-repeat 4px center;
    }
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
    .uploadBox{
      width:550px;
      height:308px;
      border:1px dashed #ccc;
      background:#f2f9ff;
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
</style>
