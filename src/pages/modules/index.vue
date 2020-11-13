<template>
  <div class="index">
    <!-- <header>
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
    </header> -->
    <main>
      <el-row>
        <el-col :span="6">
          <p>
            <span> 总访问量: </span>
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
            <span> 留言墙: </span>
            <span> {{ count.messageWall }} </span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <div>
              <p>
                <span> 文章统计 </span>
              </p>
              <v-chart ref="pieOptions" :options="pieOptions"/>
            </div>
        </el-col>
        <el-col :span="12">
          <div>
            <p>
              <span> 最近五日访问量 </span>
            </p>
            <v-chart ref="barOptions" :options="barOptions"/>
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
      barOptions: {
        tooltip: {
          trigger: 'item',
          formatter: "访问量: {c}次"
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'bar'
        }]
      },
      pieOptions: {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        series: [
          {
            type: 'pie',
            radius : '55%',
            data: []
          }
        ]
      },
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
      if (data.code === 1) {
        this.weather = data.result
      }
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
    },
    // 获取柱状图
    async getBar () {
      let fiveCount = await this.$store.dispatch('fiveCount')
      let barX = []
      let barLegend = []
      let start = 0
      let end = fiveCount.result.length
      if (end > 5) {
        start = end - 5
      }
      fiveCount.result.slice(start, end).forEach(item => {
        barX.push(item.month + 1 + '/' + item.day)
        barLegend.push({name: item.month + 1 + '/' + item.day, value: item.count})
      })
      this.barOptions.xAxis.data = barX
      this.barOptions.series[0].data = barLegend
      let data = await this.$store.dispatch('getIndexArticle')
      this.pieOptions.series[0].data = data.result
      let arr = []
      data.result.forEach(item => {
        arr.push(item.name)
      })
      this.pieOptions.legend.data = arr
    }
  },
  created () {
    this.getCount()
    this.getBar()
     window.onresize = () => {
      this.$refs.barOptions.resize()
      this.$refs.pieOptions.resize()
    }
    this.getIp()
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
        margin: 0 20px;
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
      .el-row:nth-child(2) {
        margin-top: 20px;
        .el-col {
          padding: 0 20px;
          &>div {
            border: 1px solid #06637C;
            p {
              background: #06647D;
              line-height: 40px;
              span {
                color: #2EF5FC;
                font-size: 16px;
                margin-left: 10px;
              }
            }
            .echarts {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>