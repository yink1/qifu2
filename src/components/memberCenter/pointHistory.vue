<template>
  <div id='pointHistory'>
    <ul class="collect_type home_nav">
      <li class="active fl">财富值记录</li>
    </ul>
    <div class='blankCon' v-if='dataInfo.data.length < 1'>
      <img src='../../../static/image/icon/blank.png' />
      <h5>空空如也,去看看别的吧!</h5>
    </div>
    <div v-else>
      <ul class="minHeightData">
        <li class="clearfix pointTitle">
          <span class="fl dataWidth">日期</span>
          <span class="fl changeCase">变动事项</span>
          <span class="fl dataWidth">财富值变动</span>
        </li>
        <li v-for="it in dataInfo.data">
          <span class="fl dataWidth">{{it.time | lengthFilte}}</span>
          <span class="fl changeCase">{{it.noteInfo}}</span>
          <span class="fl dataWidth">
              <i v-if="it.noteInfo = '充值'">获得{{it.point}}财富值</i>
              <i v-else>消费{{it.point}}财富值</i>                    
          </span>
        </li>
      </ul>
      <div class="clearfix">
        <mu-pagination class="fr requetHistoryListPage" :total="dataInfo.count" :current="current" @pageChange="handleClick">
        </mu-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import pointService from '@/services/pointService'
import {timeFormat} from '@/common/common'
export default {
  data () {
    return {
      current: 1,
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
      pointService.GetPointHistory({ page: this.current, pageNum: 10 })
      .then(response => {
        this.dataInfo = response
        console.log(112, this.dataInfo)
      })
    },
    handleClick (newIndex) {
      this.current = newIndex
      this.get()
    }
  }
}
</script>
<style>
  #pointHistory .collect_type {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #666;
  }
  
  #pointHistory .home_nav {
    margin-bottom: 10px;
  }
  
  #pointHistory .collect_type li.active {
    color: #083C6F;
    border-bottom: 2px solid #083C6F;
  }
  
  #pointHistory .collect_type li {
    width: 130px;
    text-align: center;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    box-sizing: border-box;
    height: 100%;
  }
  
  #pointHistory .active {
    text-decoration: none;
  }
  
  .minHeightData li {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #bcbcbc;
  }
  
  .dataWidth {
    width: 108px;
  }
  
  #pointHistory .minHeightData li {
    width: 940px;
    padding: 0 24px;
  }
  
  .changeCase {
    display: inline-block;
    width: 580px;
    height:50px;
    margin: 0 48px;
    word-break: keep-all;
    /* 不换行 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis;
    /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  
  .pointTitle span {
    color: #898989;
    font-size: 12px;
  }
  
  #pointHistory .mu-pagination-item {
    color: #000;
  }
  
  #pointHistory .mu-pagination-item.active {
    color: #ffffff;
    background-color: #083c6f;
  }
  
  .dataWidth i {
    font-style: normal;
  }
</style>
