<template>
  <div>
    <div class="daba_detail">
      <div class="daba_header">
        <h2 class="dahead_title datitle_ppt">资料名称:润物有声 数字华全面浸润商业生活</h2>
        <div class="daba_info">
          <a href="" class="dabain_author daba_infochid">紫色医疗</a>
          <a href="" class="dabain_view daba_infochid">400</a>
          <a href="" class="dabain_time daba_infochid">2016-5-10</a>
          <ul class="dabain_share fr">
            <li class="fl">分享：</li>
            <li>
              <a href="" class="share_wx fl"></a>
            </li>
            <li>
              <a href="" class="share_in fl"></a>
            </li>
            <li>
              <a href="" class="share_wb fl"></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="daba_content">
        <div class="dabnt_left fl">
          <div class="doment_popup">
            <div class="dabnt_lehead">
              <a href="javascript:;" class="fl give_up">400 <span class="ani_effect">+1</span></a>
              <a href="javascript:;" class="fl dabnt_boo">120<span class="ani_effect">+1</span></a>
              <a href="javascript:;" class="fl dabnt_collect">200<span class="ani_effect">+1</span></a>
              <a href="javascript:;" class="fl dabnt_down">下载<span class="ani_effect">+1</span></a>
              <a href="javascript:;" class="fr fullsrc"></a>
              <a href="javascript:;" class="fr no_fullsrc"></a>
              <span class="fr">需要<span class="numbercol">20</span>积分已有<span class="numbercol">100</span>人下载</span>
            </div>
            <!--竖版-->
            <div class="dabnt_lecont"></div>
            <!--横版-->
            <!--<div class="dabnt_footlk">
                <img src="../../static/image/detail1.png" alt="" style="width: 100%;height: 100%;"/>
              </div>-->
          </div>
          <div class="daba_commetn">
            <comment></comment>
          </div>
        </div>
        <div class="dabnt_right fl">
          <h2 class="dabnt_ridocu">其他相关资料</h2>
          <ul class="dabnt_cata">
            <li class="datitle_ppt">
              <h3 class="dabnt_catatle">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</h3>
              <div class="cata_content">
                <a href="javascript:;" class="cata_conthor">紫色医疗</a>
                <a href="javascript:;" class="cata_conup">401<span class="cata_effect">+1</span></a>
              </div>

            </li>
            <li class="datitle_excel">
              <h3 class="dabnt_catatle">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</h3>
              <div class="cata_content">
                <a href="javascript:;" class="cata_conthor">紫色医疗</a>
                <a href="javascript:;" class="cata_conup">401<span class="cata_effect">+1</span></a>
              </div>

            </li>
            <li class="datitle_txt">
              <h3 class="dabnt_catatle">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</h3>
              <div class="cata_content">
                <a href="javascript:;" class="cata_conthor">紫色医疗</a>
                <a href="javascript:;" class="cata_conup">401<span class="cata_effect">+1</span></a>
              </div>

            </li>
            <li class="datitle_pdf">
              <h3 class="dabnt_catatle">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</h3>
              <div class="cata_content">
                <a href="javascript:;" class="cata_conthor">紫色医疗</a>
                <a href="javascript:;" class="cata_conup">401<span class="cata_effect">+1</span></a>
              </div>

            </li>
            <li class="datitle_word">
              <h3 class="dabnt_catatle">从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道</h3>
              <div class="cata_content">
                <a href="javascript:;" class="cata_conthor">紫色医疗</a>
                <a href="javascript:;" class="cata_conup">401<span class="cata_effect">+1</span></a>
              </div>

            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import comment from '@/components/shared/comment'
  export default {
    data () {
      return {
        value: 0
      }
    },
    created () {
    },
    mounted () {
      this.value = 50
    },
    computed: {
    },
    methods: {},
    components: {
      comment
    }
  }
</script>

