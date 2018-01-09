const path = require('path')
module.exports = {
    entry: {
        "index/index" : './src/static/js/index.js',
        page1: './src/static/js/page1.js',
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }

        ]
    },
    plugins: [
    ]
}