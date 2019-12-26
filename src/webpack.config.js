const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const publicPath = path.resolve(__dirname, 'public');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: './js/main.js'
	},
	output: {
		path: path.join(__dirname, '../static/dist'),
		filename: '[name].bundle.[chunkhash].js',
		chunkFilename: '[name].bundle.[chunkhash].js',
	},
	devtool: 'cheap-module-source-map',
	resolve: {
		extensions: [
			'.js',
			'.gif',
			'.png',
			'.jpg',
			'.jpeg',
			'.svg'
		],
		modules: [path.resolve(__dirname, 'src'), 'node_modules']
	},
	plugins: [
		new AssetsPlugin({
			filename: 'webpack_assets.json',
			path: path.join(__dirname, '../data'),
			prettyPrint: true
		}),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.[chunkhash].css',
			chunkFilename: '[id].css'
		}),
		new CopyPlugin([
			{
				from: 'img/*',
				to: path.join(__dirname, '../static/dist'),
				// transform(content, path) {
				// 	return optimize(content);
				// },
				cache: true,
			},
		]),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							optipng: {
								enabled: false
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4
							},
							gifsicle: {
								interlaced: false
							}
						}
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: __dirname + '/css/'
						}
					},
					{
						loader: 'css-loader',
						options: {importLoaders: 1},
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: __dirname + '/postcss.config.js'
							}
						},
					},
				],
			}
		]
	},
	devServer: {
		compress: true,
		contentBase: publicPath,
		historyApiFallback: true,
		host: '0.0.0.0',
		hot: true,
		overlay: true,
		port: 3000
	}
};
