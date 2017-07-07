  import { axiosGet, axiosPost } from '@/api/api'
  export default {
// 获取文档列表
    GetDocList (params) {
      var getDocListUrl = 'api/doc/docList'
      return axiosGet(getDocListUrl, params)
    },
    // 获取文档详情
    GetDocInfo (params) {
      var getDocInfoUrl = 'api/doc/docInfo'
      return axiosGet(getDocInfoUrl, params)
    },
    // 获得上传文档列表  docService.getUploadList 文档状态字段需要定义
    GetUploadList (params) {
      var getUploadListUrl = 'api/doc/uploadList?page=' + params.page + '&pageNum=' + params.pageNum
      return axiosGet(getUploadListUrl)
    },
    // docService.deleteDoc  删除文档
    DeleteDoc (params) {
      var deleteDocUrl = 'api/doc/deleteDoc?idList=' + params.idList
      return axiosPost(deleteDocUrl, params)
    },
    // docService.getDownloadList  获得用户下载文档列表
    GetDownloadList (params) {
//    http://qifuapi.thinkwit.com/api/doc/downloadList?page=1&pageNum=10
      var getDownloadListUrl = 'api/doc/downloadList'
      return axiosGet(getDownloadListUrl, params)
    },
//  编辑文档信息
    EditDocInfo (params) {
      var editDocUrl = 'api/doc/editDoc'
      return axiosPost(editDocUrl, params)
    },
    UploadDoc (params) {
      var uploadDocUrl = 'api/doc/UploadDoc'
      return axiosPost(uploadDocUrl, params, 1000000)
    },
    downLoadDoc (params) {
      var uploadDocUrl = 'api/doc/downLoadDoc?docId=' + params
      return axiosGet(uploadDocUrl)
    }
  }
