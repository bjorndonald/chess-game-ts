const path = require('path');
module.exports = {
    entry: "./common/index.js",
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: { minimize: true },
};