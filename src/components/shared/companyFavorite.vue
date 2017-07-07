<template>
  <div class="companyFavorite">
    <img :src="companyInfo.LogoUrl"/>
    <a href="javascript:;" class="favorite" :class="{favoriteCss:favoriteCss}" @click="getFavorite">{{favoriteLabel}}</a>
  </div>
</template>
<script>
  import companyService from '@/services/companyService'
  import favoriteService from '@/services/favoriteService'
  export default {
    props: {
      companyId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        companyInfo: {},
        favoriteLabel: '收藏',
        favoriteCss: false,
        id: ''
      }
    },
    created () {
      this.get(this.companyId)
    },
    watch: {
      companyId (val) {
        this.get(val)
      }
    },
    methods: {
      getFavorite: function () {
        favoriteService.setFavorite({objectId: this.companyInfo.Id, objectType: 'company'})
        .then(response => {
          console.log('setFavorite response')
          console.log(response)
          // 点赞数赋值
          if (response.data.favoriteFlag === true) {
            this.favoriteLabel = '已收藏'
            this.favoriteCss = true
          } else {
            this.favoriteLabel = '收藏'
            this.favoriteCss = false
          }
        })
      },
      get (companyId) {
        companyService.getCompanyInfo({id: this.companyId})
          .then(response => {
            console.log(response)
            this.companyInfo = response.data
            if (response.data.FavoriteFlag === true) {
              this.favoriteLabel = '已收藏'
              this.favoriteCss = true
            } else {
              this.favoriteLabel = '收藏'
              this.favoriteCss = false
            }
            console.log('this.companyInfo')
            console.log(this.companyInfo)
          })
      }
    }
  }
</script>
<style>
  .companyFavorite{
    width:106px;
    height: 106px;
    position:relative;
    border-radius: 4px;
    padding-top: 4px;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
    background-color: #fff;
  }
  .companyFavorite img{
    display: block;
    height: 64px;
    width:100px;
    margin:0 3px 10px;
  }
  .companyFavorite .favorite{
    border-radius:20px;
    width: 80px;
    height: 22px;
    display: block;
    padding-left:31px;
    color: #fff;
    margin-left: 13px;
    background:#ffaa00 url(../../../static/image/icon/sc_null.png) no-repeat 14px 4px;
    background-size: 14px;
    font-size: 12px;
    line-height:22px;
  }
  .companyFavorite .favorite.favoriteCss{
    border-radius:20px;
    width: 80px;
    height: 22px;
    display: block;
    padding-left:31px;
    color: #fff;
    margin-left: 13px;    
    font-size: 12px;
    line-height:22px;
    background:#ffaa00 url(../../../static/image/icon/sc_white_null.png) no-repeat 14px 4px;
    background-size: 14px;
  }
</style>
