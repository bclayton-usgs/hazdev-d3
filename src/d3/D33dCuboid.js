'use strict';

var D33dGroup = require('./D33dGroup'),
    D33dPath = require('./D33dPath'),
    Util = require('hazdev-webutils').util.Util;


var _DEFAULTS = {
  className: 'D33dCuboid',
  x0: 0,
  x1: 1,
  y0: 0,
  y1: 1,
  z0: 0,
  z1: 1
};


/**
 * A 3d cuboid.
 */
var D33dCuboid = function (options) {
  var _this,
      _initialize,
      // variables
      _x0,
      _x1,
      _y0,
      _y1,
      _z0,
      _z1,
      // methods
      _updateCoordinates;


  _this = D33dGroup(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    // create sides as paths
    _x0 = D33dPath({
      className: 'side-x0'
    });
    _x1 = D33dPath({
      className: 'side-x1'
    });
    _y0 = D33dPath({
      className: 'side-y0'
    });
    _y1 = D33dPath({
      className: 'side-y1'
    });
    _z0 = D33dPath({
      className: 'side-z0'
    });
    _z1 = D33dPath({
      className: 'side-z1'
    });

    // update model for D33dGroup
    _this.model.set({
      className: options.className,
      items: [
        _x0,
        _x1,
        _y0,
        _y1,
        _z0,
        _z1
      ],
      x0: options.x0,
      x1: options.x1,
      y0: options.y0,
      y1: options.y1,
      z0: options.z0,
      z1: options.z1
    }, {silent: true});

    // set coordinates
    _updateCoordinates();
    _this.model.on('change', _updateCoordinates);
  };

  /**
   * Update the coordinates of each side of the cuboid.
   */
  _updateCoordinates = function () {
    var p000,
        p001,
        p010,
        p011,
        p100,
        p101,
        p110,
        p111,
        x0,
        x1,
        y0,
        y1,
        z0,
        z1;

    // raw coordinates
    x0 = _this.model.get('x0');
    x1 = _this.model.get('x1');
    y0 = _this.model.get('y0');
    y1 = _this.model.get('y1');
    z0 = _this.model.get('z0');
    z1 = _this.model.get('z1');

    // points on cuboid
    p000 = [x0, y0, z0];
    p001 = [x0, y0, z1];
    p010 = [x0, y1, z0];
    p011 = [x0, y1, z1];
    p100 = [x1, y0, z0];
    p101 = [x1, y0, z1];
    p110 = [x1, y1, z0];
    p111 = [x1, y1, z1];

    // update sides
    _x0.model.set({
      coords: [p000, p010, p011, p001]
    });
    _x1.model.set({
      coords: [p100, p101, p111, p110]
    });
    _y0.model.set({
      coords: [p000, p001, p101, p100]
    });
    _y1.model.set({
      coords: [p010, p011, p111, p110]
    });
    _z0.model.set({
      coords: [p000, p010, p110, p100]
    });
    _z1.model.set({
      coords: [p001, p011, p111, p101]
    });
  };

  /**
   * Unbind listeners, free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return _this;
    }

    _this.model.off('change', _updateCoordinates);

    _x0.destroy();
    _x1.destroy();
    _y0.destroy();
    _y1.destroy();
    _z0.destroy();
    _z1.destroy();

    _initialize = null;
    _this = null;
    _updateCoordinates = null;
    _x0 = null;
    _x1 = null;
    _y0 = null;
    _y1 = null;
    _z0 = null;
    _z1 = null;
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D33dCuboid;
