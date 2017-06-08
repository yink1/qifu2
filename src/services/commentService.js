//import { axiosGet } from '@/api/api'
  export default {
// 获取评论列表
    getCommentList (params) {
//    var getCommentListUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(getCommentListUrl)
      return {
        'msg': 'ok', 
        'count': 2, 
        'data': [
          {
              'id': '1', 
              'userId': '101', 
              'userName': '张三', 
              'userPicUrl': '评论人的头像', 
              'content': '中午吃什么', 
              'createTime': '2017-06-02 10:01:10'
          }, 
          {
              'id': '2', 
              'userId': '102', 
              'userName': '李四', 
              'userPicUrl': '评论人的头像', 
              'content': '晚上吃什么', 
              'createTime': '2017-06-02 10:10:10'
          }
        ]
      }
    },
//  添加评论  
    addComment (params) {
//    var addCommentUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(addCommentUrl)
      return {
        'msg': 'ok',     
        'count': 1, 
        'data': [
        ]
      }
    },
//  commentService.deleteComment
//  删除评论  
    deleteComment (params) {
//    var deleteCommentUrl = '/banner/bannerList?category=' + params.category
//    return axiosGet(deleteCommentUrl)
      return {
        'msg': 'ok',     
        'count': 1, 
        'data': [
        ]
      }
    }
  }