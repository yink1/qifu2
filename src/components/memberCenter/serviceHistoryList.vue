<template>
  <div id='serviceHistoryList'>
    <div class='blankCon' v-if='dataInfo.data.length < 1'>
      <img src='../../../static/image/icon/blank.png' />
      <h5>空空如也,去看看别的吧!</h5>
    </div>
    <div class="blankService" v-else>
      <div class="outServices_data">
    <div class="services_data" v-for="(index,i) in dataInfo.data">
      <div class="service_left"><img :src="index.picUrl" @click="jump(index.serviceId)" alt=""></div>
      <div class="service_right">
        <h2 class="datpage_title" @click="jump(index.serviceId)">{{index.serviceName}}</h2>
        <p class="datpage_intro">{{index.introduce}}</p>
        <div class="public_user" @click="gotoCompanlist">
          <img src="../../../static/image/icon/conpanyattr.png"/>
          <span>{{index.companyName}}</span>
        </div>
      </div>
      <div class="datpage_center">
        <mu-raised-button class="demo-raised-button datpage_btn1" @click="jump(index.serviceId)" label="查看详情" labelPosition="after" primary>
          <img src="../../../static/image/icon/detail.png" class="button_pics"/>
        </mu-raised-button><br/>
        <mu-raised-button v-if="index.favoriteFlag == false" class="demo-raised-button datpage_btn3" label="加入收藏" labelPosition="after" @click="addHistory(i)">
          <img src="../../../static/image/icon/sc_null.png" class="button_pics"/>
        </mu-raised-button>
        <mu-raised-button v-if="index.favoriteFlag == true" class="demo-raised-button datpage_btn3" label="取消收藏" labelPosition="after" @click="addHistory(i)">
          <img src="../../../static/image/sc_white_null.png" class="button_pics"/>
        </mu-raised-button>
      </div>
    </div>
    </div>
    <div class="clearfix">      
      <mu-pagination class="fr requetHistoryListPage" v-if='pageShow' :pageSize="pageSize" :total="dataInfo.count" :current="current" @pageChange="handleClick">
      </mu-pagination>
      </div>
  </div>
  </div>
</template>
<script>
  import favoriteService from '@/services/favoriteService'
  import userService from '@/services/userService'
  export default {
    data () {
      return {
        current: 1,
        dialog: false,
        pageSize: 3,
        pageShow: false,
        newIndex: 1,
        dataInfo: {
          data: []
        }
      }
    },
    created () {
      this.get()
    },
    mounted () {},
    computed: {},
    methods: {
      jump (val) {
        this.$router.push('/serviceDetail/' + val)
      },
      gotoCompanlist () {
        this.$router.push('/companyList')
      },
      get () {
        userService.GetServiceHistoryList({page: this.current, pageNum: this.pageSize})
        .then(response => {
          this.dataInfo = response
          console.log(9)
          console.log(2, this.dataInfo)
          if (response.count > this.pageSize) {
            this.pageShow = true
          } else {
            this.pageShow = false
          }
        })
      },
      handleClick (newIndex) {
        this.current = newIndex
        this.newIndex = newIndex
        this.get()
      },
      addHistory (i) {
        this.dataInfo.data[i].favoriteFlag = !this.dataInfo.data[i].favoriteFlag
        favoriteService.setFavorite({objectId: this.dataInfo.data[i].serviceId, objectType: 'service'})
        .then(response => {
          console.log(1, response)
          // this.current = this.newIndex
          // this.get()
        })
      }
    },
    components: {},
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.get()
      })
    }
  }
</script>
<style>
  .blankService .mu-pagination-item {
    color: #000;
}
.public_user:hover{
  cursor:pointer;
}
.blankService{
  min-height:522px;
}
.services_data:hover .datpage_title{
  color:#083C6F;
}
#serviceHistoryList .datpage_btn1 .button_pics {
    margin-left: 25px!important;
}
#serviceHistoryList .datpage_btn3 .button_pics{
  margin-left:25px;
}
#serviceHistoryList .datpage_center .datpage_btn3 .mu-raised-button-label{
  padding-right:20px;
}
#serviceHistoryList .datpage_btn2 .button_pics{
  margin-left:23px;
}
#serviceHistoryList .datpage_center .datpage_btn2 .mu-raised-button-label{
  padding-right:23px;
}
#serviceHistoryList .datpage_center .datpage_btn1,#serviceHistoryList .datpage_center .datpage_btn3 {
    width: 130px;
}
.outServices_data{
  height:462px;
}
.datpage_center{
  padding-top:20px;
}
</style>
