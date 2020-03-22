const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const BUNDLE_HEADER = `
Reaction.js v0.3.0
https://github.com/nestorrente/reactionjs

Released under the MIT License.

Build date: ${new Date().toISOString()}
`.trim();

const commonConfig = {
	entry: './src/index.ts',
	devtool: 'source-map',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: 'tsconfig.json'
			})
		]
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: BUNDLE_HEADER
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
	}
};

const standaloneWithoutDependenciesConfig = {
	...commonConfig,
	externals: {
		'@nestorrente/event-bus': 'EventBus'
	},
	output: {
		...commonConfig.output,
		filename: 'reaction.js',
		library: 'Reaction',
		libraryTarget: 'var'
	}
};

const standaloneBundleConfig = {
	...commonConfig,
	output: {
		...commonConfig.output,
		filename: 'reaction.bundle.js',
		library: 'Reaction',
		libraryTarget: 'var'
	}
};

const moduleConfig = {
	...commonConfig,
	optimization: {
		minimize: false
	},
	output: {
		...commonConfig.output,
		filename: 'reaction.esm.js',
		libraryTarget: 'umd'
	}
};

module.exports = [
	standaloneWithoutDependenciesConfig,
	standaloneBundleConfig,
	moduleConfig
];
