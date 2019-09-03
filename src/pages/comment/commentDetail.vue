<template>
  <div class="comment-detail">
    <el-button @click="$router.push('/comment')"> 返回 </el-button>
    <ul>
      <transition-group name="fadeIn">
        <li v-for="(item) in commentList" :key="item.id">
          <p class="name">
            评论人： {{ item.creatName }}
            <br>
            评论时间： {{ item.creatTime | dateFormat('yyyy-MM-dd HH:mm:ss') }}
          </p>
          <p class="content">
            {{ item.content }}
          </p>
          <i @click="del(item)" class="el-icon-close"></i> 
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
import { success } from '../../utils/index'
export default {
  name: 'comment-detail',
  data () {
    return {
      commentList: []
    }
  },
  methods: {
    async commentDetail () {
      let data = await this.$store.dispatch('commentDetail', {
        articleId: this.$route.query.id
      })
      this.commentList = data.result
    },
    // 删除评论
    async del (val) {
      let data = await this.$store.dispatch('delComment', {
        id: val.id,
        articleId: val.articleId
      })
      if (data.code === 1) {
        success(data.result.message)
        this.commentDetail()
      }
    }
  },
  created () {
    this.commentDetail()
  }
}
</script>
<style lang="scss">
  .comment-detail {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #FFE68C;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    ul {
      li {
        border: 1px solid #EEF1F6;
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        position: relative;
        p.name {
          color: #F7C108;
          margin-bottom: 10px;
        }
        &>i {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
</style>