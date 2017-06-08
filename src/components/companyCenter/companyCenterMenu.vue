<template>
	<div id="companyCenterMenu">
		<mu-list class="mulistinfo">
    <mu-list-item class="mulistinfoed" v-for="(item,i) in mulist" :title="item.title" @click="getInfo(i,item)" :class="{'activeColor': i == firstBg}">
      <img slot="left" :src="item.img" alt="" />
    </mu-list-item>
  </mu-list>
	</div>
</template>
<script>
  export default {
    data () {
      return {
        firstBg: 0,
        mulist: [{ title: '企业中心', img: '../../static/image/iconCom1.jpg' },
          { title: '企业信息', img: '../../static/image/iconCom2.png' },
          { title: '主页管理', img: '../../static/image/iconCom3.png' },
          { title: '添加服务', img: '../../static/image/iconCom4.png' },
          { title: '上传资料', img: '../../static/image/iconCom5.png' },
          { title: '密码设置', img: '../../static/image/iconCom6.png' }
        ]
      }
    },
    created () {},
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
</style>
<style>
  #companyCenterMenu{
    background-color: #fff;
  }
</style>
