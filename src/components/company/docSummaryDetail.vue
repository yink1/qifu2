<template>
  <div class="related_services">
    <div class="datpage_left"><img src="../../../static/image/forward.jpg" alt=""></div>
    <div class="datpage_right">
      <h2 class="datpage_title">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</h2>
      <p class="datpage_intro">医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节,.</p>
      <p class="datpage_funct" v-if="showData">
        <a href="javascript:;" class="datatum_up"><span class="plus_one">400</span><span class="data_fect">+1</span></a>
        <a href="javascript:;" class="datatum_click"><span class="plus_one">120</span><span class="data_fect">+1</span></a>
        <a href="javascript:;" class="datatum_coll">收藏资料</a>
        <a href="javascript:;" class="datatum_author">紫色医疗</a>
        <a href="javascript:;" class="datatum_type">word</a>
      </p>
    </div>
    <div class="datpage_center">
      <mu-raised-button class="demo-raised-button datpage_btn1" label="收藏" labelPosition="after" primary>
        <img src="../../../static/image/sc_null.png" class="button_pics"/>
      </mu-raised-button><br/>
      <mu-raised-button class="demo-raised-button datpage_btn2" label="分享" labelPosition="after">
        <img src="../../../static/image/icon/share_white.png" class="button_pics"/>
      </mu-raised-button> 
    </div>
   </div>
</template>
<script>
  export default {
    props: ['showData']
  }
</script>
<style>
.related_services{
  height:140px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px dashed #e6e6e6;
  background-color: #fff;
  clear: both;
}
.datpage_left {
  float:left;
  width: 100px;
  height: 100px;
}
.datpage_left img {
  border:1px solid #e6e6e6;
  max-width:100%;
  max-height:100%;
}
.datpage_right {
  float:left;
  width: 588px;
  margin: 0 20px 0 10px;
}
.datpage_right .datpage_title {
  width: 100%;
  font-size: 18px;
  color: #2d2d2d;
  line-height: 28px !important;
  max-height: 28px;
  overflow: hidden;
}
.datpage_right .datpage_intro {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  margin: 10px 0;
}
.datpage_right .datpage_funct {
  height: 16px;
}
.datpage_right .datpage_funct a {
  float: left;
  margin-right: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #898989;
  position: relative;
  background-position: left center;
  background-repeat: no-repeat !important;
}
.datpage_funct .datatum_up {
  background:url(../../../static/image/parise_gray.png);
}
.datpage_funct .datatum_up:hover,.datpage_right .datpage_funct .datatum_up.active {
  color: #ffaa00;
  background:url(../../../static/image/parise_orange.png);
}
.datpage_funct .datatum_click {
  background:url(../../../static/image/tread_gray.png);
}
.datpage_funct .datatum_click:hover,.datpage_right .datpage_funct .datatum_click.active {
  color: #ffaa00;
  background:url(../../../static/image/tread_orange.png);
}
.datpage_funct .datatum_author {
  background: url(../../../static/image/people.png);
}
.datpage_funct .datatum_coll {
  background:url(../../../static/image/shoucan_null.png);
}
.datpage_funct .datatum_coll:hover,.datpage_right .datpage_funct .datatum_coll.active {
  color: #ffaa00;
  background:url(../../../static/image/shoucang_active.png);
}
.datpage_funct .datatum_type {
  background: url(../../../static/image/filetype_gray.png);
}
.button_pics{
  margin-left: 30px;
}
.datpage_right .datpage_funct .data_fect {
  position: absolute;
  top: 0;
  left: 20px;
  color: #FFAA00;
  opacity: 0;
}
.datpage_center {
  float:left;
}
.datpage_center .mu-raised-button.mu-raised-button-inverse .mu-raised-button-label,.datpage_center .mu-raised-button-label{
  padding-left: 10px;
  padding-right: 28px;
}
.datpage_center .mu-raised-button-label{
  padding-left: 20px;
}
.datpage_center .datpage_btn1 {
  margin-bottom: 6px;
}
.datpage_center .datpage_btn2 {
  margin-bottom: 6px;
}
</style>
