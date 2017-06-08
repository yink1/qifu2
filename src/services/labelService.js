import { axiosGet } from '@/api/api'
export default {
  getServiceLabel (params) {
    // http://qifuapi.thinkwit.com/api/label/serviceLabel?id=0&includeChild=true
    var labelServiceUrl = '/api/label/serviceLabel?id=' + params.id + '&includeChild=' + params.includeChind
    return axiosGet(labelServiceUrl)
  }
}
