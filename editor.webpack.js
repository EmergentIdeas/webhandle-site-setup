const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

/* need to install:

npm i --save-dev webpack-cli node-polyfill-webpack-plugin raw-loader

*/
 

module.exports = {
	entry: './client-js/editor.js',
	// mode: 'development',
	mode: 'production',
	output: {
		filename: 'editor.js',
		path: path.resolve(__dirname, 'public/js'),
	},
	module: {
		rules: [
			{ test: /\.tmpl$/, use: 'tripartite/webpack-loader.mjs' }
			, { test: /\.tri$/, use: 'tripartite/webpack-loader.mjs' }
			, { test: /\.txt$/i, use: 'raw-loader' }
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
