<template>
  <div class="blogroll">
    <p class="friend_link_title">友情链接</p>
    <swiper :options="swiperOptions" class="logo_pic">
      <swiper-slide >
        <div class="logo_box">
        <!--<a v-for="logo in index" :href="logo.webSite" >
          <img :src="logo.logoUrl"/>
        </a>-->
        <a :href="index.webSite" v-for="index in friendShipList.data" target= "_blank">
          <img :src="index.logoUrl" height="100" width="50" />
        </a>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev" @click='prevButton' ></div>
      <div class="swiper-button-next" slot="button-next" @click='nextButton' ></div>
    </swiper>     
  </div>
</template>
<script>
  import friendshipService from '@/services/friendshipService'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        friendShipList: {},
        swiperOptions: {
          spaceBetween: 30,
          centeredSlides: true,
          loop: true,
          slidesPerView: 1,
          paginationClickable: true,
//          友情链接当前页数
          pageIndex: 1
        }
      }
    },
    created () {
      this.pageIndex = 1
      this.get()
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {
      get () {
        console.log('this.pageIndex')
        console.log(this.pageIndex)
        friendshipService.getLinkList({page: this.pageIndex, pageNum: 12})
        // 接收请求返回值
          .then(response => {
            this.friendShipList = response
            console.log('this.friendShipList')
            console.log(this.friendShipList)
          })
      },
//    友情链接左滑
      prevButton () {
//      当前页为1,设为最大页数  Math.ceil 除数向上取整,有小数就整数部分加1
        if (this.pageIndex === 1) {
          this.pageIndex = Math.ceil(this.friendShipList.count / 12)
        } else {
          this.pageIndex--
        }
        this.get()
      },
//    友情链接右滑
      nextButton () {
//      当前页数最大数时,设为第一页
        if (this.pageIndex === Math.ceil(this.friendShipList.count / 12)) {
          this.pageIndex = 1
        } else {
          this.pageIndex++
        }
        this.get()
      }
    }
  }
</script>
<style>
  .blogroll{
    width:100%;
    background-color: #fff;
    overflow: auto;
  }
  .blogroll .swiper-slide,{
    overflow-y: auto;
  }
  .friend_link_title{
    height: 50px;
    padding: 0 20px;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
    color: #083c6f;
  }
  .logo_pic{
    height: 220px;
    width: 100%;
    overflow-y: auto;
  }
  .logo_pic li{
    width: 190px;
    height: 100px;
    padding: 10px;
    text-align: center;
    float: left;
  }
  .blogroll .swiper-slide a{
    display: block;
    width: 190px;
    height: 100px;
    float: left;
  }
  .logo_pic li img{
    opacity: 0.7;
  }
  .logo_box{
    margin-left: 30px;
    padding: 10px 0;
  }
  .logo_box a{
    padding: 10px;
    display: block;
    width: 100%;
    padding:10px;
  }
  .blogroll .swiper-slide a:hover{
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  }
  .logo_box img{
    width: 100%;
    display: block;
    height: 100%;
  }
  .swiper-button-prev,.swiper-button-next{
    width: 30px;
    height: 122px;
    top: 26%;
  }
  .swiper-button-prev{
    background: url(../../../static/image/prev.png) no-repeat left center;
  }
  .swiper-button-prev:hover{
    background: url(../../../static/image/prev_sele.png) no-repeat left center;
    height: 120px;
  }
  .swiper-button-next{
    background: url(../../../static/image/next.png) no-repeat right center    
  }
  .swiper-button-next:hover{
    background: url(../../../static/image/next_sele.png) no-repeat right center;
    height: 120px;
  }
</style>
