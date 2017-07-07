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
         <!--<img src="../../../static/image/ewmIcon.jpg" alt="" />-->
         <qrcode :background="background" :size="size" :cls="qrCls" type="image" :value='qrText'></qrcode>
         <img src="../../../static/image/sysSide.png" alt="" />
    </div>
  </div>
</template>
<script>
  import paymentService from '@/services/paymentService'
  import Qrcode from 'v-qrcode/src/index'
  export default {
    data () {
      return {
        qrCls: 'qrcode',
        qrText: 'Read VueJS Feed daily',
        size: 175,
        type: 'image',
        background: '#DDDDDD',
        ewmShow: false,
        index: 0,
        indexed: -1,
        data: ['10元 = 100点', '50元 = 600点', '100元 = 1500点'],
        rechargeImg: ['../../../static/image/wxzf.jpg', '../../../static/image/zfbzf.png'],
        price: '10',
        pingpp: '',
        charge: '',
        result: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.ewmShow = false
        vm.indexed = -1
        vm.index = 0
      })
    },
    created () {},
    components: {
      Qrcode
    },
    mounted () {},
    computed: {},
    methods: {
      change (i) {
        this.index = i
        if (i === 0) {
          this.price = '10'
        } else if (i === 1) {
          this.price = '50'
        } else if (i === 2) {
          this.price = '100'
        }
        this.indexed = -1
        this.ewmShow = false
        console.log(this.price)
      },
      changeImg (i) {
        this.indexed = i
        if (i === 1) {
          this.ewmShow = false
          paymentService.getPaymentAlipayQRCodeCharges({Price: this.price})
          // 接收请求返回值
          .then(response => {
            this.dataInfo = response
            console.log('this.dataInfo')
            console.log(this.dataInfo)
            this.pingpp = require('pingpp-js')
            this.pingpp.createPayment(this.dataInfo, function (result, err) {
              if (result === 'success') {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
              } else if (result === 'fail') {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
              } else if (result === 'cancel') {
                // 微信公众账号支付取消支付
              }
            })
          })
        } else {
          console.log(this.price)
          this.ewmShow = true
          paymentService.getPaymentWXQRCodeCharges({price: this.price})
          // 接收请求返回值
          .then(response => {
            this.dataInfo = response
            console.log('this.dataInfo')
            console.log(this.dataInfo)
            this.qrText = response
          })
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
  #recharge .qrcode{
    display: inline-block;
    padding-left:20px;
    margin-right:12px;
  }
  .chargeStand li,.chargeStandImg li{
    width:200px;
    height:60px;
    line-height: 60px;
    border:2px solid #e6e6e6;
    margin-left:20px;
    text-align: center;
    font-size: 14px;
    color:#666;
    cursor:pointer;
  }
  .chargeStandImg li{
    height: 80px;
  }
  .chargeStand .actived{
    border:2px solid #ffaa00;
    background:url(../../../static/image/selected.png) no-repeat 176px 36px;
    color:#444;   
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
