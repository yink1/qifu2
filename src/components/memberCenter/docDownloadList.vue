<template>
  <div class="uploadDocList docDownloadList">
    <div class="blankCon" v-if="getDownloadList.length < 1">
        <img src="../../../static/image/icon/blank.png"/>
        <h5>空空如也,去看看别的吧!</h5>
    </div>
    <div class="uoload_list noselect" v-else>
      <mu-table multiSelectable enableSelectAll :showCheckbox='false' ref="table">
        <mu-thead>
          <mu-tr>
            <mu-th class="upload_msg">资料名</mu-th>
            <mu-th>下载日期</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="downList in getDownloadList">
            <mu-td class="upload_msg">
              <div :class="{ type_ppt: downList.format == 'ppt' || downList.format == 'pptx', type_txt: downList.format == 'txt', type_word: downList.format == 'doc' || downList.format == 'docx', type_excel: downList.format == 'xls' || downList.format == 'xlsx', 
                type_pdf: downList.format == 'pdf', upload_contant: true,upload_info: true}">
                <span>{{downList.title}}</span>
              </div>
              <div class="upload_info upload_do">
                <router-link :to="{name: 'docDetail',params: { docId: downList.id }}" class="upload_edit">查看</router-link>
                <a v-on:click.stop="downLand(downList.id)" class="delete_single">下载</a>
              </div>
            </mu-td>
            <mu-td class="upload_link uploat_time">
              <span>{{downList.time | timeShow}}</span>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="pagination">
      <mu-pagination :total="total" :pageSize="pageSize" :current="current" @pageChange="handleClick" v-if='pageShow'></mu-pagination>
    </div>
  </div>
</template>
<script>
import docService from '@/services/docService'
import {timeFormat} from '@/common/common'
export default {
  data () {
    return {
      total: 50,
      current: 1,
      pageSize: 10,
      pageShow: false,
      pageData: {page: 1, pageNum: 10},
      getDownloadList: []
    }
  },
  created () {
    this.get()
  },
  filters: {
    timeShow: timeFormat
  },
  methods: {
    downLand (val) {
      docService.downLoadDoc(val)
        .then(response => {
          console.log(1200, response)
          if (response.msg === 'ok') {
            window.open(response.data.downLoadLink, '_blank', '')
          }
        })
    },
    get () {
      docService.GetDownloadList(this.pageData)
      .then(response => {
        this.getDownloadList = response.data
        this.total = response.count
        if (response.count > this.pageData.pageNum) {
          this.pageShow = true
        } else {
          this.pageShow = false
        }
        console.log('getDownloadList')
        console.log(response)
      })
    },
    handleClick (newIndex) {
      this.pageData.page = newIndex
      this.get()
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
.docDownloadList .upload_msg{
  width:784px;
}
.docDownloadList .upload_contant{
  width: 588px;
}
.docDownloadList .upload_edit{
  background: url(../../../static/image/icon/pageview_unhover.png) left center no-repeat;
}
.docDownloadList .upload_edit:hover{
  background: url(../../../static/image/icon/pageview_hover.png) left center no-repeat;
}
.docDownloadList .delete_single{
  background: url(../../../static/image/icon/down_unhover.png) left center no-repeat;
}
.docDownloadList .delete_single:hover{
  background: url(../../../static/image/icon/down_hover.png) left center no-repeat;
}
</style>
