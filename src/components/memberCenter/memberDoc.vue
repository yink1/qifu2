<template>
  <div>
    memberDoc组件
    <docTab></docTab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import docTab from '@/components/memberCenter/docTab'
export default {
  components: {
    docTab: docTab
  }
}
</script>

<style>
</style>
