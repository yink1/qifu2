<template>
  <div id="memberInfo">
    <ul class="collect_type home_nav">
      <li class="active fl">个人中心</li>
    </ul>
    <div class="memberInfo clearfix">
      <div class="por fl headerPosition">
        <mu-raised-button ref="buttoned"  id="showPopover">
          <img id="show"  :src="userInfo.data.picUrl" alt="" class="fl" />
        </mu-raised-button>
        <mu-raised-button class="demo-raised-button poa changeHeader" label="更换头像"/>
        <formDataupload :uptoken="uploadToken" :formId="browse_button" :trigger="trigger" v-if='trigger' @setUploadedFileInfo="setUploadedFileInfo" class="companyPics"></formDataupload>
        <!--<upload :browse_button='browse_button' @setUploadedFileInfo="setUploadedFileInfo" class="companyPics">
        </upload>-->
            <!--<input type="file" class="file-button" @change="picShow($event)">-->
          <!--</mu-raised-button>-->
        <!--<p class="poa changeHeader">更换头像</p>-->
      </div>
      <div class="fl">
        <div class="clearfix">
          <h4 class="fl">{{userInfo.data.name}}</h4>
          <span class="fl clickButton" @click="openName">修改昵称</span>
          <span class="fl clickButton" @click="opened">修改密码</span>
          <div class="pupOutBg" v-show="dialog">
            <div class="poa pupOut">
              <h4>修改昵称</h4>
              <p class="clearfix">
                <span class="popTitle fl">昵称</span>
                <!--<mu-text-field hintText="修改昵称" v-model="value" class="fl"/>-->
                <mu-text-field hintText="修改昵称" class="fl" :errorText="errorOfName" v-model="userChangeInfo.nikename" @blur="$v.userChangeInfo.nikename.$touch()"/>
              </p>
            <div class="clearfix">
              <mu-flat-button class="fr" slot="actions" @click="close(1)" primary label="确定"/>
              <mu-flat-button class="fr" slot="actions" primary @click="close(0)" label="取消"/>
            </div>
            </div>
          </div>
          
        </div>
        <div class="clearfix messageBoxIcon">
          <img class="fl iconMess" src="../../../static/image/icon/message.png"/>
          <i>|</i>
          ( <span>{{userInfo.userMessage}}</span> )
        </div>
        <div class="clearfix">
                    <span class="pointPosition fl">财富值余额：{{userInfo.data.point}}点</span>
                    <span class="clickButton fl clickButtonHistory" @click="jump">财富值记录</span>
                    <mu-raised-button label="立即充值" @click="jumped" class="fl demo-raised-button rechangeButton" primary/>                   
        </div>        
      </div>
      <changePassword v-show="dialoged.value" v-if="userInfo.data.phoneNumber" :phoneNumber='userInfo.data.phoneNumber' :dialoged="dialoged" @test='closed'></changePassword>
    </div>
    
  </div>
</template>

<script>
  import upload from '@/components/shared/Upload'
  import userService from '@/services/userService'
  import changePassword from '@/components/shared/changePassword'
  import { required } from 'vuelidate/lib/validators'
  import { mapMutations } from 'vuex'
  import * as types from '@/store/types'
  import {showNotice} from '@/common/noticeAlertFun'
  import qiniuService from '@/services/qiniuService'
  import formDataupload from '@/components/shared/FormDataUpload'
  export default {
    data () {
      return {
        value: '',
        showHeader: false,
        dialog: false,
        dialoged: {value: false},
        userInfo: {
          data: []
        },
        browse_button: 'fileToggle',
        userChangeInfo: {
          nikename: ''
        },
        uploadToken: '',
        trigger: null
      }
    },
    validations: {
      userChangeInfo: {
        nikename: {
          required
        }
      }
    },
    created () {
      this.getQiniuToken()
      this.get()
    },
    mounted () {
      this.trigger = this.$refs.buttoned.$el
    },
    computed: {
      errorOfName () {
        if (!this.$v.userChangeInfo.nikename.required) {
          return '请输入昵称'
        } else if (this.userChangeInfo.nikename.replace(/^\s+|\s+$/g, '').length === 0) {
          console.log(121255, this.userChangeInfo.nikename.length)
          return '请输入昵称'
        } else {
          return ''
        }
      }
    },
    methods: {
      getOpen (val) {
        this.open = val
      },
      getQiniuToken () {
        qiniuService.getQiniuToken()
        .then(response => {
          this.uploadToken = response.uptoken
        })
      },
      get () {
        userService.GetMemberInfo()
        .then(response => {
          this.userInfo = response
          console.log(0, this.userInfo)
          // this.open = false
          this.setUserData(this.userInfo.data)
          // this.open = false
        })
      },
      editInfo (e) {
        return ''
      },
      openName () {
        this.dialog = true
      },
      close (i) {
        if (i === 0) {
          this.dialog = false
        } else {
          if (this.errorOfName !== '') {
            this.userChangeInfo.nikename = ''
            showNotice('请输入修改的昵称')
            this.dialog = true
          } else {
            console.log(this.userChangeInfo.nikename)
            this.userInfo.data.name = this.userChangeInfo.nikename
            userService.EditMemberInfo({name: this.userInfo.data.name})
            .then(response => {
              console.log(12, response)
              this.get()
              showNotice('修改昵称成功')
            })
            this.dialog = false
          }
        }
      },
//    toggle () {
//      this.open = !this.open
//    },
      stringify (obj) {
        return JSON.stringify(obj)
      },
      opened () {
        this.dialoged.value = true
      },
      closed () {
        this.dialoged.value = false
      },
      jump () {
        this.$router.push('/memberCenter/memberCenter/pointHistory')
      },
      jumped () {
        this.$router.push('/memberCenter/memberCenter/recharge')
      },
      ...mapMutations({
        setUserData: [types.SET_USER_DATA]
      }),
      setUploadedFileInfo (buttonId, fileName, restUrl) {
        // alert(4)
        // this.open = true
        document.getElementById('show').setAttribute('src', restUrl)
        console.log('this.servicePic')
        console.log(this.servicePic)
        userService.EditMemberInfo({picUrl: restUrl})
          .then(response => {
            console.log(12, response)
            this.open = true
            this.get()
          })
      }
    },
    components: {
      changePassword,
      upload,
      formDataupload
    },
    watch: {
      $route (to, from) {
        if (to.path.indexOf('memberCenter/history/requetHistoryList') > -1) {
          console.log(8080808)
          this.get()
        }
      },
      open (val) {
        if (val === true) {
          alert(5)
          document.getElementsByClassName('mu-popover')[0].classList.add('addPopClass')
        } else {
          document.getElementsByClassName('mu-popover')[0].classList.remove('addPopClass')
        }
      }
    }
  }
