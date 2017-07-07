<template>
  <div v-bind:class="{ service_list_active: !toggleClass }" class="service_list_box" v-if="layoutId == 5">
    <ul class="service_list">
      <li class="layout_self upload_end">
         <mu-float-button icon="add" class="demo-float-button" v-if="detailData[0].picUrl == ''" @click="openDetail(0)"/>
        <img v-if="detailData[0].picUrl != ''" :src="detailData[0].picUrl"  :service-id="detailData[0].serviceId"/>
        <p class="pic_title" :class="{active : detailData[0].inverseFlag}" v-if="detailData[0].showNameFlag == true">{{detailData[0].name}}</p>
        <div class="pic_edit" v-if="detailData[0].picUrl != ''">
          <a href="javascript:;" class="edit" @click="openDetail(0)"></a>
          <a href="javascript:;" class="pic_dele" @click="changeDetail(0, 'delete')"></a>
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
      <mu-list-item title="下移" @click="editLayout('down')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/down.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="更多详情" @click="editLayout('add')">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/add.png"/></mu-avatar>
      </mu-list-item>
    </div>
    <div></div>
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
      editLayout (operateType) {
        this.$emit('editLayout', operateType)
      },
      openDetail (i) {
        this.$emit('openDetail', i)
      },
      changeDetail (index, type) {
        if (type === 'delete') {
          this.$set(this.detailData, index, { picUrl: '', serviceId: 0, name: '', showNameFlag: false, inverseFlag: false, orderNum: index + 1 })
        }
      }
    }
  }
</script>
<style>
.service_list .layout_self{
  width:856px;
  height: 232px;
}
</style>
