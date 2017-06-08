<template>
  <div>
    <h2 class="service_sele">相关案例</h2>
  <div class="data_pagecont">
    <ul class="data_homepage">
      <li class="datpage_list demo-paper" :zDepth="2" v-bind:class="{ service_list_active: !toggleClass }">
        <mu-float-button icon="add"  class="demo-float-button" @click="case_time"/>
        <div class="case_list" v-if="case_list">
          <p @click="colse"><a class="type_ppt" href="javascript:;">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</a></p>
          <p @click="colse"><a class="type_txt" href="javascript:;">《患者临床信息在院内的充分共享——复旦大学......</a></p>
          <p @click="colse"><a class="type_word" href="javascript:;">《医疗大数据与智能医疗》</a></p>
          <p @click="colse"><a class="type_more" href="javascript:;">添加新的案例</a></p>
        </div>
        <!-- 相关服务列表样式 -->
        <div class="Related_services" v-if="Related_services">
        <div class="datpage_left"><img src="../../../static/image/forward.jpg" alt=""></div>
        <div class="datpage_right">
          <h2 class="datpage_title">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</h2>
          <p class="datpage_intro">医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节,.</p>
          <p class="datpage_funct">
            <a href="javascript:;" class="datatum_up"><span class="plus_one">400</span><span class="data_fect">+1</span></a>
            <a href="javascript:;" class="datatum_click"><span class="plus_one">120</span><span class="data_fect">+1</span></a>
            <a href="javascript:;" class="datatum_coll">收藏资料</a>
            <a href="javascript:;" class="datatum_author">紫色医疗</a>
            <a href="javascript:;" class="datatum_type">word</a>
          </p>
        </div>
        <div class="datpage_center">
          <mu-raised-button class="demo-raised-button datpage_btn1" label="咨询TA" labelPosition="after" primary>
            <img src="../../../static/image/sc_null.png" class="buttom_pic"/>
          </mu-raised-button><br/>
          <mu-raised-button class="demo-raised-button datpage_btn2" label="发布需求" labelPosition="after">
            <img src="../../../static/image/icon/share_white.png" class="buttom_pic"/>
          </mu-raised-button> 
        </div>
        </div>
      </li>
      </ul>
      <div class="user_funbtn" @mouseenter="enter" @mouseleave="leave">
      <mu-list-item title="删除">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/delete.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="上移">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/up.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="下移">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/down.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="更多详情">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/add.png"/></mu-avatar>
      </mu-list-item>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        toggleClass: true,
        case_list: false,
        Related_services: false
      }
    },
    methods: {
      enter () {
        this.toggleClass = false
      },
      leave () {
        this.toggleClass = true
      },
      case_time () {
        this.case_list = true
      },
      colse () {
        this.case_list = false
        this.Related_services = true
      }
    }
  }
</script>

<style>
.Related_services{position: absolute; left: 0; top:0; width: 100%; height: 100%; background: #fff; padding:20px;}
.data_pagecont {
  position: relative;
  width: 940px;
  margin-bottom: 10px;
}
.data_homepage li {
  position: relative;
  background: #f2f9ff;
  width:884px;
  padding: 30px 20px;
  overflow: hidden;
  border: 2px dashed #e6e6e6;
  height: 160px;
  text-align: center;
}
.data_homepage li .demo-float-button{
  margin-top:20px;
}
.datpage_list .datpage_left {
  float:left;
  width: 100px;
  height: 100px;
}
.datpage_list .datpage_left img {
  border:1px solid #e6e6e6;
  max-width:100%;
  max-height:100%;
}
.datpage_list .datpage_right {
  float:left;
  width: 588px;
  margin: 0 20px 0 10px;
}
.datpage_list .datpage_right .datpage_title {
  width: 100%;
  font-size: 18px;
  color: #2d2d2d;
  line-height: 28px !important;
  max-height: 28px;
  overflow: hidden;
}
.datpage_list .datpage_right .datpage_intro {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  margin: 10px 0;
}
.datpage_list .datpage_right .datpage_funct {
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
.datpage_center .mu-raised-button.disabled {
  display: block;
  padding-left: 20px;
  background:#C6C6C7;
  color:#8a8a8a !important;
  margin-right: 0 !important;
}
.datpage_center .datpage_btn1 {
  /*background:#e6e6e6 url(../../../static/image/collstar_gray.png) no-repeat 10px center !important;*/
  margin-bottom: 6px;
}
.datpage_center .datpage_btn2 {
  /*background:#e6e6e6 url(../../../static/image/share_icon.png) no-repeat 10px center !important;*/
  margin-bottom: 6px;
}
.service_Summary .datpage_funct{display: none;}
.service_Summary .user_funbtn{right:-34px; height: 160px; top:0px;}
.data_homepage .service_list_active{border:1px solid #FFAA00;}
.case_box .service_list .layout_self{
  width:856px;
  height: 232px;
}
.case_list{position:absolute; left:50%; text-align: left; margin-left:-250px; top:10px; width:500px; height: 140px; padding:6px 24px; background:#fff; border-radius: 4px;}
.case_list p a{display: block; padding-left:30px; background-position: left center; background-repeat: no-repeat; font-size: 14px; color:#444; line-height: 32px;}
.case_list .type_ppt{background-image: url(../../../static/image/ppt_icon.png);}
.case_list .type_txt{background-image: url(../../../static/image/txt_icon.png);}
.case_list .type_word{background-image: url(../../../static/image/word_icon.png);}
.case_list .type_more{background-image: url(../../../static/image/unknown_icon.png); color: #FFAA00; text-decoration: underline;}
.case_box{margin:0 !important; padding: 0 !important;}

</style>





<!-- Add "scoped" attribute to limit CSS to this component only -->

