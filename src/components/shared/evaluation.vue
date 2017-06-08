<template>
  <ul class="evaluation">
    <li><a href="javascript:;" class="u_like">{{udo.like}}</a></li>
    <li><a href="javascript:;" class="u_unlike">{{udo.unlike}}</a></li>
    <li><a href="javascript:;" class="u_favor">{{udo.favor}}</a></li>
    <li><a href="javascript:;" class="u_review"></a></li>
  </ul>
</template>
<script>
  export default {
    data () {
      return {
        udo: {
          like: '10',
          unlike: '1',
          favor: '20'
        }
      }
    }
  }
</script>
<style>
.evaluation{
  display: block;
  width: 390px;
  height: 40px;
  padding-left: 20px;
} 
.evaluation li{
  display: block;
  float: left;
  width: 76px;
  height: 40px;
  margin-right: 10px;
}
.evaluation li a{
  display: block;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  color: #fff;
}
.evaluation li a:hover{
  color: #ffaa00;
}
.u_like{
  background: url(../../../static/image/icon/like.png) left center no-repeat;
}
.u_like:hover{
  background: url(../../../static/image/icon/like_active.png) left center no-repeat;
}
.u_unlike{
  background: url(../../../static/image/icon/unlike.png) left center no-repeat;
}
.u_unlike:hover{
  background: url(../../../static/image/icon/unlike_active.png) left center no-repeat;
}
.u_favor{
  background: url(../../../static/image/icon/sc_null.png) left center no-repeat;
}
.u_favor:hover{
  background: url(../../../static/image/icon/sc_active.png) left center no-repeat;
}
.u_review{
  background: url(../../../static/image/comment_icon.png) 19px center no-repeat;
}

</style>
