import { axiosPost, axiosGet } from '@/api/api'
export default {
/**
 * 用户登录
 */
  Login (params) {
    // params = JSON.stringify(params)
//  console.log(params)
// http://api.thinkwit.com/token
// grant_type=password&username=15026736556&password=123456
    return axiosPost('/token', params)
  },
// 获取图片验证码 userService.getImageCode
  GetImageCode () {
    return axiosGet('/api/Code/ImageCode')
  },
// 获取短信验证码 userService.getSmsCode
  GetSmsCode (params) {
    return axiosGet('/api/Code/SmsCode?PhoneNum=' + params.PhoneNum, params)
  },
// 短信验证码 userService.smslogin  http://api.thinkwit.com/token grant_type=client_credentials&client_id=SMS&client_secret=15026736556_9497
// Smslogin (params) {
//  return axiosGet('/token' + params.PhoneNum, params)
// },
  /**
   * 用户注册
   */
  Regist (params) {
//  http://qifuapi.thinkwit.com/api/Account/Register
    return axiosPost('/api/Account/Register', params)
  },
  /**
   * 获取用户信息
   */
// UserInfo (id) {
//  return axiosGet('/api/Account/UserInfo', {
//    userId: id
//  })
// },
  UserInfo () {
    return axiosGet('/api/Account/UserInfo')
  },
  // 获得用户信息  暂无返回值 userService.getMemberInfo
  GetMemberInfo () {
    return ''
  },
  // 获得用户最近浏览的服务列表
  GetServiceHistoryList () {
    return {
      'msg': 'ok',
      'count': 20,
      'data': [
        {
          'companyId': '1012',
          'companyName': '思齐',
          'serviceId': '12345',
          'picUrl': '服务图片',
          'serviceName': '定制服务',
          'introduce': '测试服务',
          'favoriteFlag': true
        },
        {
          'companyId': '1013',
          'companyName': '行睿',
          'serviceId': '12345423',
          'picUrl': '服务图片',
          'serviceName': '专属定制服务',
          'introduce': '测试专属服务',
          'favoriteFlag': true
        }
      ]
    }
  },
  //  userService.getDocHistoryList  获得用户最近浏览的文档列表
  GetDocHistoryList (params) {
    return {
      'msg': 'ok',
      'count': 20,
      'data': [
        {
          'id': '1234',
          'title': '测试最近浏览文档',
          'documentId': '9876',
          'format': 'pdf',
          'time': '2017-06-03 10:10:10'
        },
        {
          'id': '1357',
          'title': '测试最近浏览文档1',
          'documentId': '84628',
          'format': 'pdf',
          'time': '2017-06-03 12:32:10'
        }
      ]
    }
  }
  // userService.getSmsCode  未写
}
