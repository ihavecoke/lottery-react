const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    lottery: ["./src/lottery.tsx", "./src/index.scss"]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "underscore"
    }),
    new MiniCssExtractPlugin({filename: `./../public/[name].css`})
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.coffee$/,
        use: ['coffee-loader']
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },
  resolve: {
    extensions: [".coffee", ".js", ".scss", ".css", ".ts", ".tsx"]
  }
};