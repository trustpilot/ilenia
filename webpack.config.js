const path = require('path');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-localization.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|__tests__/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          compact: true,
          presets: ['es2015'],
          plugins: [
            [
              'transform-runtime', {
                helpers: false,
                polyfill: false,
                regenerator: true
              }
            ],
            'transform-async-to-generator',
            'react-require',
            'transform-object-rest-spread',
            'transform-react-jsx',
            'transform-class-properties'
          ]
        }
      }
    ]
  },
  externals: {
    react: 'react',
    'prop-types': 'prop-types'
  },
  devtool: 'sourcemap'
};
