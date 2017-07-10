<template>
  <div>
    <div v-bind:class="{ service_list_active: !toggleClass }" class="service_list_box" v-if="layoutId == 1">
      <ul class="service_list">
        <li :class="{upload_end: detailData[0].picUrl !== ''}">
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[0].picUrl == ''" @click="openDetail(0)"/>
          <img v-if="detailData[0].picUrl != ''" :src="detailData[0].picUrl"  :service-id="detailData[0].serviceId"/>
          <p class="pic_title" :class="{active : detailData[0].inverseFlag}" v-if="detailData[0].showNameFlag == true">{{detailData[0].name}}</p>
          <div class="pic_edit" v-if="detailData[0].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(0)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(0, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(0, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(0, 'right')"></a>
          </div>
        </li>
        <li :class="{upload_end: detailData[1].picUrl !== ''}">          
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[1].picUrl == ''" @click="openDetail(1)"/>
          <img v-if="detailData[1].picUrl != ''" :src="detailData[1].picUrl"  :service-id="detailData[1].serviceId"/>
          <p class="pic_title" :class="{active : detailData[1].inverseFlag}" v-if="detailData[1].showNameFlag == true">{{detailData[1].name}}</p>
          <div class="pic_edit" v-if="detailData[1].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(1)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(1, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(1, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(1, 'right')"></a>
          </div>
        </li>
        <li :class="{upload_end: detailData[2].picUrl !== ''}">
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[2].picUrl == ''" @click="openDetail(2)"/>
          <img v-if="detailData[2].picUrl != ''" :src="detailData[2].picUrl"  :service-id="detailData[2].serviceId"/>
          <p class="pic_title" :class="{active : detailData[2].inverseFlag}" v-if="detailData[2].showNameFlag == true">{{detailData[2].name}}</p>
          <div class="pic_edit" v-if="detailData[2].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(2)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(2, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(2, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(2, 'right')"></a>
          </div>
        </li>
        <li :class="{upload_end: detailData[3].picUrl !== ''}">
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[3].picUrl == ''" @click="openDetail(3)"/>
          <img v-if="detailData[3].picUrl != ''" :src="detailData[3].picUrl"  :service-id="detailData[3].serviceId"/>
          <p class="pic_title" :class="{active : detailData[3].inverseFlag}" v-if="detailData[3].showNameFlag == true">{{detailData[3].name}}</p>
          <div class="pic_edit" v-if="detailData[3].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(3)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(3, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(3, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(3, 'right')"></a>
          </div>
        </li>
        <li :class="{upload_end: detailData[4].picUrl !== ''}">
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[4].picUrl == ''" @click="openDetail(4)"/>
          <img v-if="detailData[4].picUrl != ''" :src="detailData[4].picUrl"  :service-id="detailData[4].serviceId"/>
          <p class="pic_title" :class="{active : detailData[4].inverseFlag}" v-if="detailData[4].showNameFlag == true">{{detailData[4].name}}</p>
          <div class="pic_edit" v-if="detailData[4].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(4)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(4, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(4, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(4, 'right')"></a>
          </div>
        </li>
        <li :class="{upload_end: detailData[5].picUrl !== ''}">
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[5].picUrl == ''" @click="openDetail(5)"/>
          <img v-if="detailData[5].picUrl != ''" :src="detailData[5].picUrl"  :service-id="detailData[5].serviceId"/>
          <p class="pic_title" :class="{active : detailData[5].inverseFlag}" v-if="detailData[5].showNameFlag == true">{{detailData[5].name}}</p>
          <div class="pic_edit" v-if="detailData[5].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(5)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(5, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(5, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(5, 'right')"></a>
          </div>
        </li>
        <li :class="{upload_end: detailData[6].picUrl !== ''}">
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[6].picUrl == ''" @click="openDetail(6)"/>
          <img v-if="detailData[6].picUrl != ''" :src="detailData[6].picUrl"  :service-id="detailData[6].serviceId"/>
          <p class="pic_title" :class="{active : detailData[6].inverseFlag}" v-if="detailData[6].showNameFlag == true">{{detailData[6].name}}</p>
          <div class="pic_edit" v-if="detailData[6].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(6)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(6, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(6, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(6, 'right')"></a>
          </div>
        </li>
        <li :class="{upload_end: detailData[7].picUrl !== ''}">
          <mu-float-button icon="add" mini class="demo-float-button" v-if="detailData[7].picUrl == ''" @click="openDetail(7)"/>
          <img v-if="detailData[7].picUrl != ''" :src="detailData[7].picUrl"  :service-id="detailData[7].serviceId"/>
          <p class="pic_title" :class="{active : detailData[7].inverseFlag}" v-if="detailData[7].showNameFlag == true">{{detailData[7].name}}</p>
          <div class="pic_edit" v-if="detailData[7].picUrl != ''">
            <a href="javascript:;" class="edit" @click="openDetail(7)"></a>
            <a href="javascript:;" class="pic_dele" @click="changeDetail(7, 'delete')"></a>
            <a href="javascript:;" class="pic_left" @click="changeDetail(7, 'left')"></a>
            <a href="javascript:;" class="pic_right" @click="changeDetail(7, 'right')"></a>
          </div>
        </li>
      </ul>     
      <div class="user_funbtn" @mouseenter="enter" @mouseleave="leave">
        <mu-list-item title="布局" @click="editLayout('change')">
          <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/buju.png"/></mu-avatar>
        </mu-list-item>
        <mu-list-item title="删除" @click="editLayout('delete')">
          <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/delete.png"/></mu-avatar>
        </mu-list-item>
        <mu-list-item title="上移" @click="editLayout('up')">
          <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/up.png"/></mu-avatar>
        </mu-list-item>
        <mu-list-item title="下移"  @click="editLayout('down')">
          <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/down.png"/></mu-avatar>
        </mu-list-item>
        <mu-list-item title="更多详情" @click="editLayout('add')">
          <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/add.png"/></mu-avatar>
        </mu-list-item>
      </div>
    </div>
    <serviceLayout2 :layoutId="layoutId" :detailData="detailData" @editLayout="editLayout" @openDetail="openDetail"></serviceLayout2>
    <serviceLayout3 :layoutId="layoutId" :detailData="detailData" @editLayout="editLayout" @openDetail="openDetail"></serviceLayout3>
    <serviceLayout4 :layoutId="layoutId" :detailData="detailData" @editLayout="editLayout" @openDetail="openDetail"></serviceLayout4>
    <serviceLayout5 :layoutId="layoutId" :detailData="detailData" @editLayout="editLayout" @openDetail="openDetail"></serviceLayout5>
    <companyServicePop ref="companyServicePop" :singleServiceDetail='singleServiceDetail' :singleIndex='singleIndex' @getSingleServiceDetail='getSingleServiceDetail'></companyServicePop>
    <compositionEditPop ref="compositionEditPop" @saveLayout="saveLayout"></compositionEditPop>
  </div>
