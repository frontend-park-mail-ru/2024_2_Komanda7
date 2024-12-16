const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './public/src/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          precompileOptions: {
            knownHelpersOnly: false,
          },
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]'
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'public/src'),
      'node_modules'
    ],
    extensions: ['.js', '.hbs', '.css'],
    alias: {
      '@images': path.resolve(__dirname, 'public/src/assets/images'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    },
    // Удаляем секцию proxy полностью
    compress: true,
    port: 8000, // Меняем порт на 8000
    host: '0.0.0.0', // Меняем на localhost
    allowedHosts: 'all',
    historyApiFallback: {
      index: '/index.html'
    },
    hot: true,
},
  plugins: [
    new webpack.ProvidePlugin({
      Handlebars: 'handlebars'
    })
  ]
};