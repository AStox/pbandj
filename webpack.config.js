const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        // pathRewrite: { "^/api": "" },
      },
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};
