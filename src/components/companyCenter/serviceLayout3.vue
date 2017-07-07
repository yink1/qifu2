<template>
  <div v-bind:class="{ service_list_active: !toggleClass }" class="service_list_box" v-if="layoutId == 3">
    <ul class="service_list">
      <li :class="['layout_left', {upload_end: detailData[0].picUrl != ''}]">
        <mu-float-button icon="add" class="demo-float-button" v-if="detailData[0].picUrl == ''" @click="openDetail(0)"/>
        <img v-if="detailData[0].picUrl != ''" :src="detailData[0].picUrl"  :service-id="detailData[0].serviceId"/>
        <p class="pic_title" :class="{active : detailData[0].inverseFlag}" v-if="detailData[0].showNameFlag == true">{{detailData[0].name}}</p>
        <div class="pic_edit" v-if="detailData[0].picUrl != ''">
          <a href="javascript:;" class="edit" @click="openDetail(0)"></a>
          <a href="javascript:;" class="pic_dele" @click="changeDetail(0, 'delete')"></a>
        </div>
      </li>
      <li class="layout_right">
        <ul>
          <li :class="{upload_end: detailData[1].picUrl != ''}">
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
          <li :class="{upload_end: detailData[2].picUrl != ''}">
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
          <li :class="{upload_end: detailData[3].picUrl != ''}">
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
          <li :class="{upload_end: detailData[4].picUrl != ''}">
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
        </ul> 
      </li>
    </ul>    
    <div class="user_funbtn" @mouseenter="enter" @mouseleave="leave">
      <mu-list-item title="布局" @click="editLayout('change')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/buju.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="删除"  @click="editLayout('delete')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/delete.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="上移" @click="editLayout('up')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/up.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="下移" @click="editLayout('down')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/down.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="更多详情" @click="editLayout('add')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/add.png"/></mu-avatar>
      </mu-list-item>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['layoutId', 'detailData'],
    data () {
      return {
        toggleClass: true
      }
    },
    methods: {
      enter () {
        this.toggleClass = false
      },
      leave () {
        this.toggleClass = true
      },
      openDio () {
        this.$emit('refreshbizlines')
      },
      editLayout (operateType) {
        this.$emit('editLayout', operateType)
      },
      openDetail (i) {
        this.$emit('openDetail', i)
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
    }
  }
</script>
<style>
  .service_list_box .layout_left,.service_list_box .layout_right{
    width:422px;
    height:232px;
  }
  .service_list_box .layout_right{
    width:434px;
    background: none;
  }
  .service_list_box .layout_right{
    border: none;
    margin-right: 0;
  }
</style>
