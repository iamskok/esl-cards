const HtmlWebPackPlugin = require('html-webpack-plugin')

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
        // include: SRC,
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
}
