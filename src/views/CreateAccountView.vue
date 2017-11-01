<template>
  <div class="account">
    <div class="background_container">
    </div>
    <div id="account_form" class="slide-up-fade-in">
      <h1>Create Account</h1>
      <div>
        <div id="display_name" class="input_container">
          <input v-model="displayName" type="text" placeholder="Display name (no spaces)" class="text_field"></input>
        </div>
        <div id="password" class="input_container">
          <input v-model="password" type="password" placeholder="Password" class="password_field"></input>
          <img v-if="password !== '' && isPasswordValid" class="icon" src="~../assets/success.png">
          <img v-if="password !== '' && !isPasswordValid" class="icon" src="~../assets/error.png">
        </div>
        <div id="verify_password" class="input_container">
          <input v-model="verifyPassword" type="password" placeholder="Verify password" class="password_field"></input>
          <img v-if="verifyPassword !== '' && doesPasswordMatch" class="icon" src="~../assets/success.png">
          <img v-if="verifyPassword !== '' && !doesPasswordMatch" class="icon" src="~../assets/error.png">
        </div>
        <button v-on:click="setUserAccount" type="button" class="create_button" v-bind:class="{ inactive: state === 'creating' || state === 'created' }" >{{ createButtonText }}</button>
        <p id="error_message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  setAccount
} from '../api'

export default {
  name: 'create_account',
  data () {
    return {
      isPasswordValid: false,
      doesPasswordMatch: false,
      displayName: '',
      password: '',
      verifyPassword: '',
      createButtonText: 'Create',
      errorMessage: '',
      state: 'uninitialized'
    }
  },
  methods: {
    setUserAccount: function () {
      this.errorMessage = ''
      this.state = 'creating'
      if (this.displayName === '') {
        this.errorMessage = 'Please provide a display name.'
        this.state = 'uninitialized'
        return
      }
      if (this.isPasswordValid && this.doesPasswordMatch) {
        setAccount(this.$route.params.token, this.displayName, this.password)
          .then(() => {
            this.state = 'created'
            this.$router.push({ path: '/login' })
          })
          .catch((error) => {
            this.errorMessage = error.message
            this.state = 'uninitialized'
          })
      } else {
        this.state = 'uninitialized'
      }
    }
  },
  watch: {
    displayName: function (displayName) {
      this.displayName = displayName.replace(/ /g, '')
    },
    password: function (password) {
      this.isPasswordValid = password.length >= 8
      this.doesPasswordMatch = this.verifyPassword === password
    },
    verifyPassword: function (verifyPassword) {
      this.doesPasswordMatch = this.password === verifyPassword
    }
  },
  computed: {
    createButtonText: function () {
      if (this.state === 'uninitialized') {
        return 'Create'
      } else if (this.state === 'creating') {
        return 'Creating...'
      } else if (this.state === 'created') {
        return 'Created!'
      }
    }
  }
}
</script>

<style scoped>
#error_message {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  color: #d75a4a;
  font-family: 'Roboto', sans-serif;
}

.create_button {
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
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  cursor: pointer;
  display: block;
  -o-transition:color .2s ease-out, background .2s ease-in;
  -ms-transition:color .2s ease-out, background .2s ease-in;
  -moz-transition:color .2s ease-out, background .2s ease-in;
  -webkit-transition:color .2s ease-out, background .2s ease-in;
  transition:color .2s ease-out, background .2s ease-in;
}

.create_button:hover {
  background: #178b6b;
}

.create_button.inactive {
  background: #178b6b;
  pointer-events: none;
}

.icon {
  position: absolute;
  margin-top: 10px;
  width: 20px;
  height: 20px;
}

.text_field, .password_field {
  font-size: 15px;
  color: #3d83f4;
  width: auto;
  height: 40px;
  padding: 12px 15px;
  margin: 0px 20px;
  box-sizing: border-box;
  border: 1px solid #003a99;
  border-radius: 5px;
  outline: none;
}

#display_name {
  margin-top: 30px;
}

#password {
  margin-top: 50px;
}

#verify_password {
  margin-top: 10px;
  margin-bottom: 40px;
}

#account_form {
  z-index: 10;
  margin-top: 25vh;
  margin-left: 40vw;
  margin-right: 40vw;
  position: absolute;
  width: 20vw;
  height: auto;
  background: #ffffff;
  border: 1px solid #003a99;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
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

.background_container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: url('../assets/background.svg');
  background-size: cover;
}

html, body {
  margin: 0;
  padding: 0;
}

h1 {
  font-family: 'Roboto', sans-serif;
  margin: 30px;
  font-size: 20px;
  font-weight: bold;
}
</style>
