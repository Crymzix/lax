<template>
  <div class="login">
    <div class="background_container">
      <div class="left_container">
        <div class="left_container_left_diagonal"></div>
        <div class="left_container_right_diagonal"></div>
        </div><div class="right_container">
          <div class="left_diagonal"></div>
          <div class="right_diagonal"></div>
        </div>
    </div>
    <div id="login_form" class="slide-up-fade-in">
      <h1>
        Sign in
      </h1>
      <input v-model="email" type="text" placeholder="Email" class="text_field"></input>
      <input v-model="password" type="password" placeholder="Password" class="password_field"></input>
      <p id="error_message">{{ errorMessage }}</p>
      <button v-on:click="login" type="button" class="login_button" v-bind:class="{ inactive: state == 'signingIn' || state == 'signedIn' }">{{ loginButtonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: '',
      state: 'signedOut'
    }
  },
  methods: {
    login: function () {
      this.errorMessage = ''
      this.state = 'signingIn'
      if (this.email === '') {
        this.errorMessage = 'Please input an email'
        this.state = 'signedOut'
        return
      }
      if (this.password === '') {
        this.errorMessage = 'Please input a password'
        this.state = 'signedOut'
        return
      }
      this.$store.dispatch('LOGIN', {
        email: this.email,
        password: this.password }).then(() => {
          this.state = 'signedIn'
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 1000)
        }).catch((error) => {
          this.errorMessage = error.message
          this.state = 'signedOut'
        })
    }
  },
  computed: {
    loginButtonText: function () {
      if (this.state === 'signedOut') {
        return 'Login'
      } else if (this.state === 'signingIn') {
        return 'Logging In...'
      } else if (this.state === 'signedIn') {
        return 'Success'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_button {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #25ad88;
  width: 100px;
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

.login_button:hover {
  background: #178b6b;
}

.login_button.inactive {
  background: #178b6b;
  pointer-events: none;
}

#login_form {
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

.text_field, .password_field {
  font-size: 15px;
  color: #3d83f4;
  width: auto;
  height: 40px;
  padding: 12px 15px;
  box-sizing: border-box;
  border: 1px solid #003a99;
  border-radius: 5px;
  outline: none;
}

.password_field {
  margin-top: 10px;
  margin-bottom: 20px;
}

h1 {
  font-family: 'Roboto', sans-serif;
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
}

#error_message {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  color: #d75a4a;
  font-family: 'Roboto', sans-serif;
}

.background_container {
  position: fixed;
  height: 100%;
  width: 100%;
  white-space: nowrap;
}

.left_container {
  display: inline-block;
  *display: inline;
  height: 100vh;
  width: 30vw;
  background-image: linear-gradient(0deg, #24d1ff 45%, #FF6105);
}

.left_container_right_diagonal {
  z-index: 0;
  height: 100vh;
  width: 30vw;
  background: linear-gradient(-55deg, #086BFF 60%, transparent 60%);
}

.left_container_left_diagonal {
  z-index: 1;
  height: 100vh;
  width: 30vw;
  position: absolute;
  background: linear-gradient(50deg, #0352c7 30%, transparent 30%);
}

.right_container {
  display: inline-block;
  *display: inline;
  height: 100vh;
  width: 70vw;
  background: #FF6105;
  background-image: linear-gradient(0deg, #24d1ff 45%, #FF6105);
}

.left_diagonal {
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 70vw;
  background: linear-gradient(45deg, #086BFF 50%, transparent 50%);
}

.right_diagonal {
  z-index: 0;
  height: 100vh;
  width: 70vw;
  background: linear-gradient(-35deg, #247BFF 50%, transparent 50%);
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
  opacity: 1\9;
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

body {
  margin: 0;
}
</style>
