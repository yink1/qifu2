
  import { axiosGet } from '@/api/api'
  export default {
    // 设置收藏
    SetFavorite (params) {
      var setFavoriteUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(setFavoriteUrl)
      return {
        'msg': 'ok', 
        'count': 1, 
        'data': {
            'favoriteCount': 3, 
            'favoriteFlag': true
        }
      }
    }
    // favoriteService.setLike   啥都没有  api命名  返回值都没有
    SetLike (params) {
      var setLikeUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(setLikeUrl)
      return {}
    }
//  favoriteService.getFavoriteCompanyList 获得用户收藏企业的列表
    GetFavoriteCompanyList (params) {
      return {
        'msg': 'ok', 
        'count': 20, 
        'data': [
            {
                'id': 10012, 
                'name': '思齐信息技术', 
                'shortName': '思齐', 
                'logoUrl': '公司logo'
            }, 
            {
                'id': '10013', 
                'name': '行睿信息技术', 
                'shortName': '行睿', 
                'logoUrl': '公司logo'
            }
        ]
      }
    }
//  favoriteService.getFavoriteServiceList  获得用户收藏服务的列表
    GetFavoriteServiceList (params) {
      return {
        'msg': 'ok', 
        'count': 20, 
        'data': [
          {
            'companyId': '12342', 
            'companyName': '行睿信息技术', 
            'companyShortName': '行睿', 
            'serviceId': '392948', 
            'picUrl': '服务图片', 
            'serviceName': '技术支持', 
            'favoriteFlg': true
          }, 
          {
            'companyId': '38290384', 
            'companyName': '思鸿企业管理', 
            'companyShortName': '思鸿', 
            'serviceId': '9389294', 
            'picUrl': '服务图片', 
            'serviceName': '管理咨询', 
            'favoriteFlg': true
          }
        ]
      }
    }
    // favoriteService.getFavoriteDocList 获得用户收藏文档的列表
    GetFavoriteDocList (params) {
      return {
        'msg': 'ok', 
        'count': 30, 
        'data': [
          {
            'id': '84309402', 
            'title': '这是一个测试文档', 
            'documentId': '9093003', 
            'format': 'word', 
            'favoriteTime': '2017-06-04 09:20:10', 
            'ownerId': '03920', 
            'ownerName': '张三', 
            // 'ownerType': '上传用户类型（公司：company，个人：person）'
            'ownerType': 'person'
          }, 
          {
            'id': '90394826', 
            'title': '这是一个测试文档1', 
            'documentId': '9849023', 
            'format': 'pdf', 
            'favoriteTime': '2017-06-04 13:10:10', 
            'ownerId': '2039402', 
            'ownerName': '思齐', 
            'ownerType': 'company'
          }
        ]
      }
    }
  }
