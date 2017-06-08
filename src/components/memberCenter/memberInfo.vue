<template>
  <div id="memberInfo">
    <ul class="collect_type home_nav">
      <li class="active fl">个人中心</li>
    </ul>
    <div class="memberInfo clearfix">
      <div class="por fl headerPosition">
        <img src="../../../static/image/icon/userHeader.jpg" alt="" class="fl" />
        <p class="poa changeHeader">更换头像</p>
      </div>
      <div class="fl">
        <div class="clearfix">
          <h4 class="fl">{{userInfo.userName}}</h4>
          <span class="fl clickButton" @click="open">修改昵称</span>
          <span class="fl clickButton" @click="opened">修改密码</span>
          <div class="pupOutBg" v-show="dialog">
            <div class="poa pupOut">
              <h4>修改昵称</h4>
              <p class="clearfix">
                <span class="popTitle fl">昵称</span>
                <mu-text-field hintText="修改昵称" v-model="value" class="fl"/>
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
                    <span class="pointPosition fl">积分余额：{{userInfo.userPointer}}点</span>
                    <span class="clickButton fl clickButtonHistory" @click="jump">积分记录</span>
                    <mu-raised-button label="立即充值" @click="jumped" class="fl demo-raised-button rechangeButton" primary/>                   
        </div>        
      </div>
      <changePassword v-show="dialoged.value" :dialoged="dialoged" @test='closed'></changePassword>
    </div>
    
  </div>
</template>

<script>
  import changePassword from '@/components/shared/changePassword'
  export default {
    data () {
      return {
        value: '',
        dialog: false,
        dialoged: {value: false},
        userInfo: {
          userImg: '',
          userName: 'user_qwer',
          userPointer: 3000,
          userMessage: 4
        }
      }
    },
    created () {},
    mounted () {},
    computed: {},
    methods: {
      open () {
        this.dialog = true
      },
      close (i) {
        if (i === 0) {
          this.dialog = false
        } else {
          this.dialog = false
          this.userInfo.userName = this.value ? this.value : this.userInfo.userName
        }
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
      }
    },
    components: {
      changePassword
    }
  }
</script>

<style>
  #memberInfo .collect_type li.active{
    color: #083C6F;
    border-bottom: 2px solid #083C6F;
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
  bottom:0;
  text-align: center;
  color:#fff;
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
  cursor:pointer;
}
.iconMess{
  margin-top:4px;
  margin-right:6px;
}
.pointPosition{
  padding-top:16px;
}
.messageBoxIcon{
  padding:16px 0 8px 0;
}
.messageBoxIcon span{
  color:#ffaa00;
  text-decoration: underline;
}
.memberInfo h4{
  height:30px;
  font-size: 20px;
  width:220px;
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
.mu-tab-text{
}
</style>
