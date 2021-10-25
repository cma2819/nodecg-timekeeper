import { Configuration, Entry } from 'webpack';
import path from 'path';
import globby from 'globby';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const targets = ['dashboard', 'graphics'];

const makeBrowserConfig = (target: string): Configuration => {

  const entry: Entry = Object.fromEntries(
    // path from root (where webpack.config.ts is in)
    globby.sync(`./src/browser/${target}/pages/*.tsx`).map(
      tsx => [ path.basename(tsx, '.tsx'), tsx ]
    )
  );

  return {
    entry,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, '../src/browser/tsconfig.json'),
            }
          },
          exclude: /node_modules/,
        },
        {
  
          test: /\.css$/i,
  
          use: ['style-loader', 'css-loader'],
  
        },
        {
          test: /\.png/,
          type: 'asset/resource',
        },
        {
  
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
  
          type: 'asset/resource',
  
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, `../${target}`),
    },
    plugins: [
      ...
      Object.keys(entry).map(
        name => new HtmlWebpackPlugin({
          title: `${name}`,
          filename: `${name}.html`,
          chunks: [name],
          template: path.resolve(__dirname, `./templates/${target}.html`),
        })
      )
    ],
  };
}

export const browserConfig: Array<Configuration> = targets.map(t => makeBrowserConfig(t));