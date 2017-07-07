<template>
  <div class="RegisterStep RegisterStep1">
    <compNavigation :activeStep="activeStep"></compNavigation>
    <companyInfo></companyInfo>
  </div>
</template>
<script>
import compNavigation from '@/components/shared/compNavigation'
import companyInfo from '@/components/companyCenter/companyInfo'
export default {
  data () {
    return {
      activeStep: 1
    }
  },
  computed: {},
  components: {
    compNavigation,
    companyInfo
  },
  methods: {}
}
</script>
<style>
.RegisterStep1 .companyInfo{display: none;}
</style>
