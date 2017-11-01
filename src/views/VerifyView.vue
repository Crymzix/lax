<template>
  <div class="root">
    <div class="background_container">
    </div>
    <div id="verify_form" class="slide-up-fade-in">
      <h1>{{ verificationText }}</h1>
      <button v-if="isExpired" v-on:click="resendVerification" class="resend_button" v-bind:class="{ inactive: verificationSent }">{{ resendText }}</button>
    </div>
  </div>
</template>

<script>
import {
  verifyEmailToken,
  resendVerificationEmail
} from '../api'

export default {
  name: 'verify',
  data () {
    return {
      verificationText: 'Verifying...',
      resendText: 'Resend Verification Email',
      isExpired: false,
      verificationSent: false,
      isTokenValid: false
    }
  },
  mounted () {
    this.checkVerificationToken()
  },
  methods: {
    checkVerificationToken: function () {
      verifyEmailToken(this.$route.params.token)
        .then((response) => {
          var data = response.data
          if (data === 'Success') {
            this.isExpired = false
            this.isTokenValid = true
            this.verificationText = 'Success!'
            this.$router.push({ path: '/account/' + this.$route.params.token })
          } else if (data === 'Expired') {
            this.isExpired = true
            this.verificationText = 'Verification link expired.'
          }
        })
        .catch((error) => {
          this.verificationText = 'Invalid verification link.'
          console.log(error.message)
        })
    },
    resendVerification: function () {
      this.verificationSent = true
      this.verificationText = 'Sending verification email...'
      resendVerificationEmail(this.$route.params.token)
        .then((response) => {
          this.verificationText = 'Verification link resent.'
          console.log(response)
        })
        .catch((error) => {
          this.verificationText = 'Invalid verification link.'
          console.log(error.message)
        })
    }
  }
}
</script>

<style scoped>

h1 {
  font-family: 'Roboto', sans-serif;
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
}

.resend_button {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #25ad88;
  padding-left: 15px;
  padding-right: 15px;
  width: auto;
  height: 50px;
  color: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  -o-transition:color .2s ease-out, background .2s ease-in;
  -ms-transition:color .2s ease-out, background .2s ease-in;
  -moz-transition:color .2s ease-out, background .2s ease-in;
  -webkit-transition:color .2s ease-out, background .2s ease-in;
  transition:color .2s ease-out, background .2s ease-in;
}

.resend_button:hover {
  background: #178b6b;
}

.resend_button.inactive {
  background: #178b6b;
  pointer-events: none;
}

#verify_form {
  z-index: 10;
  margin-top: 25vh;
  margin-left: 41vw;
  margin-right: 41vw;
  position: absolute;
  width: 18vw;
  height: auto;
  background: #ffffff;
  border: 1px solid #003a99;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
}

.background_container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: url('../assets/background.svg');
  background-size: cover;
}

/*Animations for the form.*/
.slide-up-fade-in {
  animation: slide-up-fade-in ease 1s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  animation-fill-mode:forwards; /*when the spec is finished*/
  -webkit-animation: slide-up-fade-in ease 1s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -webkit-animation-fill-mode:forwards; /*Chrome 16+, Safari 4+*/
  -moz-animation: slide-up-fade-in ease 1s;
  -moz-animation-iteration-count: 1;
  -moz-transform-origin: 50% 50%;
  -moz-animation-fill-mode:forwards; /*FF 5+*/
  -o-animation: slide-up-fade-in ease 1s;
  -o-animation-iteration-count: 1;
  -o-transform-origin: 50% 50%;
  -o-animation-fill-mode:forwards; /*Not implemented yet*/
  -ms-animation: slide-up-fade-in ease 1s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
  -ms-animation-fill-mode:forwards; /*IE 10+*/
  opacity:0;
}

@keyframes slide-up-fade-in{
    0% {
        opacity:0;
        transform:  translate(0px,40px)  ;
    }
    100% {
        opacity:1;
        transform:  translate(0px,0px)  ;
    }
}

@-moz-keyframes slide-up-fade-in{
    0% {
        opacity:0;
        -moz-transform:  translate(0px,40px)  ;
    }
    100% {
        opacity:1;
        -moz-transform:  translate(0px,0px)  ;
    }
}

@-webkit-keyframes slide-up-fade-in {
    0% {
        opacity:0;
        -webkit-transform:  translate(0px,40px)  ;
    }
    100% {
        opacity:1;
        -webkit-transform:  translate(0px,0px)  ;
    }
}

@-o-keyframes slide-up-fade-in {
    0% {
        opacity:0;
        -o-transform:  translate(0px,40px)  ;
    }
    100% {
        opacity:1;
        -o-transform:  translate(0px,0px)  ;
    }
}

@-ms-keyframes slide-up-fade-in {
    0% {
        opacity:0;
        -ms-transform:  translate(0px,40px)  ;
    }
    100% {
        opacity:1;
        -ms-transform:  translate(0px,0px)  ;
    }
}

html, body {
  margin: 0px;
  padding: 0px;
}
</style>
