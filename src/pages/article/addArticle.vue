<template>
  <div class="add-article">
    <div class="editor">
      <el-tabs v-model="activeName">
        <el-tab-pane label="富文本编辑器" name="1" :disabled="disableNum === 2">
          <p class="title">
            <el-input v-model.trim="title"></el-input>
          </p>
          <div ref="editor"></div>
        </el-tab-pane>
        <el-tab-pane label="markdown编辑器" name="2"  :disabled="disableNum === 1">
          <el-input v-model.trim="title"></el-input>
          <mavon-editor v-model="markdownValue"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer>
      <el-select v-model="categoryValue" placeholder="文章分类">
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button @click="$router.push('/articlePage')"> 取消 </el-button>
      <el-button type="danger" @click="submit(2)"> 存草稿 </el-button>
      <el-button type="primary" @click="submit(1)"> 发布 </el-button>
    </footer>
  </div>
</template>
<script>
import E from 'wangeditor'
import { error } from '../../utils/index'
export default {
  name: 'add-article',
  data() {
    return {
      categoryValue: '',
      categoryList: [],
      disableNum: '',
      activeName: '1',
      title: '',
      content: '',
      editor: '',
      markdownValue: ''
    }
  },
  methods: {
    // 提交按钮
    async submit (val) {
      // val = 1 发布
      // val = 2 存草稿
      if (!this.title) {
        error('请输入文章名称')
        return
      }
      if (!this.categoryValue) {
        error('请选择文章分类')
        return
      }
      if (this.$route.query.id) {
        let data = await this.$store.dispatch('updateArticle',{
          id: this.$route.query.id,
          title: this.title,
          status: val,
          categoryId: this.categoryValue,
          type: this.activeName,
          content: this.activeName === '1' ? this.content : this.markdownValue,
          creatUserId: this.$store.state.user.user.id
        })
        if (data.code === 1) {
          this.$router.push('/articlePage')
        } else {
          error(data.message)
        }
      } else {
        let data = await this.$store.dispatch('addArticle',{
          title: this.title,
          type: this.activeName,
          status: val,
          categoryId: this.categoryValue,
          content: this.activeName === '1' ? this.content : this.markdownValue,
          creatUserId: this.$store.state.user.user.id
        })
        if (data.code === 1) {
          this.$router.push('/articlePage')
        } else {
          error(data.message)
        }
      }
    },
    // 查询详情
    async getDetail () {
      let data = await this.$store.dispatch('articleDetail', {
        id: this.$route.query.id
      })
      this.title = data.result.title
      this.categoryValue = data.result.categoryId
      this.activeName = String(data.result.type)
      if (data.result.type === 1) {
        this.editor.txt.html(data.result.content)
        this.content = data.result.content
      } else {
        this.markdownValue = data.result.content
      }
      this.disableNum = Number(data.result.type)
    },
    // 查询分类
    async articleCategory() {
      let data = await this.$store.dispatch('articleCategory')
      this.categoryList = data.result
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.content = html
    }
    this.editor.create()
  },
  created () {
    this.articleCategory()
    if (this.$route.query.id) {
      this.getDetail()
    }
  }
}
</script>
<style lang="scss">
  .add-article {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #C686EA;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    .editor {
      // 富文本编辑器
      #pane-1 {
        .title {
          text-align: center;
          .el-input {
            display: inline-block;
            width: 500px;
          }
        }
        .w-e-toolbar {
          margin-top: 20px;
        }
        .w-e-text-container{
          height: calc(100vh - 390px) !important;
          min-height: 200px;
        }
      }
      // markdown编辑器
      #pane-2 {
        padding: 2px;
        .el-input {
          display: block;
          width: 500px;
          margin: 0 auto 20px;
        }
        .markdown-body {
          height: calc(100vh - 360px) !important;
          min-height: 200px;
        }
      }
    }
    footer {
      text-align: center;
      margin-top: 20px;
      .el-input {
        width: 150px;
        margin-right: 10px;
      }
    }
  }
  .el-popper {
    z-index: 10001 !important;
  }
</style>