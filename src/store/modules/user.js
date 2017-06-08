import * as types from '../types'
// import userService from '@/services/userService'
import qs from 'qs'

// 使用添加了前缀的名称定义 getter、action 和 mutation
const user = {
  state: {
    // 用户登录状态
    // userInfo: localStorage.getItem('userInfo') || {},
    userInfo: {},
    // 用户数据信息
    userData: [],
    // 用户权限数据
    userRoles: []
  },
  getters: {
    [types.GET_USER_LOGIN_STATUS]: state => {
      console.log('get GET_USER_LOGIN_STATUS ')
      console.log(qs.stringify(state.userInfo))
      console.log(state.userInfo['.expires'])
      var test = new Date(state.userInfo['.expires'])
      console.log(test)
      if (!state.userInfo.access_token) {
        console.log('return false 2')
        return false
      } else if (!state.userInfo['.expires_in'] && test >= Date.now()) {
        console.log('return true ')
        return true
      } else {
        console.log('return false 1')
        return false
      }
    },
    [types.GET_USER_TOKEN] (state) {
      console.log('get GET_USER_access_token ')
      if (state.userInfo.access_token) {
        return state.userInfo.access_token
      } else {
        return ''
      }
    },
    [types.IS_COMPANY_USER] (state) {
      var result = false
      for (var i = 0; i < this.userRoles.length; i++) {
        if (this.userRoles[i] === 'CompAdmin') {
          result = true
          break
        }
      }
      return result
    }
  },
//  actions: {
//    [types.FETCH_USER_LOGIN_INFO] ({
//      commit
//    }, userLoginInfo) {
//      userService.Login(userLoginInfo)
//        .then(response => {
//          console.log('response.data from userLoginInfo action')
//          console.log(response)
//          commit(types.SET_USER_LOGIN_INFO, response)
//        },
//        err => {
//          console.log(err)
//        })
//        .catch((error) => {
//          console.log(error)
//        })
//    }
//  },
  mutations: {
    [types.SET_USER_LOGIN_INFO] (state, userInfo) {
      console.log('got userinfo')
      console.log(userInfo)
      state.userInfo = userInfo
      state.userRoles = userInfo.roles
      // localStorage.setItem('userInfo', userInfo)
    },
    [types.SET_USER_DATA] (state, userData) {
      state.userData = userData
    },
    [types.SET_USER_LOGOUT] (state) {
      state.token = ''
      state.loginStatus = false
      state.userData = []
      state.userRoles = []
    }
  }
}
export default user
