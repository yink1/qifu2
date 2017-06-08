<template>
<div class="servic_pop">
  <mu-raised-button label="服务设置" @click="open"/>
  <mu-dialog :open="dialog"  @close="close">
    <h3 class="dialog_title">设置服务</h3>
    <div class="sele_intro sele_service">
      <div class="sele_top">
        <label class="service_type">选择服务</label>
        <serviceLabelFilter></serviceLabelFilter>
      </div>
      <div class="sele_intro sele_bottom">
        <label class="service_type">上传图片</label>
        <div class="upload_service_img">
          <mu-raised-button label="选择文件" 
            ="demo-raised-button"/>
          <input type="file" name="" class="inputFile" @change="picShow($event)"/>
          <p class="pos_tit">
            <img src="../../../static/image/enter_center.png" id="show"/>
            <span class="pic_title">多渠道医学沟通</span>
            <a class="pic_advice">上传图片大小建议：图片比例16：9（宽大于470px）</a>
          </p>
          <div class="checkbox">
          <mu-checkbox label="显示服务标题" class="demo-checkbox"/>
          <mu-checkbox label="反色显示（深色图片建议勾选）" class="demo-checkbox"/>
          </div>
        </div>     
      </div>
    </div>
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="close" label="保存"/>
  </mu-dialog>
</div>
</template>
<script>
import serviceLabelFilter from '@/components/shared/serviceLabelFilter'
export default {
  data () {
    return {
      dialog: false,
      popShow: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    popClose () {
      this.popShow = false
    },
    popShow (v) {
      this.popShow = v
    },
    picShow (e) {
      var file = e.currentTarget.files[0]
      var reader = new FileReader()
      reader.onload = function (evt) {
        document.getElementById('show').setAttribute('src', evt.target.result)
      }
      reader.readAsDataURL(file)
    }
  },
  components: {
    serviceLabelFilter
  }
}
</script>
<style>
.pos_tit{position:relative;}
.pos_tit .pic_title{position:absolute; display:none; left:0; bottom:0; width:205px; height:25%; background:rgba(230,230,230,0.8); text-align: center; color:#fff;}
.pos_tit .icon-checked{display:block;}
.servic_pop{
  float: left;
  margin:0 10px ;
} 
.sele_service{
  width: 100%;
  margin-top: 20px;
}
.sele_intro{
  clear: both;
  position: relative;
}
.sele_intro .service_type{
  font-size: 16px;
  color: #444;
  width: 120px;
  display: block;
  float: left;
}
.sele_service .sele_list{
  float: left;
}
.sele_bottom{
  padding-top: 20px;
}
.sele_bottom .mu-raised-button-label{
  font-size: 14px;
}
.upload_service_img{
  float: left;
  position: relative;
}
.upload_service_img p{
  margin:10px 0 20px;
}
.upload_service_img p img{
  width: 205px;
  height: 110px;
}
.upload_service_img .inputFile{
  position: absolute;
  top: 0;
  left: 0;
  width: 88px;
  height: 36px;
  opacity: 0;
}
.pic_advice{
  font-size: 12px;
  color: #ffaa00;
}
.checkbox .mu-checkbox-label{
  font-size: 14px;
}
.checkbox{
  margin-bottom: 20px;
}
.checkbox .check_right{
  margin-left: 80px;
}
</style>

