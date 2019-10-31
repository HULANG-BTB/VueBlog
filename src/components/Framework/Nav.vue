<template>
  <div class="nav">
    <Menu mode="horizontal" :active-name="active" @on-select="routeTo">
      <MenuItem name="Index" class="unselected">
        <Icon type="md-home" />
        <span>主页</span>
      </MenuItem>
      <MenuItem name="Category" class="unselected">
        <Icon type="md-book" />
        <span>分类</span>
      </MenuItem>
      <MenuItem name="Tag" class="unselected">
        <Icon type="md-bookmark" />
        <span>标签</span>
      </MenuItem>
      <MenuItem name="Time" class="unselected">
        <Icon type="ios-cafe" />
        <span>归档</span>
      </MenuItem>
      <MenuItem name="About" class="unselected">
        <Icon type="md-contact" />
        <span>关于</span>
      </MenuItem>
      <MenuItem name="Contact" class="unselected">
        <Icon type="md-chatboxes" />
        <span>联系</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    data() {
      return {
      
      }
    },
    methods: {
      routeTo(val) {
        this.$router.push({name: val})
      }
    },
    computed: {
      active() {
        return this.$route.meta.breadcrumb
      }
    }
  }
</script>

<style scoped>
  .nav {
    text-decoration: none;
    list-style: none;
    background: none;
  }
  .nav .ivu-menu.ivu-menu-light {
    background: none;
  }
  .nav .ivu-menu.ivu-menu-light .ivu-menu-item {
    border: none;
  }
  .nav ul.ivu-menu.ivu-menu-light.ivu-menu-horizontal {
    border: none;
  }
  .nav ul.ivu-menu.ivu-menu-light.ivu-menu-horizontal:after {
    background: none;
  }
  .nav ul.ivu-menu.ivu-menu-light.ivu-menu-horizontal li.ivu-menu-item {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    padding: 0 1rem;
    font-weight: 600;
    border-radius: 2px;
    margin-bottom: 0.5rem;
    transition: all .3s ease-in;
  }
  .nav ul.ivu-menu.ivu-menu-light li.ivu-menu-item:hover {
    color: #0085f5;
    background: rgba(0, 0, 0, 0.1);
  }
  .nav ul.ivu-menu.ivu-menu-light li.ivu-menu-item.ivu-menu-item-active {
    background-color: hsla(0,0%,100%,0.6);
    font-weight: 700;
    color: #0085f5;
  }
  .nav ul.ivu-menu.ivu-menu-light li.ivu-menu-item span {
    margin-left: 1.5rem;
  }
  
</style>