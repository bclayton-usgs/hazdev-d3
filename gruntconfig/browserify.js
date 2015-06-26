'use strict';

var config = require('./config');


var EXPORTS = [
  'd3/D3View',
  'd3/D3SubView',
  'd3/D3LineView'
];


var browserify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        './' + config.src,
        './node_modules/hazdev-webutils/src'
      ]
    }
  },

  // source bundle
  source : {
    src: [],
    dest: config.build + '/' + config.src + '/hazdev-d3.js',
    options: {
      alias: EXPORTS.map(function (path) {
        return './' + config.src + '/' + path + '.js:' + path;
      })
    }
  },

  // test bundle
  test: {
    src: config.test + '/test.js',
    dest: config.build + '/' + config.test + '/test.js',
    options: {
      external: EXPORTS
    }
  }

};


module.exports = browserify;
