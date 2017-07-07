  import { axiosGet } from '@/api/api'
  export default {
// 活动支付对象  paymentService.getChargeObject  暂无返回值
    GetChargeObject (params) {
//    var addRequirementUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(bannerUrl)
      return {
        'msg': 'ok',
        'count': 1,
        'data': [
        ]
      }
    },
    getPaymentWXQRCodeCharges (pamams) {
      var paymentUrl = 'api/payment/wxqrcode'
      return axiosGet(paymentUrl, pamams)
    },
    getPaymentAlipayQRCodeCharges (pamams) {
      var paymentUrl = 'api/payment/alipayqrcode'
      return axiosGet(paymentUrl, pamams)
    }
  }
