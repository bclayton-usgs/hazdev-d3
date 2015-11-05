'use strict';

var config = {
  browserify: require('./browserify'),
  clean: require('./clean'),
  connect: require('./connect'),
  copy: require('./copy'),
  jshint: require('./jshint'),
  mocha_phantomjs: require('./mocha_phantomjs'),
  postcss: require('./postcss'),
  watch: require('./watch'),
  uglify: require('./uglify'),

  tasks: [
    'grunt-browserify',
    'grunt-connect-proxy',
    'grunt-connect-rewrite',
    'grunt-contrib-clean',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-jshint',
    'grunt-contrib-uglify',
    'grunt-contrib-watch',
    'grunt-mocha-phantomjs',
    'grunt-postcss'
  ]
};

module.exports = config;
