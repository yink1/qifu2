<template>
  <div>
  <h3 class="retitle reviewed" id="reviewed">您的评论</h3>
  <div class="revmod">
    <div class="wrimod">
      <div>
        <div class="wrimod_left fl">
          <img :src="userPicUrl">
        </div>
        <div class="wrimod_right fl">
          <mu-text-field class="module" :errorText="errorOfContentUser" hintText="发表评论" multiLine :rows="3" v-model='contentUser' @focus='clickFocus' /><br/>
          <p class="sumb_revew">
            <mu-raised-button class="demo-raised-button fr" href="javascript:;" label="评论" labelPosition="after" @click="addComment" secondary>
              <i class="mudocs-icon-custom-github mu-icon" style="font-size:24px;"></i>
            </mu-raised-button>
          </p>
        </div>
      </div>
      <div class="comment_list">
      <h3 class="userevie">用户评论<span class="has_wrimod">已有<span class="wrifig">{{commentCount}}</span>人评论</span></h3>
      <ul class="alreadmod" v-for="comment in commentList">
        <li class="singlemod">
          <div class="single_left fl">
            <img :src="comment.userPicUrl">
          </div>
          <div class="single_right fl" >
            <p class="sin_author"><span class="sinau_name">{{comment.userName}}</span><span class="exp_pra" v-show="comment.likeFlag === 'True'">表示了称赞</span><span class="fr">{{comment.createTime | timeFormat}}</span>
              <a href="javascript:;" class="delet_reveiw" v-if="userLoginUserPhoneNum === comment.userPhoneNum || userLoginUserName === 'admin'" @click="deleteComment(comment.id)"><u>删除</u></a>
            </p>
            <p class="sin_cont">{{comment.content}}</p>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <mu-pagination :total="commentCount" :current="current" @pageChange="handleClick" v-if='pageShow'></mu-pagination>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import commentService from '@/services/commentService'
