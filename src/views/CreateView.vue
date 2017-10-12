<template>
  <div class="create">
    <div class="background_container">
      <div class="left_container">
        </div><div class="right_container">

        </div>
    </div>
    <div id="team_form" class="slide-up-fade-in">
      <h1>
        Create a team name
      </h1>
      <input type="text" placeholder="Team name" class="text_field"></input>
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
        <img v-if="secret !== '' && !isSecretValid" class="icon" src="~../assets/error.png">
      </div>
    </div>
    <div id= "create_user_form" class="slide-up-fade-in">
      <div class="create_container">
        <h1>
          Register the first member
        </h1>
        <div class="input_container">
          <input type="text" placeholder="Email" class="text_field"></input>
          <img v-if="isEmailValid" class="icon" src="~../assets/success.png">
        </div>
        <div id="password"class="input_container">
          <input type="password" placeholder="Password" class="password_field"></input>
          <img v-if="isPasswordValid" class="icon" src="~../assets/success.png">
        </div>
        <div id="verify_password" class="input_container">
          <input type="password" placeholder="Verify password" class="password_field"></input>
          <img v-if="doesPasswordMatch" class="icon" src="~../assets/success.png">
        </div>
      </div>
      <div id="create_right_container" class="create_container">
        <button v-on:click="initiate" type="button" class="initiate">Initiate</button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkSecret } from '../api'
import debounce from 'debounce'

export default {
  name: 'create',
  methods: {
    initiate: function () {
      //
    },
    checkSecret: debounce(
      function (secret) {
        var that = this
        checkSecret(secret)
          .then(function (response) {
            that.isSecretValid = response.data.match
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    500)
  },
  watch: {
    secret: function (newSecret) {
      this.checkSecret(newSecret)
    }
  },
  data () {
    return {
      isSecretValid: false,
      isEmailValid: false,
      isPasswordValid: false,
      doesPasswordMatch: false,
      secret: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.initiate {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #25ad88;
  width: 100px;
  height: 50px;
  position: absolute;
  top: 45%;
  left: 60%;
  color: white;
  cursor: pointer;
  -o-transition:color .2s ease-out, background 1s ease-in;
  -ms-transition:color .2s ease-out, background 1s ease-in;
  -moz-transition:color .2s ease-out, background 1s ease-in;
  -webkit-transition:color .2s ease-out, background 1s ease-in;
  transition:color .2s ease-out, background 1s ease-in;
}

.initiate:hover {
  background: #178b6b;
}

#create_right_container {
  display: flex;
  height: auto;
  width: auto;
}

.create_container {
  display: inline-block;
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
  background-image: linear-gradient(0deg, #247BFF, #FF6105);
}

.right_container {
  display: inline-block;
  *display: inline;
  height: 100vh;
  width: 70vw;
  background: #086BFF;
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
