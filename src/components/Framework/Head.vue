<template>
  <div class="container">
    <div class="nav">
      <div class="logo">
<!--        <img src="../../assets/img/logo.png" alt="">-->
        AloneH
      </div>
      <div class="title">
        行也思君，坐也思君
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Head"
  }
</script>

<style scoped>
  .container {
    width: 75rem;
    margin: 0 auto;
    position: relative;
  }
  .container .nav {
    width: 30rem;
    position: relative;
  }
  .container .nav .logo  {
    font-family: "MAGNETOB";
    width: 5rem;
  }
  .container .nav .logo img {
    font-size: 0;
  }
  .container .nav .title {
    font-family: "FZSTK";
    font-size: 1.7rem;
    top: 0;
    left: 12rem;
    position: absolute;
    color: #0085f5;
  }
</style>