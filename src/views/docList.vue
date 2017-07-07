<template>
  <div class="docList_box">
    <div class="docList">
      <navigation :title='title' :navbarList='navbarList'></navigation>
      <div class="select_box">
        <serviceLabelFilter :showMore="showMore" :address='address' @getServiceInfo="onServiceInfo" :defaultLabel='-1' :defaultChildLabel='-1'></serviceLabelFilter>
      </div>
      <div class="doc_border_box">
        <docSummary :showData='showData' :docItem="item" v-for="item in docList"></docSummary>
      </div>
      <div class='blankCon blanknew' v-if='docList.length < 1'>
        <img src='../../static/image/icon/blank.png'/>
        <h5>空空如也,去看看别的吧!</h5>
      </div>
      <div class="buttonBottom" v-if='loadMore'>
        <div class="demo-button" @click="numAdd">加载更多</div>
      </div>
    </div>
  </div>
</template>

<script>
  import navigation from '@/components/shared/navigation'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import docSummary from '@/components/company/docSummary'
  import docService from '@/services/docService'

  export default {
    data () {
      return {
        docList: [],
        title: '首页',
        navbarList: ['资料库'],
        address: false,
        showData: {labelId: -1, page: 1, pageNum: 8, docName: ''},
        showMore: true,
        loadMore: false
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      $route (to, from) {
        if (to.path.indexOf('/docList') !== -1) {
          this.fetchData()
          console.log(to.path.indexOf('/service'))
        }
      }
    },
    methods: {
      get (params) {
        docService.GetDocList(params)
         // 接收请求返回值
        .then(response => {
          if (params.page === 1) {
            this.serviceList = []
          }
          for (var i = 0; i < response.data.length; i++) {
            this.docList.push(response.data[i])
          }
          console.log('222222222222222222this.docList')
          console.log(this.docList)
          if (response.count > params.page * params.pageNum) {
            this.loadMore = true
            console.log(this.loadMore + '可以显示吗' + response.count)
          } else {
            this.loadMore = false
          }
        })
      },
      numAdd () {
        this.showData.page = this.showData.page + 1
        this.get(this.showData)
      },
      onServiceInfo (childLabelId, chooseArea) {
        console.log('docList onServiceId' + childLabelId + ' ' + chooseArea)
        if (this.showData.labelId !== childLabelId) {
          console.log('docList onServiceId' + this.showData.labelId + ' != ' + childLabelId)
          this.docList = []
          this.showData = {labelId: childLabelId, page: 1, pageNum: 6, docName: ''}
          this.get(this.showData)
        }
        // this.get(this.showData)
      },
      fetchData () {
        this.defaultChildLabel = -1
        this.defaultLabel = -1
        this.showData = {labelId: -1, page: 1, pageNum: 6, docName: ''}
        this.docList = []
        if (this.$route.params.docName) {
          this.showData.docName = this.$route.params.docName
          console.log('11111111111111111111111111111')
          console.log(this.showData)
        }
        console.log(this.showData)
        this.get(this.showData)
        console.log('docList')
      }
    },
    components: {
      navigation,
      serviceLabelFilter,
      docSummary,
      docService
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
  min-height: 723px;
}
.docList .sele_list{
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
}
.docList .buttonBottom{
  width: 100%;
}
.docList .demo-button{
  margin: 40px auto 0px;
  height: 46px;
  background-color: #fff;
}
.docList .datpage_right{
  width: 633px;
}
.docList .select_box .service_more{
  border: none;
}
.doc_border_box {
  clear: both;
  padding: 0 20px;
  background-color: #fff;
}
.related_services:last-child{
  border: none;
}
</style>
