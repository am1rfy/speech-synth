<template>
  <div class="form">
    <template v-if="!speechToTextStore.text.isExist">
      <el-slider v-model="slider.value" disabled size="large" />

      <div class="btn-container">
        <el-button
            v-if="recordingState === 'inactive'"
            type="success" plain
            id="record-btn"
            @click="startRecording"
        >
          Record
        </el-button>

        <template v-else-if="recordingState === 'active' || recordingState === 'paused'">
          <el-button
              v-if="recordingState !== 'paused'"
              type="info" plain
              id="pause-btn"
              @click="pauseRecording"
          >
            Pause
          </el-button>
          <el-button
              v-else
              type="info" plain
              id="pause-btn"
              @click="resumeRecording"
          >
            Resume
          </el-button>

          <el-button
              type="danger" plain
              id="stop-btn"
              @click="stopRecording"
          >
            Stop
          </el-button>
        </template>


        <el-button
            v-loading.fullscreen.lock="loading"
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
      <audio controls id="audio" ref="audio">
        <source
            :src="speechToTextStore.audio.src"
            type="audio/ogg"
        >
      </audio>

      <el-input
          v-model="speechToTextStore.text.content"
          type="textarea"
          :readonly="true"
          autosize
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

      loading: false,

      mediaRecorder: undefined,
      recordingState: 'inactive',

      slider: {
        value: 0,
        thread: undefined,
        start: function () {
          this.thread = setInterval (() => {
            this.value += 1
          }, 250)
        },
        stop: function () {
          clearInterval(this.thread)
          this.thread = undefined
        },
        pause: function () {
          clearInterval(this.thread)
        },
        reset: function () {
          this.stop()
          this.value = 0
        }
      }
    }
  },
  methods: {
    async initRecording() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })
      this.mediaRecorder = new MediaRecorder(stream)

      this.mediaRecorder.ondataavailable = event => {
        this.speechToTextStore.audio.chunks.push(event.data)
      }
    },
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
    pauseRecording() {
      this.mediaRecorder.pause()
      this.slider.pause()
      this.recordingState = 'paused'
    },
    resumeRecording() {
      this.mediaRecorder.resume()
      this.slider.start()
      this.recordingState = 'active'
    },
    async onSubmit() {
      this.loading = true
      const result = await this.speechToTextStore.convert()
      this.loading = false

      this.showAudio()
      this.$emit('resultHasAvailable', result)

      this.recordingState = 'inactive'
    },
    showAudio() {
      this.speechToTextStore.audio.src = URL.createObjectURL(this.speechToTextStore.getBlob)
    },
    resetAll() {
      this.mediaRecorder = undefined
      this.speechToTextStore.text.clear()
      this.speechToTextStore.audio.clear()
      this.slider.reset()
    },
    async saveToBuffer() {
      await navigator.clipboard.writeText(this.speechToTextStore.text.content)
      this.$emit('resultHasAvailable', true, 'Copied!')
    }
  },
  watch: {
    slider: {
      handler() {
        if (this.slider.value === 100) {
          this.stopRecording()
          this.$emit('resultHasAvailable', false, 'Audio duration should be less than 25s')
        }
      },
      deep: true
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
  #pause-btn,
  #stop-btn {
    margin-left: 10px;
  }
  #audio {
    margin:  0 0 30px 0;
    width: 100%;
  }
</style>