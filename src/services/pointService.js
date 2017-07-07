  import { axiosGet, axiosPost } from '@/api/api'
  export default {
// 获得积分履历  pointService.getPointHistory  暂无返回值
    GetPointHistory (params) {
//    var addRequirementUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(bannerUrl)
//    return {
//      'msg': 'ok',
//      'count': 20,
//      'data': [
//        {
//          'time': '2017-06-04 09:20:10',
//          'note': '签到',
//          'point': '10'
//        },
//        {
//          'time': '2017-06-06 09:20:10',
//          'note': '上传文档',
//          'point': '20'
//        }
//      ]
//    }
      return axiosGet('/api/point/pointHistory', params)
    },
    charge (params) {
      var chargeUrl = 'api/point/charge'
      return axiosPost(chargeUrl, params)
    }
  }
