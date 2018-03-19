const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "css/[name].css"
});

const config = {
  entry: {
    app: ["./main/front/js/app.js", "./main/front/sass/style.sass"]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
          plugins: ["transform-es2015-arrow-functions"]
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        query: {
          name: "fonts/[name].[ext]",
          limit: 10000,
          mimetype: "application/font-woff"
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        query: {
          name: "fonts/[name].[ext]",
        }
      },
      {
        test: /\.jst$/,
        loader: "underscore-template-loader"
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          publicPath: '/static/',
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractSass
  ],
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, './main/static')
  },
};

module.exports = config;