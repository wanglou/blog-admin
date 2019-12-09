<template>
  <div class="chat-room">
    <div class="list" id="div-chat-list">
      <ul id="chat-list">
        <li v-for="(item, index) in chatList" :class="{'right': item.type === '2'}" :key="index">
          <p>
            {{ item.content}}
          </p>
        </li>
      </ul>
    </div>
    <div class="add">
      <el-input v-model="content" type="textarea" rows="3"></el-input>
      <el-button type="primary" @click="send('1')"> 发送-1 </el-button>
      <el-button type="primary" @click="send('2')"> 发送-2 </el-button>
    </div>
  </div>
</template>
<script>
import { error } from '../../utils'
export default {
  name: 'chat-room',
  data() {
    return {
      content: '',
      chatList: []
    }
  },
  sockets:{
    //这里是监听connect事件
    connect () {
      // 获取每台客服端生成的id
      // this.websocketid = this.$socket.id;
      console.log('链接服务器');
    },
    // 监听断开连接，函数
    disconnect () {
      console.log('断开服务器连接');
    },
    // 监听broadcast事件
    broadcast (data) {
      this.chatList.push(data)
      var ele = document.getElementById('chat-list');
      var ele2 = document.getElementById('div-chat-list');
      setTimeout(() => {
        ele2.scrollTop = ele.scrollHeight;
      }, 100);
    }
  },
  methods: {
    send (type) {
      if (this.content) {
        this.$socket.emit('websocketTest', {
          content: this.content,
          type: type
        })
        this.content = ''
      } else {
        error('请输入内容')
      }
    },
    // 查询初始对话
    async getWebsocketTest () {
      let data = await this.$store.dispatch('getWebsocketTest')
      this.chatList = data.result
      var ele = document.getElementById('chat-list');
      var ele2 = document.getElementById('div-chat-list');
      setTimeout(() => {
        ele2.scrollTop = ele.scrollHeight;
      }, 100);
    }
  },
  mounted () {
    this.getWebsocketTest()
  },
  created () {
  }
}
</script>
<style lang="scss">
  .chat-room {
    margin-top: 20px;
    &>.list {
      border: 1px solid #324157;
      border-radius: 10px;
      background: #F5F5F5;
      padding: 20px;
      height: calc(100vh - 340px);
      overflow-x: hidden;
      li {
        margin-top: 20px;
        p {
          display: inline-block;
          width: 400px;
          padding: 10px 20px;
          border-radius: 5px;
          background: #fff;
          text-align: left;
        }
        &.right {
          text-align: right;
          p {
            background: #9EEA6A;
            text-align: left
          }
        }
      }
    }
    &>.add {
      .el-textarea {
        margin-top: 20px;
      }
      .el-button {
        margin-top: 10px;
      }
    }
  }
</style>