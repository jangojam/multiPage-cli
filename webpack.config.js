const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const path = require('path')
module.exports = merge(baseWebpackConfig, {
    // 本地服务器
    devServer:{
        contentBase: path.resolve(__dirname , 'dist'),
        host: '192.168.10.56',        
        compress: true,
        port: 1110
    }
})