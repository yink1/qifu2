<template>
  <div class="serviceDetail">
    <div class="service_banner">
      <img src="../../static/image/companyHeader.jpg"/> 
      <div class="banner_intro">
        <companyFavorite></companyFavorite>
      </div>      
    </div> 
    <div class="detail_info">
      <navigation :title='title' :navbarList='navbarList'></navigation>
      <div class="info_box">
        <div class="cont_info">
          <div class="cont_left">
            <img src="../../static/image/enter_center.png" width="100%" height="100%"/>
            <a href="javascript:;" class="enlarge"></a>
          </div>
          <div class="cont_right">
            <p class="info_title">{{data.title}}</p>
            <div class="project_author"><span>企服圈</span></div>
            <span class="address">服务商所在地：{{data.address}}</span>
            <div class="summary">
              <p>简介：{{data.sunmmaryTitle}}</p>
              {{data.summaryDetail}}
            </div>
            <mu-raised-button class="demo-raised-button" label="咨询TA" labelPosition="after" primary>
              <img src="../../static/image/icon/tele_white.png" class="button_pic"/>
            </mu-raised-button>
            <mu-raised-button class="demo-raised-button" label="发布需求" labelPosition="after" @click="open">
              <img src="../../static/image/icon/add_in.png" class="button_pic"/>
            </mu-raised-button>
            <div class="requirement_box" v-if="dialog"></div> 
            <div class="dialog" v-if="dialog">
              <div class="require_content">             
                <a href="javascript:;" @click="close" class="close_dialog">
                  <img src="../../static/image/del.png"/>
                </a>
                <requirement></requirement>
              </div>
            </div>            
            <div class="u_do">
              <evaluation></evaluation>
            </div>
          </div>
        </div>
        <div class="info_detail">
          <p class="detail_title">咨询详情</p>
          <div class="cir_detail">
            
          </div>
        </div>
        <div class="relative_case">
          <p class="detail_title">相关案例</p>
          <div class="relative_cases">
            <docSummaryDetail showData="false"></docSummaryDetail>
          </div>
        </div>
        <div class="u_comment">
          <p class="detail_title">您的评论</p>
          <div class="relative_cases">
            <comment></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import companyFavorite from '@/components/shared/companyFavorite'
  import navigation from '@/components/shared/navigation'
  import evaluation from '@/components/shared/evaluation'
  import docSummaryDetail from '@/components/company/docSummaryDetail'
  import comment from '@/components/shared/comment'
  import requirement from '@/components/shared/requirement'
  export default {
    data () {
      return {
        title: '首页',
        navbarList: ['医学服务', '详情'],
        dialog: false,
        data: {
          title: '变主数据管理的演进和客户数据的重要性按说撒奥奥奥寻C',
          address: '上海',
          sunmmaryTitle: '医药产品经理面临的困难',
          summaryDetail: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
        }
      }
    },
    methods: {
      open () {
        this.dialog = true
        $('body,html').css('overflow', 'hidden')
      },
      close () {
        this.dialog = false
        $('html,body').css('overflow', 'auto')
      }
    },
    components: {
      companyFavorite,
      navigation,
      evaluation,
      docSummaryDetail,
      comment,
      requirement
    }
  }
</script>
<style>
.service_banner{
  width: 100%;
  height: 130px;
  position: relative;
}
.service_banner>img{
  width: 100%;
  height:100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
.banner_intro{
  width: 1000px;
  margin:0 auto;
  padding-top: 12px;
}
.detail_info{
  width: 1000px;
  margin:0 auto;
}
.cont_info{
  height: 346px;
  padding-top: 10px;
}
.cont_left{
  width: 600px;
  height: 336px;
  margin:0 0 0 10px;
  position: relative;
}
.enlarge{
  position: absolute;
  bottom: 0;
  right: 0;
}
.cont_right,.cont_left{
  float: left;
}
.cont_right{ 
  position: relative;
  width: 390px;
  height: 336px;
  padding: 0 20px;
}
.info_title{
  font-size: 18px;
  color: #2d2d2d;
  width: 100%;
  font-weight: bold;
  max-height: 44px;
  overflow: hidden;
  word-wrap:break-word; 
  word-break:normal;
  line-height: 22px;
}
.project_author{
  background: url(../../static/image/icon/conpanyattr.png) left center no-repeat;
  margin: 16px 0;
}
.project_author span{
  margin-left:20px;
  display: block;
  color: #ffaa00;
  text-decoration: underline;
}
.address{
  font-size: 14px;
  color:#444;
}
.summary{
  width: 355px;
  height: 110px;
  overflow-y: auto;
  word-wrap:break-word; 
  word-break:normal;
  font-size: 14px;
  color: #444;
}
.cont_right .mu-raised-button.mu-raised-button-inverse .mu-raised-button-label,.cont_right .mu-raised-button-label{
  padding-right: 16px;
  padding-left:6px;
}
.button_pic{
  margin-left:20px;
}
.cont_right .mu-raised-button.mu-raised-button-inverse{
  margin:15px 20px 20px 0;
}
.u_do{
  background-color: rgba(0,0,0,.7);
  position: absolute;
  bottom: 0;
  left:0px;
}
/*下面部分详情*/
.detail_title{
  border-bottom:1px solid #e6e6e6;
  padding:15px 20px 10px;
  margin: 0 10px;
  height: 50px;
  color: #083c6f;
  font-size: 18px;
  font-weight: bold;
}
.cir_detail{
  padding:20px 30px;
}
.relative_cases{
  padding:0 40px;
}
.relative_cases .datpage_right{
  width: 674px;
}
.requirement_box{
  opacity: 0.4;
  background-color: rgb(0, 0, 0);
  position: fixed;
  z-index: 20141241;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.dialog{
    z-index: 20141440;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
}
.require_content{
  max-width: 768px;
  padding:14px 20px;
  background-color: #fff;
  border-radius: 2px;
  font-size: 16px;
  position: relative;
  box-shadow: 0 19px 60px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);
}
.close_dialog{
  position: absolute;
  top:10px;
  right:10px;
}
</style>
