<template>
  <div class="article-page">
     <p class="header">
      <el-input v-model="title" clearable placeholder="请输入文章名"></el-input>
      <el-select v-model="statusValue" placeholder="请选择">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="categoryValue" clearable placeholder="文章分类">
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button @click="search"> 查询 </el-button>
      <el-button type="primary" @click="addArticle"> 增加 </el-button>
      <el-button :disabled="multipleSelection.length === 0" type="danger" @click="delButton"> 删除 </el-button>
      <el-button type="primary" @click="categoryUpdate"> 分类编辑 </el-button>
    </p>
    <!-- 用户表格 -->
    <el-table
      :data="articleList"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        disabled
        :selectable="checkSelectable"
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="文章标题">
        <template slot-scope="scope">
          <span class="title" @click="read(scope.row)"> {{ scope.row.title }} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="creatName"
        label="创建者"
        width="120">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="170">
        <template slot-scope="scope">
          <span> {{ scope.row.creatTime | dateFormat('yyyy-MM-dd HH:mm:ss') }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="阅读"
        width="50">
        <template slot-scope="scope">
          <span> {{ scope.row.readCount || 0 }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        width="170">
        <template slot-scope="scope">
          <span v-for="(item, index) in categoryList" :key="index"> 
            <span v-if="item.id === scope.row.categoryId">
              {{ item.name }}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布状态"
        width="100">
        <template slot-scope="scope">
          <span> {{ scope.row.status === '1' ? '已发布' : '草稿箱' }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button :disabled="$store.state.user.user.id !== scope.row.creatUserId" size="mini" type="primary" @click="update(scope.row)"> 编辑 </el-button>
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

    <!-- 文章分类弹出框 -->
    <el-dialog
      title="分类编辑"
      :visible.sync="dialogVisible"
      width="400px">
      <div>
        <el-tag
          :key="index"
          v-for="(item, index) in categoryList"
          closable
          :disable-transitions="false"
          @close="handleClose(item)">
          {{item.name}}
        </el-tag>
        <el-input
          maxlength="10"
          class="input-new-tag"
          v-if="inputVisible"
          v-model="categoryName"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else size="small" class="button-new-tag" @click="showInput">+ 添加分类</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 关闭 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { error } from '../../utils/index'
export default {
  name: 'article-page',
  data () {
    return {
      inputVisible: false,
      categoryName: '',
      dialogVisible: false,
      categoryValue: '',
      categoryList: [],
      title: '',
      articleList: [],
      currentPage: 1,
      totalCount: 0,
      multipleSelection: [],
      nameValue: '',
      statusValue: '',
      statusList: [
        { name: '全部', value: '' },
        { name: '已发布', value: '1' },
        { name: '草稿箱', value: '2' }
      ]
    }
  },
  methods: {
    // 删除分类
    async handleClose(val) {
      let data = await this.$store.dispatch('categoryHasArticle', {
        id: val.id
      })
      if (data.code === 1) {
        await this.$store.dispatch('delArticleCategory', {
          id: val.id
        })
        this.articleCategory()
      } else if (data.code === 0) {
        this.$confirm('当前分类下含有文章，将同时删除文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$store.dispatch('delArticleCategory', {
            id: val.id
          })
          this.articleCategory()
          this.getArticleList()
        }).catch(() => {})
      }
    },
    // 输入分类文本框
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 查询分类
    async articleCategory() {
      let data = await this.$store.dispatch('articleCategory')
      this.categoryList = data.result
    },
    // 添加分类
    async handleInputConfirm() {
      if (!this.categoryName) {
        this.inputVisible = false
        return
      }
      let data = await this.$store.dispatch('addArticleCategory', {
        name: this.categoryName
      })
      if (data.code !== 1) {
        error(data.message)
        return
      }
      this.articleCategory()
      this.inputVisible = false
      this.categoryName = ''
    },
    // 分类编辑按钮
    categoryUpdate () {
      this.dialogVisible = true
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticleList()
    },
    // 查询按钮
    search () {
      this.currentPage = 1
      this.getArticleList()
    },
    // 选中文章
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 文章不可选中
    checkSelectable (val) {
      return val.creatUserId === this.$store.state.user.user.id
    },
    // 删除文章
    delButton () {
      this.$confirm('删除文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let ids = this.multipleSelection.map(item => item.id).join(',')
        await this.$store.dispatch('delArticle', {
          ids: ids
        })
        this.getArticleList()
      }).catch(() => {
      })
    },
    // 新增文章按钮
    addArticle () {
      if (this.categoryList.length === 0) {
        error('当前文章分类为空，请先创建分类')
        return
      }
      this.$router.push('/addArticle')
    },
    // read文章
    read (val) {
      this.$router.push({path: '/readArticle', query: { id: val.id }})
    },
    // 编辑文章按钮
    update (val) {
      this.$router.push({path: '/addArticle', query: { id: val.id }})
    },
    // 获取文章列表
    async getArticleList () {
      let data = await this.$store.dispatch('getArticleList', {
        currentPage: this.currentPage,
        keywords: this.title,
        categoryId: this.categoryValue,
        status: this.statusValue
      })
      this.articleList = data.result.list
      this.totalCount = data.result.totalCount
    }
  },
  async created () {
    await this.articleCategory()
    await this.getArticleList()
  }
}
</script>
<style lang="scss">
  .article-page {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #C686EA;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    &>.header {
      .el-input {
        width: 250px;
        margin-right: 20px;
      }
      .el-select {
        .el-input {
          width: 120px;
        }
      }
    }
    .el-table {
      margin-top: 20px;
      span.title {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .el-pagination {
      margin: 30px 0 10px;
      text-align: center;
    }
    .el-dialog {
      .el-dialog__body {
        padding-bottom: 10px;
      }
      .el-tag {
        margin-right: 10px;
        margin-bottom: 10px;
      }
      .button-new-tag {
        margin-right: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 150px;
        vertical-align: top;
      }
    }
  }
</style>