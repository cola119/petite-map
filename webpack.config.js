const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

/** @type import("webpack").Configuration */
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.umd.js',
    library: {
      name: 'PMap',
      type: 'umd',
      export: 'default',
    },
  },
  devtool: isProd ? undefined : 'inline-source-map',
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            declaration: false,
            sourceMap: !isProd,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
};
