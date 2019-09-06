<template>
  <div class="friend-chain">
    <div>
      <el-input v-model.trim="friendChainName" maxlength="20" placeholder="链接名称"></el-input>
      <el-input v-model.trim="friendChainUrl" placeholder="链接地址"></el-input>
      <el-button> 添加 </el-button>
    </div>
    <ul>
      <li v-for="(item, index) in friendChainList" :key="index">
        {{ item.name }}
        <i class="el-icon-close"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'friend-chain',
  data() {
    return {
      friendChainName: '',
      friendChainUrl: '',
      friendChainList: [
        { name: 'jkchao' }
      ]
    }
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
        background: #7E7E7E;
        color: #fff;
        line-height: 30px;
        border-radius: 5px;
        margin-top: 10px;
        padding: 5px 20px;
        font-size: 18px;
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