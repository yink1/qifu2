<template>
  <div id="requetHistoryList">
      <div class="blankCon" v-if="dataInfo.data.length < 1">
        <img src="../../../static/image/icon/blank.png"/>
        <h5>空空如也,去看看别的吧!</h5>
      </div>
      <div v-else>
        <ul class="minHeightData" >
        	<li class="clearfix requetHistoryList por" v-for="(item,i) in dataInfo.data">
        	  <span class="fl fldate">{{item.startDate | lengthFilte}}</span>
        	  <p class="fl por porDescription" @mouseover="hover(i)" @mouseout="hoverLeave(i)">
        	    {{item.description}}      	     
        	  </p>
        	  <span class="fr flStatus">
        	      <i v-if="item.companyName">由{{item.companyName}}公司跟进</i>
        	      <i v-else>未答复</i>
        	  </span>
        	  <p class="poa poaDescription">{{item.description}}        	   
        	  </p>
        	</li>
        </ul>
        <div class="clearfix">      
          <mu-pagination class="fr requetHistoryListPage" :pageSize='pageSize' v-if="pageShow" :total="dataInfo.count" :current="current" @pageChange="handleClick">
          </mu-pagination>
        </div>
      </div>
  </div>
</template>
<script>
  import requirementService from '@/services/requirementService'
  import {timeFormat} from '@/common/common'
  export default {
    data () {
      return {
        current: 1,
        dataLength: 0,
        pageShow: false,
        pageSize: 10,
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
      get () {
        requirementService.GetRequetHistoryList({page: this.current, pageNum: this.pageSize})
        .then(response => {
          this.dataInfo = response
          console.log(8)
          console.log(1, this.dataInfo)
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
      hover (i) {
        let hover = document.getElementsByClassName('poaDescription')
        for (var m = 0; m < hover.length; m++) {
          if (m === i) {
            hover[i].style.display = 'block'
          } else {
            hover[m].style.display = 'none'
          }
        }
      },
      hoverLeave (i) {
        let hover = document.getElementsByClassName('poaDescription')[i]
        hover.style.display = 'none'
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.get()
        // this.dataLenth = this.dataInfo.data.length
      })
    }
  }
</script>
<style>
  .blankCon{
    width:100%;
    height:460px;
  }
  .blankCon img{
    display: block;
    width:260px;
    height:200px;
    margin:100px auto 20px;
  }
  .minHeightData{
    height:510px;
  }
  .blankCon h5{
    text-align: center;
    color:#666666;
    font-size: 18px;
    margin-bottom:70px;
  }
  .requetHistoryList{
    width:100%;
    padding:0 24px;
    border-bottom:1px solid #bcbcbc;
    height:50px;
    line-height: 50px;
  }
  .fldate{
    width:108px;
  }
  .flStatus{
    width:198px;
    overflow: hidden;
    height:50px;
  }
  .flStatus i{
    font-style:normal;
  }
  .porDescription{
    text-indent: 10px;
    width:490px;
    color:#083C6F;
    margin:0 48px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .porDescription:hover{
    background:#e6e6e6;
    color:#000;
  }
  .poaDescription{
    width:510px;
    word-break:break-all;
    padding:10px;
    top:54px;
    line-height: 20px;
    background:#fff;
    font-size: 14px;
    color:#444;
    left:170px;
    z-index: 111111111;
    display: none;
    box-shadow: -5px 0 10px rgba(0,0,0,.156863), /*左边阴影*/ 5px 0 10px rgba(0,0,0,.156863), /*右边阴影*/ 0 -5px 10px rgba(0,0,0,.156863), /*顶部阴影*/ 0 5px 10px rgba(0,0,0,.156863);
  }
  .requetHistoryListPage{
    margin-top:30px;
  }
  #requetHistoryList .mu-pagination-item.active{
    color: #ffffff;
    background-color: #083c6f;
  }
  #requetHistoryList .mu-pagination-item{
    color: #000;
  }
  .mu-pagination-item.disabled {
    color: rgba(0, 0, 0, 0.38)!important;
  }
</style>
