'use strict';

var config = require('./config');


var EXPORTS = [
  'd3/D3View',
  'd3/D3SubView',
  'd3/D3LineView',
  'd3/D33dAxis',
  'd3/D33dCuboid',
  'd3/D33dGroup',
  'd3/D33dPath',
  'd3/D33dText',
  'd3/D33dView'
].map(function (path) {
  return './' + config.src + '/' + path + '.js:' + path;
}).concat([
  './node_modules/d3/d3.js:d3'
]);


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
      alias: EXPORTS
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
