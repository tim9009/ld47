<template>
  <div class="gameLost">
    <div class="content">
      <h1>CONNECTION TERMINATED</h1>
      <p>
        You were detected by server security.<br>
        The autorities have been notified.
      </p>

      <div>> Press enter to return to home screen</div>
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
    background-color: rgb(14, 18, 33);
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
