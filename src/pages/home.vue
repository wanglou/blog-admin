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
              <el-dropdown-item @click.native="getPerson">个人信息</el-dropdown-item>
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
    <!-- 弹出框 -->
    <el-dialog
      title="个人信息"
      :visible.sync="dialogVisible"
      width="800px">
      <el-row>
        <el-col :span="10">
          <el-upload
            class="avatar-uploader"
            :action="action"
            name="filename"
            :data="{userId: $store.state.user.user.id, url: $store.state.user.user.url}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="14">
          <div class="person-message">
            <p>  
              <i class="el-icon-user-solid"></i>
              <span @dblclick="dblPerson(1)" v-if="personMessageShow.name">
                {{ personMessage.name }}
              </span>
              <el-input ref="name" @blur="blurPerson(1)" v-else v-model.trim="personMessage.name" maxlength="20"></el-input>
            </p>
            <p>  
              <i class="iconfont icon-email"></i>
              <span @dblclick="dblPerson(2)" v-if="personMessageShow.email">
                {{ personMessage.email }}
              </span>
              <el-input ref="email" @blur="blurPerson(2)" v-else v-model.trim="personMessage.email" maxlength="50"></el-input>
            </p>
            <p>  
              <i class="iconfont icon-qq"></i>
              <span @dblclick="dblPerson(3)" v-if="personMessageShow.qq">
                {{ personMessage.qq }}
              </span>
              <el-input ref="qq" @blur="blurPerson(3)" v-else v-model.trim="personMessage.qq" maxlength="20"></el-input>
            </p>
            <p>
              <i class="iconfont icon-wechat"></i>
              <span @dblclick="dblPerson(4)" v-if="personMessageShow.wechat">
                {{ personMessage.wechat }}
              </span>
              <el-input ref="wechat" @blur="blurPerson(4)" v-else v-model.trim="personMessage.wechat" maxlength="20"></el-input>
            </p>
            <p>
              <i class="iconfont icon-github"></i>
              <span @dblclick="dblPerson(5)" v-if="personMessageShow.github">
                {{ personMessage.github }}
              </span>
              <el-input ref="github" @blur="blurPerson(5)" v-else v-model.trim="personMessage.github" maxlength="100"></el-input>
            </p>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {global} from '../global/global';
import { error } from '../utils/index';
export default {
  name: 'home',
  data() {
    return {
      personMessage: {
        name: '',
        email: '',
        qq: '',
        wechat: '',
        github: ''
      },
      personMessageShow: {
        name: true,
        email: true,
        qq: true,
        wechat: true,
        github: true
      },
      imageUrl: '',
      dialogVisible: false,
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
        { name: '留言墙', path: '/messageWall', icon: 'el-icon-document' },
        { name: '友链', path: '/friendChain', icon: 'el-icon-link' },
        { name: '聊天室', path: '/chatRoom', icon: 'el-icon-chat-round' },
        { name: '小游戏', path: '/game', icon: 'el-icon-coordinate' }
      ]
    }
  },
  methods: {
    // 上传之前回调
    beforeAvatarUpload (file) {
      const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPicture) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPicture && isLt2M
    },
    // 上传成功回调
    async handleAvatarSuccess (res) {
      this.imageUrl = res.result.url
      this.$store.dispatch('initPage')
    },
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
    },
    // 获取个人信息
    async getPerson () {
      this.dialogVisible = true
      let data = await this.$store.dispatch('getPerson')
      this.personMessage = data.result
    },
    // 修改个人信息
    async blurPerson (val) {
      if (!this.personMessage.name || !this.personMessage.email || !this.personMessage.qq || !this.personMessage.wechat || !this.personMessage.github) {
        error('不可以为空')
        return
      }
      await this.$store.dispatch('updatePerson', this.personMessage)
      switch(val) {
        case 1:
          this.personMessageShow.name = true
          break;
        case 2:
          this.personMessageShow.email = true
          break;
        case 3:
          this.personMessageShow.qq = true
          break;
        case 4:
          this.personMessageShow.wechat = true
          break;
        case 5:
          this.personMessageShow.github = true
          break;
      }
      let data2 = await this.$store.dispatch('getPerson')
      this.personMessage = data2.result
    },
    // 双击修改
    dblPerson (val) {
      switch(val) {
        case 1:
          this.personMessageShow.name = false
          setTimeout(() => {
            this.$refs.name.focus()
          }, 50);
          break;
        case 2:
          this.personMessageShow.email = false
          setTimeout(() => {
            this.$refs.email.focus()
          }, 50);
          break;
        case 3:
          this.personMessageShow.qq = false
          setTimeout(() => {
            this.$refs.qq.focus()
          }, 50);
          break;
        case 4:
          this.personMessageShow.wechat = false
          setTimeout(() => {
            this.$refs.wechat.focus()
          }, 50);
          break;
        case 5:
          this.personMessageShow.github = false
          setTimeout(() => {
            this.$refs.github.focus()
          }, 50);
          break;
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
    },
    action () {
      return '/upload/avatar'
    }
  },
  async created () {
    await this.$store.dispatch('initPage')
    this.name = this.$store.state.user.user.loginName
    this.imgUrl = this.$store.state.user.user.url
    let obj = this.$route
    this.defaultActiveName = obj.meta.name
    this.defaultActive = obj.meta.defaultActive
    setTimeout(() => {
      this.imageUrl = this.$store.state.user.user.url
    }, 500)
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
  &>.el-dialog__wrapper {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader {
      text-align: center;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 200px;
      height: 200px;
      line-height: 200px;
      text-align: center;
    }
    .avatar {
      width: 200px;
      height: 200px;
      display: block;
    }
    .person-message {
      padding-left: 50px;
      &>p {
        height: 34px;
        margin-bottom: 10px;
        &>i {
          font-size: 24px;
          margin-right: 20px;
          margin-top: 5px;
          visibility: middle;
        }
        &>span {
          font-size: 20px;
          user-select: none;
        }
        .el-input {
          width: 300px;
        }
      }
    }
    .el-dialog__footer {
      text-align: center;
      .el-button {
        width: 85%;
      }
    }
  }
}
</style>