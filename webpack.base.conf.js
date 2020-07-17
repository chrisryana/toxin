const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getFiles = (dir, fileType) => {
  return dir.map(folder => {
    const folderPath = `${PAGES_DIR}/${folder}`;
    const folderFiles = fs.readdirSync(folderPath);
    const pageFile = folderFiles.find(fileName => fileName.endsWith(`.${fileType}`));
    return pageFile;
  });
}

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pages`;
const PAGE_FOLDERS = fs.readdirSync(PAGES_DIR);
const PAGES = getFiles(PAGE_FOLDERS, 'pug');
const ENTRY_FILES = getFiles(PAGE_FOLDERS, 'js');
const ENTRYS = {};

ENTRY_FILES.forEach((entryFile, index) => {
  const fileName = entryFile.split('.')[0];
  ENTRYS[fileName] = `${PAGES_DIR}/${PAGE_FOLDERS[index]}/${entryFile}`
})

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: ENTRYS,
  output: {
    filename: `js/[name].min.js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.pug$/,
      oneOf: [
        {
          use: ['pug-loader']
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/fonts',
        // outputPath: (url, resourcePath, context) => {
        //   const relativePath = path.relative(context, resourcePath);
        //   if (/\/img\//.test(relativePath)) {
        //     return;
        //   }

        //   return `assets/fonts/${url}`;
        // },
      }
    }, 
    {
      test: /\.(png|jpe?g|gif|svg)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/img',
        // outputPath: (url, resourcePath, context) => {
        //   const relativePath = path.relative(context, resourcePath);
        //   if (/\/fonts\//.test(relativePath)) {
        //       return;
        //   }
        //   // console.log('context::::', resourcePath, context, relativePath)
        //   // return 'assets/img';
        //   return `assets/img/${url}`;
        // },
      }
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '~': PATHS.src,
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].min.css`,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      // { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' },
      { from: `${PATHS.src}/favicons`, to: 'favicons' },
    ]),
    ...PAGES.map((page, index) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${PAGE_FOLDERS[index]}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
  ],
}
