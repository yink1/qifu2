<template>
  <div>
    <div class="daba_detail">
      <div class="daba_header">
        <navigation :title='title' :navbarList='navbarList'></navigation>
        <h2 class="dahead_title datitle_ppt" :class="{ datitle_ppt: docInfo.format == 'ppt' || docInfo.format == 'pptx',datitle_pdf: docInfo.format == 'pdf', datitle_txt: docInfo.format == 'txt', datitle_word: docInfo.format == 'doc' || docInfo.format == 'docx', datitle_excel: docInfo.format == 'xls' || docInfo.format == 'xlsx'}">{{docInfo.title}}</h2>
        <div class="daba_info">
          <span class="dabain_author daba_infochid">{{docInfo.ownerName}}</span>
          <span class="dabain_view daba_infochid">{{docInfo.clickCount}}</span>
          <span class="dabain_time daba_infochid">{{docInfo.createTime}}</span>
          <ul class="dabain_share fr">
            <li class="fl">分享：</li>
            <li>
              <a href="javascript:;" class="share_wx fl" onclick="jiathis_sendto('weixin');return false;"></a>
            </li>
            <li>
              <a href="javascript:;" class="share_in fl" onclick="jiathis_sendto('linkedin');return false;"></a>
            </li>
            <li>
              <a href="javascript:;" class="share_wb fl" onclick="jiathis_sendto('tsina');return false;"></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="daba_content">
        <div class="dabnt_left fl">
          <div class="doment_popup">
            <div class="dabnt_lehead cl">
              <a href="javascript:;" class="fl give_up" :class="{'give_up active': likeFlag == 1}" @click="setLike(1)">{{likeCount}}<span class="ani_effect">+1</span></a>
              <a href="javascript:;" class="fl dabnt_boo" :class="{'dabnt_boo active': likeFlag == -1}" @click="setLike(-1)">{{unLikeCount}}<span class="ani_effect">+1</span></a>
              <a href="javascript:;" class="fl dabnt_collect" :class="{'dabnt_collect':isCollect,'dabnt_collect active':!isCollect}" @click="setFavorite">{{favoriteCount}}<span class="ani_effect">+1</span></a>
              <a href="javascript:;" class="fl dabnt_down" @click="downLoadDoc()">下载<span class="ani_effect">+1</span></a>
<!--              <a href="javascript:;" class="fr fullsrc"></a>
-->              <a href="javascript:;" class="fr no_fullsrc"></a>
              <span class="fr">需要<span class="numbercol">{{docInfo.score}}</span>财富值已有<span class="numbercol">{{docInfo.downloadCount}}</span>人下载</span>
            </div>
            <!--竖版-->
            <div class="dabnt_lecont"><div id="reader"></div></div>
            <!--横版-->
            <!--<div class="dabnt_footlk">
                <img src="../../static/image/detail1.png" alt="" style="width: 100%;height: 100%;"/>
              </div>-->
          </div>
          <div class="daba_commetn">
            <comment :objectId="this.$route.params.docId"></comment>
          </div>
        </div>
        <div class="dabnt_right fl">
          <h2 class="dabnt_ridocu">其他相关资料</h2>
          <relevantData :docList="item" v-for="item in docList" ></relevantData>
        </div>
      </div>
    </div>
    <div class="pupOutbj" v-if="dialog">
      <div class="poa pupOut">
        <h4>{{docInfo.title}}</h4>
        <p>下载所需财富值：<span>{{docInfo.score}}点</span></p>
        <p v-if="insufficient">您持有财富值：   {{MemberInfo}}点，财富值不足，无法进行下载</p>
        <p class="poa_last">因本次下载而产生的的财富将由企服圈以一定方式转交发布者</p>
      <div class="clearfix">
        <mu-flat-button class="fr" slot="actions" @click="close(2)" label="立即充值" v-if="Recharge"/>
        <mu-flat-button class="fr" slot="actions" @click="close(1)" label="立即下载" v-if="downLoad"/>
        <mu-flat-button class="fr" slot="actions" @click="close(0)" label="取消"/>
      </div>
      </div>
    </div>
  </div>
