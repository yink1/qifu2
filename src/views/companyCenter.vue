<template>
  <div id="companyCenter">
    <navigation :title='navbase' :navbarList='navgationList'></navigation>
    <div class="clearfix">
    <companyCenterMenu class="fl"></companyCenterMenu>
    <router-view class="fr homepageBox"></router-view>
    </div>
  </div>
</template>
<script>
  import navigation from '@/components/shared/navigation'
  import companyCenterMenu from '@/components/companyCenter/companyCenterMenu'
  export default {
    data () {
      return {
        navbase: '首页',
        navgationList: ['企业中心']
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
    },
    components: {
      navigation,
      companyCenterMenu
    }
  }
</script>
<style>
#companyCenter{width:1200px;padding:0 ;margin:0 auto;}
/* 清除浮 动*/
  
  .clearfix {
    *zoom: 1;
  }
  
  .clearfix:after {
    display: table;
    content: '';
    clear: both;
  }
  
  .auto {
    width: 960px;
    margin: 0 auto;
  }
  
  .fl {
    float: left;
  }
  
  .fr {
    float: right;
  }
  .homepageBox{width:940px;padding:0;}
</style>
