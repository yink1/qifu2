<template>
  <div id='favoriteCompanyList'>
    <div class="blankCon" v-if="dataInfo.data.length < 1">
        <img src="../../../static/image/icon/blank.png"/>
        <h5>空空如也,去看看别的吧!</h5>
      </div>
    <div v-else>
    <div class='mainCon'>
      <ul class='clearfix'>
        <li class='fl por demoLi' v-for='(it,i) in dataInfo.data' @click="jump(it.id)">
          <mu-paper class='demo-paper' :zDepth='2' title='1234' />
          <img class='poa topImg' :src='it.logoUrl' alt='' />
          <h3 class='poa bottomH'>{{it.shortName}}</h3>
          <img src="../../../static/image/x.png" alt="" class="xx poa" v-on:click.stop="reduce(i)" @mouseleave="hoverLeave(i)" @mouseover="hover(i)"/>
          <span class="poa delSpanButton">取消收藏</span>
        </li>
      </ul>
      </div>
      <div class="clearfix pageDiv">      
      <mu-pagination class="fr requetHistoryListPage" v-if="pageShow" :pageSize="pageSize" :total="dataInfo.count" :current="current" @pageChange="handleClick">
      </mu-pagination>      
    </div>
    </div>
  </div>
</template>
<script>
  import favoriteService from '@/services/favoriteService'
  export default {
    data () {
      return {
        current: 1,
        pageSize: 12,
        pageShow: false,
        dataInfo: {
          data: []
        }
      }
    },
    created () {
      this.get()
    },
    mounted () {},
    methods: {
      jump (val) {
        this.$router.push('/companyDetail/' + val)
      },
      handleClick (newIndex) {
        this.current = newIndex
        this.get()
      },
      get () {
        favoriteService.GetFavoriteCompanyList({page: this.current, pageNum: this.pageSize})
        .then(response => {
          this.dataInfo = response
          console.log(1, this.dataInfo)
          if (response.count > this.pageSize) {
            this.pageShow = true
          } else {
            this.pageShow = false
          }
        })
      },
      hover (i) {
        let hover = document.getElementsByClassName('delSpanButton')
        for (var m = 0; m < hover.length; m++) {
          if (m === i) {
            hover[i].style.display = 'block'
          } else {
            hover[m].style.display = 'none'
          }
        }
      },
      hoverLeave (i) {
        let hover = document.getElementsByClassName('delSpanButton')[i]
        hover.style.display = 'none'
      },
      reduce (i) {
        favoriteService.setFavorite({objectId: this.dataInfo.data[i].id, objectType: 'company'})
         // 接收请求返回值
        .then(response => {
          console.log('this.dataInfoi')
          console.log(this.dataInfo, response)
          this.dataInfo.data.length--
          if (this.current === this.dataInfo.data.length / this.pageSize + 1 && this.current > 1) {
            this.current = this.current - 1
          } else if (this.dataInfo.data.length % this.pageSize === 0 && this.current > 1) {
            this.current = this.current - 1
          }
          this.get()
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.get()
      })
    }
  }
</script>
<style>
  #favoriteCompanyList .blankCon{
    height:525px;
  }
  #favoriteCompanyList .mainCon {
    padding-top: 0px;
    height:580px;
    width:100%;
    overflow: hidden;
}
#favoriteCompanyList .mu-pagination-item {
    color: #000;
}
#favoriteCompanyList .mu-pagination-item.active {
    color: #ffffff;
    background-color: #083c6f;
}
.pageDiv{
  margin-bottom:10px;
}
#favoriteCompanyList .demoLi:hover{
  transform: scale(1.1);
}
#favoriteCompanyList .demoLi:hover .xx{
  display: block;
}
.xx{
  width:16px;
  height:16px;
  right:2px;
  top:2px;
  display: none;
}
.delSpanButton{
  display: none;
  background:rgba(0,0,0,.6);
  color:#fff;
  width:65px;
  height:24px;
  line-height: 24px;
  text-align: center;
  right:-24px;
  top:24px;
  font-size: 12px;
  border-radius: 4px;
  z-index: 122222222;
}
</style>
