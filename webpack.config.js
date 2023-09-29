const path = require('path');

module.exports = {
	mode: 'production', // Production ortamı
	entry: './bin/www',
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'index.js', // Dist/index.js uygulamadaki kodlar sıkışttılımış bir formatta production hazır halde olucak.
	},
	target: 'node',
};
