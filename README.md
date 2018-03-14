# webpack多页面脚手架
传统的开发模式

## 文档目录
```
    |--dist               // build生成的文件
        |--html           // build生成的html文件
            |--xx.html
        |--static         // build生成的静态资源
            |--assets     // 页面公共提取的部分
                |--js     // 每个页面都引入的js
                    |--jquery.min.js
            |--file       // 透传的文件
            |--js         // 静态资源js文件
                |--xx.js
    |--node_modules       // 依赖安装包
    |--src                // 开发源文件
        |--html           // html
            |--xx.html
        |--static         // 静态资源
            |--css        // scss
                |--xx.scss
            |--file       // 透传文件，将该目录的文件直接搬到dist
            |--img        // 图片
                |--xx.png
            |--js         // js
                |--xx.js
    |--.babelrc           //babel 配置文件
    |--package.json       // 依赖包配置
    |--webpack.base.conf.js    // webpack基础配置
    |--webpack.build.conf.js   // webpack上线配置
    |--webpack.dev.conf.js     // webpack开发配置
```
## 说明
- 该配置为最基本的配置，可以按照自己的需求添加功能
- js文件与html文件名字需一致
- 新添加html文件需要重新启动
- 本地开发
    ```
    npm run dev
    ```
- 上线须知   
修改webpack.base.conf.js中output的publicPath，填入上线的地址
    ```
    publicPath: process.env.NODE_ENV == 'env'? 'http://'+ip.address()+':1110/': 'http://xxxx.com/'
    ```
    然后build
    ```
    npm run build
    ```
    可以看到build后的文件放在dist文件中。
- 默认是直接将css文件打包到js中,如果想抽离出css,可以将webpack.base.conf.js中css抽离部分打开注释，再注释掉相同的功能的配置即可