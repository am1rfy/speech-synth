<template>
  <el-alert
      id="alert"
      v-if="alert.isExist"
      :title="alert.title"
      :type="alert.type"
      show-icon
  />

  <div class="main-container">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        default-active="speech-to-text"
        :ellipsis="false"
    >
      <div class="flex-grow" />
      <el-menu-item
          index="text-to-speech"
          @click="$router.push({name: 'tts'})"
      >
        Text to speech
      </el-menu-item>

      <el-menu-item
          index="speech-to-text"
      >
        Speech to text
      </el-menu-item>
    </el-menu>

    <sttForm
        @resultHasAvailable="showResponse"
    />
  </div>
</template>

<script>
import sttForm from '../components/stt-form.vue'

export default {
  components: {
    sttForm
  },
  data() {
    return {
      alert: {
        isExist: false,
        thread: undefined,
        type: '',
        title: '',

        show: function () {
          this.isExist = true

          this.thread = setTimeout(() => {
            this.isExist = false
          }, 3000)
        },
        remove: function () {
          clearInterval(this.thread)
          this.isExist = false
        }
      }
    }
  },
  methods: {
    showResponse(resultIsPositive, msg) {
      if (this.alert.isExist)
        this.alert.remove()

      if (resultIsPositive) {
        this.alert.type = 'success'
        msg ? this.alert.title = msg : this.alert.title = 'Success'
      }
      else {
        this.alert.type = 'error'
        msg ? this.alert.title = msg : this.alert.title = 'There was some kind of error, try again later'
      }
      this.alert.show()
    }
  }
}
</script>

<style scoped>
  .main-container {
    width: 600px;

    display: flex;
    justify-content: center;
    flex-direction: column;

    margin-top: 15vh;

    border: solid 1px var(--el-menu-border-color);
    border-radius: var(--el-border-radius-base);
  }
  .flex-grow {
    flex-grow: 1;
  }
  #alert {
    width: 600px;
    margin-top: 10vh;
    position: absolute;
  }
</style>