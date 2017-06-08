<template>
  <div style="display: inline-block;">
    <mu-raised-button label="布局" @click="open"/>
    <mu-dialog :open="dialog" @close="close">
      <h3 class="dialog_title">重新选择一个版式</h3>
      <ul class="composition">
        <li v-for="pic in img" @click='select($event)'>
          <img :src="pic.image"/>
          <img src="../../../static/image/selected.png" class="selected_layout"/>
        </li>
      </ul>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="close" label="保存"/>
    </mu-dialog>
  </div>
</template>
<script>
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
      }]
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    select (e) {
      e.currentTarget.classList.add('layout_active')
    }
  }
}
</script>
<style>
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
    margin: auto;
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

