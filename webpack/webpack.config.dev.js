const { HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.config');

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
    devServer:{
         port:4200,
         proxy: {
            '/api': {
                target: "https://belarusbank.by",
                secure: false,
                changeOrigin: true
            },
          }
    },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
});