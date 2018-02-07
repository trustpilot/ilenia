const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-localization.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/index.d.ts',
    }]),
  ],
  externals: {
    react: 'react',
    'prop-types': 'prop-types',
  },
  devtool: 'sourcemap',
};
