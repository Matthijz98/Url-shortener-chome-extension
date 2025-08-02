const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development', // Use 'production' for production builds
    entry: {
        background: path.join(__dirname, 'src', 'background.js'),
        popup: path.join(__dirname, 'src', 'popup.js'),
        options: path.join(__dirname, 'src', 'options.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: '' } // Copy all assets and the manifest.json from 'public' to 'dist'
            ],
        }),
    ]
};