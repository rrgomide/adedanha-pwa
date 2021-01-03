const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              {
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            ],
          },
        },
      },
    ],
  },
};
