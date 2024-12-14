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
    },
    proxy: [{
      context: ['/api'],
      target: 'http://127.0.0.1:8080',
      //target: 'http://37.139.40.252',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }],
    compress: true,
    port: 80,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      Handlebars: 'handlebars'
    })
  ]
};