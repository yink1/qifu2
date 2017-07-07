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
      companyList: [{
        value: 'requirementList',
        title: '收到的需求'
      }, {
        value: 'uploadServiceList',
        title: '已上传的服务'
      }, {
        value: 'uploadDocList',
        title: '已上传的资料'
      }]
    }
  },
  props: ['activeTabed'],
  methods: {
    handleTabChange (val) {
      this.activeTabed.activeTab = val
      this.$router.push({ path: '/companyCenter/companyCenter/' + val })
    }
  }
}
</script>
<style>
.company_tab{
  width: 100%;
  clear: both;
  height: 50px;
  border-bottom: 1px solid #bebebe;
}
.company_tab .mainWraapNav{
  width: 390px;
}
.company_tab .mainWraapNav .mu-tabs{
  background: none;
}
.company_tab .mu-tab-link-highlight{
  background-color: #083c6f;
}
.company_tab .mu-tab-text{
  font-size: 16px;
  color: #898989;
  font-weight: bold;
}
.company_tab .mu-tab-link {
  height: 50px;
}
.company_tab .mu-tab-active .mu-tab-text{
  color: #083c6f;
}
</style>
