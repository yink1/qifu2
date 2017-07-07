  import { axiosGet, axiosPost } from '@/api/api'
  export default {
// 添加新需求
    AddRequirement (params) {
      var addRequirementUrl = 'api/requirement/addRequirement'
      return axiosPost(addRequirementUrl, params)
    },
//  获得用户提交的需求  requirementService.getRequetHistoryList  返回值没改
    GetRequetHistoryList (params) {
//    return {
//      'msg': 'ok',
//      'count': 20,
//      'data': [
//        {
//          'description': '用户提交需求1',
//          'status': '修改',
//          'startDate': '2017-06-09 09:20:10',
//          'companyName': '张三'
//        },
//        {
//          'description': '用户提交需求2',
//          'status': '完成',
//          'startDate': '2017-06-10 09:20:10',
//          'companyName': '李四'
//        }
//      ]
//    }
      var getRequetHistoryListUrl = 'api/requirement/requetHistoryList'
      return axiosGet(getRequetHistoryListUrl, params)
    },
//  获得用户收到的需求
    getRequirementList (params) {
      var getRequirementListListUrl = 'api/requirement/requirementList'
      return axiosGet(getRequirementListListUrl, params)
    }
  }
