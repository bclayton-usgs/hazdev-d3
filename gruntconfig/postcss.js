'use strict';


var autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    postcssImport = require('postcss-import'),
    precss = require('precss');


var config,
    CWD;

  config = require('./config');
  CWD = '.';


var postcss = {
  dev: {
    expand: true,
    cwd: config.src,
    dest: config.build + '/' + config.src ,
    ext: '.css',
    extDot: 'last',
    options: {
      map: 'inline',
      processors: [
        postcssImport({
          path: [
            CWD + '/' + config.src
          ]
        }),
        precss(),
        autoprefixer({'browsers': 'last 2 versions'})
      ]
    },
    src: 'hazdev-d3.scss'
  },

  dist: {
    dest: config.dist + '/hazdev-d3.css',
    options: {
      processors: [
        cssnano({zindex: false})
      ]
    },
    src: config.build + '/' + config.src + '/hazdev-d3.css'
  }
};

module.exports = postcss;
