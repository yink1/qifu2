<template>
  <div v-bind:class="{ service_list_active: !toggleClass }" class="service_list_box service_cetail_box">
    <ul class="service_list service_detail">
      <li class="layout_self">
        <p class="filein_upfile">
          <a href="javascript:;" class="filein_ppt filein_ppt1"><span></span></a>
          <a href="javascript:;" class="filein_img filein_img1"><span></span></a>
          <a href="javascript:;" class="filein_video filein_video1"><span></span></a>
        </p>
        <!--<img class="upfile_img" src="../../../static/image/forward.jpg" width="100%" height="100%" />-->
      </li>
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
    </ul>    
    <div></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        toggleClass: true
      }
    },
    methods: {
      enter () {
        this.toggleClass = false
      },
      leave () {
        this.toggleClass = true
      }
    }
  }
</script>
<style>

.service_detail .layout_self{
  width:856px;
  height: 232px;
}
.service_detail .filein_upfile {
    text-align: center;
    margin-top: 55px;
    position: relative;
    width: 100%;
}
.service_detail .filein_upfile a {
    position:relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    background-position: center !important;
    background-repeat: no-repeat !important;
}
.service_detail .filein_upfile span{display: none; position:absolute; left: 0; top:0; width: 100%; height: 100%; background: rgba(255,255,255,0.2);}
.service_detail .filein_upfile .filein_ppt {
    background-image:url(../../../static/image/uplod_imgblue.png);
    margin-right: 40px;
}
.service_detail .filein_upfile .filein_img {
    background-image: url(../../../static/image/video.png);
    margin-right: 40px;
}
.service_detail .filein_upfile .filein_video {
    background: url(../../../static/image/txt.png);
}
.service_detail .filein_upfile a:hover span{display: block;}
.service_detail .upfile_img{position:absolute;}
.service_cetail_box{height: auto !important; display: inline-block; padding:0 !important;}
.service_detail .layout_self{width:880px; height: 160px;}
.service_cetail_box{margin:0 !important; padding: 0 !important;}
.service_cetail_box .service_detail .layout_self{margin: 0; border:none;}
.service_detail .user_funbtn{height: 160px;}
.service_cetail_box .service_list .layout_self{width: 880px;}
</style>