</template>  
<script>
  import navigation from '@/components/shared/navigation'
  import comment from '@/components/shared/comment'
  import favoriteService from '@/services/favoriteService'
  import docService from '@/services/docService'
  import pointService from '@/services/pointService'
  import relevantData from '@/components/doc/relevantData'
  import userService from '@/services/userService'
  import router from '@/router/router'
  import { mapGetters } from 'vuex'
  import * as types from '@/store/types'
  export default {
    data () {
      return {
        docInfo: {},
        docList: [],
        title: '首页',
        navbarList: ['资料库'],
        value: 0,
        option: {},
        isLike: false,
//      点赞数
        likeCount: 0,
        unLikeCount: 0,
        likeFlag: 0,
        isCollect: false,
        favoriteCount: 0,
        isUnlike: false,
        dialog: false,
        MemberInfo: []
      }
    },
    created () {
      this.get()
    },
    mounted () {
      this.value = 50
    },
    computed: {
      ...mapGetters(
        {
          userLoginStatus: [types.GET_USER_LOGIN_STATUS],
          isCompanyUser: [types.IS_COMPANY_USER],
          getUserId: [types.GET_USER_ID],
          getCompanyId: [types.GET_COMPANY_ID]
        }
      )
    },
    methods: {
      setFavorite: function (parames) {
        this.isCollect = !this.isCollect
        favoriteService.setFavorite({objectId: this.$route.params.docId, objectType: 'doc'})
        .then(response => {
          console.log('SetFavorite response')
          console.log(response)
          // 点赞数赋值
          this.favoriteCount = response.data.favoriteCount
        })
      },
      setLike (val) {
        favoriteService.SetLike({objectId: this.$route.params.docId, like: val, objectType: 'doc'})
                 // 接收请求返回值
          .then(response => {
            console.log('SetLike response')
            console.log(response)
//          点赞数赋值
            this.likeCount = response.data.likeCount
            this.unLikeCount = response.data.unLikeCount
            this.likeFlag = response.data.likeFlag
          })
      },
      get () {
        favoriteService.GetLike({objectId: this.$route.params.docId})
          // 接收请求返回值
          .then(response => {
            console.log('SetLike response')
            console.log(response)
//          点赞数赋值
            this.likeCount = response.data.likeCount
            this.unLikeCount = response.data.unLikeCount
            this.likeFlag = response.data.likeFlag
          })
        favoriteService.GetFavorite({objectId: this.$route.params.docId, objectType: 'doc'})
        // 接收请求返回值
        .then(response => {
          console.log('response response')
          console.log(response)
          this.favoriteCount = response.data.favoriteCount
        })
        // 相关资料
        docService.GetDocList({labelId: 0, area: '', page: 1, pageNum: 8})
        .then(response => {
          this.docList = response.data
          console.log('this.docList')
          console.log(this.docList)
        })
        // 资料详情
        docService.GetDocInfo({id: this.$route.params.docId})
         // 接收请求返回值
        .then(response => {
          this.docInfo = response.data
          this.docInfo.createTime = this.docInfo.createTime.substring(0, 10).replace(/-/g, '.')
          console.log('this.docInfo')
          console.log(this.docInfo)
          //          点赞数赋值
//        this.likeCount = this.docInfo.clickCount

          this.option = {
            docId: this.docInfo.documentId,
            token: this.docInfo.token,
            host: 'BCEDOC',
            serverHost: 'http://doc.bj.baidubce.com',
            width: 890,
            zoom: false,
            zoomStepWidth: 200,
            flip: function (data) {
              console.log(data.pn)
            },
            toolbarConf: {
              page: true,
              pagenum: true,
              full: false,
              copy: true,
              position: 'center'
            }
          }
          console.log(this.option)
          if (this.userLoginStatus) {
            // 添加足迹
            userService.PostAddHistory({objectId: this.$route.params.docId, objectType: 'doc'})
            .then(response => {
              console.log('this.PostAddHistory')
              console.log(response)
            })
          }
        })
        if (this.userLoginStatus) {
          userService.GetMemberInfo()
          .then(response => {
            this.MemberInfo = response.data.point
            console.log('this.GetMemberInfo')
            console.log(this.MemberInfo)
          })
        }
      },
      downLoadDoc () {
        if (!this.userLoginStatus) {
          console.log('this.$route.path')
          console.log(this.$route.path)
          router.replace({
            path: '/login',
            query: {
              redirect: this.$route.path
            }
          })
        } else {
          if (this.docInfo.userPay === true || this.docInfo.ownerId === this.getUserId || this.docInfo.ownerId === this.getCompanyId) {
            // 已购买过 ，可直接下载
            console.log(1)
            docService.downLoadDoc(this.$route.params.docId)
            .then(response => {
              if (response.msg === 'ok') {
                console.log(response.data.downLoadLink)
                window.open(response.data.downLoadLink, '_blank', '')
              }
            })
          } else if (this.docInfo.userPay === false) {
            // 没有购买过， 出支付弹层
            this.dialog = true
            if (this.docInfo.score <= this.MemberInfo) { // 判断下载所需财富值小于或等于当前财富值
            // 点击立即下载
              this.downLoad = true
              this.insufficient = false // 积分不够提示信息 为不显示
              this.Recharge = false // 去掉立即充值按钮
            } else {  // 财富值不够状态
              if (this.isCompanyUser === types.IS_COMPANY_USER) {  // 判断是否是企业用户
                this.insufficient = true //  显示积分不够提示信息
                this.Recharge = false // 去掉立即充值按钮
                this.downLoad = false // 去掉立即下载按钮
              } else {
                this.insufficient = true //  显示积分不够提示信息
                this.Recharge = true // 显示立即充值按钮
                this.downLoad = false // 去掉立即下载按钮
              }
            }
          }
        }
      },
      close (i) {
        if (i === 0) {
          this.dialog = false // 点击支付弹层的取消按钮，关闭弹层
        } else if (i === 1) { // 点击支付弹层的立即下载，关闭弹层并下载资料
          this.dialog = false
          var chargePrame = {objectId: this.$route.params.docId, objectType: 'doc', score: this.docInfo.score, info: '购买资料'}
          pointService.charge(chargePrame)
          .then(response => {
            if (response.msg === 'ok') {
              docService.downLoadDoc(this.$route.params.docId)
              .then(response => {
                if (response.msg === 'ok') {
                  window.open(response.data.downLoadLink, '_blank', '')
                }
              })
            }
          })
        } else if (i === 2) { // 点击立即充值，跳充值页面
          this.$router.push('/memberCenter/memberCenter/recharge')
        }
      }
    },
    components: {
      comment,
      favoriteService,
      relevantData,
      userService,
      navigation
    },
    watch: {
      $route (to, from) {
        if (to.path.indexOf('/docDetail') >= 0) {
          console.log('to.path.indexOf/docDetail')
          if (to.params.docId !== undefined) {
            if (to.params.docId !== this.docId) {
              this.docId = to.params.docId
              this.get({ Id: to.params.docId })
              console.log('to.params.docId')
              console.log(this.docList)
            }
          }
        }
      },
      option (val) {
        console.log('watch val')
        console.log(val)
        if (document.getElementById('reader') !== null) {
          console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          document.getElementById('reader').innerHTML = ''
        }
        Document('reader', val)
      }
    }
  }
