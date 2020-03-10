<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" round @click="sendMsg">
            发送验证码
          </el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code" maxlength="4">
          <el-input v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">
            同意一下协议并注册
          </el-button>
          <div class="error">
            {{ error }}
          </div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="https://rules-center.meituan.com/rules-detail/4"
            target="_blank"
          >《美团点评用户服务协议》</a>
          <a
            class="f1"
            href="https://rules-center.meituan.com/rules-detail/2"
            target="_blank"
          >《美团点评隐私政策》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data () {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    register (formName) {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        // valid为true时，代表验证都通过
        if (valid) {
          self.$axios
            .post('/users/signup', {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: CryptoJS.MD5(self.ruleForm.pwd).toString(), // 密码加密，MD5()返回数组，需要转为字符串
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/login';
                } else {
                  self.error = data.msg;
                }
              } else {
                self.error = `服务器出错，错误码:${status}`;
              }
              // error的清空操作
              setTimeout(() => {
                self.error = '';
              }, 1500);
            });
        }
      });
    },
    sendMsg () {
      const self = this;
      let namePass;
      let emailPass;
      // 验证码倒数定时器存在时，不能再次验证
      if (self.timerid) {
        return false;
      }
      // 验证用户名是否通过校验
      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid;
      });
      // 错误信息清空
      self.statusMsg = '';
      // 没有通过，就退出校验
      if (namePass) {
        return false;
      }

      // 验证邮箱是否通过校验
      this.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid;
      });

      // namePass emailPass有值代表错误
      if (!namePass && !emailPass) {
        self.$axios
          .post('/users/verify', {
            username: encodeURIComponent(self.ruleForm.name), // 中文要进行编码
            email: self.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              // 60秒后才能再次发送
              let count = 60;
              self.statusMsg = `验证码已发送,剩余${count--}秒`;
              self.timerid = setInterval(() => {
                self.statusMsg = `验证码已发送,剩余${count--}秒`;
                if (count < 0) {
                  clearInterval(self.timerid);
                }
              }, 1000);
            } else {
              self.statusMsg = data.msg;
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
