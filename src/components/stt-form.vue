<template>
  <div class="form">
    <template v-if="!speechToTextStore.text.isExist">
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
    </template>

    <template v-else>
      <audio id="audio" ref="audio">
        <source
            src=""
            type="audio/ogg"
        >
      </audio>

      <el-input
          v-model="speechToTextStore.text.content"
          type="textarea"
          :readonly="true"
      />

      <div class="btn-container">
        <el-button
            type="info" plain
            @click="resetAll"
        >
          Repeat
        </el-button>

        <el-button
            type="success" plain
            @click="saveToBuffer"
        >
          Copy
        </el-button>
      </div>
    </template>
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
      this.speechToTextStore.text.clear()

      const result = await this.speechToTextStore.convert()

      this.showAudio()
      this.$emit('resultHasAvailable', result)

      this.recordingState = 'inactive'
    },
    showAudio() {
      const audio = this.$refs.audio
      audio.controls = true
      audio.src = URL.createObjectURL(this.speechToTextStore.getBlob)
    },
    resetAll() {

    },
    async saveToBuffer() {
      await navigator.clipboard.writeText(this.speechToTextStore.text.content)
    }
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
    margin: 10px 0 0 0;
  }
  #convert-btn,
  #record-btn,
  #stop-btn {
    margin-left: 10px;
  }
  #audio {
    margin:  0 0 30px 0;
    width: 100%;
  }
</style>