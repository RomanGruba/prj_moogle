const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: "eval-cheap-module-source-map",

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    app: "./src/js/app.js",
    index: "./src/page-index/main.js",
    about: "./src/page-about/main.js"
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
          // Please note we are not running postcss here
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: "[path][name].[ext]?hash=[hash:20]",
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: "handlebars-loader"
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              limit: 10000,
              mimetype: "application/font-woff"
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new CopyWebpackPlugin([{ from: "src/img", to: "img" }]),
    new HtmlWebpackPlugin({
      template: "./src/page-index/tmpl.html",
      inject: true,
      chunks: ["app", "index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/page-about/tmpl.html",
      inject: true,
      chunks: ["app", "about"],
      filename: "about.html"
    }),
    new WebpackBar()
  ]
};
