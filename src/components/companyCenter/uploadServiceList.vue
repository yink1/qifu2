<template>
  <div class="uploadDocList uploadServiceList uploadDocListed">
    <div class="blankCon companyListBlank" v-if="getUploadServiceList.length < 1">
      <img src="../../../static/image/icon/blank.png"/>
      <h5>空空如也,去看看别的吧!</h5>
    </div>
    <a href="javascript:;" :class="{uplod_delate: true, uplod_delate_allow:hasSelectItem}" @click='allDelete' v-if="getUploadServiceList.length>=1">删除</a>
    <div class="uoload_list" v-if="getUploadServiceList.length >= 1">
      <mu-table multiSelectable enableSelectAll multiSelectabl='true' ref="table" @rowSelection='selection'>
        <mu-thead>
          <mu-tr>
            <mu-th class="upload_msg">已上传的服务</mu-th>
            <mu-th class='upload_link'>相关链接</mu-th>
            <mu-th class='my_upload_state'>上传状态</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(uploadServiceList, index) in getUploadServiceList" :selected="uploadServiceList.selected">
            <mu-td class="upload_msg upload_msged" v-on:click.stop='jump(uploadServiceList.ServiceId)'>
              <div class="upload_contant upload_info">
                <span>{{uploadServiceList.ServiceName}}</span>
              </div>
              <div class="upload_info upload_do">
               <router-link :to="{name: 'serviceManagment',params: { id: uploadServiceList.ServiceId }}" class="upload_edit">编辑</router-link>
               <!--<a href="javascript:;" class="upload_edit" v-on:click.stop="jump(uploadServiceList.ServiceId)">编辑</a>-->
                <a href="javascript:;" class="delete_single" v-on:click.stop="open(uploadServiceList.ServiceId,index)">删除</a>
              </div>
            </mu-td>
            <mu-td class="upload_link">
              <input class='relalink' :value='uploadServiceList.ServiceId | relalink'/>
              <a class="delete_single" v-on:click.stop='copy(index)'>复制链接</a>
            </mu-td>
            <mu-td class='upload_state'>
              <div>
                {{uploadServiceList.status}}
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
import service from '@/services/service'
import * as constService from '@/services/const'
import {showNotice} from '@/common/noticeAlertFun'
export default {
  data () {
    return {
      total: 55,
      current: 1,
      dialog: false,
      pageShow: false,
      pageData: {page: 1, pageNum: 10},
      getUploadServiceList: [],
      selectedList: [],
      hasSelectItem: false
    }
  },
  filters: {
    relalink (id) {
      var linkAll = constService.UPLOAD + '#/companyCenter/serviceManagment/' + id
      return linkAll
    }
  },
  created () {
    this.get()
  },
  methods: {
    jump (val) {
      this.$router.push('/serviceDetail/' + val)
    },
    get () {
      service.getUploadServiceList(this.pageData)
      .then(response => {
        this.getUploadServiceList = response.data
        console.log(this.total)
        this.total = response.count
        if (response.count > this.pageData.pageNum) {
          this.total = response.count
          this.pageShow = true
        } else {
          this.pageShow = false
        }
        console.log('getUploadServiceList')
        console.log(response)
      })
    },
    handleClick (newIndex) {
      this.pageData.page = newIndex
      this.get()
    },
    selection (selectedRowsIndex) {
      for (var i = 0; i < this.getUploadServiceList.length; i++) {
        this.getUploadServiceList[i].selected = false
      }
      if (selectedRowsIndex.length > 0) {
        this.hasSelectItem = true
        for (var j = 0; j < selectedRowsIndex.length; j++) {
          this.getUploadServiceList[selectedRowsIndex[j]].selected = true
          console.log(this.getUploadServiceList)
        }
      } else {
        this.hasSelectItem = false
        console.log(this.getUploadServiceList)
      }
    },
    allDelete () {
      this.selectedList = []
      if (this.hasSelectItem) {
        for (var i = 0; i < this.getUploadServiceList.length; i++) {
          if (this.getUploadServiceList[i].selected === true) {
            this.selectedList.push(this.getUploadServiceList[i].ServiceId)
          }
        }
        this.open(this.selectedList)
      }
      this.$refs.table.unSelectAll()
    },
    open (e, i) {
      this.dialog = true
      this.selectedList = e
      this.getUploadServiceList[i].selected = true
      this.hasSelectItem = true
    },
    close (e, state) {
      this.dialog = false
      if (state === 'sure') {
        service.deleteService({idList: e})
        .then(response => {
          console.log('deleteService')
          console.log(response)
          this.pageData.page = 1
          this.get()
        })
        this.$refs.table.unSelectAll()
      }
    },
    copy (index) {
      this.hasSelectItem = true
      var url = document.getElementsByClassName('relalink')[index]
      url.select()
      document.execCommand('copy')
      this.getUploadServiceList[index].selected = true
      this.hasSelectItem = true
      showNotice('复制成功')
    }
  }
}
</script>
<style>
  .uploadDocListed .upload_msg{
  width: 466px;
}
  .upload_msged:hover{
    cursor:pointer
  }
.uploadServiceList .upload_info{
  padding-left:0;
}
.uploadDocListed .upload_contant{
  width: 270px;
}
.companyListBlank{
  height: 300px;
}
.uploadDocListed .upload_link{
  padding-left: 0px;
}
.uploadDocListed .upload_link{
  padding:0px;
}
</style>
