<template>
  <div class="index">
    <header>
      <span>
        {{ weather.city }}
      </span>
      <span>
        {{ weather.realtime.info }}
      </span>
      <span>
        {{ weather.realtime.direct }}
        {{ weather.realtime.power }}
      </span>
      <span>
        温度：
        {{ weather.realtime.temperature }}°C
      </span>
      <span>
        湿度：
        {{ weather.realtime.humidity }}%
      </span>
    </header>
    <main>
      <el-row>
        <el-col :span="12">
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
        <el-col :span="12">
          <div class="person-message">
            <p>  
              <i class="el-icon-user-solid"></i>
              <span>
                爱生活爱生命
              </span>
            </p>
            <p>  
              <i class="iconfont icon-email"></i>
              <span>
                wangloul@163.com
              </span>
            </p>
            <p>  
              <i class="iconfont icon-qq"></i>
              <span>
                799817928
              </span>
            </p>
            <p>
              <i class="iconfont icon-wechat"></i>
              <span>
                wxl799817928
              </span>
            </p>
            <p>
              <i class="iconfont icon-github"></i>
              <span>
                https://github.com/wanglou
              </span>
            </p>
          </div>
        </el-col>
      </el-row>
    </main>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      imageUrl: '',
      weather: {
        city:"石家庄",
        realtime:{
          temperature:"31",
          humidity:"25",
          info:"晴",
          wid:"00",
          direct:"东北风",
          power:"3级",
          aqi:"29"
        }
      }
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
    // 获取天气
    async getWeather (city) {
      let data = await this.$store.dispatch('getWeather', {
        city: city
      })
      this.weather = data.result
    },
    // 获取ip
    async getIp () {
      let data = await this.$store.dispatch('getIp')
      let start = data.result.indexOf('省') + 1
      let end = data.result.indexOf('市')
      let city = data.result.slice(start, end)
      this.getWeather(city)
    }
  },
  computed: {
    action () {
      return '/upload/avatar'
    }
  },
  created () {
    // this.getIp()
    setTimeout(() => {
      this.imageUrl = this.$store.state.user.user.url
    }, 500)
  }
}
</script>
<style lang="scss">
  .index {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #ddd;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    header {
      span {
        margin: 0 10px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    &>main {
      margin-top: 50px;
      overflow: hidden;
      .el-row {
        .el-col:nth-child(1) {
          text-align: center;
        }
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
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
        float: left;
        padding-left: 50px;
        &>p {
          margin-bottom: 10px;
          &>i {
            font-size: 24px;
            margin-right: 20px;
          }
          &>span {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>