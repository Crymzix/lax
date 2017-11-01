<template>
  <div class="create">
    <div class="background_container">
    </div>
    <div id="team_form" class="slide-up-fade-in">
      <h1>
        Create a team name
      </h1>
      <div class="input_container">
        <input v-model="teamName" type="text" placeholder="Team name" class="text_field"></input>
        <img v-if="showTeamNameError && teamName ===''" class="icon" src="~../assets/error.png">
      </div>
      <h1>
        Secret
      </h1>
      <div>
        <p class="secret_explanation">
          Only an authorized user can initiate a team creation. To verify this we
          check if the secret you provide belongs to the backing Firebase database. You
          can find the secret in your
          <a href="https://console.firebase.google.com/project/_/settings/database?authuser=0">Firebase console settings</a>
        </p>
      </div>
      <div class="input_container">
        <input v-model="secret" type="password" placeholder="Database secret" class="secret_field"></input>
        <img v-if="secret !== '' && isSecretValid" class="icon" src="~../assets/success.png">
        <img v-if="secret !== '' && !isSecretValid && !testingSecret" class="icon" src="~../assets/error.png">
        <div v-if="testingSecret" class="load_container">
          <div class="load">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <div id= "create_user_form" class="slide-up-fade-in">
      <div class="create_container">
        <h1>
          Register the first member
        </h1>
        <div class="input_container">
          <input v-model="email" type="text" placeholder="Email" class="text_field"></input>
          <img v-if="email !== '' && isEmailValid" class="icon" src="~../assets/success.png">
          <img v-if="email !== '' && !isEmailValid" class="icon" src="~../assets/error.png">
        </div>
        <div id="display_name" class="input_container">
          <input v-model="displayName" type="text" placeholder="Display name (no spaces)" class="text_field"></input>
          <img v-if="showDisplayNameError && displayName !== ''" class="icon" src="~../assets/error.png">
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
      </div>
      <div id="create_right_container" class="create_container">
        <button v-on:click="create" type="button" class="create_button" v-bind:class="{ inactive: state === 'initializing' || state === 'initialized' }" >{{ createButtonText }}</button>
        <div id="loading" v-if="state === 'initializing'" class="load_container">
          <div class="load">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkSecret } from '../api'
import debounce from 'debounce'

const re = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')

export default {
  name: 'create',
  data () {
    return {
      showTeamNameError: false,
      isSecretValid: false,
      isEmailValid: false,
      showDisplayNameError: false,
      isPasswordValid: false,
      doesPasswordMatch: false,
      teamName: '',
      secret: '',
      testingSecret: false,
      email: '',
      displayName: '',
      password: '',
      verifyPassword: '',
      state: 'uninitialized'
    }
  },
  methods: {
    create: function () {
      this.state = 'initializing'
      if (this.teamName === '') {
        this.showTeamNameError = true
        this.state = 'uninitialized'
        return
      }
      if (this.displayName === '') {
        this.showDisplayNameError = true
        this.state = 'uninitialized'
        return
      }
      if (this.isSecretValid && this.isEmailValid && this.isPasswordValid && this.doesPasswordMatch) {
        this.$store.dispatch('CREATE_TEAM', {
          secret: this.secret,
          teamName: this.teamName,
          displayName: this.displayName,
          email: this.email,
          password: this.password }).then(() => {
            this.state = 'initialized'
            setTimeout(() => {
              this.$router.push({ path: '/login' })
            }, 1000)
          })
      } else {
        this.state = 'uninitialized'
      }
    },
    checkSecret: debounce(
      function (secret) {
        var that = this
        this.testingSecret = true
        checkSecret(secret)
          .then((response) => {
            that.isSecretValid = response.data.match
            that.testingSecret = false
          })
          .catch((error) => {
            that.testingSecret = false
            console.log(error)
          })
      },
    500)
  },
  watch: {
    email: function (email) {
      this.isEmailValid = re.test(email)
    },
    displayName: function (displayName) {
      this.displayName = displayName.replace(/ /g, '')
    },
    password: function (password) {
      this.isPasswordValid = password.length >= 8
      this.doesPasswordMatch = this.verifyPassword === password
    },
    verifyPassword: function (verifyPassword) {
      this.doesPasswordMatch = this.password === verifyPassword
    },
    secret: function (newSecret) {
      this.checkSecret(newSecret)
    }
  },
  computed: {
    createButtonText: function () {
      if (this.state === 'uninitialized') {
        return 'Create'
      } else if (this.state === 'initializing') {
        return 'Creating'
      } else if (this.state === 'initialized') {
        return 'Created'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin-top: 135px;
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

#loading {
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.create_container {
  display: inline-block;
  width: 300px;
}

#create_right_container {
  height: auto;
  width: 300px;
}

.input_container {
  position: relative;
}

.icon {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
}

.secret_explanation {
  margin: -10px 20px;
  font-size: 12px;
}

.text_field, .secret_field, .password_field {
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

.secret_field {
  margin: 35px 20px;
}

#display_name {
  margin-top: 10px;
}

#password {
  margin-top: 50px;
}

#verify_password {
  margin-top: 10px;
  margin-bottom: 40px;
}

#team_form, #create_user_form {
  margin-top: 10vh;
  margin-left: 10vw;
  z-index: 10;
  position: absolute;
  width: 450px;
  height: auto;
  background: #ffffff;
  border: 1px solid #003a99;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
}

#create_user_form {
  width: 600px;
  margin-left: 36vw;
  margin-top: 30vh;
  display: flex;
}

.background_container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: url('../assets/background.svg');
  background-size: cover;
}

h1 {
  font-family: 'Roboto', sans-serif;
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
}

h2 {
  font-weight: normal;
  margin: 0 0 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

body {
  margin: 0 0 0 0;
}

p {
  font-family: 'Roboto', sans-serif;
}

/*Loading icon*/
.line {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 7px;
    background-color: #25ad88;
}

.load_container {
    display: inline-block;
    width: auto;
    height: auto;
    text-align: center;
}

.load .line:nth-last-child(1) {animation: loading .6s .1s linear infinite;}
.load .line:nth-last-child(2) {animation: loading .6s .2s linear infinite;}
.load .line:nth-last-child(3) {animation: loading .6s .3s linear infinite;}

@keyframes loading {
    0 {transform: translate(0,0);}
    50% {transform: translate(0,-3.5px);}
    100% {transform: translate(0,0);}
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
</style>
