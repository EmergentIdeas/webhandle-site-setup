const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

/* need to install:

npm i --save-dev webpack-cli node-polyfill-webpack-plugin

*/
 

module.exports = {
	entry: './client-js/app.js',
	mode: 'development',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'public/js'),
	},
	module: {
		rules: [
			{ test: /\.tmpl$/, use: 'tripartite/webpack-loader.mjs' }
			, { test: /\.tri$/, use: 'tripartite/webpack-loader.mjs' }
		],
	},
	resolve: {
		fallback: {
			stream: require.resolve('stream-browserify'),
		}
	},
	plugins: [
        new NodePolyfillPlugin()
    ]
};
