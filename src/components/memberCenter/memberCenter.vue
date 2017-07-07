<template>
  <div>
    <memberInfo></memberInfo>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
  import memberInfo from '@/components/memberCenter/memberInfo'
  export default {
    components: {
      memberInfo: memberInfo
    }
  }
</script>

<style>
</style>
