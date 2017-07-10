<template>
  <div>
  <div class="nav-bar">
    <div class="nav-width">
      <a href="/"><img class="qifuquan-logo" src="../assets/qifuquan_logo.png"/></a>
      <div class="nav-seach">
        <mu-dropDown-menu :value="value" @change="handleChange">
          <mu-menu-item value="服务" title="服务"/>
          <mu-menu-item value="资料" title="资料"/>
        </mu-dropDown-menu>
        <mu-appbar class="search_ipt">
          <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
        </mu-appbar>
      </div>
      <div class="nav_btn_box">
        <mu-raised-button label="搜索" class="demo-raised-button" @click='search'/>
        <mu-raised-button class="demo-raised-button upload_btn1" label="上传资料" labelPosition="after" @click="docJump">
          <i class="mudocs-icon-custom-github mu-icon"></i>
        </mu-raised-button>
      </div>
      <div class="nav-right">
        <img src="../assets/qifu_topimg.png"/>
        <img src="../assets/qifu_code.png" />
      </div>
    </div>
  </div>
  <div class="nav-menu">
    <div class="menu-width">
      <mu-appbar class="menu_appbar1">
        <mu-flat-button  label="首页" slot="left" class="right-menu" @click="jump('/')"/>
        <mu-flat-button  label="服务分类" slot="left" :class="['right-menu', {service_menu: path}]" @click="jump('/service')"/>
        <mu-flat-button label="服务商" slot="left" class="right-menu" @click="jump('/companyList')"/>
        <mu-flat-button label="资料库" slot="left" class="right-menu" @click="jump('/docList')"/>
        <!--<mu-flat-button label="我关注的服务商" slot="right" class="left-menu left-menu1" @click="jump('/docList')" v-if="userLoginStatus && !isCompanyUser"/>-->
        <mu-flat-button label="收藏夹" slot="right" class="left-menu left-menu2" @click="jump('/memberCenter/memberFavorites/favoriteCompanyList')" v-if="userLoginStatus && !isCompanyUser"/>
        <mu-flat-button label="服务商入驻" slot="right" class="left-menu left-menu3" @click="jump('/companyregisterStep1')" v-if="userLoginStatus && !isCompanyUser"/>
        <mu-flat-button :label="userName" slot="right" class="left-menu left-menu4" ref="button" @click="toggle" v-if="userLoginStatus"/>
        <div class="login_more"></div>
        <mu-popover :trigger="trigger" :open="open" @close="handleClose">
          <mu-menu>
            <mu-menu-item title="个人中心" @click="jump('/memberCenter/history/requetHistoryList')" v-if="!isCompanyUser"/>
            <mu-menu-item title="企业中心" v-if="isCompanyUser" @click="jump('/companyCenter/companyCenter/requirementList')"/>
            <mu-menu-item title="注销" @click="logout" />
          </mu-menu>
        </mu-popover>  
        <mu-raised-button label="登录/注册" class="demo-raised-button" slot="right" @click="jump('/login')" v-if="!userLoginStatus"/>
      </mu-appbar>
      <mu-paper class="demo-menu demo-menu1 serviceListMenu" v-if="isHomePage">
        <mu-menu desktop>
         <mu-menu-item v-for="(menuItem,i) in labelServiceList" :title="menuItem.name" rightIcon="keyboard_arrow_right">
            <mu-menu  desktop class="chindItem_box">
              <mu-menu-item v-for="(chindItem,i) in menuItem.child" :title="chindItem.name" class="chindItem" @click="serviceMenuClick({name: 'service',params:{labelId:menuItem.id,childLabelId:chindItem.id}})"  />
            </mu-menu>
          </mu-menu-item>
        </mu-menu>
      </mu-paper>
    </div>
  </div>
  </div>
</template>

