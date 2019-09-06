<template>
  <div class="message-wall">
    <el-row :gutter="12">
      <transition-group name="fadeIn">
        <el-col :span="8" v-for="(item, index) in messageList" :key="index">
          <el-card shadow="always">
            <div slot="header">
              <span>
                {{ item.name }}
              </span>
              <el-button @click="del(item)" style="float: right; padding: 3px 0;color: #F56C6C;" type="text">删除</el-button>
            </div>
            <div class="body">
              {{  item.content }}
            </div>
            <p>
              {{ item.time | dateFormat('yyyy-MM-dd HH:mm:ss') }}
            </p>
          </el-card>
        </el-col>
      </transition-group>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'message-wall',
  data() {
    return {
      messageList: [
        { name: 'wanglou', time: '2019-5-22 12:2:20', content: '打开扩大' }
      ]
    }
  },
  methods: {
    // 删除留言
    del (item) {
      this.$confirm('删除留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$store.dispatch('delMessage', {
          id: item.id
        })
        await this.getMessageList()
      }).catch(() => {
      });
    },
    async getMessageList () {
      let data = await this.$store.dispatch('messageList')
      this.messageList = data.result
    }
  },
  created () {
    this.getMessageList()
  }
}
</script>
<style lang="scss">
  .message-wall {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #21DE5F;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    .el-card {
      margin-bottom: 10px;
        padding-bottom: 40px;
        position: relative;
      .el-card__header {
      }
      .el-card__body {
        height: 150px;
        overflow-x: hidden;
        .body {
          margin: 10px 0;
        }
        p {
          position: absolute;
          bottom: 10px;
          left: 20px;
        }
      }
    }
  }
</style>