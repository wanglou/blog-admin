<template>
  <div class="comment-page">
    <p class="header">
      <el-input v-model="nameValue" clearable placeholder="请输入文章名"></el-input>
      <el-button @click="search"> 查询 </el-button>
    </p>
    <!-- 文章列表评论数 -->
    <el-table
      :data="commentList"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="commentCount"
        label="评论数">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope.row)"> 查看 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size="10"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'comment-page',
  data () {
    return {
      currentPage: 1,
      totalCount: 0,
      nameValue: '',
      commentList: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.articleComment()
    },
    search () {
      this.articleComment()
    },
    // 查看
    look (val) {
      this.$router.push({path: '/commentDetail', query: { id: val.id }})
    },
    // 获取有评论的列表
    async articleComment () {
      let data = await this.$store.dispatch('articleComment', {
        currentPage: this.currentPage,
        keywords: this.nameValue
      })
      this.commentList = data.result.list
      this.totalCount = data.result.totalCount
    }
  },
  created () {
    this.articleComment()
  }
}
</script>
<style lang="scss">
  .comment-page {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #FFE68C;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    &>.header {
      .el-input {
        width: 300px;
        margin-right: 20px;
      }
    }
    .el-table {
      margin-top: 20px;
    }
    .el-pagination {
      margin: 30px 0 10px;
      text-align: center;
    }
  }
</style>