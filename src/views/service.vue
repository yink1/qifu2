<template>
  <div class="service_box">
    <div class="service">
      <navigation :title='title' :navbarList='navbarList'></navigation>
      <div class="select_box">
        <serviceLabelFilter :address='address' :showMore='showMore' :defaultLabel='defaultLabel' :defaultChildLabel='defaultChildLabel' :includeAllOption='true' @getServiceInfo="onServiceInfo"></serviceLabelFilter>
      </div>
      <div class='blankCon blanknew' v-if='serviceList.length < 1'>
        <img src='../../static/image/icon/blank.png'/>
        <h5>空空如也,去看看别的吧!</h5>
      </div>
      <div class="no_border_box" v-else>
        <div class="services_data" v-for="index in serviceList">
          <div class="service_left"><img :src="index.picUrl" alt=""  @click='toDetail(index.serviceId)'></div>
          <div class="service_right">
            <h2 class="datpage_title" @click='toDetail(index.serviceId)'>{{index.serviceName}}</h2>
            <p class="datpage_intro">{{index.Introduce}}</p>
            <div class="public_user">
              <router-link :to="{name: 'companyDetail',params: { companyId: index.companyId }}">
              <img src="../../static/image/icon/conpanyattr.png"/>
              <span>{{index.companyName}}</span>
              </router-link>
            </div>
          </div>
          <div class="datpage_center">
            <mu-raised-button class="demo-raised-button datpage_btn1" label="查看详情" labelPosition="after" primary @click='toDetail(index.serviceId)'>
              <img src="../../static/image/icon/detail.png" class="button_pics"/>
            </mu-raised-button><br/>
            <mu-raised-button class="demo-raised-button datpage_btn2" label="咨询TA" labelPosition="after" @click='open(index.serviceId,index.companyId)'>
              <img src="../../static/image/icon/tele_white.png" class="button_pics"/>
            </mu-raised-button> 
          </div>
        </div>
      </div> 
      <div class="buttonBottom" v-if='loadMore'>
        <div class="demo-button" @click="numAdd">加载更多</div>
      </div>
      <div class="requirement_box" v-if="dialog"></div>
      <div class="dialog" v-if="dialog">
        <div class="require_content">             
          <a href="javascript:;" @click="close" class="close_dialog">
            <img src="../../static/image/del.png"/>
          </a>
          <requirement v-on:child-say="listenToMyBoy" :companyId='companyId' :ServiceId ='serviceId'></requirement>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import navigation from '@/components/shared/navigation'
  import requirement from '@/components/shared/requirement'
  import service from '@/services/service'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import { mapGetters } from 'vuex'
  import * as types from '@/store/types'
  import router from '@/router/router'
  export default {
    data () {
      return {
        title: '首页',
        navbarList: ['服务分类'],
        address: true,
        showMore: true,
        dialog: false,
        loadMore: false,
        serviceList: [],
        showData: {labelId: -1, area: '', page: 1, pageNum: 6, serviceName: ''},
        defaultLabel: 0,
        defaultChildLabel: 0,
        defaultArea: '全部',
        serviceName: '',
        companyId: '',
        serviceId: ''
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      get (params) {
//      请求之前,清空服务列表
//      this.serviceList = []
        service.getServiceList(params)
         // 接收请求返回值
        .then(response => {
          console.log(response)
          if (params.page === 1) {
            // this.$set(this.serviceList, 'actived', false)
            this.serviceList = []
          }
          console.log('get serclideeeeee')
          for (var i = 0; i < response.data.length; i++) {
            this.serviceList.push(response.data[i])
          }
          if (response.count > params.page * params.pageNum) {
            this.loadMore = true
            console.log(this.loadMore)
          } else {
            this.loadMore = false
          }
          console.log('this.serviceList' + response.count)
          console.log(this.serviceList)
        })
      },
      open (sid, cid) {
        if (!this.userLoginStatus) {
          this.dialog = false
          console.log('this.$route.path')
          console.log(this.$route.path)
          router.replace({
            path: '/login',
            query: {
              redirect: this.$route.path
            }
          })
        } else {
          this.dialog = true
        }
        this.serviceId = sid
        this.companyId = cid
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
      },
      close () {
        this.dialog = false
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementsByTagName('html')[0].style.overflow = 'auto'
      },
      onServiceInfo (childLabelId, chooseArea) {
        console.log('serviceSummary onServiceId' + childLabelId + ' ' + chooseArea)
        if (this.showData.labelId !== childLabelId || this.showData.area !== chooseArea) {
          console.log('serviceSummary onServiceId' + this.showData.labelId + ' != ' + childLabelId)
          console.log('serviceSummary onServiceId area' + this.showData.area + ' != ' + chooseArea)
          this.serviceList = []
          this.showData = {labelId: childLabelId, area: chooseArea, page: 1, pageNum: 6, serviceName: ''}
          this.get(this.showData)
        }
      },
      numAdd () {
        this.showData.page = this.showData.page + 1
        this.get(this.showData)
      },
      fetchData () {
        this.defaultChildLabel = -1
        this.defaultLabel = -1
        this.showData = {labelId: -1, area: '', page: 1, pageNum: 6, serviceName: ''}
        console.log('service to.params' + this.$route.params.childLabelId + ':' + this.showData.labelId)
        console.log(this.$route.params.labelName + '' + this.$route.params.childLabelId)
        if (this.$route.params.serviceName) {
          this.showData.serviceName = this.$route.params.serviceName
        } else if (this.$route.params.childLabelId !== undefined && this.$route.params.labelId !== undefined) {
          if (parseInt(this.$route.params.childLabelId) !== parseInt(this.showData.labelId)) {
            if (this.$route.params.childLabelId) {
              this.showData.labelId = parseInt(this.$route.params.childLabelId)
              this.defaultChildLabel = parseInt(this.$route.params.childLabelId)
              this.showData.area = ''
            }
            if (this.$route.params.labelId) {
              this.defaultLabel = parseInt(this.$route.params.labelId)
            }
          }
        }
        this.get(this.showData)
      },
      toDetail (val) {
        this.$router.push('/serviceDetail/' + val)
      },
      // 接收子组件传递的数据
      listenToMyBoy: function (somedata) {
        this.childWords = somedata
        if (this.childWords === 'ok') {
          this.dialog = false
        }
      }
    },
    computed: {
      ...mapGetters(
        {
          userLoginStatus: [types.GET_USER_LOGIN_STATUS],
          isCompanyUser: [types.IS_COMPANY_USER]
        }
      )
    },
    components: {
      navigation,
      requirement,
      serviceLabelFilter
    },
    watch: {
      $route (to, from) {
        if (to.path.indexOf('/service') !== -1) {
          this.fetchData()
          console.log('122222222222222222222path')
          console.log(to.path.indexOf('/service'))
        }
      }
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
  min-height: 723px;
}
.service .sele_list{
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
}
.buttonBottom{
  display: flex;
}
.demo-button{
  margin: 40px auto 0;
  box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
}
.service_box .demo-button{
  margin: 40px auto 0;
  height: 46px;
  background-color: #fff;
}
.select_box{
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
  float: left;
  margin-bottom: 20px;
}
.select_box .sele_list>div{
  border-bottom: 1px dashed #e6e6e6;
  padding-left: 10px;
  clear: both;
  float: left;
  width: 100%;
}
.select_box .sele_list .service_address{
  border: none;
}
/*点击更多之后的样式*/
.select_box .sele_list .btn_more{
  height: 80px;
}
.select_box .sele_list_title{
  width: 90px;
}
.select_box .sele_list_top,.select_box .sele_list_bottom{
  float: left;
  width: 686px;
}
.services_data{
  clear: both;
  height:154px;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}
.service_left {
  float:left;
  width: 215px;
  height: 114px;
}
.service_left img {
  width:100%;
  height:100%;
  cursor:pointer
}
.service_right {
  float:left;
  width: 518px;
  height:114px;
  margin: 0 20px 0 10px;
  position: relative;
}
.public_user{
  position: absolute;
  bottom: -2px;
  left: 0;
  color: #ffaa00;
  font-size: 12px;
}
.public_user img{
  display: block;
  margin-right: 4px;
}
.public_user img,.public_user span{
  float: left;
}
.service_right .datpage_title {
  width: 100%;
  font-size: 18px;
  color: #2d2d2d;
  line-height: 1.3;
  max-height: 44px;
  overflow: hidden;
  cursor: pointer;
}
.service_right .datpage_intro {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  margin: 10px 0;
}

.datpage_btn1 .button_pics{
  margin-left: 12px;
}
.datpage_btn2 .button_pics{
  margin-left: 17px;
}
.datpage_center {
  float:left;
}
.services_data .mu-raised-button.mu-raised-button-inverse .mu-raised-button-label,.datpage_center .mu-raised-button-label{
  padding-left: 10px;
  padding-right: 22px;
  font-size: 14px;
}
.datpage_center .mu-raised-button-label{
  padding-right: 28px;
}
.datpage_center .datpage_btn1 {
  margin-bottom: 6px;
}
.datpage_center .datpage_btn2 {
  margin-bottom: 6px;
}
.blankCon{
  clear: both;
}
.blanknew {
  padding: 100px 0 0;
  height:515px;
}
.blanknew img{
  margin-top:0;
}
.service_box .datpage_center .mu-raised-button-label{
  padding-right: 22px;
}
.services_data:last-child{
  border: none;
}
</style>
