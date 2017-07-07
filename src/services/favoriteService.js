  import { axiosGet, axiosPost } from '@/api/api'
  export default {
    // 设置收藏
    setFavorite (params) {
      var setFavoriteUrl = '/api/favorite/setFavorite?objectId=' + params.objectId + '&objectType=' + params.objectType
      return axiosPost(setFavoriteUrl, params)
    },
//  获得收藏
    GetFavorite (params) {
      var getFavoriteUrl = '/api/favorite/getFavorite?objectId=' + params.objectId + '&objectType=' + params.objectType
      return axiosGet(getFavoriteUrl)
//    return {
//      'msg': 'ok',
//      'count': 1,
//      'data': {
//        'favoriteCount': '23',
//        'favoriteFlag': true
//      }
//    }
    },
    // favoriteService.setLike   啥都没有  api命名  返回值都没有
    SetLike (params) {
      var setLikeUrl = '/api/favorite/setLike'
      return axiosPost(setLikeUrl, params)
    },
//  获得点赞
    GetLike (params) {
      var getLikeUrl = '/api/favorite/getLike'
      return axiosGet(getLikeUrl, params)
    },
//  favoriteService.getFavoriteCompanyList 获得用户收藏企业的列表
    GetFavoriteCompanyList (params) {
      var getFavoriteCompanyListUrl = 'api/favorite/favoriteCompanyList'
      return axiosGet(getFavoriteCompanyListUrl, params)
    },
//  favoriteService.getFavoriteServiceList  获得用户收藏服务的列表
    GetFavoriteServiceList (params) {
      var getFavoriteServiceListUrl = 'api/favorite/favoriteServiceList'
      return axiosGet(getFavoriteServiceListUrl, params)
    },
    // favoriteService.getFavoriteDocList 获得用户收藏文档的列表
    GetFavoriteDocList (params) {
      var getFavoriteDocListUrl = 'api/favorite/favoriteDocList'
      return axiosGet(getFavoriteDocListUrl, params)
    }
  }

