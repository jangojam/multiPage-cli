const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob') // 用于获取文件路径
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var htmlPlugin = []
function getPathName(dirPath) {
    var split = dirPath.split('/')
    var splitName = split[split.length - 1]
    var splitDot = splitName.split('.')
    return splitDot[0]
}
// 获取入口文件
function getEntry(globPath) {
    var entries = {}
    var files = glob.sync(globPath)
    files.forEach(function(filePath){
        var name = getPathName(filePath)
        var entryPath = './' + filePath
        entries[name] = entryPath
    })
    return entries
}
// 在dist生成html
(function htmlTemplate(globPath) {
    var files = glob.sync(globPath)
    files.forEach(function(filePath){
        var name = getPathName(filePath)
        htmlPlugin.push(new HtmlWebpackPlugin({
            filename: filePath.substring(4),
            template: filePath,
            chunks: [name],
            hash: true
        }))
        console.log(filePath)
    })
})('src/html/*.html')


module.exports = {
    entry: getEntry('src/static/js/*.js'),
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].js',
        // publicPath: '../'
        // chunkFilename: 'static/js/[id].js'

    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    // publicPath: 'static/css/',
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.(png|jpg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: 'static/img/[name].[hash:7].[ext]'
                        },
                    },
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[name].[ext]?[hash]',
                    //         outputPath: '../static/img/'
                    //     }
                    // }
                ]
            }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'html/index.html',
    //         template: 'src/html/index.html'
    //     }),
    //     new HtmlWebpackPlugin({
    //         filename: 'html/page1.html',
    //         template: 'src/html/page1.html'
    //     })
    // ]
    plugins: htmlPlugin.concat([
        new ExtractTextPlugin({
            filename:  (getPath) => {
            return getPath('static/css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ])
}