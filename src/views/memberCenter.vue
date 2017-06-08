<template>
  <div id="companyCenter">
    <navigation :title='navbase' :navbarList='navgationList'></navigation>
    <div class="clearfix">
    <memberCenterMenu class="fl"></memberCenterMenu>
    <router-view class="fr homepageBox"></router-view>
    </div>
  </div>
</template>
<script>
  import navigation from '@/components/shared/navigation'
  import memberCenterMenu from '@/components/memberCenter/memberCenterMenu'
  export default {
    data () {
      return {
        navbase: '首页',
        navgationList: ['个人中心']
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
      memberCenterMenu
    }
  }
</script>
<style>
#companyCenter{width:1200px;padding:0 0 20px;margin:0 auto;}
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
  .homepageBox{width:940px;padding:0 0 20px;}
</style>
