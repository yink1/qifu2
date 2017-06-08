<template>
  <div id="app">
    <noticePop></noticePop>
    <alertDialog></alertDialog>
    <myNavBar></myNavBar>
    <alertDialog></alertDialog> 
    <router-view></router-view>
    <footerBar></footerBar>
  </div>
</template>

<script>
import noticePop from '@/components/shared/noticePop'
import alertDialog from '@/components/shared/alertDialog'
import myNavBar from '@/components/navBar'
import footerBar from '@/components/footerBar'
export default {
  components: {
    noticePop: noticePop,
    alertDialog: alertDialog,
    myNavBar: myNavBar,
    footerBar: footerBar
  },
  mounted () {
    var height = document.documentElement.clientHeight
    localStorage.bodyHeight = height
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
  width:100%;
  height:100%;
}
</style>
