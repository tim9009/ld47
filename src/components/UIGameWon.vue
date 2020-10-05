<template>
  <div class="gameWon">
    <div class="content">
      <h1>Mainframe hacked!</h1>
      <p>
        Databases downloaded...
      </p>
      <div>
        > Press enter to return to home screen
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UIGameWon'
  }
</script>

<style lang="scss" scoped>
  .gameWon {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    background-color: rgb(14, 18, 33)
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
