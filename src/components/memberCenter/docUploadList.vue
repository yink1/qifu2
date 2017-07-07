<template>
  <div class="uploadDocList docUploadList">
    <div class="blankCon" v-if="getUploadList.length < 1">
        <img src="../../../static/image/icon/blank.png"/>
        <h5>空空如也,去看看别的吧!</h5>
    </div>
    <a href="javascript:;" :class="{uplod_delate: true, uplod_delate_allow:hasSelectItem}"  @click='allDelete' v-if="getUploadList.length >= 1">删除</a>
    <div class="uoload_list" v-if="getUploadList.length >= 1">
      <mu-table multiSelectable enableSelectAll multiSelectabl='true' ref="table" @rowSelection='selection'>
        <mu-thead>
          <mu-tr>
            <mu-th class="upload_msg">已上传的资料</mu-th>
            <mu-th class='upload_data'>上传日期</mu-th>
            <mu-th class='my_upload_state'>上传状态</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(uploadDoc, index) in getUploadList" v-model="listCheck" :selected="uploadDoc.selected">
            <mu-td class="upload_msg upload_msged" v-on:click.stop='jump(uploadDoc.id)'>
              <div :class="{ type_ppt: uploadDoc.format == 'ppt' || uploadDoc.format == 'pptx', type_txt: uploadDoc.format == 'txt', type_word: uploadDoc.format == 'doc' || uploadDoc.format == 'docx', type_excel: uploadDoc.format == 'xls' || uploadDoc.format == 'xlsx', type_pdf: uploadDoc.format == 'pdf', upload_contant: true,upload_info: true}">
                <span>{{uploadDoc.title}}</span>
              </div>
              <div class="upload_info upload_do">
                <a href="javascript:;"  class="upload_edit" v-on:click.stop='jumped(uploadDoc.id)'>编辑</a>
                <a href="javascript:;"  class="delete_single" v-on:click.stop='open(uploadDoc.id, index)'>删除</a>
              </div>
            </mu-td>
            <mu-td class="upload_link uploat_time">
              <span>{{uploadDoc.time | timeShow}}</span>
            </mu-td>
            <mu-td class='upload_state'>
              <div>
                {{uploadDoc.status}}
              </div>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="pagination">
      <mu-pagination :total="total" :pageSize='pageSize' :current="current" @pageChange="handleClick" v-if='pageShow'></mu-pagination>
    </div>
    <mu-dialog :open="dialog" @close="close">
      <div class="">    
        <h5>提示</h5>
        <p>你确定删除该资料？</p>
        <mu-flat-button slot="actions" @click="close" primary label="取消" class='nosure'/>
        <mu-flat-button slot="actions" primary @click="close(selectedList ,'sure')" label="确定"/>
      </div>
    </mu-dialog>
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
      dialog: false,
      pageShow: false,
      listCheck: [],
      pageData: {page: 1, pageNum: 10},
      getUploadList: [],
      selectedList: [],
      hasSelectItem: false
    }
  },
  created () {
    this.get()
  },
  filters: {
    timeShow: timeFormat
  },
  methods: {
    jump (val) {
      this.$router.push('/docDetail/' + val)
    },
    jumped (val) {
      this.$router.push('/memberCenter/memberDocUpload/' + val)
    },
    get () {
      docService.GetUploadList(this.pageData)
      .then(response => {
        this.getUploadList = response.data
        this.total = response.count
        if (response.count > this.pageData.pageNum) {
          this.pageShow = true
        } else {
          this.pageShow = false
        }
        console.log('getUploadList')
        console.log(response)
      })
    },
    handleClick (newIndex) {
      this.pageData.page = newIndex
      this.get()
    },
    selection (selectedRowsIndex) {
      for (var j = 0; j < this.getUploadList.length; j++) {
        this.getUploadList[j].selected = false
      }
      if (selectedRowsIndex.length > 0) {
        this.hasSelectItem = true
        for (var i = 0; i < selectedRowsIndex.length; i++) {
          this.getUploadList[selectedRowsIndex[i]].selected = true
          console.log('this.getUploadList2222222')
          console.log(this.getUploadList)
        }
      } else {
        this.hasSelectItem = false
      }
    },
    allDelete () {
      this.selectedList = []
      if (this.hasSelectItem) {
        for (var i = 0; i < this.getUploadList.length; i++) {
          if (this.getUploadList[i].selected === true) {
            this.selectedList.push(this.getUploadList[i].id)
          }
        }
        this.open(this.selectedList)
      }
      this.$refs.table.unSelectAll()
    },
    open (e, i) {
      this.dialog = true
      this.selectedList = e
      this.getUploadList[i].selected = true
      this.hasSelectItem = true
      console.log(this.getUploadList)
    },
    close (e, state) {
      this.dialog = false
      if (state === 'sure') {
        docService.DeleteDoc({idList: e})
        .then(response => {
//        this.getUploadList.length--
//        if (this.getUploadList.length % this.pageSize === 0 && this.current > 1) {
//          this.current = this.current - 1
//        }
          console.log('DeleteDoc')
          console.log(response)
          this.pageData.page = 1
          this.get()
        })
        this.$refs.table.unSelectAll()
      }
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
.upload_msged{
  cursor: pointer;
}
.uploadDocList{
  min-height: 536px;
}
.docUploadList .upload_msg{
  width: 604px;
}
.mu-td .upload_do{
  padding-left: 0;
}
.docUploadList .upload_contant{
  width: 408px;
}
.mu-dialog-body  h5{
  font-size: 22px;
  color: #2d2d2d;
}
.mu-dialog{
  width: 450px !important;
}
.mu-dialog .nosure{
  margin-left: 200px;
}
.mu-dialog-body  p{
  font-size: 16px;
  color: #444;
  margin: 15px 0 20px 0;
}
.uploat_time span{
  text-decoration: none !important;
}
.upload_data{
  width: 146px;
}
.my_upload_state{
  width: 118px;
}
</style>
