<template>
  <div class="uploadDocList requireList">
    <div class="blankCon companyListBlank" v-if="requirementList.length < 1">
      <img src="../../../static/image/icon/blank.png"/>
      <h5>空空如也,去看看别的吧!</h5>
    </div>
    <div class="uoload_list noselect"  v-else>
      <mu-table multiSelectable enableSelectAll :showCheckbox='false' ref="table">
        <mu-thead>
          <mu-tr>
            <mu-th class="uploadDate">日期</mu-th>
            <mu-th class="requireUser">提出人</mu-th>
            <mu-th class="requireCompany">公司</mu-th>
            <mu-th class="requirePhone">联系方式</mu-th>
            <mu-th class="requireName">服务名称</mu-th>
            <mu-th class="requireContent">需求内容</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="require in requirementList">
            <mu-td>
              <div>
                {{require.startDate | timeShow}}
              </div>
            </mu-td>
            <mu-td>
              <div>
                {{require.authorName}}
              </div>
            </mu-td>
            <mu-td>
              <div>
                {{require.authorCompanyName}}
              </div>
            </mu-td>
            <mu-td>
              <div>
                {{require.authorPhoneNumber}}
              </div>
            </mu-td>
            <mu-td>
              <div v-if='require.assignedService !== ""'>
                {{require.assignedService}}
              </div>
              <div class='company_repeat' v-else>
                                        平台转发
              </div>
            </mu-td>
            <mu-td class="requireContent">
              <div :class='{company_repeat: require.assignedService === ""}'>
                {{require.description}}
              </div>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="pagination">
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" v-if='pageShow'></mu-pagination>
    </div>
  </div>
</template>
<script>
import requirementService from '@/services/requirementService'
import {timeFormat} from '@/common/common'
export default {
  data () {
    return {
      total: 50,
      current: 1,
      requirementList: [],
      pageData: {page: 1, pageNum: 10},
      pageShow: false
    }
  },
  created () {
    this.get()
  },
  filters: {
    timeShow: timeFormat
  },
  methods: {
    get () {
      requirementService.getRequirementList(this.pageData)
      .then(response => {
        this.requirementList = response.data
        this.total = response.count
        if (response.count > this.pageData.pageNum) {
          this.pageShow = true
        } else {
          this.pageShow = false
        }
        console.log('requirementList')
        console.log(this.requirementList)
      })
    },
    handleClick (newIndex) {
      this.pageData.page = newIndex
      this.get()
    }
  }
}
</script>
<style>
.mu-td>div{
  overflow: hidden;
}
.requireList .uoload_list .mu-td{
  font-size: 12px;
}
.requireContent div{
  font-size: 14px;
}
.requireList .mu-td,.requireList .mu-th{
  padding-left: 24px;
  padding-right: 0;
}
.noselect{
  padding-top: 10px;
}
.uploadDate{
  width: 104px;
}
.requireUser{
  width: 84px;
}
.requireCompany{
  width:154px;
}
.requirePhone,.requireName{
  width: 114px;
}
div .uoload_list .requireContent{
  width: 370px;
  padding-right: 24px !important;
  color: #083c6f;
}
.company_repeat{
  color: #666 !important;
}
</style>
