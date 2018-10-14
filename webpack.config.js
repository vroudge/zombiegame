const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  'mode': 'development',
  'entry': './src/index.js',
  'output': {
    'path': __dirname + '/dist',
    'filename': '[name].[hash:8].js',
  },
  'devServer': {
    'contentBase': [path.resolve(__dirname, '.')],
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  'devtool': 'source-map',
  'module': {
    'rules': [
      {
        'test': /\.js$/,
        'exclude': /node_modules/,
        'use': {
          'loader': 'babel-loader',
          'options': {
            'presets': [
              '@babel/env'
            ]
          }
        }
      }
    ]
  }
}