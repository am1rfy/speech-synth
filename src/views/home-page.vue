<template>
  <el-alert
      id="alert"
      v-if="result.isExist"
      :title="result.title"
      :type="result.type"
      show-icon
  />

  <div class="main-container">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        default-active="text-to-speech"
        :ellipsis="false"
    >
      <div class="flex-grow" />
      <el-menu-item
          index="text-to-speech"
          @click="ttsFormIsActive = true"
      >
        Text to speech
      </el-menu-item>

      <el-menu-item
          index="speech-to-text"
          @click="ttsFormIsActive = false"
      >
        Speech to text
      </el-menu-item>
    </el-menu>

    <template v-if="ttsFormIsActive">
      <ttsForm
          @resultHasAvailable="handleResult"
      />
    </template>
    <template v-else>
      <sttForm
          @resultHasAvailable="handleResult"
      />
    </template>
  </div>
</template>

<script>
import ttsForm from '../components/tts-form.vue'
import sttForm from '../components/stt-form.vue'

export default {
  components: {
    ttsForm,
    sttForm
  },
  data() {
    return {
      ttsFormIsActive: true,
      result: {
        isExist: false,
        type: '',
        title: '',
      }
    }
  },
  methods: {
    handleResult(resultIsPositive) {
      if (resultIsPositive) {
        [this.result.type, this.result.title] = ['success', 'Success']
      }
      else {
        [this.result.type, this.result.title] = ['error', 'There was some kind of error, try again later']
      }
      this.result.isExist = true

      setTimeout(() => {
        this.result.isExist = false
      }, 5000)
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