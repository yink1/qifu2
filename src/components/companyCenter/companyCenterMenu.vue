<template>
	<div id="companyCenterMenu">
		<mu-list class="mulistinfo">
    <mu-list-item class="mulistinfoed" v-for="(item,i) in mulist" :title="item.title" :value="item.value" @click="getInfo(i, item.value)" :class="{'activeColor': i == firstBg}">
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
        mulist: [{ title: '企业中心', img: '../../static/image/iconCom1.jpg', value: 'companyCenter/requirementList' },
          { title: '企业信息', img: '../../static/image/iconCom2.png', value: 'companyInfo' },
          { title: '主页管理', img: '../../static/image/iconCom3.png', value: 'homepageManagment' },
          { title: '添加服务', img: '../../static/image/iconCom4.png', value: 'serviceManagment' },
          { title: '上传资料', img: '../../static/image/iconCom5.png', value: 'docManagment' }
        ]
      }
    },
    created () {
      if (this.$route.path.indexOf('companyCenter/companyCenter') >= 0) {
        this.firstBg = 0
      } else if (this.$route.path.indexOf('companyCenter/companyInfo') >= 0) {
        this.firstBg = 1
        // this.activeTab.activeTab = '最近浏览的服务'
      } else if (this.$route.path.indexOf('companyCenter/homepageManagment') >= 0) {
        this.firstBg = 2
        // this.activeTab.activeTab = '最近浏览的资料'
      } else if (this.$route.path.indexOf('companyCenter/serviceManagment') >= 0) {
        this.firstBg = 3
        // this.activeTab.activeTab = '最近浏览的资料'
      } else if (this.$route.path.indexOf('companyCenter/docManagment') >= 0) {
        this.firstBg = 4
        // this.activeTab.activeTab = '最近浏览的资料'
      }
    },
    watch: {
      $route (to, from) {
        if (to.path.indexOf('companyCenter/companyCenter') >= 0) {
          this.firstBg = 0
        } else if (to.path.indexOf('companyCenter/companyInfo') >= 0) {
          this.firstBg = 1
          console.log(555)
        } else if (to.path.indexOf('companyCenter/homepageManagment') >= 0) {
          this.firstBg = 2
        } else if (to.path.indexOf('companyCenter/serviceManagment') >= 0) {
          this.firstBg = 3
        } else if (to.path.indexOf('companyCenter/docManagment') >= 0) {
          this.firstBg = 4
        }
          // vm.get(
        // this.dataLenth = this.dataInfo.data.length
      }
    },
    mounted () {},
    computed: {
    },
    methods: {
      getInfo (e, val) {
        this.firstBg = e
        this.$router.push({ path: '/companyCenter/' + val })
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
