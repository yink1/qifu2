import { axiosGet, axiosPost } from '@/api/api'
export default {
  /**
   * 获取服务列表
   */
  getServiceOfLabel (params) {
//  http://qifuapi.thinkwit.com/api/service/serviceOfLabel?labelId=7
    var serviceUrl = '/api/service/serviceOfLabel?labelId=' + params
//  var serviceUrl = '/api/service/serviceOfLabel'
    return axiosGet(serviceUrl)
  },
  getArea (params) {
    return axiosGet('api/service/area', params)
  },
  getServiceList (params) {
    var getServiceListUrl = 'api/service/serviceList'
    return axiosGet(getServiceListUrl, params)
  },
  getUploadServiceList (params) {
    var getUploadServiceListUrl = 'api/service/uploadServiceList'
    return axiosGet(getUploadServiceListUrl, params)
  },
  deleteService (params) {
    var deleteServicetUrl = 'api/service/deleteService?idList=' + params.idList
    return axiosPost(deleteServicetUrl, params)
  },
  editServiceInfo (params) {
    var editServiceInfoUrl = '/api/service/editService'
    return axiosPost(editServiceInfoUrl, params)
  },
  getServiceInfo (params) {
    var getServiceInfoUrl = 'api/service/serviceInfo'
    return axiosGet(getServiceInfoUrl, params)
  }
}
