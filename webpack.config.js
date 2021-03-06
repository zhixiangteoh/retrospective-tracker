const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const ExtensionReloader = require("webpack-extension-reloader");
const ManifestVersionSyncPlugin = require("webpack-manifest-version-sync-plugin");

module.exports = {
  entry: {
    popup: "./src/popup.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      chunks: ["options"],
      filename: "options.html",
      title: "Options page title",
    }),
    new HTMLPlugin({
      chunks: ["popup"],
      filename: "popup.html",
    }),
    new CopyPlugin([
      { from: "./src/_locales/", to: "./_locales" },
      { from: "./src/assets", to: "./assets" },
      { from: "./src/manifest.json", to: "./manifest.json" },
    ]),
    new ExtensionReloader({
      manifest: path.resolve(__dirname, "./src/manifest.json"),
    }),
    new ManifestVersionSyncPlugin(),
  ],
  optimization: {
    minimize: true,
  },
  mode: "production",
  stats: "minimal",
};
