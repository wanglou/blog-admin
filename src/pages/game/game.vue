<template>
  <div class="game">
    <div class="container">
      <p v-for="(item, index) in line" :key="index">
        <span v-for="(item, index) in row" :key="index"></span>
      </p>
      <div class="fruit" :style="{left: fruitLeft + 'px',top: fruitTop + 'px'}"></div>
      <div class="snake">
        <span v-for="(item, index) in snakeList" :style="{left: item.left + 'px',top: item.top + 'px'}" :key="index"></span>
      </div>
    </div>

    <div class="dialog" v-if="dialogShow">
      按 '空格' 开始（未完成）
    </div>
  </div>
</template>
<script>
// import { deepClone } from '../../utils/deepClone.js'
export default {
  name: 'game',
  data() {
    return {
      dialogShow: true,
      isStart: true,
      derection: '',
      timer: null,
      timerInterval: 300,
      line: 20,
      row: 25,
      fruitTop: 0,
      fruitLeft: 0,
      snakeList:[
        { left: 120, top: 360 },
        { left: 100, top: 360 },
        { left: 80, top: 360 }
      ]
    }
  },
  methods: {
    // 获取目标位置
    getFruit () {
      let left = Math.floor(Math.random() * 25) * 20
      let top = Math.floor(Math.random() * 20) * 20
      this.fruitLeft = left
      this.fruitTop = top
    },
    // 改变方向
    changeDerection (val) {
      if (this.isStart) return
      var currentSite = this.snakeList[0]
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.snakeList.forEach((element, index) => {
          if (index === 0) {
            // if (element.left === this.fruitLeft && element.top === this.fruitTop) {
            //   if (this.snakeList[this.snakeList.length - 1].left > this.snakeList[this.snakeList.length - 2].left) {
            //     this.snakeList.push({ left: this.snakeList[this.snakeList.length - 1].left + 20, top: this.snakeList[this.snakeList.length - 1].top })
            //   } else {
            //     this.snakeList.push({ left: this.snakeList[this.snakeList.length - 1].left - 20, top: this.snakeList[this.snakeList.length - 1].top })
            //   }
            // }
            if (val === '上') {
              element.top -= 20
            } else if (val === '下') {
              element.top += 20
            } else if (val === '左') {
              element.left -= 20
            } else if (val === '右') {
              element.left += 20
            }
          } else {
            if (val === '上' || val === '下') {
              if (element.left === currentSite.left) {
                if (val === '上') {
                  element.top -= 20
                } else {
                  element.top += 20
                }
              } else {
                if (currentSite.left > element.left) {
                  element.left += 20
                } else {
                  element.left -= 20
                }
              }
            } else {
              if (element.top === currentSite.top) {
                if (val === '左') {
                  element.left -= 20
                } else {
                  element.left += 20
                }
              } else {
                if (currentSite.top > element.top) {
                  element.top += 20
                } else {
                  element.top -= 20
                }
              }
            }
          }
          if (element.left === this.fruitLeft && element.top === this.fruitTop) {
            this.snakeList.push({ left: this.snakeList[this.snakeList.length - 1].left, top: this.snakeList[this.snakeList.length - 1].top })
            this.getFruit()
          }
        });
      }, this.timerInterval);
    }
  },
  beforeRouteLeave (to, from, next) {
    document.onkeydown = null
    clearInterval(this.timer)
    next()
  },
  mounted () {
    var _this = this
    document.onkeydown = function(e) {
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
      let val = e1.keyCode
      switch(val) {
        case 32:
          _this.isStart = !_this.isStart
          if (!_this.isStart) {
            _this.dialogShow = false
            _this.timer = setInterval(() => {
              _this.snakeList.forEach(element => {
                element.left += 20
              });
            }, _this.timerInterval);
          } else {
            _this.dialogShow = true
            clearInterval(_this.timer)
            _this.snakeList = [
              { left: 120, top: 360 },
              { left: 100, top: 360 },
              { left: 80, top: 360 }
            ]
          }
          console.log('空格')
          break;
        case 38:
          if (_this.derection === 38 || _this.derection === 40) {
            return
          }
          _this.changeDerection('上')
          break;
        case 40:
          if (_this.derection === 38 || _this.derection === 40) {
            return
          }
          _this.changeDerection('下')
          break;
        case 37:
          if (_this.derection === 37 || _this.derection === 39) {
            return
          }
          _this.changeDerection('左')
          break;
        case 39:
          if (_this.derection === 37 || _this.derection === 39) {
            return
          }
          _this.changeDerection('右')
          break;
      }
      _this.derection = val
    }
  },
  created () {
    this.getFruit()
  }
}
</script>
<style lang="scss">
  .game {
    position: relative;
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #21DE5F;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    background: #010101;
    // 容器
    .container {
      background: #343434;
      position: relative;
      width: 500px;
      height: 400px;
      margin: 0 auto;
      margin-top: 20px;
      border: 2px dashed #F0F8C7;
      // 地盘方格
      &>p {
        height: 20px;
        span {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 1px solid #141414;
        }
      }
      // 目标果子
      .fruit {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
      }
      // 蛇
      .snake {
        span {
          position: absolute;
          display: inline-block;
          width: 20px;
          height: 20px;
          background: #21DE5F;
          &:nth-child(1) {
            background: #C9436F;
          }
        }
      }
    }
    .dialog {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 101;
      background: rgba($color: #343434, $alpha: 0.8);
      text-align: center;
      line-height: 430px;
      color: #fff;
      font-size: 40px;
    }
  }
</style>