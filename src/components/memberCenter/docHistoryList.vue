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
        <li class='clearfix requetHistoryList por' v-for='(item,i) in dataInfo.data'>
          <p class="fl">
            <img src="../../../static/image/pdf.png" alt="" />
            {{item.title}}
          </p>
          <span class="fr fldate">{{item.time}}</span>
        </li>
      </ul>
      <div class='clearfix'>      
      <mu-pagination class='fr requetHistoryListPage' :total='dataInfo.count' :current='current' @pageChange='handleClick'>
      </mu-pagination>
      </div>
      </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        current: 1,
        dataInfo: {
          'msg': 'ok',
          'count': 20,
          'data': [
            {
              'id': '文档id',
              'title': '《MDT从能力到实力的思考——北京大学第三医院 金昌晓》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '昨天'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '2016-10-29'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '前天'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '2016-10-01'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '前天'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '前天'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '前天'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '前天'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '前天'
            },
            {
              'id': '文档id',
              'title': '《患者临床信息在院内的充分共享——复旦大学附属华山医院信息中心 黄虹》',
              'documentId': '百度文库id',
              'format': '文档格式,参考Format定义',
              'time': '前天'
            }
          ]
        }
      }
    },
    created () {},
    mounted () {},
    computed: {},
    methods: {
      handleClick (newIndex) {
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
}
</style>
