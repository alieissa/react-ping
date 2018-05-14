const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html"
})

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_module)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_module)/,
        use: {
          loader: "style-loader",
          loader: "css-loader"
        }
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
}
