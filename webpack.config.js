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
