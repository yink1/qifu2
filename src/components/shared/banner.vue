<template>
  <swiper :options="swiperOption" class="home_banner">
    <swiper-slide v-for="slide in livePerson.data">
      <a href="#">
        <img :src="slide.picUrl"/>
      </a>
    </swiper-slide>
  </swiper>
</template>
<script>
  import * as constWord from '@/services/const'
  import bannerService from '@/services/bannerService'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          loop: true,
          effect: 'fade',
          autoplayDisableOnInteraction: false
        },
        livePerson: {}
//      params: {}
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    created () {
      this.get()
    },
    methods: {
      get () {
        var homepage = constWord.HOMEPAGE
        bannerService.getBannerList({ 'category': homepage })
        // 接收请求返回值
          .then(response => {
            this.livePerson = response
          })
      }
    }
  }
</script>
<style type="text/css">
  .home_banner {
    width:100%;
    height:550px;
  }
  .home_banner .swiper-slide,.home_banner .swiper-slide img{
    width: 100%;
    height: 100%;
  }
</style>
