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
    // url parsing for the first link found to display relevant metadata.
    var urls = anchorMe(this.message.message, { list: true })
    if (urls.length >= 1) {
      /* og(urls[0].raw, (err, meta) => {
        if (!err) {
          console.log(meta)
        }
      }) */
    }
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
