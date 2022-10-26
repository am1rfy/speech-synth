<template>
  <div class="main-container">
    <el-empty
        id="empty"
        image-size="250"
        description="This Page Not Found"
    />
    <div class="link-container">
      <el-link
          type="success"
          @click="$router.push({name: 'tts'})"
      >
        Text To Speech
      </el-link>

      <el-link
          type="success"
          @click="$router.push({name: 'stt'})"
      >
        Speech To Text
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFoundPage'
}
</script>

<style scoped>
  body {
    display: flex;
    justify-content: center;
  }
  .main-container {
    margin-top: 10vh;
  }
  .link-container {
    display: flex;
    justify-content: space-between;
  }
  #empty {
    cursor: default;
  }
</style>