<template>
  <div class="companyFavorite">
    <img src="../../../static/image/blogro_icon1.png"/>
    <a href="javascript:;" class="favorite">收藏</a>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .companyFavorite{
    width:106px;
    height: 106px;
    position:relative;
    border-radius: 4px;
    padding-top: 4px;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
    background-color: #fff;
  }
  .companyFavorite img{
    display: block;
    height: 64px;
    width:100px;
    margin:0 3px 10px;
  }
  .companyFavorite .favorite{
    border-radius:20px;
    width: 80px;
    height: 22px;
    display: block;
    padding-left:31px;
    color: #fff;
    margin-left: 13px;
    background:#ffaa00 url(../../../static/image/icon/sc_null.png) no-repeat 14px 3px;
    background-size: 14px;
    font-size: 12px;
    line-height:22px;
  }
</style>
