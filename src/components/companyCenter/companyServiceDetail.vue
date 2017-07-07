<template>
  <div v-bind:class="{serviceHasContent: detailData.type !== '', service_list_active: !toggleClass}" class="togglePic service_list_box service_cetail_box">
    <a href="javascript:;" class="poa replace_ment" @click="changeDetail" v-if="detailData.type !== ''">替换内容</a>
    <ul class="service_list service_detail">
      <li :class="['layout_self', {layoutAuto: detailData.type !== ''}]">
        <img :src="detailData.content" alt="" v-if="detailData.type == 'pic'"/>
        <img src="../../../static/image/service_vice.gif" alt="" v-if="detailData.type == 'video' && detailData.content != '' && detailData.content == 'compute'"/>
        <img src="../../../static/image/videoTrans.png" alt="" v-if="detailData.type == 'video' && detailData.content != '' && detailData.content != 'compute' && detailData.status == 202"/>
        <img src="../../../static/image/videoDone.png" alt="" v-if="detailData.type == 'video' && detailData.content != '' && detailData.content != 'compute' && detailData.status == 200"/>
        <img src="../../../static/image/videoError.jpg" alt="" v-if="detailData.type == 'video' && detailData.content != '' && detailData.content != 'compute' && detailData.status == 205"/>
        <quillEditor v-if="detailData.type == 'txt'" v-model="detailData.content" :options="editorOption">
        </quillEditor>
        <p class="filein_upfile" v-if="detailData.type == ''">
          <a href="javascript:;" class="filein_ppt filein_ppt1" :id='detailData.imgBtnId'><span><formDataupload :uptoken="uploadToken" :formId="fromId" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload></span></a>
          <a href="javascript:;" class="filein_img filein_img1" :id="'videoUploadBtn' + detailIndex" @click='videoUploadBtnClick'><span></span></a>
          <a href="javascript:;" class="filein_video filein_video1" @click='setTxtDetail'><span></span></a>
          <!--<upload :browse_button='detailData.imgBtnId' @setUploadedFileInfo="setUploadedFileInfo">
          </upload>-->
        </p>
        <!--<img class="upfile_img" src="../../../static/image/forward.jpg" width="100%" height="100%" />-->
      </li>
      <div class="user_funbtn" @mouseenter="enter" @mouseleave="leave">
      <mu-list-item title="删除" @click="editDetailData('delete')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/delete.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="上移" @click="editDetailData('up')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/up.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="下移" @click="editDetailData('down')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/down.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="更多详情" @click="editDetailData('add')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/add.png"/></mu-avatar>
      </mu-list-item>
    </div>
    </ul>    
    <div></div>
  </div>
</template>
<script>
  import upload from '@/components/shared/Upload'
  import { quillEditor } from 'vue-quill-editor'
  import formDataupload from '@/components/shared/FormDataUpload'
  import qiniuService from '@/services/qiniuService'
  // import { uploadVideo } from '@/../static/tencentUpload.js'
  export default {
    props: ['detailData', 'detailIndex'],
    data () {
      return {
        toggleClass: true,
        uploadToken: '',
        fromId: 'uploadForm' + this.detailIndex,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
              [{'direction': 'rtl'}],                         // text direction
              [{'color': []}, {'background': []}],          // dropdown with defaults from theme
              [{'align': []}],
              ['clean']                                         // remove formatting button
            ]
          }
        }
      }
    },
    components: {
      upload,
      quillEditor,
      formDataupload
    },
    created () {
      this.getQiniuToken()
    },
    mounted () {
      // uploadVideo('videoUploadBtn' + this.detailIndex, true, true, 'vodId')
    },
    methods: {
      getQiniuToken () {
        qiniuService.getQiniuToken()
        .then(response => {
          this.uploadToken = response.uptoken
        })
      },
      enter () {
        this.toggleClass = false
      },
      leave () {
        this.toggleClass = true
      },
      setUploadedFileInfo (buttonId, fileName, restUrl) {
        this.detailData.type = 'pic'
        this.detailData.content = restUrl
        this.detailData.status = 200
      },
      editDetailData (operate) {
        this.$emit('editDetailData', operate, this.detailIndex)
      },
      setTxtDetail () {
        this.detailData.type = 'txt'
      },
      videoUploadBtnClick () {
        this.$emit('videoUploadBtnClick', this.detailIndex)
      },
      changeDetail () {
        this.detailData.type = ''
        this.detailData.content = ''
        this.detailData.status = 0
      }
    }
  }
</script>
<style>
.service_detail .layout_self {
  width:856px;
  height: 232px;
}
.filein_upfile {
  text-align: center;
  margin-top: 55px;
  position: relative;
  width: 100%;
}
.filein_upfile a {
  position:relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
.service_detail .filein_upfile span {
  display: none;
  position:absolute;
  left: 0;
  top:0;
  width: 100%;
  background: rgba(255,255,255,0.2);
}
.filein_upfile .filein_ppt {
  background-image:url(../../../static/image/uplod_imgblue.png);
  margin-right: 40px;
}
.filein_upfile .filein_img {
  background-image: url(../../../static/image/video.png);
  margin-right: 40px;
}
.filein_upfile .filein_video {
  background: url(../../../static/image/txt.png);
}
.filein_upfile .filein_pt {
  background-image:url(../../../static/image/ppt.png);
  margin-right: 40px;
}
.filein_upfile a:hover span {
  display: block;
}
.service_detail .upfile_img {
  position:absolute;
}
.service_cetail_box {
  height: auto !important;
  display: inline-block;
  padding:0 !important;
  position: relative;
}
.service_detail .layout_self {
  width:880px;
  height: 160px;
}
.service_cetail_box {
  margin:0 !important;
  padding: 0 !important;
}
.service_cetail_box .service_detail .layout_self {
  margin: 0;
  border:none;
}
.service_detail .user_funbtn {
  height: 160px;
}
.service_cetail_box .service_list .layout_self {
  width: 880px;
}
.service_cetail_box .poa {
  z-index: 9;
}
.layoutAuto {
  height: auto !important;
  min-height: 160px;
}
.service_list_box .poa {
  display: none;
}
.service_list_box:hover .poa {
  display: block;
}
.service_list_box .ql-toolbar.ql-snow .ql-formats {
  display: block;
  float: left;
}
.service_list_box .quill-editor {
  width:100%;
}
.service_list_box .quill-editor .ql-editor,.quill-editor .ql-container {
  height: 160px;
}
</style>
