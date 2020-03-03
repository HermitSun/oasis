<template>
  <div id="app">
    <!--<div id="nav">-->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view />
    <div class="icp-license">
      © 2019-2020 孙逸伦 版权所有
      <a href="http://www.beian.miit.gov.cn" target="_blank">
        苏ICP备19048222号-1
      </a>
    </div>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.icp-license {
  position: relative;
  bottom: 1%;
  text-align: center;
  width: calc(100% - 25px);
  margin-top: 50px;
}
</style>
