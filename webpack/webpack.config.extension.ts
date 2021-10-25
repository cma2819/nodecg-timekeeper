import path from 'path';
import { Configuration } from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';

export const extensionConfig: Configuration = {
  target: 'node',
  node: false,
  externals: [
    webpackNodeExternals(),
  ],
  entry: path.resolve(__dirname, '../src/extension/index.ts'),
  module: {
    rules: [
      {
        test: /(?!\.test)\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, '../src/extension/tsconfig.json'),
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../extension'),
    libraryTarget: 'commonjs2',
  },
}