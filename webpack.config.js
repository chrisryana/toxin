const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssExtractPlugin = require('optimize-css-assets-webpack-plugin');


const isDev = process.env.NODE_ENV === 'dev';
const isProd = process.env.NODE_ENV === 'prod';
const PAGES_DIR = `${path.resolve(__dirname, 'src')}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((filename) => filename.endsWith('.pug'));

const optimization = () => {
  const config = {
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
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssExtractPlugin(),
    ]
  }

  return config;
}

const filename = (ext) => {
  if (isProd) return `[name].[hash].${ext}`;
  return `[name].${ext}`;
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
      ]
    }
  }]
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'), // пересоздается только тот файл в котором контент изменился
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    // можно не указывать расширения при импортах
    extensions: ['.js', '.json', '.scss'],
    // вместо длинных путей можно использовать элиасы
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  // все библиотеки хранятся отддельно
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',

  plugins: [
    ...PAGES.map(page => new HTMLWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      minify: {
        collapseWhitespace: isProd,
      },
    })),
    new CleanWebpackPlugin(),
    // копировать можно все что угодно даже папки
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/img/favicon.ico'),
        to: path.resolve(__dirname, 'build'),
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
        // options: {
        //   name: '[path][name].[ext]',
        //   outputPath: (file) => {
        //     let path = file.split("dev/")[1];  
        //     let newPath = '../' + path;  
        //     return newPath
        //   }
        // }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: isProd,
        }
      },
    ]
  }
}