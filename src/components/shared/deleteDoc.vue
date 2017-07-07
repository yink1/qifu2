<template>
  <div class="dialog deleteDoc" v-if='dialog.value'>
    <div class="require_content">    
      <h5>提示</h5>
      <p>你确定删除该资料？</p>
      <mu-flat-button slot="actions" @click="close" primary label="取消" class='nosure'/>
      <mu-flat-button slot="actions" primary @click="sure(id)" label="确定"/>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
  import docService from '@/services/docService'
  export default {
    props: ['dialog', 'id'],
    methods: {
      close () {
        this.dialog.value = false
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementsByTagName('html')[0].style.overflow = 'auto'
      },
      sure (e) {
        this.dialog.value = false
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementsByTagName('html')[0].style.overflow = 'auto'
        docService.DeleteDoc({id: e})
        .then(response => {
          console.log('DeleteDoc')
          console.log(response)
        })
      }
    }
  }
</script>
<style>
  .deleteDoc{
   background-color: rgba(0,0,0,.3);
  }
  .deleteDoc .require_content{
    width: 450px;
  }
  .deleteDoc h5{
    font-size: 22px;
    color: #2d2d2d;
  }
  .deleteDoc p{
    font-size: 16px;
    color: #444;
    margin: 15px 0 20px 0;
  }
  .nosure{
    margin-left: 220px !important;
  }
</style>