import user from '@/services/userService'
import { mapGetters } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import * as types from '@/store/types'
import router from '@/router/router'
export default {
  data () {
    return {
      userPicUrl: 'http://cdn.siqiquan.org/636340736153160609.jpg',
      current: 1,
      pageData: {page: 1, pageNum: 10},
      pageShow: false,
      commentCount: 0,
      contentUser: '',
      commentList: []
    }
  },
  props: {
    objectId: {
      type: String,
      default: ''
    }
  },
  validations: {
    contentUser: {
      required,
      maxLength: maxLength(255)
    }
  },
  created () {
    this.get()
  },
  computed: {
    ...mapGetters(
      {
        userLoginStatus: [types.GET_USER_LOGIN_STATUS],
        userLoginUserPhoneNum: [types.GET_USER_PHONENUM],
        userLoginUserName: [types.GET_USER_NAME]
      }
    ),
    errorOfContentUser () {
      if (!this.$v.contentUser.required) {
        return '请输入评论！'
      } else if (!this.$v.contentUser.maxLength) {
        return '输入的评论字数过多！'
      }
      return ''
    }
  },
  filters: {
    timeFormat (time) {
      var userTime = new Date(time)
      var date = new Date()
      var dateLocale = new Date(date.toLocaleDateString())
      console.log('dateLocale' + dateLocale)
      var timeDifferenceMinutes = (date - userTime) / 1000 / 60
      var timeDifferenceHour = (date - userTime) / 1000 / 3600
      var timeDifferenceDay = (dateLocale - userTime) / 1000 / 3600 / 24
//    console.log('userTime ' + userTime)
//    console.log('date ' + date)
//    console.log('timeDifferenceMinutes ' + timeDifferenceMinutes)
//    console.log('timeDifferenceHour ' + timeDifferenceHour)
      console.log('timeDifferenceDay ' + timeDifferenceDay)
      if (userTime >= dateLocale) {
        if (timeDifferenceMinutes < 1) {
          return '刚刚'
        }
        if (timeDifferenceMinutes >= 1 && timeDifferenceMinutes < 60) {
          return Math.floor(timeDifferenceMinutes) + '分钟前'
        }
        if (timeDifferenceHour >= 1 && timeDifferenceHour < 24) {
          return Math.floor(timeDifferenceHour) + '小时前'
        }
      } else {
        if (timeDifferenceDay >= 0 && timeDifferenceDay < 1) {
          return '昨天'
        }
        if (timeDifferenceDay >= 1 && timeDifferenceDay < 2) {
          return '前天'
        }
        if (timeDifferenceDay >= 2) {
          return time.substring(0, 10).replace(/-/g, '.')
        }
      }
    }
  },
  watch: {
    objectId () {
      this.get()
    }
  },
  methods: {
    get () {
      let _this = this
      if (_this.objectId === '') {
        return ''
      }
      commentService.getCommentList({objectId: _this.objectId, page: _this.pageData.page, pageNum: _this.pageData.pageNum})
      .then(response => {
//      console.log('getCommentList.response')
//      console.log(response)
        if (response.count > this.pageData.pageNum) {
          _this.pageShow = true
        } else {
          _this.pageShow = false
        }
        _this.commentList = []
        _this.commentCount = response.count
        _this.commentList = response.data
      })
      if (this.userLoginStatus) {
        user.GetMemberInfo()
        .then(response => {
//      console.log('user.response')
//      console.log(response)
          _this.userPicUrl = response.data.picUrl
        })
      }
    },
    clickFocus () {
      if (!this.userLoginStatus) {
        console.log('this.$route.path')
        console.log(this.$route.path)
        router.replace({
          path: '/login',
          query: {
            redirect: this.$route.path
          }
        })
      }
    },
    addComment () {
      if (this.objectId === '') {
        return ''
      }
      let _this = this
      if (!this.$v.contentUser.required || !this.$v.contentUser.maxLength) {
        return ''
      }
      commentService.addComment({objectId: _this.objectId, content: _this.contentUser})
      .then(response => {
//      console.log('getCommentList.response')
//      console.log(response)
        if (response.msg === 'ok') {
          _this.contentUser = ''
          _this.get()
        }
      })
    },
    deleteComment (commentId) {
      let _this = this
      console.log(commentId)
      commentService.deleteComment({id: commentId})
      .then(response => {
//      console.log('getCommentList.response')
//      console.log(response)
        if (response.msg === 'ok') {
          _this.get()
        }
      })
    },
    handleClick (newIndex) {
      this.pageData.page = newIndex
      this.get()
    },
    getDateTimeStamp (dateStr) {
      return Date.parse(dateStr.replace(/-/gi, '/'))
    }
  }
}
</script>
<style>
.fl {
  float: left;
}
.fr {
  float: right;
}
.revmod .mu-text-field-multiline {
  height:80px;
}
.revmod .mu-text-field.multi-line .mu-text-field-hint {
  padding:5px 0 0 10px;
}
.revmod .mu-text-field-content {
  overflow: auto;
  padding-bottom: 0;
}
.revmod .mu-text-field-input {
  height: 70px !important;
  padding:5px 10px;
}
.mu-text-field-textarea {
  padding: 10px;
}
.sumb_revew .mu-icon {
  width:18px;
  height: 16px;
  margin-left: 0 !important;
  background:url(../../../static/image/comment_icon.png) no-repeat center center;
}
.reviewed {
  line-height: 50px;
  height: 50px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 18px;
  color: #083c6f;
  font-weight: bold;
  padding: 0 20px;
}
.wrimod_right .demo-raised-button {
  margin-right:0;
  background: #083C6F;
}
.revmod {
  width: 100%;
  box-sizing: border-box;
  padding: 16px 18px;
}
.revmod {
  padding-bottom: 0;
}
.revmod .wrimod {
  width: 100%;
  overflow: hidden;
}
.revmod .wrimod div{overflow: hidden;}
.revmod .wrimod .wrimod_left,.revmod .wrimod .single_left {
  width: 60px;
  height: 60px;
  margin-right: 19px;
}
.revmod .wrimod .wrimod_left img,.revmod .wrimod .single_left img {
  width: 100%;
  height: 100%;
}
.wrimod .wrimod_right .module {
  width: 780px;
  font-size: 14px;
  color: #444;
  background-color: #f2f9ff;
  color: #898989;
}
.wrimod .wrimod_right .module:hover {
  border-color: #083c6f;
}
:-moz-placeholder {
  color: #999;
}
::-moz-placeholder {
  color: #999;
}
textarea:-ms-input-placeholder {
  color: #999;
}
textarea::-webkit-input-placeholder {
  color: #999;
}
.wrimod .wrimod_right .submod {
  background: #083c6f;
  color: #fff;
  width: 120px;
  height: 36px;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
  border-radius: 1px;
}
.wrimod .wrimod_right .sumb_revew {
  overflow: hidden;
  margin-top: 10px;
}
.sumb_revew a{
  width:116px;
}
.wrimod .userevie {
  font-size: 18px;
  color: #083c6f;
  font-weight: bold;
}
.wrimod .userevie .has_wrimod {
  font-size: 14px;
  color: #898989;
  font-weight: bold;
  margin-left: 10px;
  ;
}
.userevie .has_wrimod .wrifig {
  color: #ffaa00;
}
.revmod .wrimod .alreadmod {
  padding-top:6px ;
  width: 100%;
}
.revmod .wrimod .singlemod {
  padding: 16px 0;
  width: 100%;
  border-bottom: 1px dashed #e6e6e6;
  overflow: hidden;
}
.revmod .wrimod .single_right .sin_author {
  margin-bottom: 10px;
  color: #898989;
  font-size: 13px;
  position: relative;
}
.revmod .sin_author .sinau_name {
  width: 110px;
  margin-right: 10px;
  display: inline-block;
}
.revmod .sin_author .delet_reveiw {
  position: absolute;
  color: #ff1919;
  right: 0;
  bottom: -24px;
}
.revmod .wrimod .single_right {
  width: 780px;
  z-index:10;
}
.revmod .wrimod .single_right .sin_cont {
  color: #444;
  font-size: 14px;
  width: 740px;
}
.revmod .wrimod .single_right .exp_pra {
  padding-left: 20px;
  background:url(../../../static/image/parise_orange.png) no-repeat left center;
  color: #ffaa00;
  cursor:pointer;
}
.no_comment .module {
  background:#e6e6e6;
}
.no_comment .wrimod .wrimod_right .module:hover {
  border-color: #bcbcbc;
}
.no_comment .comment_list {
  display: none;
}
.no_comment .wrimod_right .demo-raised-button {
  background: #e6e6e6;
  color:#898989 !important;
  margin-right: 0 !important;
}
.no_comment .wrimod .single_right .exp_pra {
  padding-left: 20px;
  background:url(../../../static/image/parise_orange.png) no-repeat left center;
  color: #ffaa00;
  cursor:pointer;
}
</style>