</script>
<style>
.pupOutbj {
  width:100%;
  height:100%;
  left:0;
  top:0;
  z-index: 10;
  position:fixed;
  background:rgba(0,0,0,0.3);
}
.pupOutbj h4 {
  font-size: 22px;
  color:#2d2d2d;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pupOutbj p {
  margin-top:16px;
  font-size: 14px;
  color:#444
}
.pupOutbj .poa_last {
  margin-top: 20px;
  font-size: 12px;
  color:#898989;
}
.pupOutbj .pupOut {
  width:580px;
  height:auto;
  margin-top:-12%;
}
.pupOutbj .pupOut p span {
  color:#FFAA00;
}
.pupOutbj .popTitle {
  display: inline-block;
  width:100px;
  font-size: 16px;
  color:#444;
  padding-top:10px;
}
.wenku-toolsbar-mod {
  display: none !important;
}
.daba_commetn {
  margin:0 10px;
}
.daba_detail {
  width:1200px;
  margin: 0 auto;
}
.daba_detail .daba_header {
  width: 920px;
}
.daba_detail .daba_header .dahead_title {
  margin-top: 10px;
  font-size: 20px;
  color: #2d2d2d;
  font-weight: bold;
  padding-left: 30px;
}
.datitle_ppt {
  background: url(../../static/image/ppt_icon.png) no-repeat left 3px;
}
.datitle_excel {
  background: url(../../static/image/excel.png) no-repeat left 3px;
}
.datitle_txt {
  background: url(../../static/image/txt_icon.png) no-repeat left 3px;
  ;
}
.datitle_pdf {
  background: url(../../static/image/pdf_icon.png) no-repeat left 3px;
  ;
}
.datitle_word {
  background: url(../../static/image/word_icon.png) no-repeat left 3px;
  ;
}
.daba_detail .daba_header .daba_info {
  margin: 10px 0;
  overflow: hidden;
  font-size: 12px;
  color: #898989;
}
.daba_header .daba_info .daba_infochid {
  cursor: default;
  width: 110px;
  color:#898989;
  margin-right: 10px;
  padding-left: 18px;
  display: inline-block;
  box-sizing: border-box;
}
.daba_header .daba_info .dabain_author {
  background: url(../../static/image/people.png) no-repeat left center;
}
.daba_header .daba_info .dabain_view {
  background: url(../../static/image/pageview.png) no-repeat left center;
  padding-left: 20px;
}
.daba_header .daba_info .dabain_time {
  background: url(../../static/image/time_icon.png) no-repeat left center;
}
.daba_header .daba_info .dabain_share {
  overflow: hidden;
}
.daba_header .daba_info .dabain_share {
  width: 110px;
}
.daba_header .daba_info .dabain_share li a {
  height: 18px;
  width: 18px;
  opacity: 0.7;
}
.daba_header .daba_info .dabain_share li a:hover {
  opacity: 1;
}
.daba_header .daba_info .share_wx {
  background: url(../../static/image/weixin.png) no-repeat left center;
  margin-right: 10px;
}
.daba_header .daba_info .share_in {
  background: url(../../static/image/in.png) no-repeat left center;
  margin-right: 10px;
}
.daba_header .daba_info .share_wb {
  background: url(../../static/image/weibo.png) no-repeat left center;
}
.daba_detail .daba_content {
  overflow: hidden;
}
.daba_detail .daba_content .dabnt_left {
  width: 920px;
  background: #fff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
}
.daba_content .dabnt_left .dabnt_lehead {
  width: 100%;
  height: 50px;
  box-shadow:0px 3px 2px rgba(0,0,0,0.2);
  line-height: 50px;
  color: #898989;
  background: #fff;
}
.daba_content .dabnt_left .dabnt_header,.daba_content .dabnt_left .active .dabnt_lehead {
  position: fixed;
  top: 0;
}
.daba_content .dabnt_left .dabnt_header {
  width: 919px;
}
.daba_content .dabnt_left .dabnt_lehead a {
  padding-left: 24px;
  margin-left: 40px;
  position: relative;
  color:#898989;
}
.daba_content .dabnt_lehead a .ani_effect {
  position: absolute;
  line-height: normal;
  color: #ffaa00;
  top: 16px;
  left: 23px;
  opacity: 0;
}
.dabnt_right .cata_conup .cata_effect {
  position: absolute;
  line-height: normal;
  color: #ffaa00;
  bottom: 0;
  left: 20px;
  opacity: 0;
}
.dabnt_left .dabnt_lehead .give_up {
  background: url(../../static/image/giveup_gray.png) no-repeat left center;
}
.dabnt_left .dabnt_lehead .dabnt_boo {
  background: url(../../static/image/boo_gray.png) no-repeat left center;
}
.dabnt_left .dabnt_lehead .dabnt_collect {
  background: url(../../static/image/sc_big.png) no-repeat left center;
}
.dabnt_left .dabnt_lehead .dabnt_down {
  background: url(../../static/image/down_gray.png) no-repeat left center;
}
.dabnt_left .dabnt_lehead .fullsrc {
  background: url(../../static/image/fullsrc_gray.png) no-repeat center center;
  height: 100%;
  margin-right: 20px;
}
.dabnt_left .dabnt_lehead .give_up.active {
  background: url(../../static/image/giveup_orange.png) no-repeat left center;
  color: #FFAA00;
}
.dabnt_left .dabnt_lehead .dabnt_boo.active {
  background: url(../../static/image/boo_orange.png) no-repeat left center;
  color: #FFAA00;
}
.dabnt_left .dabnt_lehead .dabnt_collect.active {
  background: url(../../static/image/sc_yellow_ig.png) no-repeat left center;
  color: #FFAA00;
}
/*.dabnt_left .dabnt_lehead .dabnt_down:hover {
  background: url(../../static/image/downblack.png) no-repeat left center;
  color: #898989;
}*/
  .dabnt_left .dabnt_lehead .fullsrc:hover {
  background: url(../../static/image/fullsrc_black.png) no-repeat center center;
}
.dabnt_left .dabnt_lehead .up_click {
  color: #ffaa00;
  background: url(../../static/image/giveup_orange.png) no-repeat left center;
}
.dabnt_left .dabnt_lehead .boo_click {
  color: #ffaa00;
  background: url(../../static/image/boo_orange.png) no-repeat left center;
}
.dabnt_left .dabnt_lehead .collect_click {
  color: #ffaa00;
  background: url(../../static/image/collect_orange.png) no-repeat left center;
}
.dabnt_left .dabnt_lehead .numbercol {
  color: #ffaa00;
  font-weight: bold;
}
.dabnt_left .wrimod .wrimod_right .module,.dabnt_left .revmod .wrimod .single_right {
  width: 780px;
  z-index: 10;
}
.dabnt_left .revmod {
  padding-bottom: 0;
}
.dabnt_left .revmod .wrimod .single_right .sin_cont {
  width: 740px;
}
.daba_content .dabnt_left .dabnt_lecont {
  position:relative;
  width: 100%;
  min-height: 518px;
  max-height: 1288px;
  border-bottom: 1px solid #e6e6e6;
  overflow: auto;
}
.daba_content .dabnt_left .dabnt_footlk {
  width: 100%;
  height: 518px;
}
.daba_detail .daba_content .dabnt_right {
  width: 255px;
  margin-left: 25px;
}
.dabnt_right .dabnt_ridocu {
  font-size: 16px;
  color: #083c6f;
  padding-bottom: 10px;
  border-bottom: 1px solid #083c6f;
  font-weight: normal;
}
.dabnt_right .dabnt_cata li {
  padding-left: 30px;
  margin-top: 10px;
}
.dabnt_right .dabnt_cata .dabnt_catatle {
  cursor: pointer;
  font-size: 14px;
  color: #444;
  line-height: 18px;
  max-height: 36px;
  overflow: hidden;
  font-weight: normal;
}
.dabnt_right .dabnt_cata .cata_content {
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}
.dabnt_right .dabnt_cata .cata_content a {
  display: inline-block;
  box-sizing: border-box;
  font-size: 12px;
  color: #898989;
}
.dabnt_right .dabnt_cata .cata_content .cata_conthor {
  width: 130px;
  margin-right: 5px;
  background: url(../../static/image/people.png) no-repeat left center;
  padding-left: 17px;
}
.dabnt_right .dabnt_cata .cata_content .cata_conup {
  cursor:default;
  width: 85px;
  background: url(../../static/image/parise_gray.png) no-repeat left center;
  padding-left: 20px;
  position: relative;
}
.dabnt_right .dabnt_cata .cata_content .conup_click {
  background: url(../../static/image/parise_orange.png) no-repeat left center;
  color: #ffaa00;
}
.doment_popup {
  overflow: hidden;
}
</style>
