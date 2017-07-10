<template>
  <div id="companyList">
    <div class="companyHeader">
        <img src="../../static/image/companyHeader.jpg"/>
    </div>
    <div class="mainWraap companyListBox mainList">
      <div class="outLine">
        <div class="mainWraapNav">
          <mu-tabs class="" :value="activeTab" @change="handleTabChange">
              <mu-tab v-for="it in labelList" :value="it.id" :title="it.name"/>
          </mu-tabs>
        </div>
      </div>
      <div class="mainCon">
        <div class="blankCon companyBlank" v-if="companyList.length < 1">
          <img src="../../static/image/icon/blank.png"/>
          <h5>空空如也,去看看别的吧!</h5>
        </div>
        <ul class="clearfix" v-else>
        	<li class="fl por demoLi" v-for='(it,i) in companyList'>
        	  <router-link :to="{name: 'companyDetail', params: { companyId: it.Id }}">
        	  <mu-paper class="demo-paper" :zDepth="2"/>
            <img class="poa topImg" :src="it.LogoUrl" alt="" />           
            <h3 class="poa bottomH">{{it.Name}}</h3>
            </router-link>
            <div class="poa blankPoa">
              
            </div>
            <div class="showInfo poa">
              
                <h4>公司简介</h4>
                <p>{{it.Introduce}}</p>
              
              <div class="por ">
                <div class="por" v-if = "!it.FavoriteFlg">
                <mu-raised-button class="demo-raised-button" label="收藏企业" primary @click='setFavorite(it.Id)'/>
                <img class="poa whiteStar" src="../../static/image/favourite.png" alt="" @click='setFavorite(it.Id)'/>
                </div>
                <div class="por" v-else>
                  <mu-raised-button class="demo-raised-button" label="已收藏" primary @click='setFavorite(it.Id)'/>
                  <img class="poa whiteStar" src="../../static/image/favourited.png" alt="" @click='setFavorite(it.Id)'/> 
                </div>                
              </div>
            </div>           
        	</li>
        </ul>        
      </div>
      <div class="buttonBottom" v-if='loadMore'>
        <div class="demo-button" @click="numAdd">加载更多</div>
      </div>     
    </div>
  </div>
</template>
<script>
  import labelService from '@/services/labelService'
  import companyService from '@/services/companyService'
  import favoriteService from '@/services/favoriteService'
  export default {
    data () {
      return {
        vShow: true,
        loadMore: false,
        activeTab: -1,
        serviceData: {id: 0, includeChild: false, includeAllOption: true},
        showData: {page: 1, pageNum: 12, labelId: 0},
        labelList: [],
        companyList: [],
        selected: {objectId: 0, objectType: 'company'}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.showData = {page: 1, pageNum: 12, labelId: -1}
        vm.activeTab = -1
        vm.getCompanyList(vm.showData)
        console.log('companyListreset')
        console.log(vm.companyList)
      })
    },
    created () {
      this.getLabel()
    },
    mounted () {},
    computed: {},
    watch: {
      'showData': {
        handler (newValue, oldValue) {
          this.getCompanyList(this.showData)
        },
        deep: true
      }
    },
    methods: {
      getLabel () {
        labelService.getServiceLabel(this.serviceData)
        .then(response => {
          this.labelList = response.data
          this.showData.labelId = -1
          console.log('labelList')
          console.log(this.labelList)
        })
      },
      getCompanyList (params) {
        companyService.getCompanyList(params)
        .then(response => {
          if (params.page === 1) {
            this.companyList = []
          }
          for (var i = 0; i < response.data.length; i++) {
            this.companyList.push(response.data[i])
          }
          if (response.count > params.page * params.pageNum) {
            this.loadMore = true
          } else {
            this.loadMore = false
          }
          console.log('companyList')
          console.log(this.companyList)
        })
      },
      handleTabChange (val) {
        this.activeTab = val
        this.companyList = []
        this.showData.page = 1
        this.showData.labelId = val
      },
      numAdd () {
        this.showData.page = this.showData.page + 1
        console.log('page' + this.showData.page)
      },
      setFavorite (id) {
        this.selected.objectId = id
        favoriteService.setFavorite(this.selected)
        .then(response => {
          console.log('SetFavorite')
          console.log(response)
          for (var i = 0; i < this.companyList.length; i++) {
            if (this.companyList[i].Id === this.selected.objectId) {
              this.companyList[i].FavoriteFlg = response.data.favoriteFlag
            }
          }
        })
      }
    }
  }
