<template>
  <div id="companyCenterMenu">
    <mu-list class="mulistinfo">
    <mu-list-item class="mulistinfoed" v-for="(item,i) in mulist" :title="item.title" @click="getInfo(i,item.value)" :class="{'activeColor': i == firstBg.firstBg}">
      <img slot="left" :src="item.img" alt="" />
      <div class="node" v-if="item.num">( <span >{{item.num}}</span> )</div>
    </mu-list-item>
  </mu-list>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        number: 4,
        mulist: [{ title: '个人中心', img: '../../static/image/icon/people.png', value: '/memberCenter/history/requetHistoryList' },
          { title: '收藏夹', img: '../../static/image/icon/favourite.png', value: '/memberCenter/memberFavorites/favoriteCompanyList' },
          { title: '上传/下载资料', img: '../../static/image/icon/doc.png', value: '/memberCenter/memberDoc/docDownloadList' },
          { title: '上传资料', img: '../../static/image/iconCom5.png', value: '/memberCenter/memberDocUpload' },
          { title: '客服消息', img: '../../static/image/icon/message.png' }
        ]
      }
    },
    props: ['firstBg'],
    created () {
      const num = this.number
      this.mulist.map(e => {
        if (e.num === undefined && e.title === '客服消息') {
          e.num = num
        }
      })
    },
    computed: {
    },
    methods: {
      getInfo (e, val) {
        this.firstBg.firstBg = e
        this.$router.push({ path: val })
        console.log(999, this.firstBg)
      }
    }
  }
</script>
<style lang='less' scoped>
.mu-list.mulistinfo{
  width:240px;
  border:1px solid #ccc;
}
.mulistinfo .node{
  width:30px;
  height:20px;
  display: inline-block;
  position: absolute;
  right:50px;
  top:12px;

}
.mulistinfo span{
  color:red;
}
.activeColor{
  background:#e6e6e6
}
.mulistinfoed:hover{
  background:#e6e6e6
}
.mulistinfo .node{
    width: 30px;
    height: 20px;
    display: inline-block;
    position: absolute;
    right: 60px;
    top: 13px;
}
.mulistinfo .node span{
  color:#ffaa00;
  text-decoration: underline;
}
</style>
