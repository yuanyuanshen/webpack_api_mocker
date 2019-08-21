# webpack_api_mocker

> A Vue.js project

### webpack-api-mocker 的使用

1. github 地址：https://github.com/jaywcjlove/webpack-api-mocker
2. [Webpack 最简单的方式 Mock API](https://juejin.im/post/5a7c263c5188257a836c20c4)
3. [在 webpack-dev-server 内添加 mock server](https://juejin.im/post/5afba2746fb9a07aaf356327)

-   使用 vue-cli 3.x [拉取 2.x 模板 (旧版本)](https://cli.vuejs.org/zh/guide/creating-a-project.html#%E6%8B%89%E5%8F%96-2-x-%E6%A8%A1%E6%9D%BF-%E6%97%A7%E7%89%88%E6%9C%AC) 创建的项目

原项目地址：https://github.com/cag2050/webpack_api_mocker_demo 同时感谢这位作者

说明：自己直接 copy 了 cag2050 的项目做了修改，因为在自己使用过程中存在以下问题

-   npm run dev-mock 是报错 MOCK 不是内部命令
    使用 cross-env 包 修改

    ```js
    "dev-mock": "cross-env MOCK=true webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
    ```

-   针对自己定义的接口和外部正常接口同时做了测试，确保在项目中已经存在的接口能够正常运行，自己定的 api （本地 mock 数据）也可以正常运营
    ![](https://github.com/yuanyuanshen/FrontendEngineering/blob/master/imgs/example.png)

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve with hot reload at localhost:8081
# use this url http://localhost:8081/github_stars_top test api
npm run dev-mock

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
