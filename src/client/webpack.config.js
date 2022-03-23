const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html'
});

const outputDirectory = 'dist';

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-class-properties',
              'graphql-tag',
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // no se ni que hice pero ya funcina
  // si no le sabes no le muevas
  devServer: {
    port: 8080,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/), htmlPlugin]
};
