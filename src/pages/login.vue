<template>
  <div class="login">
    <div class="container">
      <img class="animal" src="../assets/images/panda.png" alt="">
      <img v-if="starShow" class="star star1" src="../assets/images/star.png" alt="">
      <img v-if="starShow" class="star star2" src="../assets/images/star.png" alt="">
      <span>
        <img v-if="starShow" class="zui" src="../assets/images/mouth.png" alt="">
      </span>
      <p>
        <i class="el-icon-user"></i>
        <el-input v-model.trim="loginName"></el-input>
      </p>
      <p>
        <i class="el-icon-lock"></i>
        <el-input @keyup.enter.native="login" @focus="starShow = true" @blur="starShow = false" v-model.trim="loginPassword" type="password"></el-input>
      </p>
      <p>
        <el-button @click="login"> 登 录 </el-button>
      </p>
    </div>
  </div>
</template>
<script>
import { error } from '../utils/index'
export default {
  name: 'login',
  data () {
    return {
      starShow: false,
      loginPassword: '',
      loginName: '',
      timer: null
    }
  },
  methods: {
    async login () {
      if (this.loginName && this.loginPassword) {
        let data = await this.$store.dispatch('login', {
          loginName: this.loginName,
          loginPassword: this.loginPassword
        })
        if (data.code === 1) {
          this.$store.dispatch('initPage')
          this.$router.push('/index')
        } else {
          error(data.result)
        }
      } else {
        error('请输入用户名及密码!')
      }
    }
  }
}
</script>
<style lang="scss">
  .login {
    min-width: 1200px;
    .container {
      position: absolute;
      left: calc(50% - 200px);
      top: calc(50% - 200px);
      width: 350px;
      height: 400px;
      border: 1px solid #ddd;
      border-radius: 5px;
      text-align: center;
      img.animal {
        width: 150px;
      }
      img.star {
        position: absolute;
        width: 40px;
      }
      .star1 {
        top: 52px;
        left: 130px;
      }
      .star2 {
        top: 52px;
        left: 180px;
      }
      .zui {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 92px;
        left: 160px;
        transform:rotate(-20deg);
        background: #fff;
      }
      p {
        margin-top: 20px;
        &>i {
          font-size: 24px;
          vertical-align: middle;
          margin: 0 10px;
        }
        .el-input {
          width: 250px;
        }
        .el-button {
          margin-left: 45px;
          width: 250px;
        }
      }
    }
  }
</style>