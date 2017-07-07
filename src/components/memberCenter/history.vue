<template>
  <div id="history">
    <memberInfo></memberInfo>
    <memberCenterHistoryTab :activeTabed='activeTab'></memberCenterHistoryTab>
  </div>
</template>

<script>
import memberInfo from '@/components/memberCenter/memberInfo'
import memberCenterHistoryTab from '@/components/memberCenter/memberCenterHistoryTab'
export default {
  data () {
    return {
      activeTab: {activeTab: '近期提交的需求'}
    }
  },
  created () {
    if (this.$route.path.indexOf('history/requetHistoryList') >= 0) {
      this.activeTab.activeTab = '近期提交的需求'
    } else if (this.$route.path.indexOf('history/serviceHistoryList') >= 0) {
      this.activeTab.activeTab = '最近浏览的服务'
    } else if (this.$route.path.indexOf('history/docHistoryList') >= 0) {
      this.activeTab.activeTab = '最近浏览的资料'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log('to.path' + to.path)
      if (to.path.indexOf('history/requetHistoryList') >= 0) {
        vm.activeTab.activeTab = '近期提交的需求'
      } else if (to.path.indexOf('history/serviceHistoryList') >= 0) {
        vm.activeTab.activeTab = '最近浏览的服务'
      } else if (to.path.indexOf('history/docHistoryList') >= 0) {
        vm.activeTab.activeTab = '最近浏览的资料'
      }
      // vm.get(
      // this.dataLenth = this.dataInfo.data.length
    })
  },
  components: {
    memberInfo: memberInfo,
    memberCenterHistoryTab: memberCenterHistoryTab
  },
  mounted () {
    document.getElementById('history').style.minHeight = localStorage.bodyHeight - 225
  }
}
</script>

<style>
</style>
