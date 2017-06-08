<template>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top live_pop" :open="topPopup">
    {{noticeMsg}}
  </mu-popup>
</template>
<script>
  import { mapState } from 'vuex'
  import { showNotice } from '@/common/noticeAlertFun'
  export default {
    data () {
      return {

      }
    },
    computed: mapState({
      noticeMsg: state => state.notice.msg,
      topPopup: state => state.notice.show
    }),
    watch: {
      topPopup (val) {
        if (val) {
          setTimeout(() => {
            showNotice('')
          }, 2000)
        }
      }
    }
  }
</script>
<style>
	body .demo-popup-top.live_pop{
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  background-color: #9FBE16;
  padding: 0;
}
</style>