<script>
  import labelService from '@/services/labelService'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '@/store/types'
  import userService from '@/services/userService'
  export default {
    data () {
      return {
        value: '服务',
        labelServiceList: {},
        login_btn: false,
        clickService: false,
        serviceMenu: false,
        open: false,
        trigger: null
      }
    },
    created () {
      this.get()
    },
//  watch: {
//    // 如果路由有变化，会再次执行该方法
//    '$route': 'fetchDate'
//  },
    updated () {
      this.trigger = this.$refs.button.$el
    },
    mounted () {
      this.trigger = this.$refs.button.$el
    },
    methods: {
      toggle () {
        this.open = !this.open
      },
      handleClose (e) {
        this.open = false
      },
      get () {
//      console.log('this.isCompanyUser')
//      console.log(this.isCompanyUser)
        labelService.getServiceLabel({id: 0, includeChild: true})
          .then(response => {
            this.labelServiceList = response.data
          })
      },
      login_state () {
        console.log(4)
        this.login_btn = !this.login_btn
      },
      logout () {
        this.open = false
        userService.logout()
          .then(response => {
            console.log('logout response')
            console.log(response)
            this.setUserLogout()
            this.$router.push('/login')
          })
      },
      handleChange (value) {
        this.value = value
      },
      search () {
        var content = document.getElementsByClassName('mu-text-field-input')[0].value
        if (this.value === '服务') {
          console.log(content)
          this.$router.push({name: 'service', params: {serviceName: content, refresh: Date.now()}})
        }
        if (this.value === '资料') {
          console.log(content)
          this.$router.push({name: 'docList', params: {docName: content, refresh: Date.now()}})
        }
      },
      jump (path) {
        this.open = false
        if (this.$route.path === '/service' || path === '/service') {
          // 显示菜单
          this.clickService = !this.clickService
        } else {
          if (path !== '/service') {
            this.$router.push(path)
          }
          this.clickService = false
        }
      },
      serviceMenuClick (params) {
        console.log('serviceMenuClick params')
        console.log(params)
        this.$router.push(params)
        this.clickService = false
      },
      docJump () {
//      上传文档按钮点击跳转,当登录时,跳转至上传文档页面,未登录则跳转到登录页面
        if (this.userLoginStatus === true) {
          this.$router.push('/docUploadManagment')
        } else {
          this.$router.push('/login')
        }
      },
      ...mapMutations({
        setUserLogout: [types.SET_USER_LOGOUT]
      })
    },
    computed: {
//   使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters(
        {
          userLoginStatus: [types.GET_USER_LOGIN_STATUS],
          isCompanyUser: [types.IS_COMPANY_USER],
          userName: [types.GET_USER_NAME]
        }
      ),
      isHomePage () {
        if (this.$route.path === '/' || this.clickService) {
          return true
        } else {
          return false
        }
      },
      path () {
        if (this.$route.path === '/') {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style>
.mu-menu-item-wrapper.active{
  text-decoration: none !important;
}
.mu-menu-item-wrapper.active .mu-menu-item-title{
  color:#083C6F !important;
}
.login_btn .demo-menu {
  position:absolute;
  top:65px;
  right: -4px;
  z-index:14;
  margin:0 !important;
}
.login_btn .demo-menu .mu-menu-item-title {
  color: #444 !important;
}
.chindItem .mu-menu-item-title {
  color:#444;
}
.chindItem_box .mu-menu-destop {
  padding:0;
}
.menu-width .login_more {
  position:absolute;
  right:18px;
  top:1.5px;
  width:10px;
  height: 7px;
  background:url(../../static/image/nav_more.png) no-repeat center center;
  height: 40px;
}
.nav-width {
  position:relative;
  width: 1200px;
  margin:0 auto;
}
.qifuquan-logo {
  margin:10px 0;
}
.nav-seach .mu-appbar {
  display: inline-block !important;
  width: 410px !important;
}
.nav-bar .mu-text-field.focus-state {
  color:#444 !important;
}
.mu-menu-item-title {
  color:#444 !important;
}
.nav-bar .mu-text-field-focus-line {
  width:410px !important;
}
.nav-bar .mu-text-field-line {
  width:410px;
  background-color: #ccc !important;
}
.nav-bar .nav-seach .mu-appbar, .nav-seach .mu-appbar>.left {
  height: 0 !important;
}
.nav-bar .mu-text-field-input {
  width: 270px !important;
  color:#666666 !important;
  height: 39px !important;
}
.nav-bar {
  width:100%;
  height:80px;
  background:#f4f4f4;
}
.nav-bar a {
  margin: initial;
}
.nav-bar .mu-text-field.has-icon .mu-text-field-line,.mu-text-field.has-icon .mu-text-field-focus-line {
  left:-76px !important;
}
.nav-bar .mu-dropDown-menu-text {
  color:#444 !important;
  padding: 0 !important;
  height: 50px !important;
  width:99px !important;
  text-align: center;
  padding-right:10px !important;
}
.nav-bar .nav-seach {
  position:relative;
  left:118px;
  display: inline-block;
  width: 410px;
  height: 40px;
  padding-top:10px;
}
.nav-bar .nav-seach .mu-dropDown-menu {
  position:absolute;
  left:0;
  top:-22px;
}
.nav-seach .mu-text-field-content{
  padding-bottom: 10px;
}
.nav-bar .mu-dropDown-menu-line {
  display: none;
}
.nav-bar .mu-dropDown-menu-icon {
  color:#c6c6c7 !important;
  right: 0 !important;
}
.nav-bar .mu-text-field-icon {
  position: absolute;
  left: 16px;
  top: 14px !important;
}
.nav-bar .mu-text-field {
  margin-bottom: 0px !important;
}
.nav-bar .mu-raised-button {
  float: left;
  background:#ffaa00 !important;
  color:#fff !important;
}
.nav_btn_box{
  position:absolute;
  left:700px;
  overflow: hidden;
  width: 240px;
  top:23px;
}
.nav_btn_box .mu-raised-button{
  margin-right:8px;
}
.nav-bar .mu-flat-button {
  color:#fff;
}
.nav-bar .nav-right {
  float:right;
  padding-top:5px;
}
.nav-bar .mu-text-field-hint {
  line-height: 40px !important;
}
.mu-appbar {
  background:#083c6f !important;
}
.nav-menu {
  width:100%;
  background:#083C6F;
  height: 40px;
}
.serviceListMenu {
  z-index: 9999999 !important;
}
.nav-menu .right-menu {
  width:100px;
}
.nav-menu .menu-width {
  width:1200px;
  margin:0 auto;
  position: relative;
}
.nav-menu .left-menu {
  padding-left:20px;
  background-position: 16px center !important;
  background-repeat: no-repeat !important;
}
.nav-menu .left-menu1 {
  background:url(../../static/image/menu_icon1.png);
}
.nav-menu .left-menu2 {
  background:url(../../static/image/menu_icon2.png);
}
.nav-menu .left-menu3 {
  background:url(../../static/image/menu_icon3.png);
}
.nav-menu .left-menu4 {
  background:url(../../static/image/login_name.png);
  padding-right:10px;
}
.nav-menu .demo-raised-button {
  background:#FFAA00;
}
.nav-menu .demo-menu1 {
  position: absolute;
  margin: 0;
  width:256px !important;
  height: 160px;
  z-index:2;
  color:#444 !important;
}
.nav-menu .demo-menu1 .mu-menu-item-title {
  color: #444;
}
.nav-menu .demo-menu2 {
  position: absolute;
  top:0;
  right:-192px;
  z-index: 3;
}
.menu_list_hide {
  display: none;
}
.menu_list_show {
  display: block;
}
.service_menu .mu-flat-button-label {
  color: rgba(255,255,255,.5);
}
.mu-raised-button.upload_btn1{
  background: #083C6F !important;
  font-size: 14px !important;
}
.upload_btn1 .mu-icon{
  width:18px; 
  height: 16px;
  background:url(../../static/image/shangchuan_cion.png) no-repeat center center !important;
}
.search_ipt{
  position: absolute;
  left:76px;
}
.nav-menu .menu_appbar1{
  height: 40px !important;
  box-shadow: none;
}
body{
  line-height:inherit !important;
}
</style>
