<template>
  <div id="app">
    <Framework></Framework>
  </div>
</template>

<script>
  import Framework from "./components/Framework/Framework";
  export default {
    name: 'app',
    components: {
      Framework
    },
    methods: {
    
    },
    mounted() {
    
    },
    created() {
      this.$store.dispatch('getTagList')
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
