<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  created () {
    const href = window.location.href
    let url = href.slice(href.indexOf('#') + 1)
    if (url === '/') {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/index.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
