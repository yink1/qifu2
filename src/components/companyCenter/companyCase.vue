<template>
  <div v-bind:class="{ service_list_active: !toggleClass }" class="service_list_box case_box">
    <ul class="service_list">
      <li class="layout_self">
        <mu-float-button icon="add"  class="demo-float-button" @click="case_time"/>
        <div class="case_list" v-if="case_list">
          <p @click="colse"><a class="type_ppt" href="javascript:;">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</a></p>
          <p @click="colse"><a class="type_txt" href="javascript:;">《患者临床信息在院内的充分共享——复旦大学......</a></p>
          <p @click="colse"><a class="type_word" href="javascript:;">《医疗大数据与智能医疗》</a></p>
          <p @click="colse"><a class="type_more" href="javascript:;">添加新的案例</a></p>
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
    <div></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        toggleClass: true,
        case_list: false
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
      }
    }
  }
</script>
<style>
.case_box .service_list .layout_self{
  width:856px;
  height: 232px;
}
.case_box{height:164px;}
.case_box .service_list .layout_self{height: 160px;}
.case_list{position:absolute; left:50%; text-align: left; margin-left:-250px; top:10px; width:500px; height: 140px; padding:6px 24px; background:#fff; border-radius: 4px;}
.case_box .case_list p a{display: block; padding-left:30px; background-position: left center; background-repeat: no-repeat; font-size: 14px; color:#444; line-height: 32px;}
.case_box .case_list .type_ppt{background-image: url(../../../static/image/ppt_icon.png);}
.case_box .case_list .type_txt{background-image: url(../../../static/image/txt_icon.png);}
.case_box .case_list .type_word{background-image: url(../../../static/image/word_icon.png);}
.case_box .case_list .type_more{background-image: url(../../../static/image/unknown_icon.png); color: #FFAA00; text-decoration: underline;}
.case_box{margin:0 !important; padding: 0 !important;}
.case_box .service_detail .layout_self{margin: 0; border:none;}
.case_box .user_funbtn{height: 160px;}
.case_box .service_list .layout_self{width: 880px;}
.case_box li{border:none; margin:0;}
.case_box .service_list{overflow: hidden;}



</style>
