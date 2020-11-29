const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

// Input
const entry = [paths.src + '/index.js']
// Output
const output = {
  publicPath: process.env.PUBLIC_PATH
}

// JavaScript: Use Babel to transpile JavaScript files
// const ruleJs = { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
const ruleJs = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader']
}

// Styles: Inject CSS into the head with source maps
const ruleCss = {
  test: /\.(css)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { sourceMap: true, importLoaders: 1 }
    }
  ]
}
// Images: Copy image files to build folder
const ruleImg = { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' }
// Fonts and SVGs: Inline files
const ruleInline = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
  type: 'asset/inline'
}
const rules = [ruleJs, ruleCss, ruleImg, ruleInline]

// Removes/cleans build folders and unused assets when rebuilding
const cleanWebpackPlugin = new CleanWebpackPlugin()
// Copies files from target to destination folder
const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: paths.public,
      to: 'assets',
      globOptions: {
        ignore: ['*.DS_Store']
      }
    }
  ]
})
// Generates an HTML file from a template
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Webpack 5 Boilerplate',
  favicon: paths.src + '/images/favicon.png',
  template: paths.src + '/template.html', // template file
  filename: 'index.html' // output file
})
const moduleFederationPlugin = new ModuleFederationPlugin({
  name: 'somemodulename',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './SomeComponent': './src/components/some-component'
  },
  shared: require('../package.json').dependencies
})

const plugins = [cleanWebpackPlugin, copyWebpackPlugin, htmlWebpackPlugin, moduleFederationPlugin]

module.exports = {
  entry,
  output,
  plugins,
  module: { rules }
}
