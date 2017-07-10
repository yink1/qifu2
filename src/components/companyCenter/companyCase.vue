<template>
  <div>
    <!--<h2 class="service_sele">相关案例</h2>-->
  <div class="data_pagecont">
    <ul class="data_homepage" @click.stop="data_homepage1">
      <li class="datpage_list demo-paper" :zDepth="2" :class="{serviceHasContent: docList[docIndex].title != '', service_list_active: !toggleClass }">
        <mu-float-button icon="add"  class="demo-float-button" @click.stop="case_time"/>
        <div class="case_list" v-if="case_list">
          <p @click.stop="setDocData(index)" v-for="uploadDoc,index in uploadDocList.data"><a :class="{ type_ppt: uploadDoc.format == 'ppt' || uploadDoc.format == 'pptx', type_txt: uploadDoc.format == 'txt', type_word: uploadDoc.format == 'doc' || uploadDoc.format == 'docx', type_excel: uploadDoc.format == 'xls' || uploadDoc.format == 'xlsx', type_pdf: uploadDoc.format == 'pdf'}" href="javascript:;">{{uploadDoc.title}}</a></p>
          <router-link to="/companyCenter/docManagment" class="add_new_case">添加新的案例</router-link>
        </div>
        <!-- 相关服务列表样式 -->
        <div class="Related_services" v-if="docList[docIndex].title != ''">
        <div class="datpage_left"><img :src="docList[docIndex].picUrl" alt=""></div>
        <div class="datpage_right">
          <h3 class="datpage_title">{{docList[docIndex].title}}</h3>
          <p class="datpage_intro">{{docList[docIndex].introduce}}</p>
        </div>
        <div class="datpage_center">
        <mu-raised-button class="demo-raised-button datpage_btnF datpage_btn1"  label="收藏" labelPosition="after" primary  disabled>
          <img  src="../../../static/image/collstar_gray.png" class="button_pics"/>
        </mu-raised-button><br/>
        <mu-raised-button class="demo-raised-button datpage_btn2" label="分享" labelPosition="after" disabled>
          <img src="../../../static/image/share_icon.png" class="button_pics button_share"/>
        </mu-raised-button> 
      </div>
          <!--<mu-raised-button class="demo-raised-button datpage_btn1" label="咨询TA" labelPosition="after" primary>
            <img src="../../../static/image/sc_null.png" class="buttom_pic"/>
          </mu-raised-button><br/>
          <mu-raised-button class="demo-raised-button datpage_btn2" label="发布需求" labelPosition="after">
            <img src="../../../static/image/icon/share_white.png" class="buttom_pic"/>
          </mu-raised-button> 
        </div>-->
        </div>
      </li>
      </ul>
      <div class="user_funbtn" @mouseenter="enter" @mouseleave="leave">
      <mu-list-item title="删除" @click="editDoc('delete')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/delete.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="上移" @click="editDoc('up')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/up.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="下移" @click="editDoc('down')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/down.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="更多案例" @click="editDoc('add')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/add.png"/></mu-avatar>
      </mu-list-item>
    </div>
  </div>
  </div>
</template>

