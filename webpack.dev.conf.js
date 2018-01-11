const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const path = require('path')
const ip = require("ip");
module.exports = merge(baseWebpackConfig, {
    devtool: 'eval-source-map',
    // 本地服务器
    devServer:{
        contentBase: path.resolve(__dirname , 'dist'),
        host: ip.address(),        
        compress: true,
        port: 1110,
    }
})