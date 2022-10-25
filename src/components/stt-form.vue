<template>
  <div class="form">
    <el-slider v-model="slider.value" disabled size="large" />

    <div class="btn-container">
      <el-button
          type="info" plain
          @click="resetForm"
      >
        Reset
      </el-button>

      <el-button
          v-if="recordingState === 'inactive'"
          type="success" plain
          id="record-btn"
          @click="startRecording"
      >
        Record
      </el-button>

      <el-button
          v-else-if="recordingState === 'active'"
          type="danger" plain
          id="stop-btn"
          @click="stopRecording"
      >
        Stop
      </el-button>

      <el-button
          v-else-if="recordingState === 'finished'"
          type="success" plain
          id="convert-btn"
          @click="onSubmit"
      >
        Convert
      </el-button>
    </div>

    <el-input
        v-if="speechToTextStore.text.isExist"
        v-model="speechToTextStore.text.content"
        type="textarea"
        :readonly="true"
    />
  </div>
</template>

<script>
import {useSTTStore} from '../stores/stt-store.js'

export default {
  data() {
    return {
      speechToTextStore: useSTTStore(),

      mediaRecorder: undefined,
      recordingState: 'inactive',

      slider: {
        value: 0,
        thread: undefined,
        start: () => {
          this.thread = setInterval (() => {
            this.slider.value += 1
          }, 100)
        },
        stop: () => {
          clearInterval(this.thread)
          this.thread = undefined
        },
        reset: () => {
          // todo
        }
      }
    }
  },
  methods: {
    async startRecording() {
      await this.initRecording()

      this.mediaRecorder.start()
      this.slider.start()
      this.recordingState = 'active'
    },
    stopRecording() {
      this.mediaRecorder.stop()
      this.slider.stop()
      this.recordingState = 'finished'
    },
    resetForm() {
      this.speechToTextStore.audio.chunks = []
      this.slider.reset()
      this.mediaRecorder = undefined
    },
    async initRecording() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })
      this.mediaRecorder = new MediaRecorder(stream)

      this.mediaRecorder.ondataavailable  =  event => {
        this.speechToTextStore.audio.chunks.push(event.data)
      }
    },
    async onSubmit() {
      this.speechToTextStore.clearText()
      const result = await this.speechToTextStore.convert()
      this.$emit('resultHasAvailable', result)

      this.recordingState = 'inactive'
    },
  }
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
  }
  #convert-btn,
  #record-btn,
  #stop-btn {
    margin-left: 10px;
  }
</style>