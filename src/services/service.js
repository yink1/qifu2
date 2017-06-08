import { axiosGet } from '@/api/api'
export default {
  /**
   * 获取服务列表
   */
  getServiceOfLabel (params) {
//  http://qifuapi.thinkwit.com/api/service/serviceOfLabel?labelId=7
    var serviceUrl = '/api/service/serviceOfLabel?labelId=' + params
    return axiosGet(serviceUrl)
  }
}
