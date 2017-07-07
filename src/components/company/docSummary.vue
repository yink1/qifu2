<template>
    <div class="related_services">
      <div class="datpage_left"><img :src="docItem.picUrl" alt="" @click="toDetail(docItem.id)"></div>
      <div class="datpage_right">
        <h2 class="datpage_title" @click="toDetail(docItem.id)">{{docItem.title}}</h2>
        <p class="datpage_intro" @click="toDetail(docItem.id)">{{docItem.introduce}}</p>
        <p class="datpage_funct">
          <a href="javascript:;" class="datatum_author">{{docItem.userName}}</a>
          <a href="javascript:;" class="datatum_coll">{{docItem.clickCount}}</a>
          <a href="javascript:;" class="datatum_up"><span class="plus_one">{{likeCount}}</span></a>
          <a href="javascript:;" class="datatum_click"><span class="plus_one">{{unLikeCount}}</span></a>
          <a href="javascript:;" class="datatum_type">{{docItem.format}}</a>
        </p>
      </div>
      <div class="datpage_center">
        <mu-raised-button class="demo-raised-button datpage_btnF datpage_btn1" @click="getFavorite" :label="favoriteLabel" labelPosition="after" primary>
          <img v-if="likeFlagTrue" src="../../../static/image/sc_null.png" class="button_pics"/>
          <img v-if="likeFlagFalse" src="../../../static/image/sc_white_null.png" class="button_pics button_like"/>
        </mu-raised-button><br/>
        <mu-raised-button class="demo-raised-button datpage_btn2" label="分享" labelPosition="after">
          <img src="../../../static/image/icon/share_white.png" class="button_pics button_share"/>
        </mu-raised-button> 
      </div>
     </div>
</template>
<script>
  import favoriteService from '@/services/favoriteService'
  export default {
    props: ['showData', 'docItem'],
    data () {
      return {
        likeCount: 0,
        unLikeCount: 0,
        likeFlagFalse: false,
        likeFlagTrue: true,
        favoriteFlag: false,
        favoriteLabel: '收藏'
      }
    },
    created () {
      this.get()
      console.log('2' + this.docItem)
    },
    methods: {
      getFavorite: function () {
        favoriteService.setFavorite({objectId: this.docItem.id, objectType: 'doc'})
        .then(response => {
          console.log('setFavorite response')
          console.log(response)
          // 点赞数赋值
          this.favoriteCount = response.data.favoriteCount
          if (response.data.favoriteFlag === true) {
            this.likeFlagFalse = true
            this.likeFlagTrue = false
            this.favoriteLabel = '已收藏'
          } else {
            this.likeFlagFalse = false
            this.likeFlagTrue = true
            this.favoriteLabel = '收藏'
          }
          console.log(response.data.favoriteFlag)
        })
      },
      setLike (val) {
        favoriteService.SetLike({objectId: this.docItem.id, like: val, objectType: 'doc'})
          .then(response => {
            this.likeCount = response.data.likeCount
            this.unLikeCount = response.data.unLikeCount
            this.favoriteCount = response.data.favoriteCount
            this.favoriteFlag = response.data.favoriteFlag
          })
      },
      get () {
        favoriteService.GetFavorite({objectId: this.docItem.id, objectType: 'doc'})
        .then(response => {
          console.log('setFavorite response')
          console.log(response)
          // 点赞数赋值
          this.favoriteFlag = response.data.favoriteFlag
          if (response.data.favoriteFlag === true) {
            this.likeFlagFalse = true
            this.likeFlagTrue = false
            this.favoriteLabel = '已收藏'
          } else {
            this.likeFlagFalse = false
            this.likeFlagTrue = true
            this.favoriteLabel = '收藏'
          }
          console.log(this.favoriteFlag)
        })
        favoriteService.GetLike({objectId: this.docItem.id})
        .then(response => {
//          点赞数赋值
          this.likeCount = response.data.likeCount
          this.unLikeCount = response.data.unLikeCount
          this.likeFlag = response.data.likeFlag
        })
      },
      toDetail (val) {
        this.$router.push({name: 'docDetail', params: {docId: val}})
      }
    }
  }
</script>
<style>
.related_services{
  height:140px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px dashed #e6e6e6;
  background-color: #fff;
  clear: both;
}
.datpage_left {
  float:left;
  width: 100px;
  height: 100px;
}
.datpage_left img {
  cursor: pointer;
  border:1px solid #e6e6e6;
  max-width:100%;
  max-height:100%;
}
.datpage_right {
  float:left;
  width: 588px;
  margin: 0 20px 0 10px;
}
.datpage_right .datpage_title {
  cursor:pointer;
  width: 100%;
  font-size: 18px;
  color: #2d2d2d;
  line-height: 28px !important;
  max-height: 28px;
  overflow: hidden;
}
.datpage_right .datpage_intro {
  cursor:pointer;
  font-size: 14px;
  color: #666;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  margin: 10px 0;
}
.datpage_right .datpage_funct {
  height: 16px;
}
.datpage_right .datpage_funct a {
  float: left;
  margin-right: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #898989;
  position: relative;
  background-position: left center;
  background-repeat: no-repeat !important;
}
.datpage_funct .datatum_up {
  background:url(../../../static/image/parise_gray.png);
}
.datpage_right .datpage_funct .datatum_up.active {
  color: #ffaa00;
  background:url(../../../static/image/parise_orange.png);
}
.datpage_funct .datatum_click {
  background:url(../../../static/image/tread_gray.png);
}
.datpage_right .datpage_funct .datatum_click.active {
  color: #ffaa00;
  background:url(../../../static/image/tread_orange.png);
}
.datpage_funct .datatum_author {
  background: url(../../../static/image/people.png);
}
.datpage_funct .datatum_coll {
  background:url(../../../static/image/pageview.png);
}
.datpage_funct .datatum_type {
  background: url(../../../static/image/filetype_gray.png);
}
.button_pics{
  margin-left: 30px;
}
.datpage_right .datpage_funct .data_fect {
  position: absolute;
  top: 0;
  left: 20px;
  color: #FFAA00;
  opacity: 0;
}
.datpage_center {
  float:left;
}
.datpage_center .datpage_btnF .mu-raised-button-label,.datpage_center .datpage_btnF .mu-raised-button-label{
  padding-left: 10px;
}
.datpage_center .mu-raised-button-label{
  padding-left: 20px;
}
.datpage_center .datpage_btnF {
  width:110px;
  margin-bottom: 6px;
  width: 116px;
}
.datpage_center .datpage_btn2 {
  margin-bottom: 6px;
}
.datpage_btnF .mu-raised-button-label{
  padding-right: 25px !important;
}
.datpage_btnF .button_pics {
  margin-left: 12px !important;
}
.button_share{
  margin-left: 30px !important;
}
.datpage_btnF .button_like{
  margin-left: 16px !important;
}
</style>
