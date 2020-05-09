const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: `html-loader`,
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `./public/index.html`,
      filename: `./index.html`,
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
}
