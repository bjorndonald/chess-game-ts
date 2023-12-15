const path = require('path');
const isDevelopment = true
module.exports = {
    entry: "./out/index.js",
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: { minimize: true },
};