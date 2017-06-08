<template>
  <div>
    <mu-dialog :open="dialog" :title="alertTitle">
      {{alertMsg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close" />
    </mu-dialog>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { showAlert } from '@/common/noticeAlertFun'
  export default {
    data () {
      return {

      }
    },
    computed: mapState({
      alertMsg: state => state.alert.msg,
      alertTitle: state => state.alert.title,
      dialog: state => state.alert.show
    }),
    methods: {
      close () {
        showAlert('', '')
      }
    }
  }
</script>
