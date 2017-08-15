const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const appPath = `${__dirname}/app`
const distPath = `${__dirname}/dist`
const exclude = /node_modules/

module.exports = {

  context: appPath,

  entry: {
    app: './index.js',
    vendor: ['vue', 'vuex', 'vue-router']
  },

  output: {
    path: distPath,
    filename: 'bundle.js'
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: `${appPath}/index.html`
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    // すべての Vue.js 警告コードを短絡します
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.js/,
        exclude,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  devServer: {
    contentBase: distPath,
    compress: true,
    port: 9000
  }
}
