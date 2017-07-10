<template>
  <div class="filein_upfile upload_baidu">         
    <mu-raised-button v-show="showBtn" label="选择文件" class="demo-raised-button chan_file_btn" @click="chanFile" id="fileDoc"/>
    <!--<mu-flat-button v-show="!showBtn" label="" class="demo-flat-button" @click="chanFile" >
      <img src="../../../static/image/ppt.png" alt="" />
    </mu-flat-button>-->
     <a href="javascript:;" class="filein_pt filein_pt1" @click="chanFile"  v-show="!showBtn" ><span></span></a>
    <input type="file"  tabIndex="-1" v-show="false" id="uploadFilebig" class="file-button" @change="uploadDoc" :accept="accept"/> 
    <!--<div class="file_tit" v-if="documentId === null || documentId === ''">                                                          
      <p v-show="showBtn">将文档拖拽到此处上传</p>                                                                                 
      <p v-show="showBtn">支持doc\docx\xls\xlsx\ppt\pptx\pdf等格式类型</p>                                                      
    </div>-->
    <div class="file_success" v-show="showBtn">                                                                          
      <p>{{ fileName }}</p>
      <p v-show="showBtn">支持doc\docx\xls\xlsx\ppt\pptx\pdf等格式类型</p>    
      <mu-linear-progress v-show="showBtn" :mode="modeType" :value="value"/>  
    </div>      
  </div>
</template>
<script>
  import docService from '@/services/docService'
  import {showNotice} from '@/common/noticeAlertFun'
  export default {
//  props: ['DocId'],
    data () {
      return {
        documentId: null,
        format: null,
        fileName: null,
        modeType: 'determinate',
        value: 0
      }
    },
    props: {
      DocId: {
        type: String,
        default: ''
      },
      showBtn: {
        type: Boolean,
        default: true
      },
      name: {
        type: String,
        default: ''
      },
      fileFormat: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf'
      }
    },
    created () {
      this.get()
    },
    mounted () {
      this.value = 0
    },
    computed: {
    },
    watch: {
      DocId () {
        this.get()
      }
    },
    methods: {
      get () {
        if (this.DocId === '') {
          this.documentId = null
          this.format = null
          this.fileName = null
          this.value = 0
          return ''
        }
        console.log('docId')
        console.log(this.DocId)
        docService.GetDocInfo({id: this.DocId})
        .then(response => {
          console.log('GetDocInfo response')
          console.log(response)
          this.fileName = response.data.title + '.' + response.data.format
          this.documentId = response.data.documentId
          this.format = response.data.format
          this.value = 100
        })
      },
      chanFile () {
        document.getElementById('uploadFilebig').click()
      },
      uploadDoc () {
        let _this = this
        var fd = new FormData()
        var coverFile = document.getElementById('uploadFilebig').files[0]
        var docSize = coverFile.size
        var maxSize = 1024 * 1024 * 100
        if (docSize > maxSize) {
          showNotice('文件大小不能超过100MB!')
          return false
        }
        if (coverFile) {
          if (coverFile.name.toString().indexOf('.') < 0) {
            showNotice('文件格式不正确！')
            return ''
          }
          var name = coverFile.name.split('.')
          var nameLength = name.length
          if (_this.fileFormat === true) {
            if (name[nameLength - 1] !== 'ppt' && name[nameLength - 1] !== 'pptx') {
              showNotice('文件格式不支持！')
              return ''
            }
          } else {
            if (name[nameLength - 1] !== 'docx' && name[nameLength - 1] !== 'doc' && name[nameLength - 1] !== 'ppt' && name[nameLength - 1] !== 'pptx' && name[nameLength - 1] !== 'xls' && name[nameLength - 1] !== 'xlsx' && name[nameLength - 1] !== 'pdf') {
              showNotice('文件格式不支持！')
              return ''
            }
          }
          var nameTrue = ''
          var arr = []
          for (var i = 0; i < name.length - 1; i++) {
            arr.push(name[i])
            nameTrue = arr.join('.')
          }
          console.log(coverFile)
          console.log(_this.DocId)
          _this.modeType = 'indeterminate'
          fd.append('myDocbig', coverFile)
          fd.append('docId', _this.DocId)
          _this.fileName = coverFile.name
          docService.UploadDoc(fd).then(function (response) {
            console.log(response.data.documentId)
            console.log(response.data.format)
            _this.modeType = 'determinate'
            _this.value = 100
            _this.$emit('setUploadedFileInfo', response, nameTrue)
          }, function (err) {
            console.log(err)
          }).then(response => {
            console.log(1, response)
          })
        }
      }
    },
    components: {
    }
  }
</script>
