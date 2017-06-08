<template>
  <div class="blogroll">
    <p class="friend_link_title">友情链接</p>
    <swiper :options="swiperOptions" class="logo_pic">
      <swiper-slide v-for="index in friendShipList.data">
        <div class="logo_box">
        <a v-for="logo in index" :href="logo.a" >
          <img :src="logo.logoUrl"/>
        </a>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev" v-if="Object.getOwnPropertyNames(friendShipList.data).length>1"></div>
      <div class="swiper-button-next" slot="button-next" v-if="Object.getOwnPropertyNames(friendShipList.data).length>1"></div>
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
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 1,
          paginationClickable: true
        }
      }
    },
    created () {
      this.get()
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {
      get () {
        friendshipService.getLinkList()
        // 接收请求返回值
          .then(response => {
//          this.friendShipList = response
            this.friendShipList = {
              'msg': 'ok',
              'count': 20,
              'data': [
                [
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  }
                ],
                [
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  },
                  {
                    'webSite': 'www.baidu.com',
                    'logoUrl': '../../../static/image/blogro_icon1.png'
                  }
                ]
              ]
            }
            console.log('this.friendShipList')
            console.log(this.friendShipList)
          })
      }
    }
  }
</script>
<style>
  .blogroll{
    width:100%;
    background-color: #fff;
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
    height: 200px;
    width: 100%;
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
    margin-left: 40px;
  }
  .swiper-button-prev,.swiper-button-next{
    width: 30px;
    height: 122px;
    top: 26%;
  }
  .swiper-button-prev{
    background: url(../../../static/image/prev.png) no-repeat center center;
  }
  .swiper-button-prev:hover{
    background: url(../../../static/image/prev_sele.png) no-repeat center center;
    height: 120px;
  }
  .swiper-button-next{
    background: url(../../../static/image/next.png) no-repeat center center    
  }
  .swiper-button-next:hover{
    background: url(../../../static/image/next_sele.png) no-repeat center center;
    height: 120px;
  }
</style>
