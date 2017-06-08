<template>
  <div>
	<div class="nav-bar">
		<div class="nav-width">
			<a href="javascript:;"><img class="qifuquan-logo" src="../assets/qifuquan_logo.png"/></a>
			<div class="nav-seach">
				<mu-dropDown-menu :value="value" @change="handleChange">
			    <mu-menu-item value="1" title="星期一"/>
			    <mu-menu-item value="2" title="星期二"/>
			    <mu-menu-item value="3" title="星期三"/>
			    <mu-menu-item value="4" title="星期四"/>
			    <mu-menu-item value="5" title="星期五"/>
			    <mu-menu-item value="6" title="星期六"/>
			    <mu-menu-item value="7" title="星期日"/>
			    </mu-dropDown-menu>
				<mu-appbar>
				  <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
				</mu-appbar>
				<mu-raised-button label="搜索" class="demo-raised-button"/>
  			<mu-raised-button to= "/docUploadManagment" class="demo-raised-button demo-raised-icon" label="上传资料"/>
			</div>
			<div class="nav-right">
				<img src="../assets/qifu_topimg.png"/>
				<img src="../assets/qifu_code.png" />
			</div>
		</div>
	</div>
	<div class="nav-menu">
	  <div class="menu-width">
    	<mu-appbar>
    	  <mu-flat-button  label="首页" slot="left" class="right-menu" @click="jump('/')"/>
        <mu-flat-button  label="服务分类" slot="left" class="right-menu" @click="jump('/service')"/>
        <mu-flat-button label="服务商" slot="left" class="right-menu" @click="jump('/companyList')"/>
        <mu-flat-button label="资料库" slot="left" class="right-menu" @click="jump('/docList')"/>
        <mu-flat-button label="我关注的服务商" slot="right" class="left-menu left-menu1" @click="jump('/docList')" v-if="userLoginStatus"/>
        <mu-flat-button label="收藏夹" slot="right" class="left-menu left-menu2" @click="jump('/memberCenter/history/requetHistoryList')" v-if="userLoginStatus"/>
        <mu-flat-button label="服务商入驻" slot="right" class="left-menu left-menu3" @click="jump('/docList')" />
        <mu-flat-button label="name" slot="right" class="left-menu left-menu4" @click="login_state" v-if="userLoginStatus"/>
        <div class="login_btn" v-if="login_btn">
         <mu-paper class="demo-menu" v-if="userLoginStatus">
            <mu-menu>
              <mu-menu-item title="Maps"/>
              <mu-menu-item title="Books"/>
              <mu-menu-item title="Flights"/>
              <mu-menu-item title="Apps"/>
            </mu-menu>
        </mu-paper>
        </div>
        <div class="login_more"></div>
        <mu-raised-button label="登录/注册" class="demo-raised-button" slot="right" @click="jump('/login')" v-if="!userLoginStatus"/>
        
      </mu-appbar>
      <mu-paper class="demo-menu demo-menu1" v-if="toggleClass">
        <mu-menu desktop>
         <mu-menu-item v-for="(menuItem,i) in labelServiceList" :title="menuItem.name" rightIcon="keyboard_arrow_right">
            <mu-menu  desktop :class="{ menu_list_show: !toggleClass }" >
              <mu-menu-item v-for="(chindItem,i) in menuItem.child" :title="chindItem.name" class="chindItem"/>
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
  import { mapGetters } from 'vuex'
  import * as types from '@/store/types'
  export default {
    data () {
      return {
        value: '1',
        toggleClass: true,
        labelServiceList: {},
        loginFlag: false,
        login_btn: false
      }
    },
    created () {
      this.get()
    },
    methods: {
      get () {
        labelService.getServiceLabel({id: 0, includeChind: true})
          .then(response => {
            this.labelServiceList = response.data
          })
      },
      login_state () {
        console.log(4)
        this.login_btn = !this.login_btn
      },
      handleChange (value) {
        this.value = value
      },
      jump (path) {
        if (this.$route.path === '/service' && path === '/service') {
          // 显示菜单
          this.toggleClass = true
        } else {
          if (path === '/') {
            this.toggleClass = true
          } else {
            this.toggleClass = false
          }
          this.$router.push(path)
        }
      }
    },
    computed: {
//  // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters(
        {
          userLoginStatus: [types.GET_USER_LOGIN_STATUS],
          isCompanyUser: [types.IS_COMPANY_USER]
        }
      )
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login_btn .demo-menu{position:absolute; top:65px; right: -4px; z-index:2;}
.login_btn .demo-menu .mu-menu-item-title{color: #444 !important;}
.chindItem .mu-menu-item-title{color:#444;}
.menu-width .login_more{position:absolute; right:18px; top:30px; width:10px; height: 7px; background:url(../../static/image/nav_more.png) no-repeat center center; }
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
.nav-bar .mu-text-field.focus-state{
  color:#444 !important;
}
.mu-menu-item-title{
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
  left:120px;
  display: inline-block;
}
.nav-bar .nav-seach .mu-dropDown-menu {
  position:absolute;
  left:0;
  top:-30px;
}
.nav-bar .nav-seach .mu-appbar {
  position:absolute;
  left:76px;
  top:0;
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
  left:418px;
  top:-32px;
  background:#ffaa00 !important;
  color:#fff !important;
}
.nav-bar .mu-flat-button {
  color:#fff;
}
.nav-bar .demo-raised-icon {
  left:420px;
  top:-19px;
  padding-left:20px;
  background:#083c6f url(../../static/image/shangchuan_cion.png) no-repeat 14px center !important;
}
.nav-bar .nav-right {
  float:right;
  padding-top:5px;
}
.nav-bar .mu-text-field-hint {
  line-height: 40px !important;
}
.mu-appbar{background:#083c6f !important;}
.nav-menu{
  width:100%;
  background:#083C6F;
}
.nav-menu .right-menu{width:100px;}
.nav-menu .menu-width{width:1200px; margin:0 auto; position: relative;}
.nav-menu .left-menu{padding-left:20px; background-position: 16px center !important; background-repeat: no-repeat !important;}
.nav-menu .left-menu1{background:url(../../static/image/menu_icon1.png);}
.nav-menu .left-menu2{background:url(../../static/image/menu_icon2.png);}
.nav-menu .left-menu3{background:url(../../static/image/menu_icon3.png);}
.nav-menu .left-menu4{background:url(../../static/image/login_name.png); padding-right:10px;}
.nav-menu .demo-raised-button{background:#FFAA00;}
.nav-menu .demo-menu1{position: absolute; width:256px !important; height: 160px; z-index:2;color:#444 !important;}
.nav-menu .demo-menu1 .mu-menu-item-title{color: #444;}
.nav-menu .demo-menu2{position: absolute;top:0; right:-192px; z-index: 3;}
.menu_list_hide{display: none;}
.menu_list_show{display: block;}
</style>
