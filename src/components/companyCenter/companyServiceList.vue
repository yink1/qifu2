<template>
  <div class="company_service_list">
    <h2 class="service_sele">相关服务</h2>
    <div v-bind:class="{ service_list_active: !toggleClass }" class="service_list_box">
      <ul class="service_list">
        <li class="upload_end">
          <img src="../../../static/image/forward.jpg"/>
          <p class="pic_title">多渠道医学沟通</p>
          <div class="pic_edit">
            <a href="javascript:;" class="edit"></a>
            <a href="javascript:;" class="pic_dele"></a>
            <a href="javascript:;" class="pic_left"></a>
            <a href="javascript:;" class="pic_right"></a>
          </div>
        </li>
        <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
        <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
        <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
        <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
        <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
        <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
        <li><mu-float-button icon="add" mini class="demo-float-button"/></li>
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
      },
      click () {
        this.$emit('refreshbizlines', '')
      }
    }
  }
</script>
<style>
.company_service_list{
  background-color: #fff;
}
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
.service_list_active{
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  border: 1px solid #FFAA00;
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
  background: url(../../../static/image/edit_black.png) no-repeat center;
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
  background:rgba(255,170,0,.8) url(../../../static/image/edit_white.png) no-repeat center;
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
  height: 25%;
  width: 100%;
  background-color: rgba(230,230,230,.8);
  font-size: 12px;
  color: #444;
  line-height: 1.5;
  text-align: center;
  font-weight: bold;
  padding-top:3%;
}
</style>
