<template>
  <div id='favoriteServiceList'>
    <div class="blankCon" v-if="dataInfo.data.length < 1">
        <img src="../../../static/image/icon/blank.png"/>
        <h5>空空如也,去看看别的吧!</h5>
      </div>
    <div v-else>
    <ul class='clearfix'>
      <li class='fl listFavorite por'  v-for='(service,i) in dataInfo.data' :key='i' @click="jump(service.serviceId)">
        <div class='imgData' >
          <img class="imgShowData" :src="service.picUrl | thumbnail('215','106')" alt=''>
          <h4 class='txleft'>{{service.serviceName}}</h4>
          <div class='imgFooter' v-on:click.stop="gotoCompanlist">
            <img class='' src='../../../static/image/temp/companyIcon.png' height='16' width='16'> {{service.companyShortName}}
          </div>
          <img src="../../../static/image/x.png" alt="" class="xx poa"  v-on:click.stop="reduce(i)" @mouseleave="hoverLeave(i)" @mouseover="hover(i)"/>
        </div>        
          <span class="poa delSpanButtoned">取消收藏</span>
      </li>
    </ul>
    <div class="clearfix pageDiv">      
      <mu-pagination class="fr requetHistoryListPage" v-if="pageShow" :pageSize="pageSize" :total="dataInfo.count" :current="current" @pageChange="handleClick">
      </mu-pagination>      
    </div>
    </div>
  </div>
</template>
<script>
  import favoriteService from '@/services/favoriteService'
  import { thumbnail } from '@/common/qiniuFun'
  export default {
    data () {
      return {
        pageSize: 16,
        current: 1,
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
    computed: {},
    methods: {
      jump (val) {
        this.$router.push('/serviceDetail/' + val)
      },
      gotoCompanlist () {
        this.$router.push('/companyList')
      },
      get () {
        favoriteService.GetFavoriteServiceList({page: this.current, pageNum: this.pageSize})
           // 接收请求返回值
          .then(response => {
            this.dataInfo = response
            console.log(this.newIndex)
            console.log('this.dataInfo')
            console.log(this.dataInfo)
            if (response.count > this.pageSize) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
          })
      },
      handleClick (newIndex) {
        this.current = newIndex
        this.get()
        this.$emit('changeInfo', 236)
      },
      hover (i) {
        let hover = document.getElementsByClassName('delSpanButtoned')
        for (var m = 0; m < hover.length; m++) {
          if (m === i) {
            hover[i].style.display = 'block'
          } else {
            hover[m].style.display = 'none'
          }
        }
      },
      hoverLeave (i) {
        let hover = document.getElementsByClassName('delSpanButtoned')[i]
        hover.style.display = 'none'
      },
      reduce (i, ev) {
        let hover = document.getElementsByClassName('delSpanButtoned')[i]
        hover.style.display = 'none'
        favoriteService.setFavorite({objectId: this.dataInfo.data[i].serviceId, objectType: 'service'})
         // 接收请求返回值
        .then(response => {
          this.dataInfo.data.length--
          if (this.current === this.dataInfo.data.length / this.pageSize + 1 && this.current > 1) {
            this.current = this.current - 1
          } else if (this.dataInfo.data.length % this.pageSize === 0 && this.current > 1) {
            this.current = this.current - 1
          }
          // this.dataInfo = response
          console.log('this.dataInfoi')
          console.log(this.dataInfo)
          this.get()
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.get()
      })
    },
    filters: {
      thumbnail: thumbnail
    }
  }
</script>
<style>
  #favoriteServiceList .blankCon{
    height:525px;
  }
  #favoriteServiceList{
    padding-left:25px;
  }
.imgData {
    width: 215px;
    margin-right: 10px;
    margin-top:8px;
    z-index: 111;
  }
  
  .imgData .imgShowData{
    display: block;
  }
   .txleft {
    text-align: left;
    padding-left: 4px;
  }
    h4.txleft {
    height: 42px;
    overflow: hidden;
  }
    .imgFooter {
    font-size: 12px;
    color: #ffaa00;
    text-align: left;
    padding: 5px 0;
  }
  
  .imgFooter img {
    vertical-align: top;
    margin:0 4px;
  }
  .imgData:hover{
    cursor: pointer;
    transform: scale(1.02);
    box-shadow:-3px 0 3px rgba(0,0,0,.156863), /*左边阴影*/  
    3px 0 3px rgba(0,0,0,.156863), /*右边阴影*/  
    0 -3px 3px rgba(0,0,0,.156863), /*顶部阴影*/  
    0 3px 3px rgba(0,0,0,.156863); /*底边阴影*/ 
  }
  .imgData:hover .xx{
    display: block;
  }
  .delSpanButtoned{
  display: none;
  background:rgba(0,0,0,.6);
  color:#fff;
  width:65px;
  height:24px;
  line-height: 24px;
  text-align: center;
  right:-12px;
  top:30px;
  font-size: 12px;
  border-radius: 4px;
  z-index: 122222222;
}
#favoriteServiceList .mu-pagination-item.active {
    color: #ffffff;
    background-color: #083c6f;
}
#favoriteServiceList .mu-pagination-item {
    color: #000;
}
#favoriteServiceList ul{
  height:765px;
}
</style>
