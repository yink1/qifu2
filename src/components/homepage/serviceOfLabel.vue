<template>
  <div class="labelDox">
    <div class="dul clearfix">
      <a class="fl flbox" :href="'https://'+label.url">
        <h2>{{label.name}}</h2>
          <img :src="label.pic">
      </a>
      <div class="fr frbox">
        <div class="clearfix headerDiv">
          <h3 class="fl">{{label.name}}</h3>
          <!-- value是点击下划线匹配符，需要在create方法中初始化activeTab这个值，设置为第一个标签的值 -->
          <ul class="clearfix fr ulList">
          	<li class="fr" v-for="chindTab in label.child" :value="chindTab.id" :title="chindTab.name" @click="handleTabChange(chindTab.id)" :class="{'liClass': activeTab == chindTab.id}">
          	  <span>{{chindTab.name}}</span>
          	</li>
          </ul>
        </div>
        <ul class="clearfix" v-if="servicesList.length>0">
          <li class="fl"   v-for="service in servicesList" @click="jump(service.serviceId)">
            <div class="fl imgData"  >
              <img :src="service.picUrl | thumbnail('215','106')"  alt="">
              <h4 class="txleft">{{service.serviceName}}</h4>
              <div class="imgFooter">
                <img class="" src="../../../static/image/temp/companyIcon.png" height="16" width="16" >
                <span class="textUnder">{{service.companyName}}</span>
              </div>
            </div>
          </li>
        </ul>
        <ul class="clearfix imgDatapos" v-else>
          <div class="blankCon">
            <img src="../../../static/image/icon/blank.png"/>
            <h5>空空如也,去看看别的吧!</h5>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import service from '@/services/service'
  import { thumbnail } from '@/common/qiniuFun'
  export default {
    data () {
      return {
        firstBg: 0,
        activeTab: 0,
        servicesList: []
      }
    },
    props: ['label'],
    created () {
      console.log('this.serviceOfLabel.label')
      console.log(this.label)
      // 初始化activeTab这个值
      this.activeTab = this.label.child[this.label.child.length - 1].id
      console.log('this.activeTab')
      console.log(this.activeTab)
    },
    watch: {
      activeTab (val) {
        service.getServiceOfLabel(val)
        .then(response => {
          if (response.data) {
            console.log('response.data.sort(compare)')
            console.log(response.data)
            this.servicesList = response.data
            console.log(22222, this.servicesList)
          }
        })
      }
    },
    methods: {
      handleTabChange (value) {
        // 点击时同步修改activeTab这个值
        this.activeTab = value
      },
      jump (val) {
        console.log('jump val')
        console.log(val)
        this.$router.push('/serviceDetail/' + val)
      }
    },
    filters: {
      thumbnail: thumbnail
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .flbox{
    cursor:pointer;
  }
  ul li {
    list-style: none;
  }
  .textUnder{
    text-decoration: underline;
    vertical-align: bottom;
  }
    .imgDatapos .blankCon img {
    display: block;
    width: 260px;
    height: 200px;
    margin: 60px auto 20px;
}
  .labelDox {
    width: 1200px;
    margin: 0 auto;
    background:#f1f1f1;
  }
  /* 清除浮 动*/
  
  .clearfix {
    *zoom: 1;
  }
  
  .clearfix:after {
    display: table;
    content: '';
    clear: both;
  }
  
  .auto {
    width: 960px;
    margin: 0 auto;
  }
  
  .fl {
    float: left;
  }
  
  .fr {
    float: right;
  }
  
  .flbox {
    width: 270px;
    height: 422px;
    overflow: hidden;
    background: #fff;
  }
  
  .flbox img {
    width: 100%;
    height: 100%;
  }
  
  .frbox {
    width: 915px;
    padding-left: 15px;
    height: 428px;
    box-sizing: border-box;
    background:#fff;
  }
  
  .headerLi {
    margin: 0 15px;
    color: #9c9c9c;
    height: 40px;
    padding: 0 5px;
  }
  
  .headerDiv {
    height: 50px;
    line-height: 50px;
  }
  
  .imgData {
    width: 215px;
    margin-right: 10px;
    margin-top:8px;
  }
  
  .imgData>img{
    display: block;
  }
  .txleft {
    text-align: left;
    padding-left: 4px;
    
  }
  
  .imgFooter {
    font-size: 12px;
    color: #ffaa00;
    text-align: left;
    padding: 5px 0;
  }
  
  .imgFooter img {
    vertical-align: top;
    margin:0 4px;
  }
  
  .headerDiv h3 {
    color: #083c6f;
    font-size: 18px;
  }
  
  .flbox h2 {
    height: 90px;
    line-height: 90px;
    color: #47a7e4;
    text-align: center;
  }
  
  h4.txleft {
    height: 42px;
    overflow: hidden;
  }
  
  .dul {
    margin-top: 20px;
  }
  
  .ulList {
    width: 762px;
    margin-right: 20px;
    height:50px;
    overflow: hidden;
  }
  .ulList li{
    overflow: hidden;
    height:50px;
    line-height: 50px;
    text-align: center;
    margin-left:10px;   
    
  }
  .ulList li span{
    display: inline-block;
    width:100%;
    height:40px;   
    cursor:pointer;
    color:#898989;
    font-size: 14px;
    padding:0 10px;
  }
  .ulList li.liClass span{
    border-bottom:2px solid #ffaa00;
    color:#ffaa00;
  }
  .dul a:hover{
    box-shadow:-3px 0 3px rgba(0,0,0,.117647), /*左边阴影*/  
    3px 0 3px rgba(0,0,0,.117647), /*右边阴影*/  
    0 -3px 3px rgba(0,0,0,.117647), /*顶部阴影*/  
    0 3px 3px rgba(0,0,0,.117647); /*底边阴影*/ 
  }
  .labelDox .imgData:hover{
    cursor: pointer;
    transform: scale(1.02);
    box-shadow:-3px 0 3px rgba(0,0,0,.156863), /*左边阴影*/  
    3px 0 3px rgba(0,0,0,.156863), /*右边阴影*/  
    0 -3px 3px rgba(0,0,0,.156863), /*顶部阴影*/  
    0 3px 3px rgba(0,0,0,.156863); /*底边阴影*/ 
  }
</style>
