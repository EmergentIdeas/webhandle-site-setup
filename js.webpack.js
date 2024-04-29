const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

/* need to install:

npm i --save-dev webpack-cli node-polyfill-webpack-plugin raw-loader

*/

let mode = 'development'
// let mode = 'production'
 
let pagesConf = {
	entry: './client-js/pages.js',
	mode: mode,
	output: {
		filename: 'pages.js',
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
			// stream: require.resolve('stream-browserify'),
		}
	},
	plugins: [
        // new NodePolyfillPlugin()
    ]
}

let editorConf = {
	entry: './client-js/editor.js',
	mode: mode,
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
}

let appConf = {
	entry: './client-js/app.js',
	mode: mode,
	output: {
		filename: 'app.js',
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
			// stream: require.resolve('stream-browserify'),
		}
	},
	plugins: [
        new NodePolyfillPlugin()
    ]
}


module.exports = [
	pagesConf, editorConf, appConf
]