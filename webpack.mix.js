const path   = require('path');
const mix    = require('laravel-mix');
const public = mix.inProduction() ? 'lib' : 'example';

mix.options({
  processCssUrls: false,
  uglify: {
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  }
});

mix.setPublicPath(path.normalize(public));

const config = {
  externals: {
    'jquery': 'jQuery',
    'vue': 'Vue'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          fix: false,
          cache: false,
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  output: {
    path: path.resolve(public),
    filename: 'index.js',
    library: 'VdtnetTable',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    inline: true,
    quiet: false
  },
  devtool: 'source-map'
};

mix.webpackConfig(config);
if (mix.inProduction()) {
  mix.js(`src/index.js`, `${ public }`);
} else {
  mix.js(`example/app.js`, `${ public }`);
}

mix.sourceMaps();

if (mix.inProduction()) {
  mix.version();
  mix.disableNotifications();
} else {
  mix.browserSync({
    proxy: false,
    port: 3000,
    files: [
      'src/*',
      'example/*'
    ],
    browser: 'firefox',
    open: 'local',
    server: {
      baseDir: './'
    }
  });
}

