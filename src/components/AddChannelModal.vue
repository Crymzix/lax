<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <img class="close_icon" v-on:click="closeAddChannelModal" src="~../assets/close.png"/>
        <div class="container">
          <h1><b>Create a {{ private? 'private' : '' }} channel</b></h1>
          <p class="channel_description">
            Create focused channels for communication, best organized around a specific topic.
          </p>
          <div class="switch_container">
            <label class="switch">
              <input type="checkbox" checked v-on:click="switchMode">
              <span class="slider round"></span>
            </label>
            <p class="mode_description">
              <b>{{ private? 'Private' : 'Public' }}</b>
              {{ private? ' channels can only be viewed by people who are invited.' : ' channels can be viewed by anyone.'}}
            </p>
            <h1 class="input_title">Name</h1>
            <input v-model="teamName" type="text" placeholder="e.g. design" class="text_field"></input>
            <div class="explanation">Must be lower case, with no spaces or periods and less than 22 characters.</div>
            <h1 class="input_title">Description (Optional)</h1>
            <input v-model="teamDescription" type="text" class="text_field"></input>
            <div class="explanation">What is this channel about?</div>
            <h1 v-if="private" class="input_title">Send Invites (Optional)</h1>
            <multiselect v-if="private" class="custom_multiselect"
              v-model="invitedUsers"
              :options="users"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="true"
              :preserve-search="true"
              select-label=""
              noResult="'asdasdasd'"
              placeholder="Search by name"
              label="display_name"
              track-by="display_name">
              <span slot="noResult">Couldn't find that user with that display name.</span>
            </multiselect>
            <div class="button_container">
              <button v-on:click="closeAddChannelModal" type="button" class="cancel_button" v>Cancel</button>
              <button v-on:click="create" v-bind:class="{ inactive: teamName === '' || teamDescription === '', loading: loading }" type="button" class="create_button" v>{{ createButtonText }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  createChannel
} from '../api'

export default {
  name: 'addchannelmodal',
  data () {
    return {
      createButtonText: 'Create Channel',
      loading: false,
      private: false,
      teamName: '',
      teamDescription: '',
      invitedUsers: [],
      users: this.userList()
    }
  },
  watch: {
    teamName: function (teamName) {
      this.teamName = teamName.replace(/ /g, '').replace('.', '').toLowerCase().substring(0, 21)
    }
  },
  methods: {
    closeAddChannelModal: function () {
      this.$emit('closeAddChannelModal')
    },
    switchMode: function () {
      if (this.private) {
        this.private = false
      } else {
        this.private = true
      }
    },
    userList: function () {
      var userList = []
      var usersObject = this.$store.state.users
      for (let userId in usersObject) {
        let user = usersObject[userId]
        user.user_id = userId
        if (user.user_id !== this.$store.state.userId) {
          userList.push(user)
        }
      }
      return userList
    },
    create: function () {
      this.loading = true
      this.createButtonText = 'Creating...'
      createChannel(this.teamName, this.teamDescription, this.private, this.$store.state.userId, this.invitedUsers)
        .then(() => {
          this.createButtonText = 'Created!'
          setTimeout(() => {
            this.$emit('closeAddChannelModal')
          }, 500)
        })
        .catch((error) => {
          console.log(error.message)
          this.$emit('closeAddChannelModal')
        })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style scoped>
.create_button {
  margin-right: 150px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  border-radius: 15px;
  outline: none;
  border: none;
  padding-left: 15px;
  padding-right: 15px;
  background: #25ad88;
  height: 50px;
  color: white;
  cursor: pointer;
  display: inline-block;
  -o-transition:color .2s ease-out, background .2s ease-in;
  -ms-transition:color .2s ease-out, background .2s ease-in;
  -moz-transition:color .2s ease-out, background .2s ease-in;
  -webkit-transition:color .2s ease-out, background .2s ease-in;
  transition:color .2s ease-out, background .2s ease-in;
}

.create_button:hover {
  background: #178b6b;
}

.create_button.loading {
  background: #19aafb;
  pointer-events: none;
}

.create_button.inactive {
  background: #999e9d;
  pointer-events: none;
}

.cancel_button {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  border-radius: 15px;
  outline: none;
  border: none;
  padding-left: 15px;
  padding-right: 15px;
  background: #083577;
  opacity: 0.9;
  height: 50px;
  color: white;
  cursor: pointer;
  display: inline-block;
  -o-transition:color .2s ease-out, background .2s ease-in;
  -ms-transition:color .2s ease-out, background .2s ease-in;
  -moz-transition:color .2s ease-out, background .2s ease-in;
  -webkit-transition:color .2s ease-out, background .2s ease-in;
  transition:color .2s ease-out, background .2s ease-in;
}

.cancel_button:hover {
  opacity: 1.0;
}

.button_container {
  float: right;
  margin-top: 20px;
}

.explanation {
  margin-top: 5px;
  font-size: 12px;
  color: #b4b2a9;
}

.custom_multiselect {
  width: 550px;
}

.input_title {
  font-size: 16px;
  margin-bottom: 8px;
  margin-top: 18px;
}

.text_field {
  font-size: 15px;
  color: #3d83f4;
  width: 550px;
  height: 40px;
  padding: 12px 15px;
  box-sizing: border-box;
  border: 1px solid #003a99;
  border-radius: 5px;
  outline: none;
  display: inline-block;
}

.mode_description {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}

.channel_description {
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

h1 {
  margin-top: 35px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 28px;
}

.container {
  width: 700px;
  height: 100px;
  margin: 150px auto;
}

.close_icon {
  margin: 40px;
  float: left;
  position: relative;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: #083577;
  opacity: 0.9;
  padding: 5px;
  cursor: pointer;
}

.close_icon:hover {
  opacity: 1.0;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.88);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.switch {
  vertical-align: middle;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff6105;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(29px);
  -ms-transform: translateX(29px);
  transform: translateX(29px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
