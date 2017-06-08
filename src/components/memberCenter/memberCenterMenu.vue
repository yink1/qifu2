<template>
  <div id="companyCenterMenu">
    <mu-list class="mulistinfo">
    <mu-list-item class="mulistinfoed" v-for="(item,i) in mulist" :title="item.title" @click="getInfo(i,item)" :class="{'activeColor': i == firstBg}">
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
        firstBg: 0,
        mulist: [{ title: '个人中心', img: '../../static/image/icon/people.png' },
          { title: '收藏夹', img: '../../static/image/icon/favourite.png' },
          { title: '上传/下载资料', img: '../../static/image/icon/doc.png' },
          { title: '客服消息', img: '../../static/image/icon/message.png' }
        ]
      }
    },
    created () {
      const num = this.number
      this.mulist.map(e => {
        if (e.num === undefined && e.title === '客服消息') {
          e.num = num
        }
      })
    },
    mounted () {},
    computed: {
    },
    methods: {
      getInfo (e, item) {
        this.firstBg = e
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
