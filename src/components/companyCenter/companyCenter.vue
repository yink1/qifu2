<template>
  <div class="companyCenter">
    <p class="companyInfo">
      <span>企业中心</span>
    </p>
    <companyDetailInfo></companyDetailInfo>
    <companyTab :activeTabed='activeTab'></companyTab>
  </div>
</template>

<script>
  import companyDetailInfo from '@/components/companyCenter/companyDetailInfo'
  import companyTab from '@/components/companyCenter/companyTab'
  export default {
    data () {
      return {
        activeTab: {activeTab: 'requirementList'}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        console.log('to.path' + to.path)
        if (to.path.indexOf('companyCenter/requirementList') >= 0) {
          vm.activeTab.activeTab = 'requirementList'
        } else if (to.path.indexOf('companyCenter/uploadServiceList') >= 0) {
          vm.activeTab.activeTab = 'uploadServiceList'
        } else if (to.path.indexOf('companyCenter/uploadDocList') >= 0) {
          vm.activeTab.activeTab = 'uploadDocList'
        }
      })
    },
    components: {
      companyDetailInfo,
      companyTab
    }
  }
</script>

<style>
.companyCenter{
  min-height: 684px;
}
</style>
