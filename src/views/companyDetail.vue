<template>
  <div id="companyDetail">
    <div class="detailNav por">
      <img class="poa" src="../../static/image/detailImg.jpg" alt="" />
      <div class="detailCon poa">
        <requirement class="poa requirementPoa"></requirement>
        <div class="hocoll_logo poa">
          <div class="hoco_logoimg">
            <img :src="detailService.imgurl"></div>
          <p>已收藏</p>
        </div>
      </div>
    </div>
    <div class="detailList">
      <companyServiceList></companyServiceList>
      <serviceLayout3></serviceLayout3>
      <serviceLayout2></serviceLayout2>      
      <serviceLayout4></serviceLayout4>
      <serviceLayout5></serviceLayout5>
      <docSummary></docSummary>
    </div>
    <div class="footerBar">
      <img src="../../static/image/footerBar.jpg" alt="" />
    </div>
  </div>
</template>
<script>
  import requirement from '@/components/shared/requirement'
  import companyServiceList from '@/components/companyCenter/companyServiceList'
  import serviceLayout2 from '@/components/companyCenter/serviceLayout2'
  import serviceLayout3 from '@/components/companyCenter/serviceLayout3'
  import serviceLayout4 from '@/components/companyCenter/serviceLayout4'
  import serviceLayout5 from '@/components/companyCenter/serviceLayout5'
  import docSummary from '@/components/company/docSummary'
  export default {
    data () {
      return {
        detailService: {
          imgurl: '../../static/image/temp/friend01.jpg',
          name: '丁香园',
          favourite: 0,
          intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'
        }
      }
    },
    created () {},
    mounted () {},
    computed: {},
    methods: {},
    components: {
      requirement,
      companyServiceList,
      serviceLayout2,
      serviceLayout3,
      serviceLayout4,
      serviceLayout5,
      docSummary
    }
  }
</script>
<style>
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
    .detailList{
      width:1000px;
      margin:0 auto;
    }
    .detailList .user_funbtn{
      display: none;
    }
    .detailList .pic_edit{
      display: none;
    }
    .footerBar img{
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
