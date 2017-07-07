<template>
  <div id="companyDetail">
    <div class="detailNav por">
     <banner class="poa detailBanner" :companyId='companyId'></banner>
      <div class="detailCon poa">
        <requirement class="poa requirementPoa" :companyId='companyId'></requirement>
        <companyFavorite class="favoritePoa poa" :companyId='companyId' v-if='companyId'></companyFavorite>
      </div>
    </div>
    <div class="detailList">
      <companyServiceSummary :services='services'></companyServiceSummary>
      <h4 v-if='docs.length > 0'>相关案例</h4>
      <docSummary class="companyDetail" showData="false" :docItem="doc" v-for="doc in docs"></docSummary>
    </div>
    <div class="footerBar">
      <img :src="homePageBottom" alt="" />
    </div>
  </div>
</template>
<script>
  import banner from '@/components/shared/banner'
  import requirement from '@/components/shared/requirement'
  import companyFavorite from '@/components/shared/companyFavorite'
  import companyServiceSummary from '@/components/company/companyServiceSummary'
  import docSummary from '@/components/company/docSummary'
  import companyservice from '@/services/companyService'
  export default {
    data () {
      return {
        companyId: '',
        homePageBottom: '',
        docs: {},
        services: {}
      }
    },
    created () {
      this.get({ Id: this.$route.params.companyId })
    },
    mounted () {
    },
    computed: {},
    methods: {
      get (params) {
        companyservice.getHomepageInfo(params)
         // 接收请求返回值
        .then(response => {
          this.homepage = response
          this.companyId = this.homepage.data.companyId
          this.homePageBottom = this.homepage.data.homePageBottom
          this.docs = this.homepage.data.docs
          this.services = this.homepage.data.services
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      // 这里判断是否重复打开的同一服务页
      next(vm => {
        if (to.params.companyId !== undefined) {
          vm.companyId = to.params.companyId
          vm.get({ Id: to.params.companyId })
        }
      })
    },
    components: {
      requirement,
      companyFavorite,
      companyServiceSummary,
      docSummary,
      banner
    }
  }
</script>
<style>
.companyFavorite.favoritePoa{
  left:1020px;
  top:40px;
  z-index:122222;
}
  .detailList h4{
    font-size: 18px;
    color:#083C6F;
    height:50px;
    line-height: 50px;
    padding-left:30px;
    border-bottom:1px solid #ccc;
  }
  .demo-menu {
  display: inline-block;
  margin: 16px 32px 16px 0;
}
  .por{position: relative;}
  .poa{position: absolute;}
  .detailNav{
    width:100%;
    height:380px;
  }
  .detailBanner{
    width:100%;
    height:380px;
  }
  .detailBanner .home_banner{
    width:100%;
    height:380px;
  }
  .detailBanner .home_banner .swiper-slide,.detailBanner .home_banner .swiper-slide img{
    width:100%;
    height: 100%;
  }
  .requirementPoa{
    left:100px;
    top:0;
    z-index: 1111111;
  }
  .detailNav>img{
    width:100%;
    height:380px;
    display: block;
  }
  .detailCon{
    width:1200px;
    height:380px;
    left:50%;
    margin-left:-600px;
    
  }
  .intruduce{
    width:200px;
    height:120px;
    padding:10px;
    background:#73716d;
    top:5px;
    right:90px;
    overflow: hidden;
    opacity: .6;
    color:#fff;
  }
  .intruduce h4{
    text-align: center;
  }
  .companyDetail .datpage_right {
    width: 700px;
  }
  .companyDetail .datpage_left {
    margin-left: 20px;
  }
  #companyDetail .hocoll_logo {
    right:0px;
    top:20px;
      width: 105px;
      height: 105px;
      border-radius: 6px;
      background: #fff;
      z-index: 2;
      z-index: 11;
      box-shadow: -4px 0 4px rgba(0,0,0,.256863), /*左边阴影*/ 4px 0 4px rgba(0,0,0,.256863), /*右边阴影*/ 0 -4px 4px rgba(0,0,0,.256863), /*顶部阴影*/ 0 4px 4px rgba(0,0,0,.256863);
    }
     #companyDetail .hocoll_logo .hoco_logoimg {
      height: 70px;
      text-align: center;
      line-height: 70px;
      padding-top: 3px;
      box-sizing: border-box;
    }
    #companyDetail .hocoll_logo p {
      width:85px;
      margin-top:5px;
      margin-left:10px;
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      height: 20px;
      font-size: 12px;
      text-indent: 10px;
      color: #fff;
      background: #ffaa00 url(../../static/image/star_white.png) no-repeat 16px 3px;;
    }
    #companyDetail .hoco_logoimg img {
      width:85px;
      height:70px;
      display: inline-block;
    }
    .mainDetail{
      width:1000px;
      margin:0 auto;
      padding-bottom:40px;
    }
    #companyDetail .detailList{
      width:1002px;
      margin:0 auto;
    }
    .detailList .user_funbtn{
      display: none;
    }
    .detailList .pic_edit{
      display: none;
    }
    .footerBar{
      margin-top:20px;
      margin-bottom:-20px;
    }
    .footerBar img{
      display:block;
      width:100%;
      height:200px;
    }
    #companyDetail .service_sele{
      width:100%;
    }
    #companyDetail .service_list_box{
      width:98%;
      margin:0 auto;
      border:none;
    }
    #companyDetail .service_list_box{
      height:280px;
      padding:12px 0 0 0!important;
    }
    #companyDetail .service_list li{
      width:225px;
      height:120px;
      margin:10px;
      border:none;
    }

    #companyDetail .service_list_box .layout_little, #companyDetail .service_list_box .layout_large {
    height: 260px;
}
 #companyDetail .service_list_box .layout_large {
   width:735px;
   margin-right:0;
   margin-left:0;
 }
#companyDetail .service_list_box .layout_large li{
  margin-top:0;
  margin-bottom:20px;
}
#companyDetail .service_list_box .layout_left, #companyDetail .service_list_box .layout_right {
    width: 470px;
    height: 280px;
    background-color: #fff;
}
#companyDetail .service_list_box .layout_right {
  margin-right:0;
  margin-left:0;
  width:490px;
}
#companyDetail .service_list_box .layout_right li{
  margin-top:0;
  margin-bottom:20px;
}
#companyDetail .service_list .layout_divide{
  width:470px;
  height:260px;
  margin-top:-10px;
}
#companyDetail .service_list .layout_self{
  width:960px;
  height:260px;
}
#companyDetail .data_pagecont,#companyDetail .data_homepage li{
  width:100%;
}
#companyDetail .datpage_list .datpage_right{
  width:688px;
}
#companyDetail .datpage_center .mu-raised-button.disabled{
  width:120px;
}
</style>
