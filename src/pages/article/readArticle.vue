<template>
  <div class="read-article">
    <div class="article-container">
      <el-button @click="$router.push('/articlePage')"> 返回 </el-button>
      <el-button type="primary" @click="update" v-if="$store.state.user.user.id === detail.creatUserId"> 编辑 </el-button>
      <h2 class="title">
        {{ detail.title }}
      </h2>
      <p class="time">
        <span> 创建者: {{ detail.creatName }} </span>
        <span> 阅读: {{ detail.readCount || 0 }} </span>
        <span> 创建时间: {{ detail.creatTime | dateFormat('yyyy-MM-dd HH:mm:ss') }} </span>
      </p>
      <div class="content" v-html="detail.content"></div>
      <div class="add-comment">
        <el-input placeholder="请输入评论内容" v-model="commentContent" type="textarea" rows="4"></el-input>
        <el-input placeholder="请输入评论人名字" v-model="name"></el-input>
        <p> <el-button type="primary" @click="submitComment"> 发布评论 </el-button> </p>
      </div>
    </div>
    <div class="comment">
      <ul>
        <transition-group name="fadeIn">
          <li v-for="(item, index) in commentList" :key="index">
            <p> {{ item.content }}
              <i @click="del(item)" class="el-icon-close"></i> 
            </p>
            <p>
              <span class="lou"> {{ index + 1 }}楼 </span>
              <span class="name"> &nbsp;&nbsp;&nbsp;{{ item.creatName }}&nbsp;&nbsp;&nbsp; {{ item.creatTime | dateFormat('yyyy-MM-dd HH:mm:ss') }}</span>
            </p>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>
<script>
import { success, error } from '../../utils/index'
import marked from 'marked'
export default {
  name: 'read-article',
  data () {
    return {
      name: '',
      commentContent: '',
      detail: {},
      commentList: []
    }
  },
  methods: {
    // 获取文章详情
    async getDetail () {
      let data = await this.$store.dispatch('articleDetail', {
        id: this.$route.query.id
      })
      if (data.result.type === 2) {
        data.result.content = marked(data.result.content)
      }
      this.detail = data.result
    },
    // 编辑按钮
    update () {
      this.$router.push({path: '/addArticle', query: { id: this.$route.query.id }})
    },
    // 获取评论详情
    async getCommentList () {
     let data =  await this.$store.dispatch('commentDetail', {
        articleId: this.$route.query.id
      })
      this.commentList = data.result
    },
    // 发布评论按钮
    async submitComment () {
      if (!this.commentContent) {
        error('请填写评论')
        return
      }
      if (!this.name) {
        error('请填写评论人名字')
        return
      }
      let data = await this.$store.dispatch('addComment', {
        articleId: this.$route.query.id,
        creatName: this.name,
        content: this.commentContent
      })
      if (data.code === 1) {
        this.commentContent = ''
        this.name = ''
        success('评论成功')
      }
      this.getCommentList()
    },
    // 删除评论
    async del (val) {
      let data = await this.$store.dispatch('delComment', {
        id: val.id,
        articleId: val.articleId
      })
      if (data.code === 1) {
        success(data.result.message)
        this.getCommentList()
      }
    }
  },
  created() {
    this.getDetail()
    this.getCommentList()
  }
}
</script>
<style lang="scss">
  .read-article {
    .article-container {
      border: 1px solid #EEF1F6;
      box-shadow: 1px 1px 5px 0px #C686EA;
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;
      .title {
        margin: 20px 0;
        text-align: center;
      }
      p.time {
        margin: 20px 0;
        text-align: center;
        span {
          margin: 0 5px;
        }
      }
      div.content {
        padding: 20px 0;
        td,th {
          border: 1px solid #ddd;
        }
      }
      div.add-comment {
        .el-input {
          margin-top: 10px;
        }
        .el-button {
          margin-top: 20px;
        }
      }
    }
    div.comment {
      li {
        position: relative;
        margin-top: 20px;
        border: 1px solid #EEF1F6;
        box-shadow: 1px 1px 5px 0px #C686EA;
        border-radius: 10px;
        padding: 20px;
        p {
          margin: 5px 0;
          i {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
            cursor: pointer;
          }
        }
        span.name {
          color: #9808EA;
        }
        span.lou {
          font-weight: bold;
        }
      }
    }
  }
</style>