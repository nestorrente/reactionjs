const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BUNDLE_HEADER = `
@license
Reaction.js v${process.env.npm_package_version}
https://github.com/nestorrente/reactionjs

Released under the MIT License.

Build date: ${new Date().toISOString()}
`.trim();

const LICENSE_COMMENT_REGEX = /@license/i;
const REACTIONJS_COMMENT_REGEX = /\bReaction\.js\b/;

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
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments(node, comment) {
							const commentContents = comment.value;
							return LICENSE_COMMENT_REGEX.test(commentContents) && REACTIONJS_COMMENT_REGEX.test(commentContents);
						},
					},
				}
			})
		]
	},
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