</template>
<script>
  import serviceLayout2 from '@/components/companyCenter/serviceLayout2'
  import serviceLayout3 from '@/components/companyCenter/serviceLayout3'
  import serviceLayout4 from '@/components/companyCenter/serviceLayout4'
  import serviceLayout5 from '@/components/companyCenter/serviceLayout5'
  import companyServicePop from '@/components/companyCenter/companyServicePop'
  import compositionEditPop from '@/components/companyCenter/compositionEditPop'
  export default {
    props: ['layoutId', 'detailData', 'serviceIndex'],
    data () {
      return {
        toggleClass: true,
        singleServiceDetail: [],
        singleIndex: 0,
        operateType: 'change'
      }
    },
    methods: {
      enter () {
        this.toggleClass = false
      },
      leave () {
        this.toggleClass = true
      },
      click () {
        this.$emit('refreshbizlines', '')
      },
      openDetail (i) {
        console.log('i' + i)
        this.$set(this.singleServiceDetail, 0, this.detailData[i])
        this.singleIndex = i
        this.$refs.companyServicePop.open()
      },
      editLayout (operateType) {
        this.operateType = operateType
        if (operateType === 'change' || operateType === 'add') {
          this.$refs.compositionEditPop.open()
        } else {
          this.saveLayout()
        }
      },
      saveLayout (type) {
        this.$emit('changeServiceInfo', this.operateType, this.serviceIndex, type)
      },
      getSingleServiceDetail (data, index) {
        this.$set(this.detailData, index, data)
        // this.$emit('getSingleServiceDetail', this.serviceIndex, this.detailData)
      },
      changeDetail (index, type) {
        var item1 = ''
        var item2 = ''
        if (type === 'delete') {
          this.$set(this.detailData, index, { picUrl: '', serviceId: 0, name: '', showNameFlag: false, inverseFlag: false, orderNum: index + 1 })
        } else if (type === 'left' && index !== 0) {
          item1 = this.detailData[index - 1]
          item2 = this.detailData[index]
          item1.orderNum = index + 1
          item2.orderNum = index
          this.$set(this.detailData, index, item1)
          this.$set(this.detailData, index - 1, item2)
        } else if (type === 'right' && index !== this.detailData.length - 1) {
          item1 = this.detailData[index]
          item2 = this.detailData[index + 1]
          item1.orderNum = index + 2
          item2.orderNum = index + 1
          this.$set(this.detailData, index, item2)
          this.$set(this.detailData, index + 1, item1)
        }
      }
    },
    components: {
      serviceLayout2,
      serviceLayout3,
      serviceLayout4,
      serviceLayout5,
      companyServicePop,
      compositionEditPop
    }
  }
