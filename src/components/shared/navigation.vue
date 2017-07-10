<template>
  <div id="navigation">
    <h4 class="clearfix">
      <span class="fl">{{title}}</span>
      <div  class="fl flDiv" v-for='(it,i) in navbarList'>
        <span class="spanColor">></span>
        <span class="listColored" :class="{'listColor': i == navbarList.length-1}">{{it}}</span>
      </div>
    </h4>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: ['title', 'navbarList'],
    created () {},
    mounted () {},
    computed: {},
    methods: {}
  }
</script>
<style>
  #navigation{
    padding: 10px 0;
  }
  .listColored{
   margin-left:15px;
  }
 .listColor{
   color:#083c6f;
   
 }
 * 清除浮 动*/
  
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
  .flDiv{
    margin-left:15px;
  }
  .spanColor{
    color:#bcbcbc;    
  }
</style>
