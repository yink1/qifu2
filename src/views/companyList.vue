<template>
  <div id="companyList">
    <div class="companyHeader">
        <img src="../../static/image/companyHeader.jpg"/>
    </div>
    <div class="mainWraap">
      <div class="outLine">
      <div class="mainWraapNav">
        <mu-tabs class="" :value="activeTab" @change="handleTabChange">
            <mu-tab v-for="(it,i) in companyList" :value="it" :title="it" :key="i"/>
        </mu-tabs>
      </div>
      </div>
      <div class="mainCon">
        <ul class="clearfix">
        	<li class="fl por demoLi" v-for='(it,i) in imgList'>
        	  <mu-paper class="demo-paper" :zDepth="2" title="1234"/>
            <img class="poa topImg" :src="it.imgurl" alt="" />
            <h3 class="poa bottomH">{{it.name}}</h3>
            <div class="showInfo poa">
              <h4>公司简介</h4>
              <p>{{it.intruduce}}</p>
              
              <div class="por " @click="changShow(i)" :key='i'>
                <div class="por" v-if = "it.favourite == 0">
                <mu-raised-button class="demo-raised-button" label="收藏企业" primary/>
                <img class="poa whiteStar" src="../../static/image/favourite.png" alt="" />
                </div>
                <div class="por" v-else>
                  <mu-raised-button class="demo-raised-button" label="已收藏" primary />
                  <img class="poa whiteStar" src="../../static/image/favourited.png" alt=""/> 
                </div>                
              </div>
            </div>
        	</li>
        </ul>        
      </div>
      <div class="buttonBottom">
        <div class="demo-button">加载更多</div>
      </div>
      
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        index: 11111111111111,
        vShow: true,
        activeTab: '全部',
        companyList: ['全部', '多渠道营销', '医学服务', '培训咨询', '技术支持'],
        imgList: [
          {imgurl: '../../static/image/temp/friend01.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend02.jpg', name: '丁香园', favourite: 1, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend03.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend04.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend05.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend06.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend07.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend08.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend09.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend01.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend01.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'},
          {imgurl: '../../static/image/temp/friend01.jpg', name: '丁香园', favourite: 0, intruduce: '紫色医疗，专注于患者教育，根据企业需求定制解决方案，产品简单易用，针对性开展患者教育和医生激励，从而提高患者的依从性。'}
        ]
      }
    },
    created () {},
    mounted () {},
    computed: {},
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      changShow (i) {
        this.index = this.i
        this.imgList[i].favourite = !this.imgList[i].favourite
      }
    }
  }
</script>
<style>
  #companyList .mu-raised-button.mu-raised-button-inverse {
    color: #083c6f;
    width: 86%;
    color:#fff;
    text-indent: 1em;
  }
  #companyList .mainWraapNav span.mu-tab-link-highlight {
    background-color: #083c6f!important;
  }
  .whiteStar{
    left:40px;
    top:8px;
  }
  .showInfo{
    text-align: center;
    width:202px;
    height:220px;
    top:-10px;
    left:-10px;
    background:#fff;
    border:1px solid #ccc;
    padding:10px;
    display: none;
    opacity: 1.6;
    border-radius: 4px;
    z-index: 222;
    box-shadow:-3px 0 3px rgba(0,0,0,.117647), /*左边阴影*/  
    3px 0 3px rgba(0,0,0,.117647), /*右边阴影*/  
    0 -3px 3px rgba(0,0,0,.117647), /*顶部阴影*/  
    0 3px 3px rgba(0,0,0,.117647); /*底边阴影*/ 
  }
  .showInfo p{
    font-size: 14px;
    line-height: 20px;
    color:#7a7a7a;
    text-align: left;
    margin-bottom:10px;
    width:180px;
    height:120px;
    overflow: hidden;
  }
  .outLine{
    border-bottom:1px solid #ccc;
    width:100%;
    height:49px;
  }
  .companyHeader img{
    width:100%;
    height:auto;
  }
  .mainWraap{
    width:920px;
    padding-bottom:20px;
    margin:0 auto;
    font-weight: bold;
    font-size: 16px;
  }
  #companyList .mainWraapNav{
    width:550px;
  }
  .mu-tab-text{
    font-size: 16px;
  }
  .mainCon{
    padding-top:10px;
  }
  .demoLi:hover .showInfo{
    display: block;
  }
  .demoLi{
    height: 170px;
  width: 185px;
  margin-right: 60px;
  margin-top:20px;
  }
  .demoLi:hover{
    cursor:pointer;
  }
  .demoLi:nth-child(4n+4){
    margin-right:0;
  }
  .demo-paper {    
  display: inline-block;
  width:100%;
  height:100%;
  text-align: center;
}
  .bottomH{
    width:100%;
    bottom:0;
    text-align: center;
    height:50px;
    line-height: 50px;
  }
  .topImg{
    left:14px;
    top:14px;
    width:157px;
    height:106px;
  }
  .demo-button{
    display: inline-block;
    margin-top:60px;
    width:200px;
    height:50px;
    line-height: 50px;
    text-align: center;
    box-shadow:-3px 0 3px #ccc, /*左边阴影*/  
    3px 0 3px #ccc, /*右边阴影*/  
    0 -3px 3px #ccc, /*顶部阴影*/  
    0 3px 3px #ccc; /*底边阴影*/ 
  }
  .demo-button:hover{
    cursor:pointer;
  }
  #companyList .buttonBottom{
    width:100%;
    text-align: center;
  }
</style>
