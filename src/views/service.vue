<template>
  <div class="service_box">
    <div class="service">
      <navigation :title='title' :navbarList='navbarList'></navigation>
      <div class="select_box">
        <serviceLabelFilter :address='address' :showMore="showMore"></serviceLabelFilter>
      </div>
      <serviceSummary></serviceSummary>
      <div class="buttonBottom">
        <div class="demo-button">加载更多</div>
      </div>
    </div>
  </div>
</template>

<script>
  import navigation from '@/components/shared/navigation'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import serviceSummary from '@/components/service/serviceSummary'
  export default {
    data () {
      return {
        title: '首页',
        navbarList: ['服务分类', '培训咨询'],
        address: true,
        showMore: true
      }
    },
    components: {
      navigation,
      serviceLabelFilter,
      serviceSummary
    }
  }
</script>
<style>
.service_box{
  background-color:#f4f4f4;
  width: 100%;
}
.service{
  width: 920px;
  margin: 0 auto;
}
.service .sele_list{
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
}
.service_box .demo-button{
  margin: 40px auto 50px;
  height: 46px;
  background-color: #fff;
}
.select_box{
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
}
.select_box .sele_list>div{
  border-bottom: 1px dashed #bcbcbc;
  padding-left: 10px;
  height: 40px;
}
.select_box .sele_list .service_address{
  border: none;
}
/*点击更多之后的样式*/
.select_box .sele_list .service_more{
  height: 80px;
}
.select_box .sele_list_title{
  width: 90px;
}
.select_box .sele_list_top,.select_box .sele_list_bottom{
  float: left;
  width: 686px;
}
</style>
