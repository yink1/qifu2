<template>
  <div class="companyServiceSummary">
    <h4>相关服务</h4>
    <div class="companyServiceSummaryBox clearfix">
    <div v-for="it in services">      
      <ul class="son1 clearfix"  v-if="it.layoutId == 1">
      <li class="fl son1List por" v-for="item in it.serviceList">
          <img :src="item.picUrl" alt="" @click='toDetail(item.serviceId)' />
          <p class="poa son1Title" @click='toDetail(item.serviceId)' v-if="item.showNameFlag">{{item.title}}</p>
      </li>
    </ul>
    <div class="son2" v-if="it.layoutId == 2">
      <ul class="fl clearfix">
        <li class="fl son1List por" v-for="(item,i) in it.serviceList" :class='{sonFirst: i == 0}'>
          <img :src="item.picUrl" alt="" @click='toDetail(item.serviceId)' />
          <p class="poa son1Title" @click='toDetail(item.serviceId)' v-if="item.showNameFlag">{{item.title}}</p>
        </li>
      </ul>
    </div>
    <div class="son3" v-if="it.layoutId == 3">
      <ul class="fl clearfix">
        <li class="fl son1List por" v-for="(item,i) in it.serviceList" :class='{son3First: i == 0}'>
          <img :src="item.picUrl" alt="" @click='toDetail(item.serviceId)' />
          <p class="poa son1Title" @click='toDetail(item.serviceId)' v-if="item.showNameFlag">{{item.title}}</p>
        </li>
      </ul>
    </div>
    <div class="son3" v-if="it.layoutId == 4">
      <ul class="fl clearfix">
        <li class="fl son1List por son3First" v-for="(item,i) in it.serviceList">
          <img :src="item.picUrl" alt="" @click='toDetail(item.serviceId)' />
          <p class="poa son1Title" @click='toDetail(item.serviceId)' v-if="item.showNameFlag">{{item.title}}</p>
        </li>
      </ul>
    </div>
    <div class="son4" v-if="it.layoutId == 5" v-for="(item,i) in it.serviceList">
      <ul class="fl clearfix">
        <li class="fl son1List por son4First" v-for="(item,i) in it.serviceList">
          <img :src="item.picUrl" alt="" @click='toDetail(item.serviceId)' />
          <p class="poa son1Title" @click='toDetail(item.serviceId)' v-if="item.showNameFlag">{{item.title}}</p>
        </li>
      </ul>
    </div>
    
    </div>
  </div>  
    
    
    
    
  </div>
</template>
<script>
  export default {
    props: ['services'],
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {},
    computed: {},
    methods: {
      toDetail (val) {
        this.$router.push('/serviceDetail/' + val)
      }
    }
  }
</script>
<style>
  .companyServiceSummary{
    width:100%;    
    padding:0 10px;    
  }
  .companyServiceSummaryBox{
    border:1px solid #ebebeb;
    margin-top:10px;
  }
  .companyServiceSummary img{
    display: block;
  }
  .companyServiceSummary h4{
    font-size: 18px;
    color:#083C6F;
    height:50px;
    line-height: 50px;
    padding-left:20px;
  }
  .son1List img{
    width:225px;
    height:120px;
    margin:10px;
    cursor:pointer;
  }
  .son1Title{
    bottom:10px;
    left:10px;
    height:30px;
    line-height: 30px;
    text-align: center;
    width:225px;
    overflow: hidden;
    background:rgba(255,255,255,.5);
    display: block;
    font-weight: bold;
    font-size: 12px;
    color:#000;
  }
  .sonFirst img{
    width:225px;
    height:260px;
  }
  .sonFirst .son1Title{
    height:65px;
    line-height: 65px;
  }
  .son3First img{
    width:470px;
    height:260px;
  }
  .son3First .son1Title{
    width:470px;
    height:65px;
    line-height: 65px;
  }
  .son4First .son1Title{
    width:960px;
    height:65px;
    line-height: 65px;
  }
  .son4 img{
    width:960px;
    height:260px;
  }
</style>
