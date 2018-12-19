const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {
	const envProd = env.production === true ? true : false

	return {
		node: {
			fs: 'empty',
		},
		entry: {
			index: './src/index.js',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: './[name].bundle.[hash:5].js',
		},
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			host: '0.0.0.0',
			port: 9000,
			hot: true,
			stats: 'errors-only',
			open: false,
			historyApiFallback: true,
			stats: 'minimal',
		},
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						!envProd ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.(png|jp(e*)g|gif|svg)$/,
					use: [
						'file-loader?name=assets/img/[name].[ext]?[hash:5]',
						'image-webpack-loader',
					],
				},
				{
					test: /\.(woff|woff2|ttf|eot)$/,
					loader: 'file-loader?name=assets/fonts/[name].[ext]',
				},
				{
					test: /\.(ico)$/,
					use: 'file-loader?name=[name].[ext]',
				},
				{
					test: /\.(wav|.mp3)$/,

					loader: 'file-loader',
				},
			],
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				title: 'JS30 - DrumKit',
				description: 'A simple drumkit built with Webpack, React & Sass',
				keywords: 'JS, Webpack, Sass, React, Simple Project',
				hash: true,
				minify: { collapseWhitespace: envProd },
				template: './src/index.html',
				filename: './index.html',
				chunks: ['index'],
			}),

			new MiniCssExtractPlugin({
				filename: !envProd ? '[name].css' : '[name].[hash:5].css',
				chunkFilename: !envProd ? '[id].css' : '[id].[hash:5].css',
			}),
			new CopyWebpackPlugin([
				{
					from: 'src/.htaccess',
					to: './',
				},
			]),

			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			}),
		],
		optimization: {
			minimize: envProd,
			minimizer: [
				new UglifyJsPlugin({
					uglifyOptions: {
						warnings: false,
						parse: {},
						compress: {},
						mangle: true,
						output: null,
						toplevel: false,
						nameCache: null,
						ie8: true,
						keep_fnames: false,
					},
				}),
			],
		},
	}
}
