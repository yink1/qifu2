<template>
  <div class="recommend_box">
    <mu-flexbox class="recommend_list" gutter = 15 >
      <mu-flexbox-item class="recommend_flex" v-for="(slide,index) in recommendationList.data">
        <!--<img src="../../../static/image/forward.jpg" />-->
        <img :src="slide.picUrl"/>
        <a href="#" >
          <div class="cover" v-if="index == 0">
            <span class="cover_title">最近直播</span>
          </div>
        </a>
      </mu-flexbox-item>
     </mu-flexbox>
  </div> 
</template>
<script>
import * as constWord from '@/services/const'
import bannerService from '@/services/bannerService'
export default {
  data () {
    return {
      recommendationList: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      var recommend = constWord.RECOMMEND
      bannerService.getBannerList({ 'category': recommend })
      // 接收请求返回值
        .then(response => {
          this.recommendationList = response
        })
    }
  }
}
</script>
<style lang="css">
.recommend_box{
  width:930px;
  background:rgba(0,0,0,.2);
}
.recommend_list{
  width:100%;
}
.recommend_flex{ 
  height: 180px;
}
.recommend_flex img{
  width:300px;
  height: 100%;
  display: block;
  opacity: 0.5;
}
.recommend_flex .invite:hover{
  opacity: 1;
}
.recommend_box .mu-flexbox .mu-flexbox-item{
  position:relative;
}
.cover{
  position: absolute;
  top: 0;
  width:300px;
  height:180px;
  background:rgba(0,0,0,.5) url(../../../static/image/play.png) no-repeat center center;
}
.cover_title{
  color: #fff;
  font-size: 20px;
  margin: 10px 0 0 10px;
  display: block;
}
</style>
