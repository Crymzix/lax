<template>
  <div class="root">
    <div class="container">
      <textarea class="message_input"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'composer',
  data () {
    return {
      //
    }
  }
}
</script>

<style scoped>

.container {
  border-top: 2px solid #003a99;
}

.message_input {
  margin-top: 15px;
  margin-left: 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 400;
  height: 70px;
  width: 800px;
  resize: none;
  padding: 12px 10px;
  border: 2px solid #003a99;
  border-radius: 10px;
  outline: none;
}

.message_input::-webkit-scrollbar {
    width: 12px;
}

.message_input::-webkit-scrollbar-track {
    border-radius: 10px;
}

.message_input::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #003a99;
}

</style>
