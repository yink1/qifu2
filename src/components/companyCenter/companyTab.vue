<template>
  <div>
    <div class="mainWraapNav">
      <mu-tabs class="" :value="activeTab" @change="handleTabChange">
          <mu-tab v-for="(it,i) in companyList" :value="it" :title="it" :key="i"/>
      </mu-tabs>
    </div>
   <router-view class=""></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: '全部',
      companyList: ['全部', '多渠道营销', '医学服务', '培训咨询', '技术支持'],
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    }
  }
}
</script>

<style>
</style>
