<template>
  <div>
  <div class="serviceDetail" v-for="data in dataList">
    <div class="service_banner">
      <img :src="data.bannerPic"/> 
      <div class="banner_intro">
        <companyFavorite :companyId='data.OwnerId'></companyFavorite>
      </div>      
    </div> 
    <div class="detail_info">
      <navigation :title='title' :navbarList='navbarList'></navigation>
      <div class="info_box">
        <div class="cont_info">
          <div class="cont_left" v-for="material in data.Materials" v-if="material.MainMaterialFlag == true">
            <img v-if="material.SaveVendor === 'qiniu'" :src="material.MediaId" width="100%" height="100%"/>
            <div v-if="material.SaveVendor == 'baidu'" id="reader"></div>
            <div id="id_video_container" v-if="showMainVideo"></div>
            <a href="javascript:;" class="enlarge"></a>
          </div>
          <div class="cont_right">
            <p class="info_title">{{data.Name}}</p>
            <div class="project_author"><span>{{data.OwnerName}}</span></div>
            <span class="address">服务商所在地：{{data.City}}</span>
            <div class="summary">
              <p>简介：{{data.Introduce}}</p>
            </div>
            <mu-raised-button class="demo-raised-button" label="咨询TA" labelPosition="after" primary>
              <img src="../../static/image/icon/tele_white.png" class="button_pic"/>
            </mu-raised-button>
            <mu-raised-button class="demo-raised-button" label="发布需求" labelPosition="after" @click='open(dataList.Id,dataList.OwnerId)'>
              <img src="../../static/image/icon/add_in.png" class="button_pic"/>
            </mu-raised-button>
            <div class="requirement_box" v-if="dialog"></div> 
            <div class="dialog" v-if="dialog">
              <div class="require_content">             
                <a href="javascript:;" @click="close" class="close_dialog">
                  <img src="../../static/image/del.png"/>
                </a>
                <requirement :companyId='data.OwnerId' :ServiceId ='data.Id'></requirement>
              </div>
            </div>            
            <div class="u_do">
              <ul class="evaluation">
                <li><a href="javascript:;" :class="['u_like', {u_like_active:like}]" @click="setLike(1)">{{likeCount}}</a></li>
                <li><a href="javascript:;" :class="['u_unlike', {u_unlike_active: unlike}]" @click="setLike(-1)">{{unLikeCount}}</a></li>
                <li><a href="javascript:;" :class="['u_favor', {u_favor_active: heart}]" @click="setFavorite">{{favoriteCount}}</a></li>
                <li><a href="javascript:;" class="u_review"></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="info_detail">
          <p class="detail_title">咨询详情</p>
          <div class="cir_detail" v-for="material in data.Materials" v-if="material.MainMaterialFlag == false">
            <img v-if="material.SaveVendor === 'qiniu'" :src="material.MediaId" width="100%" height="100%"/>
            <div v-if="material.SaveVendor == 'tencent'" :id="'video' + material.Id"></div>
            <div v-if="material.SaveVendor == 'local'" v-html="material.Para2"></div>
          </div>
        </div>
        <div class="relative_case">
          <p class="detail_title">相关案例</p>
          <div class="relative_cases">
            <docSummary showData="true" :docItem="doc" v-for="doc in docList"></docSummary>
          </div>
        </div>
        <div class="u_comment">
          <div class="relative_cases">
            <comment :objectId='id'></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
