module.exports = {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    },
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'source-map-loader'
    },
    {
      test: /\.css$/,
      enforce: 'pre',
      use: [
        'style-loader',
        {
          loader: 'typings-for-css-modules-loader',
          options: {
            modules: true,
            namedExport: true,
            importLoaders: 2,
            sourceMap: true,
            localIdentName: '[local]--[hash:base64:5]',
            camelCase: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-import')(),
              require('postcss-cssnext')({
                warnForDuplicates: false,
              }),
              require('postcss-nested')(),
            ],

          },
        },

      ],
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    },
    {
      test: /\.(gif|png|jpe?g|ico)$/i,
      loader: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/',
            name: '[name].[ext]'
          }
        }
      ]
    }
  ],
}
