<template>
  <div>
    <favoriteTab :activeTabed='activeTab'></favoriteTab>
  </div>
</template>
<script>
import favoriteTab from '@/components/memberCenter/favoriteTab'
export default {
  data () {
    return {
      activeTab: {activeTab: '收藏的企业'}
    }
  },
  created () {
    if (this.$route.path.indexOf('memberFavorites/favoriteCompanyList') >= 0) {
      this.activeTab.activeTab = '收藏的企业'
    } else if (this.$route.path.indexOf('memberFavorites/favoriteServiceList') >= 0) {
      this.activeTab.activeTab = '收藏的服务'
    } else if (this.$route.path.indexOf('memberFavorites/favoriteDocList') >= 0) {
      this.activeTab.activeTab = '收藏的资料'
    }
  },
  components: {
    favoriteTab
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log('to.path' + to.path)
      if (to.path.indexOf('memberFavorites/favoriteCompanyList') >= 0) {
        vm.activeTab.activeTab = '收藏的企业'
      } else if (to.path.indexOf('memberFavorites/favoriteServiceList') >= 0) {
        vm.activeTab.activeTab = '收藏的服务'
      } else if (to.path.indexOf('memberFavorites/favoriteDocList') >= 0) {
        vm.activeTab.activeTab = '收藏的资料'
      }
      // vm.get(
      // this.dataLenth = this.dataInfo.data.length
    })
  }
}
</script>

<style>
</style>