</script>

<style>
  #memberInfo .collect_type li.active{
    color: #083C6F;
    border-bottom: 2px solid #083C6F;
}
#showPopover{
  height:120px;
  cursor:pointer;
}
#memberInfo #show{
  width:120px;
  height:120px;
}
#memberInfo .active{
  text-decoration: none;
}
#memberInfo .collect_type li{
    width: 130px;
    text-align: center;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    box-sizing: border-box;
    height: 100%;
}
.changeHeader{
  background:rgba(0,0,0,.2);
  width:120px;
  height:30px;
  line-height: 30px;
  left:0;
  bottom:5px;
  text-align: center;
  color:#fff;
  display: none;
}
.headerPosition .mu-raised-button{
  background-color: #fff;
}
.pupOut{
  left:50%;
  top:50%;
  margin-left:-225px;
  margin-top:-90px;
  width:450px;
  height:180px;
  padding:20px;
  background:#fff;
  box-shadow: 0 19px 60px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);
}
.checkPhoneSpan{
  display: block;
  margin:15px 0 15px;
}
.pupOutBg{
  width:100%;
  height:100%;
  left:0;
  top:0;
  z-index: 1111111111111;
  position:fixed;
  background:rgba(0,0,0,0.3)
}
.pupOutBg h4{
  font-size: 22px;
  color:#2d2d2d;
}
.pupOutBg p{
  margin:15px 0 10px;
}
.popTitle{
  display: inline-block;
  width:100px;
  font-size: 16px;
  color:#444;
  padding-top:10px;
}
.clickButtonCheck.mu-raised-button.mu-raised-button-inverse{
  width:130px;
  margin-left:10px;
  color:#fff!important;
  background:#083C6F!important;
}
.rechangeButton.mu-raised-button.mu-raised-button-inverse{
  background:#083C6F!important;
}
.clickButtonCheck.mu-raised-button.disabled{
  width:130px;
  margin-left:10px;
}
#memberInfo .home_nav{
    margin-bottom: 20px;
}
#memberInfo .collect_type{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #666;
}
.headerPosition{
  margin-right:20px;
  width:120px;
  height:120px;
}
.headerPosition:hover .changeHeader{
  display: block;
}
.iconMess{
  margin-top:4px;
}
.pointPosition{
  padding-top:16px;
}
.messageBoxIcon{
  padding:16px 0 8px 0;
}
.messageBoxIcon i{
  margin: 0 8px 0 14px;
}
.messageBoxIcon span{
  color:#ffaa00;
  text-decoration: underline;
}
.memberInfo h4{
  height:30px;
  font-size: 20px;
  width:180px;
  word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;
    margin-right:20px;
}
.clickButton{
  color:#ffaa00;
  text-decoration:underline;
  margin:6px 20px;
  vertical-align: bottom;
  cursor: pointer;
}
.clickButtonHistory{
  margin:15px 20px 0;
}
.outline{
    margin-top:10px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 49px;
}
.mainWraapNav{
  width:400px;
}
#fileToggle .file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  width:100%;
  height:100%;
}

.demo-raised-button-container{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.demo-raised-button {
  margin: 12px;
}
.changeHeader.mu-raised-button{
  background:rgba(0,0,0,.5);
  width:120px;
  height:30px;
  line-height: 30px;
  left:0;
  bottom:30px;
  text-align: center;
  color:#fff;
  display: none;
  cursor: pointer;
}
</style>
