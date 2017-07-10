<template>
  <div id="memberCenterHistoryTab">
    <div class="outline">
         <div class="mainWraapNav">
        <mu-tabs class="" :value="activeTabed.activeTab" @change="handleTabChange">
            <mu-tab v-for="(it,i) in companyList" :value="it" :title="it" :key="i"/>
        </mu-tabs>
      </div>
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
        companyList: ['近期提交的需求', '最近浏览的服务', '最近浏览的资料']
      }
    },
    created () {},
    mounted () {},
    computed: {},
    props: ['activeTabed'],
    methods: {
      handleTabChange (val) {
        this.activeTabed.activeTab = val
        if (val === '近期提交的需求') {
          this.$router.push('/memberCenter/history/requetHistoryList')
        } else if (val === '最近浏览的服务') {
          this.$router.push('/memberCenter/history/serviceHistoryList')
        } else if (val === '最近浏览的资料') {
          this.$router.push('/memberCenter/history/docHistoryList')
        }
      }
    }
  }
</script>
<style>
  #memberCenterHistoryTab .mu-tab-link-highlight {
    background-color: #083c6f;
  }
  .outline .mu-tabs{
    background:#f1f1f1!important;
  }
</style>
