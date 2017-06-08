<template>
  <div v-bind:class="{ service_list_active: !toggleClass }" class="service_list_box">
    <ul class="service_list">
      <li class="layout_little upload_end ">
        <img src="../../../static/image/forward.jpg"/>
        <p class="pic_title">多渠道医学沟通</p>
        <div class="pic_edit">
          <a href="javascript:;" class="edit"></a>
          <a href="javascript:;" class="pic_dele"></a>
        </div>
      </li>
      <li class="layout_large">
        <ul>
          <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
          <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
          <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
          <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
          <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
          <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
        </ul> 
      </li>
    </ul>    
    <div class="user_funbtn" @mouseenter="enter" @mouseleave="leave">
      <mu-list-item title="布局">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/buju.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="删除">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/delete.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="上移">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/up.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="下移">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/down.png"/></mu-avatar>
      </mu-list-item>
      <mu-list-item title="更多详情">
        <mu-avatar slot="left":size='20'  backgroundColor="#bcbcbc"><img src="../../../static/image/add.png"/></mu-avatar>
      </mu-list-item>
    </div>
  </div>
</template>
<script>
  export default {
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
      }
    }
  }
</script>
<style>
  .service_list_box .layout_little,.service_list_box .layout_large{
    width:205px;
    height:232px;
    background-color: #fff;
  }
  .service_list_box .layout_large{
    width:75%;
  }
  .service_list_box .layout_large{
    border: none;
    margin-right: 0;
  }
</style>
