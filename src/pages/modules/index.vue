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
        <el-col :span="6">
          <p>
            <span> 访问量: </span>
            <span> {{ count.count }} </span>
          </p>
        </el-col>
        <el-col :span="6">
          <p>
            <span> 文章数: </span>
            <span> {{ count.article }} </span>
          </p>
        </el-col>
        <el-col :span="6">
          <p>
            <span> 评论数: </span>
            <span> {{ count.comment }} </span>
          </p>
        </el-col>
        <el-col :span="6">
          <p>
            <span> 留言数: </span>
            <span> {{ count.messageWall }} </span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
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
        </el-col> -->
      </el-row>
    </main>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      count: {},
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
    },
    // 获取总数
    async getCount () {
      let data = await this.$store.dispatch('getCount')
      this.count = data.result
    }
  },
  created () {
    this.getCount()
    // this.getIp()
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
      margin-top: 20px;
      overflow: hidden;
      .el-row:nth-child(1) {
        .el-col {
          text-align: center;
          padding: 0 20px;
          &>p {
            line-height: 50px;
            font-size: 20px;
            border-radius: 5px;
            color: #fff;
            background: linear-gradient(#007FE0, #74FAED);
          }
        }
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