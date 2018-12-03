var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        Vendor: "./website/assets/js/Vendor.js",
        App: "./website/assets/js/App.js"
    },
    mode: 'none',
    output: {
        path: __dirname + "/website/temp/js",
        filename: "[name].js"
    },
    resolve: {
        alias: {'picker' : '../vendors/picker'}
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                query: {
                    plugins: ["transform-runtime"],
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // })
    ]
};