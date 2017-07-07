<template>
  <div id="memberFavorites">
    <div class="mainWraap">
      <div class="outLine">
      <div class="mainWraapNav">
        <mu-tabs class="" :value="activeTabed.activeTab" @change="handleTabChange">
            <mu-tab v-for="(it,i) in companyList" :value="it" :title="it" :key="i"/>
        </mu-tabs>
      </div>
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
      companyList: ['收藏的企业', '收藏的服务', '收藏的资料']
    }
  },
  props: ['activeTabed'],
  mounted () {},
  computed: {},
  methods: {
    handleTabChange (val) {
      this.activeTabed.activeTab = val
      if (val === '收藏的企业') {
        this.$router.push('/memberCenter/memberFavorites/favoriteCompanyList')
      } else if (val === '收藏的服务') {
        this.$router.push('/memberCenter/memberFavorites/favoriteServiceList')
      } else if (val === '收藏的资料') {
        this.$router.push('/memberCenter/memberFavorites/favoriteDocList')
      }
    }
  },
  components: {}
}
</script>

<style>
  #memberFavorites .mainWraapNav span.mu-tab-link-highlight {
    background-color: #083c6f!important;
  }
</style>

