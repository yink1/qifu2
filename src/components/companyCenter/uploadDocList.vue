<template>
  <div class="uploadDocList uploadList">
    <div class="blankCon companyListBlank" v-if="getUploadList.length < 1">
      <img src="../../../static/image/icon/blank.png"/>
      <h5>空空如也,去看看别的吧!</h5>
    </div>
    <a href="javascript:;" :class="{uplod_delate: true, uplod_delate_allow:hasSelectItem}" @click='allDelete' v-if="getUploadList.length >= 1">删除</a>
    <div class="uoload_list" v-if="getUploadList.length >= 1">
      <mu-table multiSelectable enableSelectAll multiSelectabl='true' ref="table" @rowSelection='selection'>
        <mu-thead>
          <mu-tr>
            <mu-th class="upload_msg">已上传的资料</mu-th>
            <mu-th class='upload_link relative_link'>相关链接</mu-th>
            <mu-th class='my_upload_state'>上传状态</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(uploadDoc, index) in getUploadList" :selected="uploadDoc.selected">
            <mu-td class="upload_msg upload_msged" v-on:click.stop='jump(uploadDoc.id)'>
              <div :class="{ type_ppt: uploadDoc.format == 'ppt' || uploadDoc.format == 'pptx', type_txt: uploadDoc.format == 'txt', type_word: uploadDoc.format == 'doc' || uploadDoc.format == 'docx', type_excel: uploadDoc.format == 'xls' || uploadDoc.format == 'xlsx', type_pdf: uploadDoc.format == 'pdf', upload_contant: true,upload_info: true}">
                <span>{{uploadDoc.title}}</span>
              </div>
              <div class="upload_info upload_do">
                <a href="javascript:;"  class="upload_edit" v-on:click.stop='jumped(uploadDoc.id)'>编辑</a>
                <a href="javascript:;"  class="delete_single" v-on:click.stop='open(uploadDoc.id, index)'>删除</a>
              </div>
            </mu-td>
            <mu-td class="upload_link">
              <input class='relalink' :value='uploadDoc.id | relalink'/>
              <a href="javascript:;"  class="delete_single" v-on:click.stop='copy(index)'>复制链接</a>
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
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" v-if='pageShow'></mu-pagination>
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
import * as constDoc from '@/services/const'
import {showNotice} from '@/common/noticeAlertFun'
export default {
  data () {
    return {
      total: 50,
      current: 1,
      dialog: false,
      pageShow: false,
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
    relalink (id) {
      var linkAll = constDoc.UPLOAD + '#/companyCenter/docManagment/' + id
      return linkAll
    }
  },
  methods: {
    jump (val) {
      this.$router.push('/docDetail/' + val)
    },
    jumped (val) {
      this.$router.push('/companyCenter/docManagment/' + val)
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
      console.log(5656, this.getUploadList)
    },
    close (e, state) {
      this.dialog = false
      console.log(e)
      if (state === 'sure') {
        docService.DeleteDoc({idList: e})
        .then(response => {
          console.log('DeleteDoc')
          console.log(response)
          this.pageData.page = 1
          this.get()
        })
        this.$refs.table.unSelectAll()
      }
    },
    copy (index) {
      var url = document.getElementsByClassName('relalink')[index]
      url.select()
      document.execCommand('copy')
      this.getUploadList[index].selected = true
      this.hasSelectItem = true
      showNotice('复制成功')
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
  .upload_msged:hover{
    cursor:pointer
  }
.uplod_delate{
  display: block;
  font-size: 12px;
  color: #898989;
  margin: 20px 0 10px 24px;
  line-height: 24px;
  padding-left:28px ;
  cursor: default;
  background: url(../../../static/image/delete_unclick.png) 3px center no-repeat;
}
.uplod_delate_allow{
  background: url(../../../static/image/delete_click.png) 3px center no-repeat;
  color: #666;
  cursor: pointer;
}
.check_sum{
  padding-left: 24px;
}
.uoload_list .mu-table{
  background: none;
}
.uoload_list .mu-th-wrapper{
  color: #898989;
}
.uoload_list .mu-td{
  font-size: 14px;
  color: #444; 
  overflow: hidden;
}
.upload_msg{
  width: 536px;
}
.upload_contant{
  width: 340px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
.upload_list .mu-td span{
  margin-left: 10px;
}
.upload_info a{
  font-size: 14px;
  color: #444;
}
.upload_info{
  float: left;
  padding-left:30px;
}
.mu-tr:hover .upload_do{
  display: block;
}
.upload_do a,.upload_link a{
  color: #444;
  font-size: 12px;
  padding-left: 22px;
  line-height: 24px;
  display: block;
  float: left;
}
.upload_do,.upload_link a{
  margin-left: 24px;
  display: none;
}
.upload_edit{
  background: url(../../../static/image/edit.png) left center no-repeat;
}
.upload_edit:hover{
  background: url(../../../static/image/icon/edit_color.png) left center no-repeat;
  color: #ffaa00;
}
.delete_single{
  background: url(../../../static/image/delete_click.png) left center no-repeat;
  margin-left: 24px;
  cursor: pointer;
}
.delete_single:hover{
  background: url(../../../static/image/delete_active.png) left center no-repeat;
  color: #ffaa00;
}
.upload_link a{
  background: url(../../../static/image/icon/copy_unclick.png) left center no-repeat;
}
.upload_link a:hover{
  background: url(../../../static/image/icon/copy_click.png) left center no-repeat;
  color: #ffaa00;
}
.mu-tr .upload_link input,.mu-tr .upload_link span{
  width: 180px;
  overflow: hidden;
  background: none;
  border:none;
  text-decoration: underline;
}
.mu-tr .upload_link input,.mu-tr:hover .upload_link a,.mu-tr .upload_link span{
  display: block;
  float: left;
}
/**/
.mu-tr .relative_link,.uploadList .upload_link{
  padding:0px;
}
.uploadList .upload_msg{
  width: 466px;
}
.uploadList .upload_contant{
  width: 270px;
}
.uploadList .upload_link a{
  width: 80px;
}
/*分页器*/
.pagination{
  float: right;
  margin: 20px 0 0 0;
}
.mu-pagination-item-wrapper{
  color: #083C6F;
}
.mu-pagination-item.active .mu-pagination-item-wrapper span{
  color: #fff;
}
.pagination .active{
  text-decoration: none;
}
/*判断文档类型图片*/
.type_ppt{background: url(../../../static/image/ppt_icon.png) no-repeat left 3px;}
.type_excel{background: url(../../../static/image/excel.png) no-repeat left 3px;}
.type_txt{background: url(../../../static/image/txt_icon.png) no-repeat left 3px;}
.type_pdf{background: url(../../../static/image/pdf_icon.png) no-repeat left 3px;}
.type_word{background: url(../../../static/image/word_icon.png) no-repeat left 3px;}
</style>
