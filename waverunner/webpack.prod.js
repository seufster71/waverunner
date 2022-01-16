const webpack = require('webpack');
const { merge } = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'src/main/resources/static');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new CleanWebpackPlugin(['./src/main/resources/static/dist']),
    new HtmlWebpackPlugin({
    	title: 'Wave Runner',
    	template: './src/main/js/index.html',
    	filename: BUILD_DIR + '/index.html'
    }),
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
  ],
  output: {
    path: BUILD_DIR + '/dist',
    filename: '[name].[contenthash].js',
    publicPath: 'dist/'
  },
  optimization: {
	  runtimeChunk: 'single',
	  splitChunks: {
		  chunks: 'all',
	      maxInitialRequests: Infinity,
	      minSize: 0,
		  cacheGroups: {
			  vendor: {
				  test: /[\\/]node_modules[\\/]/,
				  name(module) {
			            // get the name. E.g. node_modules/packageName/not/this/part.js
			            // or node_modules/packageName
			            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

			            // npm package names are URL-safe, but some servers don't like @ symbols
			            return `npm.${packageName.replace('@', '')}`;
				  }
			  }
		  }
	  }
  }

});

