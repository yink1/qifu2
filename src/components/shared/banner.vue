<template>
  <div>
  <swiper :options="swiperOption" class="home_banner" ref="mySwiper">
    <swiper-slide v-for="slide in livePerson">
      <a :href="slide.url" target= "_blank">
          <img :src="slide.picUrl"/>
      </a>
    </swiper-slide>
  </swiper>
  </div>
</template>
<script>
// import * as constWord from '@/services/const'
  import bannerService from '@/services/bannerService'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        swiperOption: {},
        livePerson: []
//      params: {}
      }
    },
    props: {
      companyId: {
        type: String,
        default: ''
      },
      category: {
        type: String,
        default: ''
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    created () {
      if (this.category) {
        this.get({ 'category': this.category })
      }
      if (this.companyId) {
        this.get({ 'objectId': this.companyId })
      }
    },
    watch: {
      companyId (val) {
        this.get({ 'objectId': val })
        console.log('companyId' + val)
      },
      category (val) {
        this.livePerson = []
        console.log('category' + val)
        this.get({ 'category': val })
      },
      '$route' (to, from) {
        if (to.path === '/') {
          console.log('swiperstart')
          this.livePerson = []
          this.get({ 'category': this.category })
          this.$refs.mySwiper.swiper.stopAutoplay()
          this.$refs.mySwiper.swiper.startAutoplay()
          console.log('swiperend')
        }
      }
    },
    methods: {
      get (params) {
        bannerService.getBannerList(params)
        // 接收请求返回值
          .then(response => {
            if (response.data.length === 0) {
              this.livePerson.splice(0, this.livePerson.length, response.data)
            } else {
              this.livePerson = response.data
            }
          })
        this.$nextTick(function () {
          this.swiperOption = {
            notNextTick: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2000,
            loop: true,
            effect: 'fade',
            observer: true,
            autoplayDisableOnInteraction: false,
            onSlideChangeEnd: swiper => {
              this.page = swiper.realIndex + 1
              this.index = swiper.realIndex
            }
          }
        })
      }
    }
//  beforeRouteEnter (to, from, next) {
//    next(vm => {
//      if (this.category) {
//        vm.get({ 'category': this.category })
//      }
//      if (this.companyId) {
//        vm.get({ 'objectId': this.companyId })
//      }
//    })
//  }
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
