<template>
  <div class="docList_box">
    <div class="docList">
      <navigation :title='title' :navbarList='navbarList'></navigation>
      <div class="select_box">
        <serviceLabelFilter :showMore="showData" :address='address'></serviceLabelFilter>
      </div>
      <docSummaryDetail :showData='showData'></docSummaryDetail>
      <div class="buttonBottom">
        <div class="demo-button">加载更多</div>
      </div>
    </div>
  </div>
</template>

<script>
  import navigation from '@/components/shared/navigation'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import docSummaryDetail from '@/components/company/docSummaryDetail'
  export default {
    data () {
      return {
        title: '首页',
        navbarList: ['资料库', '培训咨询'],
        address: false,
        showData: true
      }
    },
    components: {
      navigation,
      serviceLabelFilter,
      docSummaryDetail
    }
  }
</script>
<style>
.docList_box{
  background-color:#f4f4f4;
  width: 100%;
}
.docList{
  width: 920px;
  margin: 0 auto;
}
.docList .sele_list{
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
}
.docList .demo-button{
  margin: 40px auto 50px;
  height: 46px;
  background-color: #fff;
}
.docList .related_services{
  padding: 20px;
}
.docList .datpage_right{
  width: 634px;
}
.docList .select_box .service_more{
  border: none;
}
</style>
