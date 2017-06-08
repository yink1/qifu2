<template>
  <div class="sele_list">
    <div class="service_sum">
      <span class="sele_list_title">服务项目：</span>
      <ul class="sele_list_top sele_list_obj" >
        <li v-for="label in serviceLableList" @click="setActived(label.id)" :class="{selected_lable:label.actived}">
          <a href="javascript:;">{{label.name}}</a>
        </li>
      </ul>
    </div>
    <div class="service_more">
      <span class="sele_list_title">服务子项：</span>
      <ul class="sele_list_bottom sele_list_obj">
        <li v-for="(child, index) in childLableList" @click="setChildActived(child.id,index)" :class="{selected_lable:child.actived}">
          <a href="javascript:;">{{child.name}}</a></li>
      </ul>
      <a class="omit_more load_more1" v-if="showMore" href="javascript:;">收起</a>
    </div>
    <div v-if="address" class="service_more service_address">
      <span class="sele_list_title">地点：</span>
      <ul class="sele_list_bottom sele_list_obj">
        <li v-for="child in childLableList" @click="setChildActived(child.id)" :class="{selected_lable:child.actived}">
          <a href="javascript:;">{{child.name}}</a></li>
      </ul>
      <a class="omit_more load_more2" href="javascript:;" @click='more()'>更多</a>
    </div>
    <div class="list_checked_pop" v-if='popShow'>
        <mu-checkbox label="132135" class="demo-checkbox"/><br/>
        <mu-checkbox label="153151356" class="demo-checkbox"/><br/>
        <div>
          <mu-flat-button slot="actions" @click="close" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="close" label="保存"/>
        </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import labelService from '@/services/labelService'
  export default {
    data () {
      return {
        render: 0,
        renderj: 0,
        renderList: [
        ],
        popShow: false,
        childLableList: [],
        serviceLableList: []
      }
    },
    props: ['address', 'showMore'],
    created () {
      this.clearActived()
      labelService.getServiceLabel({id: 0, includeChind: true})
        .then(response => {
          this.serviceLableList = response.data
          console.log('this.serviceLableList')
          console.log(this.serviceLableList)
          this.childLableList = this.serviceLableList[0].child
          this.serviceLableList[0].actived = true
          this.childLableList[0].actived = true
        })
    },
    mounted () {},
    computed: {},
    methods: {
      select (e) {
        console.log(e)
        this.clearActived()
      },
      clearActived () {
        for (var i = 0; i < this.serviceLableList.length; i++) {
          this.serviceLableList[i].actived = false
          for (var j = 0; j < this.serviceLableList[i].child.length; j++) {
            this.serviceLableList[i].child[j].actived = false
          }
        }
      },
      setActived (val) {
        this.clearActived()
        for (var i = 0; i < this.serviceLableList.length; i++) {
          if (this.serviceLableList[i].id === val) {
            this.serviceLableList[i].actived = true
            this.childLableList = this.serviceLableList[i].child
            this.childLableList[0].actived = true
          }
        }
      },
      setChildActived (val, i) {
        this.popShow = true
        for (var j = 0; j < this.childLableList.length; j++) {
          this.$set(this.childLableList[j], 'actived', false)
          if (this.childLableList[j].id === val) {
            this.$set(this.childLableList[j], 'actived', true)
          }
        }
        console.log(i)
        if (i > 3) {
          console.log('11111')
          console.log($('.list_checked_pop').html())
          $('.list_checked_pop').html()
        }
        this.childLableList.sort()
      },
      more () {
        console.log($('.load_more1'))
      },
      close () {
        this.popShow = false
      }
    }
  }
</script>
<style>
.sele_list{
  background-color: #f4f4f4;
  width: 480px;
  position: relative;
}
.sele_list .service_sum,.service_more{
  clear: both;
  position: relative;
}
.sele_list_top{
  height: 40px;
  float:right;
}
.sele_list_obj li,.omit_more{
  float: left;
  margin:4px 2px;
  width: 94px;
  text-align: center;  
}
.sele_list_obj li a,.omit_more{
  display: block;
  line-height: 32px;
  color: #2d2d2d;
  height: 32px;
  overflow: hidden;
  font-size: 14px;
}
.sele_list_title{
  width: 72px;
  display: block;
  float: left;
  line-height: 32px;
  font-size: 14px;
  color: #898989;
  margin:4px 0 4px 6px;
  text-align: -webkit-auto;
}
.sele_list_bottom{
  float:right;
  width:392px;
}
/*选中后的状态*/
.sele_list_obj .selected_lable a,.omit_more{
  color: #fff;
  background-color: #ffaa00;
  border-radius:20px ;
}
.sele_list_obj  a:hover,.omit_more:hover{
  color: #fff;
  background-color: #ffbb33;
  border-radius:20px ;
}
.omit_more{
  position: absolute;
  right: 10px;
  top: 0;
  width: 74px;
  padding: 0 24px 0 14px;
}
.load_more1{
  background: #ffbb00 url(../../../static/image/service_omit.png) 50px center no-repeat;
}
.load_more2{
    background: #ffbb00 url(../../../static/image/service_more.png) 50px center no-repeat;
}
/*子组件弹*/
.sele_list .list_checked_pop{
  padding-left: 16px;
  width: 470px;
  border: 1px solid #ffaa00;
  max-height: 240px;
  background-color: #fff;
  position: absolute;
  top: 85px;
  left: 5px;
  z-index: 999;
}
.pop2{
  top: 125px !important
}
.list_checked_pop .mu-checkbox,.list_checked_pop .mu-checkbox-wrapper{
  height: 40px;
  line-height: 40px;
}
.list_checked_pop div{
  float: right;
}
</style>
