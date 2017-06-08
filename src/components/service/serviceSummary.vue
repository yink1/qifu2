<template>
  <div>
    <div class="services_data" v-for="index in data">
      <div class="service_left"><img :src="index.image" alt=""></div>
      <div class="service_right">
        <h2 class="datpage_title">{{index.title}}</h2>
        <p class="datpage_intro">{{index.info}}</p>
        <div class="public_user">
          <img :src="index.companyPic"/>
          <span>{{index.companyName}}</span>
        </div>
      </div>
      <div class="datpage_center">
        <mu-raised-button class="demo-raised-button datpage_btn1" label="查看详情" labelPosition="after" primary>
          <img src="../../../static/image/icon/detail.png" class="button_pics"/>
        </mu-raised-button><br/>
        <mu-raised-button class="demo-raised-button datpage_btn2" label="咨询TA" labelPosition="after" @click="open">
          <img src="../../../static/image/icon/tele_white.png" class="button_pics"/>
        </mu-raised-button> 
      </div>
    </div> 
    <div class="requirement_box" v-if="dialog"></div>
    <div class="dialog" v-if="dialog">
      <div class="require_content">             
        <a href="javascript:;" @click="close" class="close_dialog">
          <img src="../../../static/image/del.png"/>
        </a>
        <requirement></requirement>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import requirement from '@/components/shared/requirement'
  export default {
    data () {
      return {
        dialog: false,
        data: [{
          image: '../../../static/image/forward.jpg',
          title: '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
          info: '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
          companyPic: '../../../static/image/icon/conpanyattr.png',
          companyName: '企服圈'
        }, {
          image: '../../../static/image/forward.jpg',
          title: '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
          info: '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
          companyPic: '../../../static/image/icon/conpanyattr.png',
          companyName: '企服圈'
        }, {
          image: '../../../static/image/forward.jpg',
          title: '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
          info: '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
          companyPic: '../../../static/image/icon/conpanyattr.png',
          companyName: '企服圈'
        }, {
          image: '../../../static/image/forward.jpg',
          title: '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
          info: '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
          companyPic: '../../../static/image/icon/conpanyattr.png',
          companyName: '企服圈'
        }, {
          image: '../../../static/image/forward.jpg',
          title: '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
          info: '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
          companyPic: '../../../static/image/icon/conpanyattr.png',
          companyName: '企服圈'
        }]
      }
    },
    props: ['showData'],
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
      requirement
    }
  }
</script>
<style>
.services_data{
  clear: both;
  height:154px;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #bcbcbc;
  background-color: #fff;
}
.service_left {
  float:left;
  width: 215px;
  height: 114px;
}
.service_left img {
  width:100%;
  height:100%;
}
.service_right {
  float:left;
  width: 505px;
  height:114px;
  margin: 0 20px 0 10px;
  position: relative;
}
.public_user{
  position: absolute;
  bottom: -2px;
  left: 0;
  color: #ffaa00;
  font-size: 12px;
}
.public_user img{
  display: block;
  margin-right: 4px;
}
.public_user img,.public_user span{
  float: left;
}
.service_right .datpage_title {
  width: 100%;
  font-size: 18px;
  color: #2d2d2d;
  line-height: 1.5;
  max-height: 44px;
  overflow: hidden;
}
.service_right .datpage_intro {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  margin: 10px 0;
}

.datpage_btn1 .button_pics{
  margin-left: 25px;
}
.datpage_btn2 .button_pics{
  margin-left: 30px;
}
.datpage_center {
  float:left;
}
.services_data .mu-raised-button.mu-raised-button-inverse .mu-raised-button-label,.datpage_center .mu-raised-button-label{
  padding-left: 10px;
  padding-right: 22px;
  font-size: 14px;
}
.datpage_center .mu-raised-button-label{
  padding-right: 28px;
}
.datpage_center .datpage_btn1 {
  margin-bottom: 6px;
}
.datpage_center .datpage_btn2 {
  margin-bottom: 6px;
}
</style>
