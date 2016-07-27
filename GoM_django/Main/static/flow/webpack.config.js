const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.resolve(SRC_DIR, 'scripts', 'index.js'),
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: SRC_DIR,
      loader: 'babel',
    }, {
      test: /\.scss?$/,
      include: SRC_DIR,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
  },
  plugins: [new ExtractTextPlugin('bundle.css')],
};
