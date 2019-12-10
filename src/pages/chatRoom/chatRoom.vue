<template>
  <div class="chat-room">
    <div class="list" id="div-chat-list">
      <ul id="chat-list">
        <li v-for="(item, index) in chatList" :class="{'right': item.createdName === $store.state.user.user.loginName}" :key="index">
          <div>
            <span>
              {{ Number(item.createdTime) | dateFormat('yyyy-MM-dd HH:mm:ss') }}
            </span>
          </div>
          <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
          <span v-else>
            {{ item.createdName.slice(0, 1)}}
          </span>
          <p>
            {{ item.content}}
          </p>
        </li>
      </ul>
    </div>
    <div class="add">
      <el-input v-model.trim="content" type="textarea" rows="3"  @keyup.enter.native="send"></el-input>
      <el-button type="primary" @click="send"> 发送 </el-button>
    </div>
  </div>
</template>
<script>
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
    send () {
      if (this.content) {
        this.$socket.emit('websocketTest', {
          content: this.content,
          createdName: this.$store.state.user.user.loginName,
          createdTime: new Date().getTime(),
          imgUrl: this.$store.state.user.user.url
        })
        this.content = ''
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
        div {
          text-align: center;
          margin-bottom: 10px;
          span {
            display: inline-block;
            width: 200px;
            line-height: 30px;
            border-radius: 5px;
            background: #DADADA;
            color: #fff;
          }
        }
        &>span,img {
          display: inline-block;
          width: 40px;
          height: 40px;
          vertical-align: top;
          font-size: 20px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          margin: 0 10px;
          border-radius: 50%;
          background: #BCCCD9;
        }
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
          &>span,img {
            float: right;
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