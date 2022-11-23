const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { assert } = require('console');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML and injects bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // Injects custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Create amainfest.json file
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description:'Just another text editor!',
        fingerprints: false,
        inject: true,
        background_color: '#f6c8fd',
        theme_color: '#835d8f',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          },
        ],
      })
    ],

    module: {
      //CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: [ 'style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Use babel-loader to use ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposa;-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        },
      ],
    },
  };
};
