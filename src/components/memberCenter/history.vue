<template>
  <div id="history">
    <memberInfo></memberInfo>
    <memberCenterHistoryTab></memberCenterHistoryTab>
  </div>
</template>

<script>
import memberInfo from '@/components/memberCenter/memberInfo'
import memberCenterHistoryTab from '@/components/memberCenter/memberCenterHistoryTab'
export default {
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
