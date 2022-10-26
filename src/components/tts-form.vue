<template>
  <div class="form">
    <el-input
        v-model="textToSpeechStore.formData.text"
        type="textarea"
        placeholder="Enter text for convert to audio"
        autosize
    />

    <template v-if="!textToSpeechStore.audio.isExist">
      <div class="btn-container">
        <el-button
            type="success" plain
            id="confirm-btn"
            @click="onSubmit"
        >
          Convert
        </el-button>
      </div>
    </template>

    <template v-else>
      <audio controls  id="audio">
        <source
            :src="textToSpeechStore.audio.src"
            type="audio/ogg"
        >
      </audio>

      <div class="btn-container">
        <el-button
            type="info" plain
            @click="resetAll"
        >
          Repeat
        </el-button>
      </div>
    </template>

  </div>
</template>

<script>
import {useTTSStore} from '../stores/tts-store.js'

export default {
  data() {
    return {
      textToSpeechStore: useTTSStore()
    }
  },
  methods: {
    async onSubmit() {
      this.textToSpeechStore.audio.clear()
      const result = await this.textToSpeechStore.convert()
      this.$emit('resultHasAvailable', result)
    },
    resetAll() {
      this.textToSpeechStore.formData.clear()
      this.textToSpeechStore.audio.clear()
    }
  },
}
</script>

<style scoped>
  .form {
    height: max-content;
    padding: 30px;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;

    margin-top: 15px;
  }
  #audio {
    margin-top: 30px;
    width: 100%;
  }
</style>