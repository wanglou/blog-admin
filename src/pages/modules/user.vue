<template>
  <div class="user">
    <p class="header">
      <el-input v-model="nameValue" clearable placeholder="请输入用户名"></el-input>
      <el-button @click="search"> 查询 </el-button>
      <el-button type="primary" @click="addDialog"> 增加 </el-button>
      <el-button :disabled="multipleSelection.length === 0" type="danger" @click="delButton"> 删除 </el-button>
    </p>
    <!-- 用户表格 -->
    <el-table
      :data="userList"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="loginPassword"
        label="密码">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="update(scope.row)"> 编辑 </el-button>
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
    <!-- 弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="600px">
      <div>
        <el-form v-if="dialogVisible" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px">
          <el-form-item
            prop="loginName"
            label="登录名"
            :rules="[
              { required: true, message: '请输入登录名', trigger: 'blur' }
            ]"
          >
            <el-input v-model.trim="dynamicValidateForm.loginName"></el-input>
          </el-form-item>
          <el-form-item
            prop="loginPassword"
            label="登录密码"
            :rules="[
              { required: true, message: '请输入登录密码', trigger: 'blur' }
            ]"
          >
            <el-input v-model.trim="dynamicValidateForm.loginPassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { error } from '../../utils';
export default {
  name: 'user',
  data () {
    return {
      currentPage: 1,
      totalCount: 0,
      multipleSelection: [],
      dialogTitle: '新增用户',
      dialogVisible: false,
      nameValue: '',
      dynamicValidateForm: {
        loginName: '',
        loginPassword: ''
      },
      userList: [],
      updateId: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUserList()
    },
    // 查询按钮
    search () {
      this.currentPage = 1
      this.getUserList()
    },
    // 选中用户
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除用户
    delButton () {
      this.$confirm('删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let ids = this.multipleSelection.map(item => item.id).join(',')
        await this.$store.dispatch('delUser', {
          ids: ids
        })
        this.getUserList()
      }).catch(() => {        
      })
    },
    // 新增用户按钮
    addDialog () {
      this.dialogVisible = true
      this.dialogTitle = '新增用户'
      this.dynamicValidateForm = {
        loginName: '',
        loginPassword: ''
      }
    },
    // 编辑按钮
    update (val) {
      this.updateId = val.id
      this.dialogVisible = true
      this.dialogTitle = '编辑用户'
      this.dynamicValidateForm = {
        loginName: val.loginName,
        loginPassword: val.loginPassword
      }
    },
    // 提交按钮
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.dialogTitle === '新增用户') {
            let data = await this.$store.dispatch('addUser', {
              loginName: this.dynamicValidateForm.loginName,
              loginPassword: this.dynamicValidateForm.loginPassword
            })
            if (data.code !== 1) {
              error(data.message)
              return
            }
          } else {
            let data = await this.$store.dispatch('updateUser', {
              id: this.updateId,
              loginName: this.dynamicValidateForm.loginName,
              loginPassword: this.dynamicValidateForm.loginPassword
            })
            if (data.code !== 1) {
              error(data.message)
              return
            }
          }
          this.getUserList()
          this.dialogVisible = false
        } else {
          return false;
        }
      })
    },
    // 获取user列表
    async getUserList () {
      let data = await this.$store.dispatch('getUser', {
        keywords: this.nameValue,
        currentPage: this.currentPage
      })
      this.userList = data.result.list
      this.totalCount = data.result.totalCount
    }
  },
  created () {
    this.getUserList()
  }
}
</script>
<style lang="scss">
  .user {
    border: 1px solid #EEF1F6;
    box-shadow: 1px 1px 5px 0px #1296DB;
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