<template>
  <div class="companyCenter fr homepageBox">
    <upload :docId="this.$route.params.docId"></upload>
  </div>
</template>
<script>
  import upload from '@/components/doc/docManagment'
  export default {
    props: ['DocId'],
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
      this.value = 50
    },
    computed: {
    },
    methods: {
    },
    validations: {
    },
    components: {
      upload
    }
  }
</script>
