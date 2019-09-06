<template>
  <div class="no-find" @mousemove="move">
    <div>
      404
      <i class="iconfont icon-fangdajing" ref="fangdajing"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'no-find',
  data () {
    return {
    }
  },
  methods: {
    move (e) {
      this.$refs.fangdajing.style.top = (e.clientY - 105) + 'px'
      this.$refs.fangdajing.style.left = (e.clientX - 75) + 'px'
    }
  }
}
</script>
<style lang="scss">
  .no-find {
    height: 100%;
    position: relative;
    overflow: hidden;
    div {
      text-align: center;
      font-size: 150px;
      padding-top: 150px;
      i {
        position: absolute;
        padding-top: -30px;
        font-size: 150px;
      }
    }
  }
</style>