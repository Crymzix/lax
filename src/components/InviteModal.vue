<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <img class="close_icon" v-on:click="closeInviteModal" src="~../assets/close.png"/>
          <h1><img class="send_icon" src="~../assets/send.png"/>Invite new <b>members</b></h1>
          <div class="form_container" v-for="(invite, index) in invites">
            <input v-model="invite.email" type="text" placeholder="Email" class="text_field"></input>
            <input v-model="invite.name" id="name_field" type="text" placeholder="Name (Optional)" class="text_field"></input>
            <img v-if="invites.length !== 1" class="remove_invite_icon" src="~../assets/close_small.png" v-on:click="removeInvite(index)"/>
          </div>
          <p class="add_another" v-on:click="addInvite">+ Add another member</p>
          <button class="send_button" v-on:click="invite">
            Send Invites
          </button>
          <p id="error_message">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import { sendInvites } from '../api'

export default {
  name: 'invite',
  data () {
    return {
      invites: [
        {
          email: '',
          name: ''
        },
        {
          email: '',
          name: ''
        },
        {
          email: '',
          name: ''
        }
      ],
      errorMessage: ''
    }
  },
  methods: {
    closeInviteModal: function () {
      this.$emit('closeInviteModal')
    },
    removeInvite: function (index) {
      this.invites.splice(index, 1)
    },
    addInvite: function () {
      this.invites.push({
        email: '',
        name: ''
      })
    },
    invite: function () {
      this.errorMessage = ''
      var hasEmail = false
      this.invites.forEach((invite) => {
        if (invite.email !== '') {
          hasEmail = true
          return
        }
      })
      if (!hasEmail) {
        this.errorMessage = 'Please input at least one email.'
        return
      }
    }
  }
}
</script>

<style scoped>
.send_button {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #25ad88;
  width: 140px;
  height: 50px;
  color: white;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  margin-top: 30px;
  cursor: pointer;
  -o-transition:color .2s ease-out, background .2s ease-in;
  -ms-transition:color .2s ease-out, background .2s ease-in;
  -moz-transition:color .2s ease-out, background .2s ease-in;
  -webkit-transition:color .2s ease-out, background .2s ease-in;
  transition:color .2s ease-out, background .2s ease-in;
}

.send_button:hover {
  background: #178b6b;
}

.send_button.inactive {
  background: #178b6b;
  pointer-events: none;
}

.send_icon {
  vertical-align: middle;
  width: 40px;
  margin-right: 20px;
  margin-left: -20px;
}

#error_message {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  color: #d75a4a;
  font-family: 'Roboto', sans-serif;
}

.close_icon {
  float: left;
  position: relative;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background: #083577;
  opacity: 0.4;
  padding: 5px;
  cursor: pointer;
}

.close_icon:hover {
  opacity: 0.75;
}

.remove_invite_icon {
  margin-left: 20px;
  width: 15px;
  height: 15px;
  padding: 5px;
  opacity: 0.75;
  vertical-align: middle;
}

.remove_invite_icon:hover {
  opacity: 1.0;
  cursor: pointer;
}

.form_container {
  margin-top: 20px;
}

.text_field {
  font-size: 15px;
  color: #3d83f4;
  width: auto;
  height: 40px;
  padding: 12px 15px;
  box-sizing: border-box;
  border: 1px solid #003a99;
  border-radius: 5px;
  outline: none;
  display: inline-block;
}

#name_field {
  margin-left: 20px;
}

.add_another {
  float: left;
  margin-left: 100px;
  margin-top: 25px;
  color: #006DF0;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  cursor: pointer;
}

.add_another:hover {
  text-decoration: underline;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
}

.modal-container {
  width: 700px;
  max-height: 700px;
  margin: 150px auto;
  padding: 20px 30px;
  background: #ffffff;
  border: 1px solid #003a99;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  overflow-y:scroll;
}

.modal-container::-webkit-scrollbar {
    width: 10px;
}

.modal-container::-webkit-scrollbar-track {
    border-radius: 3px;
}

.modal-container::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #003a99;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
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

h1 {
    margin-top: 35px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 28px;
}
</style>
