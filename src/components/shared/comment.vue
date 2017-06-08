<template>
  <div>
  <h3 class="retitle reviewed" id="reviewed">您的评论</h3>
  <div class="revmod">
    <div class="wrimod">
      <div style="overflow: hidden;">
        <div class="wrimod_left fl">
          <img src="../../../static/image/forward.jpg">
        </div>
        <div class="wrimod_right fl">
          <mu-text-field class="module" hintText="发表评论" multiLine :rows="3"/><br/>
          <p class="sumb_revew">
            <mu-raised-button class="demo-raised-button fr" href="javascript:;" label="评论" labelPosition="after" secondary>
      <i class="mudocs-icon-custom-github mu-icon" style="font-size:24px;"></i>
  </mu-raised-button>
          </p>
        </div>
      </div>
      <div class="comment_list">
      <h3 class="userevie">用户评论<span class="has_wrimod">已有<span class="wrifig">2</span>人评论</span></h3>
      <ul class="alreadmod">
        <li class="singlemod">
          <div class="single_left fl">
            <img src="../../../static/image/forward.jpg">
          </div>
          <div class="single_right fl">
            <p class="sin_author"><span class="sinau_name">漫游者</span><span class="exp_pra">表示了称赞</span><span class="fr">1天前</span>
              <a href="javascript:;" class="delet_reveiw"><u>删除</u></a>
            </p>
            <p class="sin_cont">厉害了，多得是，大家不知道的事</p>
          </div>
        </li>
      </ul>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  
</script>
<style>
.fl{float: left;}
.fr{float: right;}
.revmod .mu-text-field-multiline{height:80px;}
.revmod .mu-text-field.multi-line .mu-text-field-hint{padding:5px 0 0 10px;}
.revmod .mu-text-field-content{overflow: auto; padding-bottom: 0;}
.revmod .mu-text-field-input{height: 70px !important;padding:5px 10px;}
.mu-text-field-textarea{padding: 10px;}
.sumb_revew .mu-icon{width:18px; height: 16px; background:url(../../../static/image/comment_icon.png) no-repeat center center;}
  .reviewed {
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 18px;
    color: #083c6f;
    font-weight: bold;
    padding: 0 20px;
}
.wrimod_right .demo-raised-button{margin-right:0;background: #083C6F; }
.revmod {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 0;
}
.revmod {
    padding-bottom: 0;
}
.revmod .wrimod{width: 100%;overflow: hidden;}
.revmod .wrimod .wrimod_left,.revmod .wrimod .single_left{width: 60px;height: 60px;margin-right: 20px;}
.revmod .wrimod .wrimod_left img,.revmod .wrimod .single_left img{width: 100%;height: 100%;}
.wrimod .wrimod_right .module{width: 840px;font-size: 14px;color: #444;background-color: #f2f9ff;color: #898989;}
.wrimod .wrimod_right .module:hover{border-color: #083c6f;}
:-moz-placeholder{color: #999;}
::-moz-placeholder{color: #999;}
textarea:-ms-input-placeholder{color: #999;}
textarea::-webkit-input-placeholder{color: #999;}
.wrimod .wrimod_right .submod{background: #083c6f;color: #fff;width: 120px;height: 36px;font-size: 14px;text-align: center;line-height: 36px;border-radius: 1px;}
.wrimod .wrimod_right .sumb_revew{overflow: hidden;margin-top: 10px;}
.wrimod .userevie{font-size: 18px;color: #083c6f;font-weight: bold;}
.wrimod .userevie .has_wrimod{font-size: 14px;color: #898989;font-weight: bold;margin-left: 10px;;}
.userevie .has_wrimod .wrifig{color: #ffaa00;}
.revmod .wrimod .alreadmod{padding-top:6px ;width: 100%;}
.revmod .wrimod .singlemod{padding: 16px 0;width: 100%;border-bottom: 1px dashed #e6e6e6;overflow: hidden;}
.revmod .wrimod .single_right .sin_author{margin-bottom: 10px;color: #999;font-size: 13px;position: relative;}
.revmod .sin_author .sinau_name{width: 110px;margin-right: 10px;display: inline-block;}
.revmod .sin_author .delet_reveiw{position: absolute;color: #ff1919;right: 0;bottom: -24px;}
.revmod .wrimod .single_right {width: 840px;z-index:10;}
.revmod .wrimod .single_right .sin_cont{color: #444;font-size: 14px;width: 810px;}
.revmod .wrimod .single_right .exp_pra{padding-left: 20px;background:url(../../../static/image/parise_orange.png) no-repeat left center;color: #ffaa00; cursor:pointer;}
.no_comment .module{background:#e6e6e6;}
.no_comment .wrimod .wrimod_right .module:hover{border-color: #bcbcbc;}
.no_comment .comment_list{display: none;}
.no_comment .wrimod_right .demo-raised-button{background: #e6e6e6; color:#898989 !important; margin-right: 0 !important;}
.no_comment .wrimod .single_right .exp_pra{padding-left: 20px;background:url(../../../static/image/parise_orange.png) no-repeat left center;color: #ffaa00; cursor:pointer;}
</style>
