<template>
  <div class="demo">
    <banner></banner>
    <div class="banner_serv">
      <div class="banner_serv_list">
        <requirement></requirement>
        <recommendation></recommendation>
      </div>
    </div>
    <div v-for="label in labelList.data">
    	  <serviceOfLabel :label="label"></serviceOfLabel>
    	</div>
    <div class="company_logo">
      <friendshipLink></friendshipLink>
    </div>
  </div> 
</template>
<script>
//  import Vue from 'Vue'
  import banner from '@/components/shared/banner'
  import requirement from '@/components/shared/requirement'
  import recommendation from '@/components/homepage/recommendation'
  import friendshipLink from '@/components/homepage/friendshipLink'
  import serviceOfLabel from '@/components/homepage/serviceOfLabel'
  import labelService from '@/services/labelService'
  import $ from 'jquery'
  export default {
    name: 'index',
    data () {
      return {
        labelList: [],
        dialog: false
      }
    },
    created () {
      $(this).index()
      labelService.getServiceLabel({id: 0, includeChind: true})
        .then(response => {
          this.labelList = response
          console.log('this.labelList')
          console.log(this.labelList)
        })
    },
    components: {
      banner,
      requirement,
      recommendation,
      friendshipLink,
      serviceOfLabel,
      labelService
    },
    methods: {
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      }
    }
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  html body{
    color: #333;
    overflow: auto;
    font-family:"PingFang SC","Hiragino Sans GB","Microsoft YaHei";
    background-color: #f4f4f4;
  }
  ul,li{
    list-style: none;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-padding-start: 0px;
  }
  img{
    border: none;
  }
  a{
    text-decoration: none;
  }
  p{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }
  .demo{
    position: relative;
    background-color: #f4f4f4;
  }
  .demo .banner_serv{
    position: absolute;
    top:360px;
    width: 100%;
    height:190px;
    background-color: rgba(0,0,0,.2);
    z-index: 10;
  }
  .demo .require{
    position: absolute;
    top:-195px;
  }
  .demo .recommend_box{
    margin-left:270px;
  }  
  .demo .banner_serv_list{
    margin: 0 auto;
    width: 1200px;
    padding: 5px 0;
  }
  .demo .company_logo{
    width: 1200px;
    margin:20px auto 0;
  }
  .labelDox{
    background-color: #fff;
  }
</style>
