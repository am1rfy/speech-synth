<template>
  <div class="form">
    <el-input
        v-model="textToSpeechStore.formData.text"
        type="textarea"
        placeholder="Enter text for convert to audio"
        autosize
    />

    <div class="btn-container">
      <el-button
          type="info" plain
          @click="textToSpeechStore.formData.text = ''"
      >
        Reset
      </el-button>
      <el-button
          type="success" plain
          id="confirm-btn"
          @click="onSubmit"
      >
        Convert
      </el-button>
    </div>

    <audio controls v-if="textToSpeechStore.audio.isExist" id="audio">
      <source
          :src="textToSpeechStore.audio.src"
          type="audio/ogg"
      >
    </audio>
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
      this.textToSpeechStore.clearAudio()
      const result = await this.textToSpeechStore.convert()
      this.$emit('resultHasAvailable', result)
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
  #confirm-btn {
    margin-left: 10px;
  }
  #audio {
    margin-top: 30px;
    width: 100%;
  }
</style>