<template>
  <div class="home">
    <!-- <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="(item, index) in userList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-model="themeValue">
        <el-radio label="white">白色</el-radio>
        <el-radio label="black">黑色</el-radio>
    </el-radio-group>
    <el-input v-model="name"></el-input>
    <el-button @click="getUserList"> 查询 </el-button>
    <el-button @click="addUser"> 添加 </el-button>
    <el-button @click="updateUser"> 修改 </el-button>
    <el-button :disabled="checkList.length === 0" @click="delUser"> 删除 </el-button> -->
    
    <!-- 顶部 -->
    <header>
      <el-row>
        <el-col :span="12">
          blog-admin
        </el-col>
        <el-col :span="12">
          <!-- <el-switch
            @change="themeChange"
            v-model="themeValue"
            active-color="#ffffff"
            inactive-color="#000000"
            active-text="日间"
            inactive-text="夜间">
          </el-switch> -->
          <span> {{ name }} </span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img v-if="imgUrl" :src="imgUrl" alt="">
              <img v-else src="../assets/images/panda.png" alt="">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </header>
    <!-- 主体 -->
    <main>
      <div class="left">
        <el-menu
          :default-active="defaultActive"
          background-color="#324157"
          text-color="#fff"
          active-text-color="#1296DB">
          <el-menu-item :index="item.path" v-for="(item, index) in menuList" :key="index" @click="handleSelect(item)">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }} </span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <p> {{ defaultActiveName }} </p>
        <transition name="slide-left">
          <router-view></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>
<script>
import {global} from '../global/global';
export default {
  name: 'home',
  data() {
    return {
      imgUrl: '',
      defaultActive: '/index',
      defaultActiveName: '首页',
      name: '',
      checkList: [],
      userList: [],
      themeValue: true,
      menuList: [
        { name: '首页', path: '/index', icon: 'el-icon-s-home' },
        { name: '用户', path: '/user', icon: 'el-icon-user-solid' },
        { name: '文章', path: '/articlePage', icon: 'el-icon-edit-outline' },
        { name: '评论', path: '/comment', icon: 'el-icon-s-comment' },
        { name: '留言墙', path: '/messageWall', icon: 'el-icon-document' }
      ]
    }
  },
  methods: {
    // 菜单路由切换
    handleSelect (item) {
      if (item.name === this.defaultActiveName) return
      this.$router.push(item.path)
    },
    // 主体更换
    themeChange () {
      global.changeTheme(this.themeValue ? 'black' : 'white');
      if (this.themeValue) {
        document.body.setAttribute('id', 'night')
      }
    },
    // 退出
    async logout () {
      let data = await this.$store.dispatch('logout')
      if (data.code === 1) {
        this.$router.push('/login')
      }
    }
  },
  watch: {
    '$route' (val) {
      this.defaultActiveName = val.meta.name
    },
    imgUrl2 () {
      this.imgUrl = this.$store.state.user.user.url
    }
  },
  computed: {
    imgUrl2 () {
      return this.$store.getters.user.url
    }
  },
  async created () {
    await this.$store.dispatch('initPage')
    this.name = this.$store.state.user.user.loginName
    this.imgUrl = this.$store.state.user.user.url
    let obj = this.$route
    this.defaultActiveName = obj.meta.name
    this.defaultActive = obj.meta.defaultActive
  }
}
</script>
<style lang="scss">
.home {
  min-width: 1200px;
  // 头部
  &>header {
    padding: 5px 20px;
    background: #EEF1F6;
    .el-col:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
      line-height: 40px;
      color: #909399;
    }
    .el-col:nth-child(2) {
      .el-switch {
        margin-right: 20px;
      }
      text-align: right;
      &>span {
        font-size: 16px;
      }
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
  // 主体
  &>main {
    display: flex;
    &>div.left {
      width: 200px;
      .el-menu {
        min-height: calc(100vh - 51px);
        height: 100%;
        overflow-x: hidden;
      }
    }
    &>div.right {
      flex: 1;
      overflow-x: hidden;
      height: calc(100vh - 100px);
      padding: 20px;
    }
  }
}
</style>