<template>
  <Layout class="body">
    <Header>
      <Head></Head>
    </Header>
    <Layout class="main">
      <div class="container">
        <nav class="nav">
          <Nav></Nav>
        </nav>
        <Content>
          <router-view></router-view>
        </Content>
        <div class="aside">
          <Aside></Aside>
        </div>
      </div>
    </Layout>
    <Footer>
      <Foot></Foot>
    </Footer>
  </Layout>
</template>

<script>
  import Head from "./Head"
  import Nav from "./Nav"
  import Aside from "./Aside"
  import Foot from "./Foot"
  export default {
    name: "Framework",
    data () {
      return {
        navigate: [
        
        ]
      };
    },
    computed: {
    
    },
    components: {
      Head,
      Nav,
      Aside,
      Foot
    }
  }
</script>

<style>
  .body {
    background-color: #EEEEEE;
  }
  .body .ivu-layout {
    background-image: url("../../assets/img/background.png");
  }
  .body .ivu-layout-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 4.5em;
    background-color: hsla(0,0%,100%,0.6);
    margin: 0 0;
    padding: 0 0;
    z-index: 999;
  }
  .body .main {
    padding-bottom: 1rem;
    /*background: none;*/
  }
  .body .main .container {
    margin: 5.5rem auto 0;
    width: 75rem;
    position: relative;
    background: none;
  }
  .body .main .container nav.nav {
    position: fixed;
    float: left;
    width: 11.5rem;
  }
  .body .main .container .aside {
    width: 16.5rem;
    float: right;
  }
  .body .main .container .ivu-layout-content {
    margin-left: 12.5rem;
    width: 45rem;
    float: left;
  }
  .body .ivu-layout-footer {
    background: hsla(0,0%,100%,0.6);;
  }
  .body .main .ivu-layout-content .container {
    width: 100%;
    margin: 0 0;
  }
</style>