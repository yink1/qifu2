//import { axiosGet } from '@/api/api'
  export default {
// 添加新需求
    AddRequirement (params) {
//    var addRequirementUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(bannerUrl)
      return {
        'msg': 'ok', 
        'count': 1, 
        'data': [
        ]
      }
    }
//  获得用户提交的需求  requirementService.getRequetHistoryList  返回值没改
    GetRequetHistoryList (params) {
      return {
        'msg': 'ok', 
        'count': 20, 
        'data': [
          {
            'description': '描述', 
            'status': '状态', 
            'startDate': '提出时间', 
            'companyName': '提出对象'
          }, 
          {
            'description': '描述', 
            'status': '状态', 
            'startDate': '提出时间', 
            'companyName': '提出对象'
          }
        ]
      }
    }
  }
  