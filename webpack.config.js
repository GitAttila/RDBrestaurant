var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        Vendor: "./website/assets/js/Vendor.js",
        App: ["@babel/polyfill","./website/assets/js/App.js"]
    },
    mode: 'development',
    output: {
        path: __dirname + "/website/temp/js",
        filename: "[name].js"
    },
    devtool: 'source-map',
    resolve: {
        alias: {'picker' : '../vendors/picker'}
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ["@babel/plugin-transform-runtime", "transform-node-env-inline"],
                        presets: [["@babel/preset-env", { "targets": {"esmodules": true} }]]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};