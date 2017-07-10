<template>
  <div class="docUploadManagment">
    <navigation></navigation>
    <div class="bookma_cont">
      <div class="bookma_right enter_center">
        <div class="comp_upload">
          <h4>1、上传文档</h4>
          <div class="chan_file">       
            <uploadBaidu :DocId="addDocData.id" :name="addDocData.title + '.' + addDocData.format" @setUploadedFileInfo="setUploadedFileInfo"></uploadBaidu>
          </div>
          <h4>2、完善资料</h4>
          <ul class="info_list">
            <li class="cl"><span class="info_tit"><i class="color_red">* </i>案例名称</span>
              <mu-text-field hintText="案例名称" v-model='addDocData.title' :errorText='errorOfTitle'/>
            </li>
            <li class="cl"><span class="info_tit">简介</span>
              <mu-text-field hintText="文档简介" multiLine :rows="3" :rowsMax="3" v-model='addDocData.introduce' :errorText='errorOfIntroduce'/>
            </li>
            <li class="cl tit_li"><span class="info_tit">设定标签</span>
              <div class="info_service">
                <serviceLabelFilter @setSelectService="getServiceInfo" @getServiceInfo="onServiceInfo" :getSelectList="addDocData.serviceIdList" :multiCheck="true" :includeAllOption="false" :checkPop="true"></serviceLabelFilter>
              </div>
            </li>
            <li class="info_check cl">
              <mu-checkbox v-if="userLoginIsCompanyUser === true" label="设为服务项目所对应案例（可多选）" :value='addDocData.checkboxVal' class="demo-checkbox" />
            </li>
            <li class="price_num cl"><span class="info_tit">设定价格</span>
              <mu-text-field hintText="输入财富值的数字" :errorText='errorOfScore' class="info_text" v-model='addDocData.score'/><em>财富值&nbsp;&nbsp;&nbsp;&nbsp;（0默认为免费）</em></li>
            <li class="bookma_btn cl">
              <mu-raised-button label="确认提交" @click="submitDoc" class="demo-raised-button" primary/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import navigation from '@/components/shared/navigation'
  import docService from '@/services/docService'
  import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
  import uploadBaidu from '@/components/shared/uploadBaidu'
  import { required, maxLength, numeric, minLength } from 'vuelidate/lib/validators'
  import {showNotice} from '@/common/noticeAlertFun'
  import { mapGetters } from 'vuex'
  import * as types from '@/store/types'
  export default {
    data () {
      return {
        addDocData: {
          id: '',
          title: '',
          introduce: '',
          labelId: '',
          documentId: '',
          format: '',
          score: 0,
          serviceIdList: [],
          checkboxVal: false
        }
      }
    },
    props: {
      docId: {
        type: String,
        default: ''
      }
    },
    created () {
      this.getData()
    },
    mounted () {
      this.value = 50
    },
    computed: {
      ...mapGetters(
        {
          userLoginIsCompanyUser: [types.IS_COMPANY_USER]
        }
      ),
      errorOfTitle () {
        if (!this.$v.addDocData.title.required) {
          return '请输入案例名称！'
        } else if (!this.$v.addDocData.title.maxLength) {
          return '输入的名称字数过多！'
        }
        return ''
      },
      errorOfScore () {
        if (this.addDocData.score === '') {
          return '请输入数字！'
        } else if (this.addDocData.score > 2147483647) {
          return '请输入正确价格！'
        } else if (this.addDocData.score % 1 !== 0 && !this.$v.addDocData.score.numeric) {
          return '请输入正确价格！'
        }
        return ''
      },
      errorOfIntroduce () {
        if (!this.$v.addDocData.introduce.required) {
          return '请输入简介！'
        }
        return ''
      }
    },
    methods: {
      getData () {
        let _this = this
        if (_this.userLoginIsCompanyUser) {
          this.addDocData.checkboxVal = true
        }
        if (_this.docId === '') {
          this.setUploadedNullInfo()
          return ''
        }
//      _this.docId 'e509a0ee-4161-4a21-8f80-12553266f8ec'
        docService.GetDocInfo({id: _this.docId})
        .then(response => {
          console.log('GetDocInfo response')
          console.log(response)
          console.log('serviceIdList response')
          console.log(response.data.serviceIdList)
//        点赞数赋值
          _this.addDocData.title = response.data.title
          _this.addDocData.introduce = response.data.introduce
          _this.addDocData.labelId = response.data.labelId
          _this.addDocData.documentId = response.data.documentId
          _this.addDocData.format = response.data.format
          _this.addDocData.score = response.data.score
          _this.addDocData.id = response.data.id
          _this.addDocData.serviceIdList = response.data.serviceIdList
        })
      },
      getServiceInfo (serviceList) {
        let _this = this
        _this.addDocData.serviceIdList = []
//      console.log('list')
//      console.log(serviceList)
        var i = 0
        serviceList.filter(function (item) {
          _this.addDocData.labelId = serviceList[i].labelId
          _this.addDocData.serviceIdList.push(
            serviceList[i].ServiceId
          )
          i++
        })
        console.log('_this.addDocData.serviceIdList')
        console.log(_this.addDocData.serviceIdList)
      },
      onServiceInfo (childLabelId, chooseArea) {
        console.log('docList onServiceId' + childLabelId + ' ' + chooseArea)
        if (this.addDocData.labelId !== childLabelId) {
          this.addDocData.labelId = childLabelId
        }
        // this.get(this.showData)
      },
      setUploadedFileInfo (val, name) {
        this.addDocData.documentId = val.data.documentId
        this.addDocData.format = val.data.format
        this.addDocData.id = val.data.id
        this.addDocData.title = name
      },
      setUploadedNullInfo () {
        this.addDocData.title = ''
        this.addDocData.introduce = ''
        this.addDocData.labelId = ''
        this.addDocData.documentId = ''
        this.addDocData.format = ''
        this.addDocData.score = 0
        this.addDocData.id = ''
        this.addDocData.serviceIdList = []
      },
      submitDoc () {
        if (this.addDocData.documentId === '' && this.addDocData.id === '') {
          showNotice('请选择您要上传的文件！')
          return ''
        }
        if (this.addDocData.title === '') {
          showNotice('请输入案例名称！！')
          return ''
        }
        if (this.addDocData.introduce === '') {
          showNotice('请输入简介！')
          return ''
        }
        if (this.addDocData.labelId < 7) {
          showNotice('请设定标签！')
          return ''
        }
        if (this.addDocData.score === '') {
          showNotice('请输入正确价格！')
          return ''
        }
        var submitDocData = {
          id: this.addDocData.id !== '' ? this.addDocData.id : this.docId,
          title: this.addDocData.title,
          introduce: this.addDocData.introduce,
          labelId: this.addDocData.labelId,
          documentId: this.addDocData.documentId,
          format: this.addDocData.format,
          score: this.addDocData.score !== '' ? this.addDocData.score : 0,
          serviceIdList: this.checkboxVal === true ? this.addDocData.serviceIdList : null
//        this.addDocData.checkboxVal === true ?
        }
        console.log('submitDoc submitDocData')
        console.log(submitDocData)
        docService.EditDocInfo(submitDocData)
          .then(response => {
            console.log('submitDoc response')
            console.log(response)
            if (response.msg === 'ok') {
              showNotice('提交成功！')
              this.setUploadedNullInfo()
            }
          })
      }
    },
    watch: {
      docId () {
        this.getData()
      }
    },
    beforeRouteEnter (to, from, next) {
      // 这里判断是否重复打开的同一服务页
      next(vm => {
        if (to.params.id !== undefined) {
          if (to.params.id !== vm.addDocData.id) {
            if (to.params.id) {
              vm.addDocData.id = to.params.id
            } else {
              vm.addDocData.id = ''
            }
            vm.getData()
          }
        }
      })
    },
    validations: {
      addDocData: {
        title: {
          required,
          maxLength: maxLength(256)
        },
        documentId: {
          required
        },
        score: {
          numeric,
          minLength: minLength(1)
        },
        introduce: {
          required
        }
      }
    },
    components: {
      navigation,
      serviceLabelFilter,
      uploadBaidu
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cl:after,.clearfix:after{
  content:".";display:block;height:0;clear:both;visibility:hidden;
}
.cl:before, .cl:after{ 
  content: ""; display: table; 
}
.cl:after{ 
  clear: both; 
}
.cl{ 
  zoom: 1;
}
.tit_li{
  margin-bottom: 20px;
}
.docUploadManagment{
  margin-bottom: 50px;
}
.bookma_cont .filein_upfile span{
  display:block;
}
.chan_file .mu-raised-button {
  background: #083C6F;
  color: #fff;
}
.chan_file .mu-linear-progress {
  width: 430px;
  margin:0 auto;
  background: #bcbcbc;
  margin-top:30px;
}
.chan_file .mu-linear-progress-determinate {
  background: #FFAA00;
}
.color_red {
  color:#FF1919;
}
.chan_file p {
  width:430px;
  text-align: center;
  margin:0 auto;
}
.bookma_cont {
  width:940px;
  margin:0 auto;
  background: #fff;
  overflow: hidden;
}
.comp_upload h4 {
  font-size: 16px;
  color:#2d2d2d;
  padding:20px 0 20px 140px;
}
.comp_upload .chan_file {
  width:500px;
  height: 200px;
  border:2px dashed #ededed;
  background:#f4f9ff;
  margin:0 auto;
  text-align: center;
}
.chan_file .chan_file_btn {
  margin:30px auto;
  width: 116px;
}
.chan_file p {
  font-size: 14px;
  color:#666;
}
.info_list {
  padding:0 140px;
}
.info_list .info_tit {
  float: left;
  width: 140px;
  margin-right: 40px;
}
.info_list .mu-text-field {
  width: 480px;
}
.info_service {
  float:left;
}
.info_list .info_text {
  width:290px;
}
.info_list em {
  font-style: normal;
  font-size: 14px;
  color:#666;
}
.bookma_btn {
  text-align: right;
  padding-bottom: 40px;
  clear: both;
}
.bookma_btn .mu-raised-button {
  background:#083C6F;
}
.info_list .info_service {
  background:#f4f4f4;
}
.info_check {
  padding-left:180px;
}
.info_check .mu-checkbox-label {
  color: #FFAA00;
}
.docUploadManagment .info_list .mu-raised-button{
  float: none;
}
.sele_list_bottom{
  float: left;
}
.bookma_btn .mu-raised-button{
  margin-right: 0;
}
</style>
