<template>
  <div id="video_container">
    <button id="pickfiles1">上传视频1</button>
    <button id="pickfiles2">上传视频2</button>
    <upload :browse_button='browse_button1' :uptoken='uptoken2' :domain='domain1' :bucket_name='bucket_name1'>
    </upload>
    <upload :browse_button='browse_button2' :uptoken='uptoken2' :domain='domain2' :bucket_name='bucket_name2'>
    </upload>
  </div>
</template>

<script>
  import Upload from '@/components/Upload'

  var config = {
    bucket_name: 'siqiquanporduction',
    domain: 'http://cdn.thinkwit.com/',
    uptoken: 'qbd_z8rrFpy5hNCPc-g8Csl_IULm7WIIzQSrpiTz:vAt8S5wTQO5dfZvlXixNoEqwSFI=:eyJzY29wZSI6InNpcWlxdWFucG9yZHVjdGlvbiIsImRlYWRsaW5lIjoxNDk2NjYzNzIxLCJpbnNlcnRPbmx5IjowLCJkZXRlY3RNaW1lIjowLCJmc2l6ZUxpbWl0IjowLCJmc2l6ZU1pbiI6MCwiY2FsbGJhY2tGZXRjaEtleSI6MH0='
  }

  export default {
    data () {
      return {
        browse_button1: 'pickfiles1',
        browse_button2: 'pickfiles2',
        uptoken1: config.uptoken,
        uptoken2: config.uptoken,
        domain1: config.domain,
        domain2: config.domain,
        bucket_name1: config.bucket_name,
        bucket_name2: config.bucket_name
      }
    },
    components: {
      Upload
    }
  }
</script>

<style>

</style>
