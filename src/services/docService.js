//import { axiosGet } from '@/api/api'
  export default {
// 获取文档列表
    GetDocList (params) {
//    var docListUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(bannerUrl)
      return {
        'msg': 'ok', 
        'count': 30, 
        'data': [
          {
            'id': '111', 
            'title': '文档测试2', 
            'documentId': '1212', 
            'format': 'pdf', 
            'picUrl': '封面图片', 
            'introduce': '这是一个文档测试的文档1', 
            'favoriteFlg': 'false'
          }, 
          {
            'id': '112', 
            'title': '文档测试1', 
            'documentId': '1213', 
            'format': 'pdf', 
            'picUrl': '封面图片', 
            'introduce': '这是一个文档测试的文档2', 
            'favoriteFlg': 'false'
          }
        ]
      }
    },
    // 获取文档详情
    GetDocInfo (params) {
//    var getDocInfoUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(getDocInfoUrl)
      return {
        'msg': 'ok', 
        'count': 1, 
        'data': {
          'id': '1001', 
          'title': '这是一个测试文档', 
          'documentId': '1111', 
          'format': 'pdf', 
          'score': '100', 
          'downloadUrl': 'www.baidu.com', 
          'downloadCount': 10, 
          'clickCount': 32, 
          'ownerName': '张三', 
          'createTime': '2017-06-02 10:10:10'
        }
      }
    }
    // 获得上传文档列表  docService.getUploadList 文档状态字段需要定义
    GetUploadList (params) {
      return {
        'msg': 'ok',
        'count': 20,
        'data': [
          {
            'id': '9374893',
            'status': 1,
            'title': '测试上传文档',
            'documentId': '83904729032',
            'format': 'pdf',
            'score': 100
          },
          {
            'id': '902393',
            'status': 2,
            'title': '测试上传文档1',
            'documentId': '80483929032',
            'format': 'word',
            'score': 200
          }
        ]
      }
    }
    // docService.deleteDoc  删除文档
    DeleteDoc (params) {
      return {
        'msg': 'ok', 
        'count': 1, 
        'data': [
        ]
      }
    }
    // docService.getDownloadList  获得用户下载文档列表
    GetDownloadList (params) {
      return {
        'msg': 'ok', 
        'count': 20, 
        'data': [
          {
            'id': '949883234', 
            'title': '测试用户下载文档列表', 
            'documentId': '939278932', 
            'format': 'pdf', 
            'score': '100',
            'downloadUrl':'www.baidu.com'
          }, 
          {
            'id': '73829034', 
            'title': '测试用户下载文档列表1', 
            'documentId': '2436722', 
            'format': 'word', 
            'score': '200',
            'downloadUrl':'www.sogou.com'
          }
        ]
      }
    }
  }
  