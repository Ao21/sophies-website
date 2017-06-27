var webpack = require("webpack");
var path = require("path");
var fs = require("fs");

const CleanWebpackPlugin = require("clean-webpack-plugin");

var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  externals: nodeModules,

  output: {
    filename: "dist.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: "pre",
        loader: "tslint-loader",
        exclude: /node_modules/,
        options: {
          typeCheck: true
        }
      },
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js", ".json"],
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
            'merge-graphql-schemas': "node_modules/merge-graphql-schemas/src/index.js"
        }
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      test:/\.js$/,
      moduleFilenameTemplate:'[absolute-resource-path]',
      fallbackModuleFilenameTemplate:'[absolute-resource-path]?[hash]',
      filename: "[file].map",
      sourceRoot:'/'}
    ),
    new CleanWebpackPlugin(["dist"])]
};
