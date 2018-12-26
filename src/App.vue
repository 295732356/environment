<template>
  <div id="app">
    <img width="1270"  src="./assets/headbg.png">
    <NavList />
    <router-view></router-view>
  </div>
</template>

<script>
import NavList from "./components/NavList"
export default {
  name: 'App',
  components:{
  NavList
  }
}
</script>

<style>
</style>
