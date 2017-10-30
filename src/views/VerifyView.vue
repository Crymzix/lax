<template>
  <div class="root">
  </div>
</template>

<script>
import { verifyEmailToken } from '../api'

export default {
  name: 'verify',
  data () {
    //
  },
  mounted () {
    this.checkVerificationToken()
  },
  methods: {
    checkVerificationToken: function () {
      verifyEmailToken(this.$route.params.token)
        .then(() => {
          //
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }
}
</script>

<style scoped>
</style>
