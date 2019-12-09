<template>
  <div class="friend-chain">
    <div>
      <el-input v-model.trim="friendChainName" maxlength="20" placeholder="链接名称"></el-input>
      <el-input v-model.trim="friendChainUrl" placeholder="链接地址"></el-input>
      <el-button type="primary" @click="add"> 添加 </el-button>
    </div>
    <ul>
      <transition-group name="fadeIn">
        <li v-for="(item) in friendChainList" :key="item.id">
          <span @click="jump(item)">
            {{ item.name }}
          </span>
          <i class="el-icon-close" @click="del(item)"></i>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
import { error } from '../../utils'
export default {
  name: 'friend-chain',
  data() {
    return {
      friendChainName: '',
      friendChainUrl: '',
      friendChainList: []
    }
  },
  methods: {
    // 跳转链接
    jump (item) {
      window.open(item.url)
    },
    // 添加
    async add () {
      if (!this.friendChainName) {
        error('请输入链接名称')
        return
      }
      if (!this.friendChainUrl) {
        error('请输入链接地址')
        return
      }
      await this.$store.dispatch('addFriendChain', {
        name: this.friendChainName,
        url: this.friendChainUrl
      })
      this.getFriendChain()
      this.friendChainName = ''
      this.friendChainUrl = ''
    },
    // 获取友链
    async getFriendChain () {
      let data = await this.$store.dispatch('getFriendChain')
      this.friendChainList = data.result
    },
    // 删除
    del (item) {
      this.$confirm('删除友链, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$store.dispatch('delFriendChain', {
          id: item.id
        })
        await this.getFriendChain()
      }).catch(() => {
      });
    }
  },
  mounted () {
  },
  created () {
    this.getFriendChain()
  }
}
</script>
<style lang="scss">
  .friend-chain {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #1D76C2;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    &>p {
      font-size: 20px;
    }
    &>div {
      margin-top: 10px;
      .el-input {
        width: 300px;
        margin-right: 20px;
      }
    }
    &>ul {
      li {
        position: relative;
        background: rgba($color: #409EFF, $alpha: 0.2);
        color: #409EFF;
        line-height: 30px;
        border-radius: 5px;
        margin-top: 10px;
        padding: 5px 20px;
        font-size: 18px;
        span {
          cursor: pointer;
        }
        i {
          position: absolute;
          right: 10px;
          top: 8px;
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
  }
</style>