<style>
.daba_commetn{ padding:0 29px;}
.daba_detail{width:1200px; margin: 0 auto;}
.daba_detail .daba_header{width: 920px;}
.daba_detail .daba_header .dahead_title{margin-top: 10px;font-size: 20px;color: #2d2d2d;font-weight: bold;padding-left: 30px;}
.datitle_ppt{background: url(../../static/image/ppt_icon.png) no-repeat left 3px;}
.datitle_excel{background: url(../../static/image/excel.png) no-repeat left 3px;}
.datitle_txt{background: url(../../static/image/txt_icon.png) no-repeat left 3px;;}
.datitle_pdf{background: url(../../static/image/pdf_icon.png) no-repeat left 3px;;}
.datitle_word{background: url(../../static/image/word_icon.png) no-repeat left 3px;;}
.daba_detail .daba_header .daba_info{margin: 10px 0;overflow: hidden;font-size: 12px;color: #898989;}
.daba_header .daba_info .daba_infochid{width: 110px; color:#898989; margin-right: 10px;padding-left: 18px;display: inline-block;box-sizing: border-box;}
.daba_header .daba_info .dabain_author{background: url(../../static/image/people.png) no-repeat left center;}
.daba_header .daba_info .dabain_view{background: url(../../static/image/pageview.png) no-repeat left center;padding-left: 20px;}
.daba_header .daba_info .dabain_time{background: url(../../static/image/time_icon.png) no-repeat left center;}
.daba_header .daba_info .dabain_share{overflow: hidden;}
.daba_header .daba_info .dabain_share{width: 110px;}
.daba_header .daba_info .dabain_share li a{height: 18px;width: 18px;opacity: 0.7;}
.daba_header .daba_info .dabain_share li a:hover{opacity: 1;}
.daba_header .daba_info .share_wx{background: url(../../static/image/weixin.png) no-repeat left center;margin-right: 10px;}
.daba_header .daba_info .share_in{background: url(../../static/image/in.png) no-repeat left center;margin-right: 10px;}
.daba_header .daba_info .share_wb{background: url(../../static/image/weibo.png) no-repeat left center;}
.daba_detail .daba_content{overflow: hidden;}
.daba_detail .daba_content .dabnt_left{width: 920px;background: #fff;border: 1px solid #e6e6e6;box-sizing: border-box;}
.daba_content .dabnt_left .dabnt_lehead{width: 100%;height: 50px;box-shadow:0px 3px 2px rgba(0,0,0,0.2);line-height: 50px;color: #898989;background: #fff;}
.daba_content .dabnt_left .dabnt_header,.daba_content .dabnt_left .active .dabnt_lehead{position: fixed;top: 0;}
.daba_content .dabnt_left .dabnt_header{width: 919px;}
.daba_content .dabnt_left .dabnt_lehead a{padding-left: 24px;margin-left: 40px;position: relative;}
.daba_content .dabnt_lehead a .ani_effect{position: absolute;line-height: normal;color: #ffaa00;top: 16px;left: 23px;opacity: 0;}
.dabnt_right .cata_conup .cata_effect{position: absolute;line-height: normal;color: #ffaa00;bottom: 0;left: 20px;opacity: 0;}
.dabnt_left .dabnt_lehead .give_up{background: url(../../static/image/giveup_gray.png) no-repeat left center;}
.dabnt_left .dabnt_lehead .dabnt_boo{background: url(../../static/image/boo_gray.png) no-repeat left center;}
.dabnt_left .dabnt_lehead .dabnt_collect{background: url(../../static/image/collect_gray.png) no-repeat left center;}
.dabnt_left .dabnt_lehead .dabnt_down{background: url(../../static/image/down_gray.png) no-repeat left center;}
.dabnt_left .dabnt_lehead .fullsrc{background: url(../../static/image/fullsrc_gray.png) no-repeat center center;height: 100%;margin-right: 20px;}
.dabnt_left .dabnt_lehead .give_up:hover{background: url(../../static/image/giveup_black.png) no-repeat left center;color: #000;}
.dabnt_left .dabnt_lehead .dabnt_boo:hover{background: url(../../static/image/boo_black.png) no-repeat left center;color: #000;}
.dabnt_left .dabnt_lehead .dabnt_collect:hover{background: url(../../static/image/collect_black.png) no-repeat left center;color: #000;}
.dabnt_left .dabnt_lehead .dabnt_down:hover{background: url(../../static/image/downblack.png) no-repeat left center;color: #000;}
.dabnt_left .dabnt_lehead .fullsrc:hover{background: url(../../static/image/fullsrc_black.png) no-repeat center center;}
.dabnt_left .dabnt_lehead .up_click{color: #ffaa00;background: url(../../static/image/giveup_orange.png) no-repeat left center;}
.dabnt_left .dabnt_lehead .boo_click{color: #ffaa00;background: url(../../static/image/boo_orange.png) no-repeat left center;}
.dabnt_left .dabnt_lehead .collect_click{color: #ffaa00;background: url(../../static/image/collect_orange.png) no-repeat left center;}
.dabnt_left .dabnt_lehead .numbercol{color: #ffaa00;font-weight: bold;}
.dabnt_left .wrimod .wrimod_right .module,.dabnt_left .revmod .wrimod .single_right{width: 780px;z-index: 10;}
.dabnt_left .revmod{padding-bottom: 0;}
.dabnt_left .revmod .wrimod .single_right .sin_cont{width: 740px;}
.daba_content .dabnt_left .dabnt_lecont{width: 100%;min-height: 518px; max-height: 1288px;border-bottom: 1px solid #e6e6e6;overflow: auto;}
.daba_content .dabnt_left .dabnt_footlk{width: 100%;height: 518px;}
.daba_detail .daba_content .dabnt_right{width: 255px;margin-left: 25px;}
.dabnt_right .dabnt_ridocu{font-size: 16px;color: #083c6f;padding-bottom: 10px;border-bottom: 1px solid #083c6f;font-weight: normal;}
.dabnt_right .dabnt_cata li{padding-left: 30px;margin-top: 10px;}
.dabnt_right .dabnt_cata .dabnt_catatle{font-size: 14px;color: #444;line-height: 18px;max-height: 36px;overflow: hidden;font-weight: normal;}
.dabnt_right .dabnt_cata .cata_content{padding: 10px 0;overflow: hidden;border-bottom: 1px solid #e6e6e6;}
.dabnt_right .dabnt_cata .cata_content a{display: inline-block;box-sizing: border-box;font-size: 12px;color: #898989;}
.dabnt_right .dabnt_cata .cata_content .cata_conthor{width: 130px;margin-right: 5px;background: url(../../static/image/people.png) no-repeat left center;padding-left: 17px;}
.dabnt_right .dabnt_cata .cata_content .cata_conup{width: 85px;background: url(../../static/image/parise_gray.png) no-repeat left center;padding-left: 20px;position: relative;}
.dabnt_right .dabnt_cata .cata_content .conup_click{background: url(../../static/image/parise_orange.png) no-repeat left center;color: #ffaa00;}
</style>
