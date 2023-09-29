const path = require('path');

module.exports = {
  mode: 'production', // production ortamı
  entry: './bin/www',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js', // dist/index.js uygulamadaki kodlar sıkışttılımış bir formatta production hazır halde olucak.
  },
  target: 'node',
};