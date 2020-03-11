# 仿美团网站

> 仿美团全栈实践：前端（Nuxt.js），服务端（koa2，redis，MongoDB）

> [接口地址](https://documenter.getpostman.com/view/10485336/SzRyzVAH)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Nuxt 项目不支持 import/export 问题解决

``` bash
## 安装相关依赖包
$ npm install -g babel-cli
$ npm install @babel/cli @babel/core @babel/preset-env @babel/node -D

## 修改启动命令（package.json）
"dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node --presets @babel/env",
"start": "cross-env NODE_ENV=production nodemon server/index.js --exec babel-node --presets @babel/env",

## 创建babel配置文件.babelrc
{
    "env": {
      "test": {
        "presets": [
          [
            "@babel/preset-env",
            {
              "targets": {
                "node": "current"
              }
            }
          ]
        ]
      }
    }
}
```

## 邮箱验证码发送

1. 发送验证码到邮箱有问题，邮箱收不到邮件
2. 注册页面，邮箱和验证码随便填都可以通过，此处处理有问题
