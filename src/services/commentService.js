  import { axiosGet, axiosPost } from '@/api/api'
  export default {
// 获取评论列表
    getCommentList (params) {
//    var getCommentListUrl = '/banner/bannerList?category=' + params.category
      return axiosGet('/api/comment/commentList', params)
    },
//  添加评论
    addComment (params) {
//    var addCommentUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(addCommentUrl)
      return axiosPost('/api/comment/addComment', params)
    },
//  commentService.deleteComment
//  删除评论
    deleteComment (params) {
      var deleteCommentUrl = '/api/comment/deleteComment?id=' + params.id
      return axiosPost(deleteCommentUrl, params)
    }
  }
