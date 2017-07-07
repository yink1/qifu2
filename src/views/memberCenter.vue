<template>
  <div id="companyCenter">
    <navigation :title='navbase' :navbarList='navgationList'></navigation>
    <div class="clearfix">
    <memberCenterMenu class="fl" :firstBg='firstBg' :menued='menued'></memberCenterMenu>
	<keep-alive>
      <router-view class="fr homepageBoxed"></router-view>
	</keep-alive>
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
        navgationList: ['个人中心'],
        firstBg: {firstBg: 0}
      }
    },
    mounted () {
    },
    created () {
      if (this.$route.path.indexOf('memberCenter/history') >= 0) {
        this.firstBg.firstBg = 0
      } else if (this.$route.path.indexOf('memberCenter/memberFavorites') >= 0) {
        this.firstBg.firstBg = 1
        // this.activeTab.activeTab = '最近浏览的服务'
      } else if (this.$route.path.indexOf('memberCenter/memberDoc/') >= 0) {
        this.firstBg.firstBg = 2
        // this.activeTab.activeTab = '最近浏览的资料'
      } else if (this.$route.path.indexOf('memberCenter/memberDocUpload') >= 0) {
        this.firstBg.firstBg = 3
        // this.activeTab.activeTab = '最近浏览的资料'
      }
    },
    watch: {
      $route (to, from) {
        if (to.path.indexOf('memberCenter/history') >= 0) {
          this.firstBg.firstBg = 0
        } else if (to.path.indexOf('memberCenter/memberFavorites') >= 0) {
          this.firstBg.firstBg = 1
          console.log(555)
        } else if (to.path.indexOf('memberCenter/memberDoc/') >= 0) {
          this.firstBg.firstBg = 2
        } else if (to.path.indexOf('memberCenter/memberDocUpload') >= 0) {
          this.firstBg.firstBg = 3
        }
          // vm.get(
        // this.dataLenth = this.dataInfo.data.length
      },
      menuNum () {
        console.log(this.menuNum)
      }
    },
    computed: {
      menued () {
        return this.menu
      }
    },
    methods: {},
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
  .homepageBoxed{width:940px;}
</style>
