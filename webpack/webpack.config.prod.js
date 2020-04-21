const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.config');

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
});