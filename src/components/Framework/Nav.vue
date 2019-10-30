<template>
  <div class="nav">
    <Menu mode="horizontal" active-name="1">
      <MenuItem name="1">
        <Icon type="md-bug" />
        <span>首页</span>
      </MenuItem>
      <MenuItem name="2">
        <Icon type="md-bug" />
        <span>首页</span>
      </MenuItem>
      <MenuItem name="3">
        <Icon type="md-bug" />
        <span>首页</span>
      </MenuItem>
      <MenuItem name="4">
        <Icon type="md-bug" />
        <span>首页</span>
      </MenuItem>
      <MenuItem name="5">
        <Icon type="md-bug" />
        <span>首页</span>
      </MenuItem>
      <MenuItem name="6">
        <Icon type="md-bug" />
        <span>首页</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "Nav"
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