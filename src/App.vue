<template>
  <div id="app">
    <el-container style="height: 100%">
      <!--内容-->
      <!--清除element的内边距-->
      <el-main style="padding: 0">
        <router-view />
        <div style="padding: 20px; height: 20px">
          © 2019-2020 孙逸伦 版权所有
          <a href="http://www.beian.miit.gov.cn" target="_blank">
            苏ICP备19048222号-1
          </a>
        </div>
      </el-main>
      <!--ICP备案信息-->
    </el-container>
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
}
</style>
