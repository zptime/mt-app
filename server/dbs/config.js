export default {
  dbs: 'mongodb://127.0.0.1:27017/mtapp',
  redis: {
    get host () {
      return '127.0.0.1'
    },
    get port () {
      return 6379
    }
  },
  smtp: {
    get host () {
      return 'smtp.qq.com'
    },
    get port () {
      return 587
    },
    get user () {
      return '**@qq.com'
    },
    get pass () { // 授权码
      return '***'
    },
    get code () { // 验证码
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire () { // 过期时间
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
