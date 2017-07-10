<template>
  <div style="display: inline-block;" class='edit_pop'>
    <!--<mu-raised-button label="布局" @click="open"/>-->
    <div class="requirement_box" v-if="dialog"></div>
    <div class="dialog" v-if="dialog">
      <div class="require_content"> 
        <h3 class="dialog_title">重新选择一个版式</h3>
        <ul class="composition">
          <li v-for="pic,index in img" @click='select($event, index)'>
            <img class="img_auto" :src="pic.image"/>
            <img src="../../../static/image/selected.png" class="selected_layout"/>
          </li>
        </ul>
        <div class='btn_box'>
          <mu-flat-button slot="actions" @click="close" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="saveLayout" label="保存"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      dialog: false,
      img: [{
        image: '../../../static/image/format8.png'
      }, {
        image: '../../../static/image/format7.png'
      }, {
        image: '../../../static/image/format5.png'
      }, {
        image: '../../../static/image/format2.png'
      }, {
        image: '../../../static/image/format1.png'
      }],
      serviceType: 1
    }
  },
  methods: {
    open () {
      $('.composition li').removeClass('layout_active')
      this.dialog = true
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    },
    close () {
      this.dialog = false
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      document.getElementsByTagName('html')[0].style.overflow = 'auto'
    },
    select (e, index) {
      $('.composition li').removeClass('layout_active')
      e.currentTarget.classList.add('layout_active')
      this.serviceType = index + 1
    },
    saveLayout () {
      this.$emit('saveLayout', this.serviceType)
      this.close()
    }
  }
}
</script>
<style>
  .edit_pop .require_content{
   padding: 24px 24px 20px;
  }
  .composition {
    margin:20px;
  }
  .composition li{
    float: left;
    width: 180px;
    height: 110px;
    padding-top: 20px;
    border: 1px solid #bcbcbc;
    margin: 20px;
    cursor: pointer;
    position: relative;
  }
  .composition li img{
    display: block;
  }
  .img_auto{
    margin:auto;
  }
  .dialog_title{
    font-size: 22px;
    font-weight: bold;
    color: #2d2d2d;
  }
  .selected_layout{
    position: absolute;
    right: -2px;
    bottom: -1px;
    display: none !important;
  }
/*选中后的状态*/
  .composition .layout_active{
    border:3px solid #ffaa00;
  }
  .layout_active .selected_layout{
    display: block !important;
  }
</style>

