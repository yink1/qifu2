<template>
  <div class="memberDoc">
    <docTab :activeTabed='activeTab'></docTab>
  </div>
</template>

<script>
import docTab from '@/components/memberCenter/docTab'
export default {
  data () {
    return {
      activeTab: {activeTab: 'docDownloadList'}
    }
  },
  created () {
    if (this.$route.path.indexOf('memberCenter/memberDoc/docDownloadList') >= 0) {
      this.activeTab.activeTab = 'docDownloadList'
    } else if (this.$route.path.indexOf('memberCenter/memberDoc/docUploadList') >= 0) {
      this.activeTab.activeTab = 'docUploadList'
    }
  },
  components: {
    docTab: docTab
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log('to.path' + to.path)
      if (to.path.indexOf('memberCenter/memberDoc/docDownloadList') >= 0) {
        vm.activeTab.activeTab = 'docDownloadList'
      } else if (to.path.indexOf('memberCenter/memberDoc/docUploadList') >= 0) {
        vm.activeTab.activeTab = 'docUploadList'
      }
      // vm.get(
      // this.dataLenth = this.dataInfo.data.length
    })
  }
}
</script>

<style>
div.memberDoc{
  padding: 0;
  min-height: 682px;
}
</style>
