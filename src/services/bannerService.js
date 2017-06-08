/**
 * import { axiosPost, axiosGet } from '@/api/api'
 */
  import { axiosGet } from '@/api/api'
  export default {
/**
 * 获取轮播图   http://qifuapi.thinkwit.com/api/banner/bannerList?category=homepage
 */
    getBannerList (params) {
      console.log('params')
      console.log(params)
      var bannerUrl = '/api/banner/bannerList?category=' + params.category
      return axiosGet(bannerUrl)
    }
  }
