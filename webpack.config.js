'use strict';
const path = require('path');

module.exports = {
	entry : './src/index.js',
	output : {
		path : path.join(__dirname, 'dist'),
		filename : 'bundle.js'
	},
	devServer : {
		inline : true,
		port : 3333
	},
	module : {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}]
	}
}