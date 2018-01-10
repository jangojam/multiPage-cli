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
        publicPath: 'http://192.168.0.103:1110/'
        // chunkFilename: 'static/js/[id].js'

    },
    module:{
        rules: [
            // 上线
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         // publicPath: 'static/css/',
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
           },
            // 调试
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.scss$/,
            //     use: [{
            //         loader: "style-loader" // creates style nodes from JS strings
            //     }, {
            //         loader: "css-loader" // translates CSS into CommonJS
            //     }, {
            //         loader: "sass-loader" // compiles Sass to CSS
            //     }]
            // },
            {
                test: /\.(png|jpg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[name].[hash:7].[ext]',
                            // name: '[name].[ext]',
                            outputPath: 'static/img/'
                        },
                    },
                    
                ]
            },
            // html里面img路径
            {
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            }
        ]
    },
    plugins: htmlPlugin.concat([
        new ExtractTextPlugin({
            filename:  (getPath) => {
            return getPath('static/css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
    ])
}