<script>
  import docService from '@/services/docService'
  export default {
    components: {},
    props: ['docIndex', 'docList'],
    data () {
      return {
        toggleClass: true,
        case_list: false,
        Related_services: false,
        uploadDocList: [],
        selectDoc: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      enter () {
        this.toggleClass = false
      },
      leave () {
        this.toggleClass = true
      },
      case_time () {
        this.case_list = true
      },
      data_homepage1 () {
        this.case_list = false
      },
      close () {
        this.case_list = false
        this.Related_services = true
      },
      editDoc (operateType) {
        this.$emit('editDoc', operateType, this.docIndex)
      },
      getData () {
        docService.GetUploadList({'page': 0, 'pageNum': 0})
        .then(response => {
          this.uploadDocList = response
        })
      },
      setDocData (index) {
        // this.selectDoc = this.uploadDocList.data[index]
        this.$set(this.docList, this.docIndex, this.uploadDocList.data[index])
        this.close()
        this.$emit('setDoc', this.docList)
      }
    }
  }
</script>

<style>
.Related_services{position: absolute; left: 0; top:0; width: 100%; height: 100%; background: #fff; padding:20px;}
.data_pagecont {
  position: relative;
  width: 940px;
  margin-bottom: 10px;
}
.data_homepage li {
  position: relative;
  background: #f2f9ff;
  width:884px;
  padding: 30px 20px;
  overflow: hidden;
  border: 2px dashed #e6e6e6;
  height: 160px;
  text-align: center;
}
.data_homepage li .demo-float-button{
  margin-top:20px;
}
.datpage_list .datpage_left {
  float:left;
  width: 100px;
  height: 100px;
}
.datpage_list .datpage_left img {
  border:1px solid #e6e6e6;
  max-width:100%;
  max-height:100%;
}
.datpage_list .datpage_right {
  float:left;
  width: 588px;
  margin: 0 20px 0 10px;
  text-align: left;
}
.datpage_list .datpage_right .datpage_title {
  width: 100%;
  font-size: 18px;
  color: #2d2d2d;
  line-height: 28px !important;
  max-height: 28px;
  overflow: hidden;
}
.datpage_list .datpage_right .datpage_intro {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  margin: 10px 0;
}
.datpage_list .datpage_right .datpage_funct {
  height: 16px;
}
.datpage_right .datpage_funct a {
  float: left;
  margin-right: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #898989;
  position: relative;
  background-position: left center;
  background-repeat: no-repeat !important;
}
.datpage_funct .datatum_up {
  background:url(../../../static/image/parise_gray.png);
}
.datpage_right .datpage_funct .datatum_up.active {
  color: #ffaa00;
  background:url(../../../static/image/parise_orange.png);
}
.datpage_funct .datatum_click {
  background:url(../../../static/image/tread_gray.png);
}
.datpage_right .datpage_funct .datatum_click.active {
  color: #ffaa00;
  background:url(../../../static/image/tread_orange.png);
}
.datpage_funct .datatum_author {
  background: url(../../../static/image/people.png);
}
/*.datpage_funct .datatum_coll {
  background:url(../../../static/image/shoucan_null.png);
}
.datpage_funct .datatum_coll:hover,.datpage_right .datpage_funct .datatum_coll.active {
  color: #ffaa00;
  background:url(../../../static/image/shoucang_active.png);
}
.datpage_funct .datatum_type {
  background: url(../../../static/image/filetype_gray.png);
}*/
.datpage_right .datpage_funct .data_fect {
  position: absolute;
  top: 0;
  left: 20px;
  color: #FFAA00;
  opacity: 0;
}
.datpage_center {
  float:left;
}
.datpage_center .mu-raised-button.disabled {
  padding-left: 20px;
  background:#C6C6C7;
  color:#444 !important;
  margin-right: 0 !important;
}
.datpage_center .datpage_btn1 {
  margin-bottom: 6px;
}
.datpage_center .datpage_btn2 {
  /*background:#e6e6e6 url(../../../static/image/share_icon.png) no-repeat 10px center !important;*/
  margin-bottom: 6px;
}
.datpage_center .datpage_btn1 .mu-raised-button-label{}
.service_Summary .datpage_funct{display: none;}
.service_Summary .user_funbtn{right:-34px; height: 160px; top:0px;}
.data_homepage .service_list_active{border:1px solid #FFAA00;}
.case_box .service_list .layout_self{
  width:856px;
  height: 232px;
}
.case_list{position:absolute; left:50%; text-align: left; margin-left:-250px; top:10px; width:500px; max-height: 140px; padding:6px 24px; background:#fff; border-radius: 4px;overflow: auto;}
.case_list p a{display: block; padding-left:30px; background-position: left center; background-repeat: no-repeat; font-size: 14px; color:#444; line-height: 32px;}
.case_list .type_ppt{background-image: url(../../../static/image/ppt_icon.png);}
.case_list .type_pdf{background-image: url(../../../static/image/pdf_icon.png);}
.case_list .type_excel{background-image: url(../../../static/image/excel_icon.png);}
.case_list .type_txt{background-image: url(../../../static/image/txt_icon.png);}
.case_list .type_word{background-image: url(../../../static/image/word_icon.png);}
.case_list .type_more{background-image: url(../../../static/image/unknown_icon.png); color: #FFAA00; text-decoration: underline;}
.case_box{margin:0 !important; padding: 0 !important;}
.datpage_center .demo-raised-button{margin-right: 0 !important;}
.datpage_center .demo-raised-button{width: 116px;}
.data_pagecont .datpage_center .mu-raised-button-label{padding-left: 10px;}
.data_pagecont .datpage_center .mu-raised-button.disabled{padding: 0;}
.case_list .add_new_case{background: url(../../../static/image/icon/unknown_icon.png) left center no-repeat;padding-left: 30px;font-size: 14px;}
</style>





<!-- Add "scoped" attribute to limit CSS to this component only -->

