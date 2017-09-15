const config = require("./config");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname + "/www",
        filename: "index.js",
        publicPath: "/"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        port: 3000,
        contentBase: "www",
        proxy: {"/api": `http://localhost:${config.port}`},
        historyApiFallback: true
    },
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
                use: [
                    "style-loader",
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
            hash: true
        })
    ]
};
