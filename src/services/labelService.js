import { axiosGet } from '@/api/api'
export default {
  getServiceLabel (params) {
    return axiosGet('/api/label/serviceLabel', params)
  }
}
