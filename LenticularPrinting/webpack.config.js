const path = require('path');

module.exports = {
    mode:'development',
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist'
    },

    entry: path.resolve(__dirname, "./index.ts"),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.(txt|vert|frag)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                
            }

        ]
    }
}