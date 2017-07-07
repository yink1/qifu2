  import { axiosGet } from '@/api/api'
  export default {
    getLinkList (params) {
//    每页个数确定
      var friendShipUrl = 'api/friendship/LinkList'
      return axiosGet(friendShipUrl, params)
    }
  }
