<template>
  <div id='favoriteDoclist'>
    <div class="blankCon" v-if="dataInfo.data.length < 1">
        <img src="../../../static/image/icon/blank.png"/>
        <h5>空空如也,去看看别的吧!</h5>
      </div>
    <div v-else>
    <ul class="favoriteDoclist">
    	<li class='clearfix firstLiHead'>
    	   <p class='fl'>资料名</p>
    	   <span class='fl ownerPc'>收藏日期</span>
    	   <span class='fl ownerPc'>上传用户</span>
    	</li>
    	<li class='clearfix mainDocList por' v-for="(it,i) in dataInfo.data" @click="jump(it.id)">    	  
    	  <p class='fl formatBg formatBgPdf' v-if='it.format.indexOf("pdf") > -1'>{{it.title}}</p>
        <p class='fl formatBg formatBgExcel' v-else-if='it.format.indexOf("xls") > -1'>{{it.title}}</p>
    	  <p class='fl formatBg formatBgPpt' v-else-if='it.format.indexOf("ppt") > -1'>{{it.title}}</p>
    	  <p class='fl formatBg formatBgTxt' v-else-if='it.format.indexOf("txt") > -1'>{{it.title}}</p>
    	  <p class='fl formatBg formatBgWord' v-else='it.format.indexOf("doc") > -1'>{{it.title}}</p>
    	  <div class="fl closeXxBox">
    	    <mu-icon-button class="closeXx" iconClass tooltip="取消收藏" icon="close" v-on:click.stop="reduce(i)"/>
    	  </div>    	  
         <span class='fl ownerPc'>{{it.favoriteTime | lengthFilte}}</span>
         <span v-if="it.ownerType == 'company'" class='fl ownerPc ownerCompany'>{{it.ownerName}}</span>
         <span v-else class='fl ownerPc ownerPerson'>{{it.ownerName}}</span>
        
    	</li>
    </ul>
    <div class="clearfix pageDiv">      
      <mu-pagination class="fr requetHistoryListPage" v-if="pageShow" :pageSize='pageSize' :total="dataInfo.count" :current="current" @pageChange="handleClick">
      </mu-pagination>      
    </div>
    </div>
  </div>
</template>
<script>
  import favoriteService from '@/services/favoriteService'
  import {timeFormat} from '@/common/common'
  timeFormat
  export default {
    data () {
      return {
        current: 1,
        pageSize: 10,
        pageShow: false,
        dataInfo: {
          data: []
        }
      }
    },
    filters: {
      lengthFilte: timeFormat
    },
    created () {
      this.get()
    },
    mounted () {},
    computed: {},
    methods: {
      jump (val) {
        this.$router.push('/docDetail/' + val)
      },
      get () {
        favoriteService.GetFavoriteDocList({page: this.current, pageNum: this.pageSize})
        .then(response => {
          this.dataInfo = response
          console.log(3, this.dataInfo)
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
      },
      reduce (i) {
        favoriteService.setFavorite({objectId: this.dataInfo.data[i].id, objectType: 'doc'})
         // 接收请求返回值
        .then(response => {
          this.dataInfo.data.length--
          if (this.current === this.dataInfo.data.length / this.pageSize + 1 && this.current > 1) {
            this.current = this.current - 1
          } else if (this.dataInfo.data.length % this.pageSize === 0 && this.current > 1) {
            this.current = this.current - 1
          }
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
    }
  }
</script>
<style>
  #favoriteDoclist .blankCon{
    height:525px;
  }
  #favoriteDoclist li{
    padding:0 24px;
    border-bottom:1px solid #ccc;
    height:50px;
    line-height: 50px;
  }
  #favoriteDoclist li:last-child{
    border-bottom:none;
  }
  #favoriteDoclist .favoriteDoclist{
    height:570px;
  }
  .firstLiHead{
    color:#898989;
    font-size: 12px;
  }
  #favoriteDoclist .firstLiHead P{
    margin-right:40px;
    width:540px;
  }
  #favoriteDoclist li p{
    width:532px;
    overflow: hidden;
    height:50px;
  }
  #favoriteDoclist .ownerPc{
    display: inline-block;
    width:108px;
    margin-left:48px;
    overflow: hidden;
    height:50px;
  }
  #favoriteDoclist .mu-pagination-item.active {
    color: #ffffff;
    background-color: #083c6f;
}
#favoriteDoclist .mu-pagination-item {
    color: #000;
}
.formatBgPdf{
  padding-left:30px;
  background:url(../../../static/image/pdf.png) no-repeat left center;
}
.formatBgExcel{
  padding-left:30px;
  background:url(../../../static/image/excel.png) no-repeat left center;
}
.formatBgPpt{
  padding-left:30px;
  background:url(../../../static/image/ppt_icon.png) no-repeat left center;
}
.formatBgWord{
  padding-left:30px;
  background:url(../../../static/image/word.png) no-repeat left center;
}
.formatBgTxt{
  padding-left:30px;
  background:url(../../../static/image/txt_icon.png) no-repeat left center;
}
.mainDocList:hover{
  background:#e6e6e6;
  cursor:pointer;
}
.ownerCompany{
  padding-left:24px;
  background:url(../../../static/image/icon/conpanyattr.png) no-repeat left center;
}
.ownerPerson{
  padding-left:24px;
  background:url(../../../static/image/icon/people.png) no-repeat left center;
}
#favoriteDoclist  .closeXx{
    display: none;    
  }
 #favoriteDoclist .closeXx .material-icons{
    background:#000;
    color:#fff;
    font-size: 17px;
  }
  #favoriteDoclist .mu-tooltip-label{
    color:#fff;
  }
  #favoriteDoclist .mainDocList:hover .closeXx{
    display: block;
  }
  .closeXxBox{width:48px;height:50px;}
</style>
