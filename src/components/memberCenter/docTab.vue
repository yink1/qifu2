<template>
  <div class="company_tab">
    <div class="mainWraapNav">
      <mu-tabs class="" :value="activeTabed.activeTab" @change="handleTabChange">
          <mu-tab v-for="(it,i) in companyList" :value="it.value" :title="it.title" :key="i"/>
      </mu-tabs>
    </div>
   <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // activeTab: 'docDownloadList',
      companyList: [{
        value: 'docDownloadList',
        title: '我的下载'
      }, {
        value: 'docUploadList',
        title: '我的上传'
      }]
    }
  },
  props: [
    'activeTabed'
  ],
  methods: {
    handleTabChange (val) {
      this.activeTabed.activeTab = val
      this.$router.push({ path: '/memberCenter/memberDoc/' + val })
    }
  }
}
</script>

<style>
</style>