</script>
<style>
.service_sele{
  padding: 20px 0 10px 12px;
  font-size: 16px;
  color: #083C6F;
  width: 884px;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
  line-height: 22px !important;
}
.service_list_box{
  cursor: pointer;
  height: 260px;
  width: 884px;
  padding:12px 0 0px 12px !important;
  border: 2px dashed #e6e6e6;
  position: relative;
  margin-bottom: 4px;
  background-color: #fff;
}
.serviceHasContent{
  border: 1px solid #e6e6e6 !important;
}
div .service_list_active{
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  border: 1px solid #FFAA00 !important;
}
.service_list li{
  width: 205px;
  height: 112px;
  float: left;
  display: flex;
  border:1px dashed #bcbcbc;
  background-color:#f2f9ff;
  margin:0 12px 12px 0;
  text-align: center;
  position: relative;
}
.service_list li img{
  width: 100%;
}
.service_list_box .demo-float-button{
  margin: auto;
}
.service_list .upload_end{
  border: 1px solid #e6e6e6;
}
/*侧边的操作栏*/
.user_funbtn{
  background-color:#e6e6e6 ;
  opacity: 0.5;
  position: absolute;
  top:-2px;
  width: 90px;
  right:-92px;
  clear: both;
  height: 200px;
}
.user_funbtn .mu-item.show-left{
  padding-left: 36px;
}
.user_funbtn .mu-item-title{
  line-height: 40px;
  text-decoration: underline;
  font-size: 12px;
  box-sizing: border-box;
  color: #444;
}
.user_funbtn .mu-avatar img{
  width: auto;
  height: auto;
  border-radius: 0;
}
.user_funbtn .mu-item-left{
  left: 8px;
  width:20px;
}
.user_funbtn .mu-item{
  padding: 0;
  min-height: 40px;
}
.user_funbtn:hover{
  opacity: 1.0;
  box-shadow: 0 0 6px rgba(0,0,0,.2);
}
.user_funbtn .mu-item-wrapper.hover .mu-item-title{
  color: #ffaa00;
}
.user_funbtn .mu-item-wrapper.hover .mu-avatar{
  background: #ffaa00 !important;
}
/*页面内的编辑*/

.pic_edit{
  display: none;
  position:absolute;
  top: 0;
  right:0;
  width: 30px;
  background: rgba(230,230,230,0.8);
}
.pic_edit>a{
  width: 100%;
  display: block;
  height: 28px;
  border-bottom: 1px solid #fff;
}
.pic_edit .edit{
  background: url(../../../static/image/icon/new_edit.png) no-repeat center;
}
.pic_edit .pic_dele{
  background: url(../../../static/image/delete_black.png) no-repeat center;
}
.pic_edit .pic_left{
  background: url(../../../static/image/down_black.png) no-repeat center;
}
.pic_edit .pic_right{
  background: url(../../../static/image/up_black.png) no-repeat center;
}
/*经过效果*/
.pic_edit .edit:hover{
  background:rgba(255,170,0,.8) url(../../../static/image/icon/newBlackEdit.png) no-repeat center;
}

.pic_edit .pic_dele:hover{
  background:rgba(255,170,0,.8) url(../../../static/image/delate_white.png) no-repeat center;
}

.pic_edit .pic_left:hover{
  background:rgba(255,170,0,.8) url(../../../static/image/down_white.png) no-repeat center;
}

.pic_edit .pic_right:hover{
  background:rgba(255,170,0,.8) url(../../../static/image/up_white.png) no-repeat center;
}
/*上传的图片的标题*/
.upload_end .pic_title{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 25%;
  width: 100%;
  background-color: rgba(230,230,230,.5);
  font-size: 12px;
  color: #444;
  line-height: 1.5;
  text-align: center;
  font-weight: bold;
  padding-top:3%;
}
.upload_end:hover .pic_edit{
  display: block;
}
</style>
