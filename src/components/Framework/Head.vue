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
      <div class="user">
        <Icon type="ios-contact-outline" />
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
    width: 100%;
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
  .container .nav .user {
    font-size: 1.7rem;
    top: 0;
    right: 0;
    position: absolute;
    color: #0085f5;
  }
</style>