// import $ from 'jquery'
  import companyFavorite from '@/components/shared/companyFavorite'
  import navigation from '@/components/shared/navigation'
  import docSummary from '@/components/company/docSummary'
  import comment from '@/components/shared/comment'
  import requirement from '@/components/shared/requirement'
  import service from '@/services/service'
  import docService from '@/services/docService'
  import { videoPlay } from '@/../static/tencentFun.js'
  import favoriteService from '@/services/favoriteService'
  import { mapGetters } from 'vuex'
  import * as types from '@/store/types'
  import router from '@/router/router'
  export default {
    data () {
      return {
        title: '首页',
        navbarList: ['医学服务', '详情'],
        dialog: false,
        id: 0,
        dataList: {},
        docList: {},
        pptData: {},
        mainMediaId: '',
        showMainVideo: false,
        tencentAppId: '1251742132',
        videoIdList: [],
        likeCount: 0,
        unLikeCount: 0,
        likeFlag: 0,
        isCollect: false,
        favoriteCount: 0,
        updateCnt: 1,
        like: false,
        unlike: false,
        heart: false
      }
    },
    mounted () {
      this.get(this.$route.params.id)
    },
    updated () {
      if (this.updateCnt === 1) {
        if (this.showMainVideo) {
          videoPlay('id_video_container', this.mainMediaId, this.tencentAppId, 600, 336)
          if (this.videoIdList.length === 0) {
            this.updateCnt = 2
          }
        }
        if (this.videoIdList.length > 0) {
          for (var i = 0; i < this.videoIdList.length; i++) {
            videoPlay('video' + this.videoIdList[i].id.toString(), this.videoIdList[i].vodId, this.tencentAppId, 980, 600)
            this.updateCnt = 2
          }
        }
      }
    },
    watch: {
      pptData (val) {
        Document('reader', val)
      }
    },
    methods: {
      setFavorite: function (parames) {
        this.isCollect = !this.isCollect
        favoriteService.setFavorite({objectId: this.$route.params.id, objectType: 'service'})
        .then(response => {
          console.log('SetFavorite response')
          console.log(response)
          // 点赞数赋值
          this.favoriteCount = response.data.favoriteCount
          if (response.data.favoriteFlag === true) {
            this.heart = true
          } else {
            this.heart = false
          }
        })
      },
      setLike (val) {
        if (val === 1) {
          this.like = true
          this.unlike = false
        } else {
          this.like = false
          this.unlike = true
        }
        favoriteService.SetLike({objectId: this.$route.params.id, like: val, objectType: 'service'})
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
      get (id) {
        // this.id = this.$route.params.id
        this.id = id
        let _this = this
        favoriteService.GetLike({objectId: this.id})
                 // 接收请求返回值
          .then(response => {
            console.log('SetLike response')
            console.log(response)
//          点赞数赋值
            this.likeCount = response.data.likeCount
            this.unLikeCount = response.data.unLikeCount
            this.likeFlag = response.data.likeFlag
          })
        favoriteService.GetFavorite({objectId: this.id, objectType: 'service'})
        // 接收请求返回值
        .then(response => {
          console.log('response response')
          console.log(response)
          this.favoriteCount = response.data.favoriteCount
        })
        service.getServiceInfo({id: this.id})
        .then(response => {
          this.dataList = response.data
          this.dataList[0].Materials.filter(function (item) {
            if (item.MainMaterialFlag === true && item.SaveVendor === 'baidu') {
              _this.pptData = {
                docId: item.MediaId,
                token: item.Token,
                host: item.Host,
                serverHost: 'http://doc.bj.baidubce.com',
                width: 600,
                height: 336,
                zoom: false,
                zoomStepWidth: 200,
                toolbarConf: {
                  page: false,
                  pagenum: false,
                  full: true,
                  copy: false,
                  position: 'center'
                }
              }
            } else if (item.MainMaterialFlag === true && item.SaveVendor === 'tencent') {
              _this.mainMediaId = item.MediaId
              _this.showMainVideo = true
            } else if (item.MainMaterialFlag === false && item.SaveVendor === 'tencent') {
              _this.videoIdList.push({
                id: item.Id,
                vodId: item.MediaId
              })
            }
          })
        })
        docService.GetDocList({page: 0, pageNum: 0, serviceId: this.id})
        .then(response => {
          this.docList = response.data
        })
      },
      open (sid, cid) {
        if (!this.userLoginStatus) {
          this.dialog = false
          router.replace({
            path: '/login',
            query: {
              redirect: this.$route.path
            }
          })
        } else {
          this.dialog = true
          document.getElementsByTagName('body')[0].style.overflow = 'hidden'
          document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        }
//      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
//      document.getElementsByTagName('html')[0].style.overflow = 'hidden'
      },
      close () {
        this.dialog = false
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementsByTagName('html')[0].style.overflow = 'auto'
      }
    },
    beforeRouteEnter (to, from, next) {
      // 这里判断是否重复打开的同一服务页
      next(vm => {
        console.log('detail reenter')
        if (to.params.id !== undefined) {
          if (to.params.id !== vm.id) {
            if (to.params.id) {
              vm.id = to.params.id
            }
            vm.showMainVideo = false
            vm.videoIdList = []
            vm.updateCnt = 1
            vm.get(to.params.id)
            console.log('detail get')
          }
        }
      })
    },
    computed: {
      ...mapGetters(
        {
          userLoginStatus: [types.GET_USER_LOGIN_STATUS],
          isCompanyUser: [types.IS_COMPANY_USER]
        }
      )
    },
    components: {
      companyFavorite,
      navigation,
      docSummary,
      comment,
      requirement
    }
  }
</script>
<style>
  #id_video_container{
    width:600px;
    height: 336px;
  }
  #id_video_container #trump_main_unique_1{
    width:600px !important;
    height: 336px;
    margin: 0;
  }
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
  margin-top: 10px;
}
.cont_right .mu-raised-button.mu-raised-button-inverse .mu-raised-button-label,.cont_right .mu-raised-button-label{
  padding-right: 16px;
  padding-left:6px;
}
.button_pic{
  margin-left:20px;
}
.cont_right .mu-raised-button.mu-raised-button-inverse,.cont_right .mu-raised-button{
  margin:20px 20px 0 0;
  display: block;
  float: left;
  width: 116px;
}
.u_do{
  background-color: rgba(0,0,0,.7);
  position: absolute;
  bottom: 0;
  left:0px;
}
/*下面部分详情*/
.info_box{
  background-color: #fff;
  margin-bottom: 50px;
  padding-bottom: 20px;
}
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
  width: 673px;
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
.serviceDetail .reviewed{
  margin: 0 -30px;
}
.evaluation{
  display: block;
  width: 390px;
  height: 40px;
  padding-left: 20px;
} 
.evaluation li{
  display: block;
  float: left;
  width: 76px;
  height: 40px;
  margin-right: 10px;
}
.evaluation li a{
  display: block;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  color: #fff;
}
.u_like{
  background: url(../../static/image/icon/like.png) left center no-repeat;
}
.u_like_active,.u_like:hover{
  background: url(../../static/image/icon/like_active.png) left center no-repeat;
  color: #ffaa00 !important;
}
.u_unlike{
  background: url(../../static/image/icon/unlike.png) left center no-repeat;
}
.u_unlike_active,.u_unlike:hover{
  background: url(../../static/image/icon/unlike_active.png) left center no-repeat;
  color: #ffaa00 !important;
}
.u_favor{
  background: url(../../static/image/icon/sc_null.png) left center no-repeat;
}
.u_favor_active,.u_favor:hover{
  background: url(../../static/image/icon/sc_active.png) left center no-repeat;
  color: #ffaa00 !important;
}
.u_review{
  background: url(../../static/image/comment_icon.png) 19px center no-repeat;
}
</style>
