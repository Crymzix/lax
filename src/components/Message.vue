<template>
  <div class="message_container">
    <img class="user_image" v-if="!message.photo_url && message.user_id !== 'lax_bot'" src="~../assets/user.png"/>
    <img class="user_image" v-if="!message.photo_url && message.user_id === 'lax_bot'" src="~../assets/robot.png"/>
    <img class="user_image" v-if="message.photo_url" :src="message.photo_url"/>
    <div class="right_container">
      <div>
        <h1 class="username">{{ message.name }}</h1>
        <span class="timestamp">{{ timestamp }}</span>
        <div class="options">
          <img class="options_icon" :src="reactIcon" @mouseover="reactHover" @mouseleave="reactHover"/>
          <img class="options_icon" :src="commentIcon" @mouseover="commentHover" @mouseleave="commentHover"/>
        </div>
      </div>
      <p class="message" v-html="formattedMessage"></p>
      <div v-if="message.meta" class="meta_container">
        <div class="meta_image_container">
          <img :src="message.meta.photo_url"/>
        </div>
        <a class="meta_title" target="_blank" v-bind:href="message.meta.url">{{ message.meta.title }}</a>
        <div class="meta_description">{{ message.meta.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgo } from '../utils/filters'
import anchorMe from 'anchorme'

const smileImg = require('../assets/smile.svg')
const smileImgSelected = require('../assets/smile_selected.svg')
const commentImg = require('../assets/comment.svg')
const commentImgSelected = require('../assets/comment_selected.svg')

export default {
  name: 'message',
  props: ['message'],
  data () {
    return {
      reactIcon: smileImg,
      commentIcon: commentImg,
      userId: this.$store.state.userId
    }
  },
  mounted () {
    //
  },
  computed: {
    timestamp: function () {
      return timeAgo(this.message.timestamp) + ' ago'
    },
    formattedMessage: function () {
      return anchorMe(this.message.message, {
        attributes: [
          {
            name: 'target',
            value: 'blank'
          }
        ]
      })
    }
  },
  methods: {
    reactHover: function () {
      if (this.reactIcon === smileImgSelected) {
        this.reactIcon = smileImg
      } else {
        this.reactIcon = smileImgSelected
      }
    },
    commentHover: function () {
      if (this.commentIcon === commentImgSelected) {
        this.commentIcon = commentImg
      } else {
        this.commentIcon = commentImgSelected
      }
    }
  }
}
</script>

<style scoped>
.meta_container {
  background: white;
  margin-top: 10px;
  border: 1px solid #b9d6e7;
  border-radius: 5px;
  width: 280px;
}

.meta_image_container {
  position: relative;
  width: 280px;
  height: 185px;
  overflow: hidden;
  margin-bottom: 10px;
}

.meta_image_container img {
  position: absolute;
  left: 50%;
  top: 50%;
  min-height:100%;
  min-width: 100%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}

.meta_title {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  line-height: 20px;
  max-height: 20px;
}

.meta_description {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 15px;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 15px;
  max-height: 45px;
  word-wrap: break-word;
  display: block;
}

.options_icon {
  vertical-align: middle;
  width: 18px;
  display: inline-block;
  fill: black;
  cursor: pointer;
}

.options_icon:hover {
  fill: #0352c7;
}

.options {
  margin-top: -10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  display: none;
  float: right;
  border: 2px solid #b9d6e7;
  border-radius: 5px;
  background: white;
}

.message_container {
  padding: 15px 25px;
  white-space: nowrap;
}

.message_container:hover {
  background: #dde6e2;
}

.message_container:hover .options{
  display: inline-block;
}

.user_image {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: top;
}

.right_container {
  width: 1200px;
  margin-left: 10px;
  display: inline-block;
  white-space: nowrap;
  word-wrap: break-word;
}

.username {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #2c3e50;
  cursor: pointer;
  display: inline-block;
}

.timestamp {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 10px;
  color: #2c3e50;
  margin-left: 5px;
  display: inline-block;
}

.username:hover {
  text-decoration: underline;
}

.message {
  margin-left: 0px;
  vertical-align: top;
  word-wrap: break-word;
  white-space: initial;
}

p {
  width: 1000px;
  font-size: 16px;
  margin: 0;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
}

</style>
