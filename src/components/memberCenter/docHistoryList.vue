<template>
  <div id='requetHistoryList'>
      <div class='blankCon' v-if='dataInfo.data.length < 1'>
        <img src='../../../static/image/icon/blank.png'/>
        <h5>空空如也,去看看别的吧!</h5>
      </div>
      <div v-else>
      <ul class='docHistory minHeightData' >
        <li class='clearfix requetHistoryList firstLiColor'>
          <p class="fl">资料名</p>
          <span class="fr fldate">下载日期</span>
        </li>
        <li class='clearfix requetHistoryList requetHistoryListLi por' v-for='(item,i) in dataInfo.data' @click="jump(item.id)">
          <p class="fl">
            <img v-if='item.format.indexOf("pdf") > -1' src="../../../static/image/pdf.png" alt="" />
            <img v-if='item.format.indexOf("doc") > -1' src="../../../static/image/word.png" alt="" />
            <img v-if='item.format.indexOf("txt") > -1' src="../../../static/image/txt_icon.png" alt="" />
            <img v-if='item.format.indexOf("xls") > -1' src="../../../static/image/excel.png" alt="" />
            <img v-if='item.format.indexOf("ppt") > -1' src="../../../static/image/ppt_icon.png" alt="" />
            {{item.title}}
          </p>
          <span class="fr fldate">{{item.time| lengthFilte}}</span>
        </li>
      </ul>
      <div class='clearfix'>      
      <mu-pagination class='fr requetHistoryListPage' :pageSize='pageSize' :total='dataInfo.count' v-if='pageShow' :current='current' @pageChange='handleClick'>
      </mu-pagination>
      </div>
      </div>
  </div>
</template>
<script>
  import userService from '@/services/userService'
  import {timeFormat} from '@/common/common'
  export default {
    data () {
      return {
        current: 1,
        pageShow: false,
        pageSize: 10,
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
    filters: {
      lengthFilte: timeFormat
    },
    methods: {
      jump (val) {
        this.$router.push('/docDetail/' + val)
      },
      get () {
        userService.GetDocHistoryList({page: this.current, pageNum: this.pageSize})
        .then(response => {
          this.dataInfo = response
          console.log(10)
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
      })
    }
  }
</script>
<style>
#requetHistoryList .firstLiColor{
  font-size: 12px;
  color:#898989
}
.docHistory p{
  width:736px;
  color:#333;
  height:50px;
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.docHistory p img{
  vertical-align: middle;
  margin-right:6px;
}
.requetHistoryListLi:hover{
  background:#e6e6e6;
  cursor:pointer;
}
.minHeightData li:last-child{
  border-bottom:none;
}
</style>
