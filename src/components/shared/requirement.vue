<template>
  <div class="require">
    <p class="require_title">请留下您的需求与联系方式，客服将于1小时内与您联系！</p>
    <form class="require_describe">
      <mu-text-field hintText="需求描述"  multiLine :rows="3":rowsMax="3"/><br/>
      <mu-text-field hintText="姓名"/><br/>
      <mu-text-field hintText="公司"/><br/>
      <mu-text-field hintText="联系方式" :errorText="inputErrorText" v-on:blur="handleInputTelephone"/><br/>
      <div class="require_submit">
       <mu-raised-button class="demo-raised-button require_button" label="发布需求"/>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        inputErrorText: ''
      }
    },
    methods: {
      handleInputTelephone (tele) {
        var reform = /^1[3|4|5|8][0-9]\d{4,8}$/
        this.inputErrorText = reform.test(tele) ? '' : '手机号输入有误'
      }
    }
  }
</script>
<style>
  .require{
    width: 256px;
    height: 380px;
    background-color: #fff;
    padding:16px 0;
  }
  .require_title{
    line-height: 20px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
    margin-bottom: 8px;
  }
  .require_describe .mu-text-field{
    width:236px;
    margin:0 10px;
  }
  .require_describe .mu-text-field-input{
    color:#898989;
  }
  .require .mu-text-field.focus-state{
    color: #444 !important;
  }
  .require_submit{
    width: 100%;
    padding: 0 10px;
    margin-top: 20px;
  }
  .require_button{
    width: 100%;
  }
</style>
