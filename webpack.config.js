var path = require('path');
module.exports = {
    entry: {
        App: "./website/assets/js/App.js",
        Vendor: "./website/assets/js/Vendor.js"
    },
    mode: 'none',
    output: {
        path: __dirname + "/website/temp/js",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};
