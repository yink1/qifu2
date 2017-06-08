  import { axiosGet } from '@/api/api'
  export default {
    getLinkList (params) {
      var friendShipUrl = '/banner/bannerList?category='
      return axiosGet(friendShipUrl)
    }
  }
