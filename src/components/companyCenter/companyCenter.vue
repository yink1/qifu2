<template>
  <div class="companyCenter">
    <p class="companyInfo">
      <span>企业中心</span>
    </p>
    <companyDetailInfo></companyDetailInfo>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import companyDetailInfo from '@/components/companyCenter/companyDetailInfo'
  export default {
    components: {
      companyDetailInfo
    }
  }
</script>

<style>
</style>