</script>
<style>
  #companyList .mu-raised-button.mu-raised-button-inverse {
    background: #083c6f!important;
    width: 86%;
    color:#fff!important;
    text-indent: 1em;
  }
  #companyList .mainWraapNav span.mu-tab-link-highlight {
    background-color: #083c6f!important;
  }
  .whiteStar{
    left:40px;
    top:8px;
  }
  .blankPoa{
    width:100%;
    height:20px;
    bottom:-20px;
    display: none;
    left:0px;
  }
  .mainList.mainWraap{
    padding-bottom:90px;
  }
  .showInfo{
    text-align: center;
    width:202px;
    height:220px;
    top:180px;
    left:-10px;
    background:#fff;
    border:1px solid #ccc;
    padding:10px;
    display: none;
    opacity: 1.6;
    border-radius: 4px;
    z-index: 222;
    box-shadow:-3px 0 3px rgba(0,0,0,.117647), /*左边阴影*/  
    3px 0 3px rgba(0,0,0,.117647), /*右边阴影*/  
    0 -3px 3px rgba(0,0,0,.117647), /*顶部阴影*/  
    0 3px 3px rgba(0,0,0,.117647); /*底边阴影*/ 
  }
  .showInfo p{
    font-size: 14px;
    line-height: 20px;
    color:#7a7a7a;
    text-align: left;
    margin-bottom:10px;
    width:180px;
    height:120px;
    overflow: hidden;
  }
  #companyList .showInfo h4{
    color: #000!important;
  }
  .outLine{
    border-bottom:1px solid #ccc;
    width:100%;
    height:49px;
  }
  .companyHeader img{
    width:100%;
    height:130px;
  }
  .mainWraap{
    width:920px;
    padding-bottom:20px;
    margin:0 auto;
    font-weight: bold;
    font-size: 16px;
  }
  .companyListBox{
    min-height:570px;
  }
  #companyList .mainWraapNav{
    width:550px;
  }
  .mu-tab-text{
    font-size: 16px;
  }
  .mainCon{
    padding-top:10px;
  }
  .demoLi:hover .showInfo,.demoLi:hover .blankPoa{
    display: block;
  }
  .demoLi{
    height: 170px;
  width: 185px;
  margin-right: 60px;
  margin-top:20px;
  }
  .demoLi .demo-paper:hover{
    cursor:pointer;
  }
  .demoLi:nth-child(4n+4){
    margin-right:0;
  }
  .demo-paper {    
  display: inline-block;
  width:100%;
  height:100%;
  text-align: center;
}
  .bottomH{
    width:100%;
    bottom:0;
    padding: 0 20px;
    text-align: center;
    height:50px;
    overflow: hidden;
    line-height: 50px;
    font-size: 16px;
    color: #2d2d2d;
    background-color: #f7f9f9;
  }
  .topImg{
    left:14px;
    top:14px;
    width:157px;
    height:92px;
  }
  .demo-button{
    display: inline-block;
    margin-top:60px;
    width:200px;
    height:50px;
    line-height: 50px;
    text-align: center;
    box-shadow:-3px 0 3px #ccc, /*左边阴影*/  
    3px 0 3px #ccc, /*右边阴影*/  
    0 -3px 3px #ccc, /*顶部阴影*/  
    0 3px 3px #ccc; /*底边阴影*/ 
  }
  .demo-button:hover{
    cursor:pointer;
  }
  #companyList .buttonBottom{
    width:100%;
    text-align: center;
  }
  .mainCon .companyBlank{
    height: auto;
  }
</style>
