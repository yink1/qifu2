//import { axiosGet } from '@/api/api'
  export default {
// 获得积分履历  pointService.getPointHistory  暂无返回值
    GetPointHistory (params) {
//    var addRequirementUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(bannerUrl)
      return {
        'msg': 'ok', 
        'count': 1, 
        'data': [
        ]
      }
    }
  }
  