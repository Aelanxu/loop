<template>
  <div id="app">
   
   
<router-view></router-view>

  </div>
</template>

<script>
import Login from './components/Login.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

}
</script>

<style lang="scss">
*{
  padding: 0;
  margin:0 auto;
}
body{
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

h1, h2 {
  font-weight: normal;
}




</style>
