const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const portfinder = require('portfinder');
const args = require('yargs').default('proxy', '8000').argv;

portfinder.basePort = 3000;

const config = (env, argv, port) => ({
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: _.zipObject(
    glob.sync('./src/main.*.js*').map(f => path.basename(f, path.extname(f))),
    glob.sync('./src/main.*.js*').map(f => [
      '@babel/polyfill',
      'whatwg-fetch',
      f,
    ]),
  ),
  output: {
    path: path.resolve(__dirname, '../static/<%= app %>'),
    filename: 'js/[name].js',
  },
  devServer: {
    compress: true,
    port,
    open: true,
    contentBase: false,
    proxy: {
      '/': {
        target: `http://localhost:${args.proxy}`,
      },
      // Uncomment if proxying websockets...
      // '/ws': {
      //   target: `ws://localhost:${argv.proxy}/`,
      //   ws: true,
      // },
    },
    publicPath: '/static/<%= app %>/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', {
                targets: {
                  browsers: 'last 2 versions',
                },
              }],
              '@babel/react',
            ],
            plugins: [
              '@babel/proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /theme.*\.s?css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      }, {
        test: /\.s?css$/,
        exclude: /theme.*\.s?css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },
});

module.exports = (env, argv) =>
  portfinder.getPortPromise()
    .then(port => config(env, argv, port));
