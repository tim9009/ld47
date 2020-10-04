<template>
  <div class="gameLost">
    <div class="content">
      <h1>Game Lost</h1>
      <div>Press enter to try again</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UIGameLost'
  }
</script>

<style lang="scss" scoped>
  .gameLost {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    background-color: #000;
  }

  .content {
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    line-height: 1.5;
  }
</style>
