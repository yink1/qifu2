<template>
  <div>
    memberFavorites组件
    <favoriteTab></favoriteTab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import favoriteTab from '@/components/memberCenter/favoriteTab'
export default {
  components: {
    favoriteTab: favoriteTab
  }
}
</script>

<style>
</style>
