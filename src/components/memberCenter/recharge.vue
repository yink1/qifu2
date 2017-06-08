<template>
  <div id="recharge">
    <h4>选择您要冲入的财富值</h4>
    <ul class="clearfix chargeStand" >
    	<li class="fl" v-for='(it,i) in data' @click="change(i)" :class="{actived: index == i}">{{it}}</li>
    </ul>
    <h4>选择您的支付方式</h4>
    <ul class="clearfix chargeStandImg">
    	<li class="fl" v-for="(it,i) in rechargeImg" @click="changeImg(i)" :class="{actived: indexed == i}">
    	  <img :src="it"/>
    	</li>
    </ul>
    <div class="ewmWx" v-if='ewmShow'>
         <h6>通过微信扫一扫，扫描以下二维码支付</h6>
         <img src="../../../static/image/ewmIcon.jpg" alt="" />
         <img src="../../../static/image/sysSide.png" alt="" />
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ewmShow: true,
        index: 0,
        indexed: 0,
        data: ['10元=100点', '50元=600点', '100元=1500点'],
        rechargeImg: ['../../../static/image/wxzf.jpg', '../../../static/image/zfbzf.png']
      }
    },
    created () {},
    mounted () {},
    computed: {},
    methods: {
      change (i) {
        this.index = i
      },
      changeImg (i) {
        this.indexed = i
        if (i === 1) {
          this.ewmShow = false
        } else {
          this.ewmShow = true
        }
      }
    }
  }
</script>
<style>
  #recharge{
    margin-top:20px;
    min-height:400px;
    width:100%;
    padding:15px;
    margin-bottom:50px;
  }
  .chargeStand,.chargeStandImg{
    margin:20px 0;
  }
  .chargeStand li,.chargeStandImg li{
    width:200px;
    height:60px;
    line-height: 60px;
    border:2px solid #e6e6e6;
    margin-left:20px;
    text-align: center;
    font-size: 14px;
    color:#444;
    font-weight: bold;
    cursor:pointer;
  }
  .chargeStandImg li{
    height: 80px;
  }
  .chargeStand .actived{
    border:2px solid #ffaa00;
    background:url(../../../static/image/selected.png) no-repeat 176px 36px;   
  }
  .chargeStandImg .actived{
    border:2px solid #ffaa00;
    background:url(../../../static/image/selected.png) no-repeat 176px 56px;  
  }
  .chargeStandImg img{
    margin-top:15px;
  }
  .ewmWx{
    width:100%;
    margin-top:40px;
    padding-left:300px;
  }
  .ewmWx h6{
    padding-left:24px;
    margin-bottom:20px;
    background:url(../../../static/image/sysIcon.png) no-repeat left center;
    font-size: 14px;
    color:#444;
  }
  .ewmWx img{
    vertical-align: top;
  }
</style>
