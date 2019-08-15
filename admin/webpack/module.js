const fileLoaderWithOptions = {
  loader: 'file-loader',
  options: {
    outputPath: 'static/',
    name: '[name].[ext]'
  }
}

module.exports = (env) => ({
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
    },
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'source-map-loader',
    },
    {
      test: /\.css$/,
      enforce: 'pre',
      use: [
        'style-loader',
        'css-modules-typescript-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: env === 'development'
                ? '[local]--[hash:base64:3]'
                : '[hash:base64:7]',
            },
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
      oneOf: [
        {
          resourceQuery: /inline/,
          use: 'svg-inline-loader',
        },
        {
          use: fileLoaderWithOptions,
        },
      ],
    },
    {
      test: /\.(gif|png|jpe?g|ico)$/i,
      use: fileLoaderWithOptions,
    },
  ],
})
