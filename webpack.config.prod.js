const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname + "/www",
        filename: "index.js",
        publicPath: "/"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {presets: ["es2015", "react"]}
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {sourceMap: true}
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [autoprefixer(">1%", "last 2 versions", "ie > 9", "safari > 4")],
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {sourceMap: true}
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "client/index.html",
            favicon: "client/favicon.png",
            minify: {collapseWhitespace: true},
            hash: true
        }),
        new ExtractTextPlugin("index.css")
    ]
};
