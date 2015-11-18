'use strict';


var Camera = require('math/Camera'),
    D3BaseView = require('./D3BaseView'),
    Util = require('util/Util'),
    Vector = require('math/Vector');


var _DEFAULTS = {
  lookAt: [0, 0, 0],
  origin: [100, 100, 100],
  up: [0, 0, 1],
  zoom: 10
};


/**
 * Simulate a 3D view.
 *
 * Add objects to the D33dView.views collection to make them plot:
 * - D33dGroup
 *   - D33dAxis
 *   - D33dCuboid
 * - D33dPath
 * - D33dText
 *
 * The properties lookAt, origin, up, and zoom, can be modified by updating the
 * corresponding D33dView.model properties.
 *
 * @param options {Object}
 * @param options.lookAt {Array<x, y, z>}
 *        default [0, 0, 0].
 *        where view looks at.
 * @param options.origin {Array<x, y, z>}
 *        default [100, 100, 100].
 *        where view looks from.
 * @param options.up {Array<x, y, z>}
 *        default [0, 0, 1] (z-axis up).
 *        up vector.
 * @param options.zoom {Number}
 *        default 10.
 *        scaling factor for plot.
 */
var D33dView = function (options) {
  var _this,
      _initialize,
      // variables
      _camera,
      _centerX,
      _centerY,
      _zoom,
      // methods
      _createCamera,
      _projectObject,
      _renderObject;


  _this = D3BaseView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _centerX = 0;
    _centerY = 0;
    _zoom = options.zoom;

    _createCamera();

    _this.model.on('change:lookAt', _createCamera);
    _this.model.on('change:origin', _createCamera);
    _this.model.on('change:up', _createCamera);
  };

  /**
   * Create the camera object used for projection.
   */
  _createCamera = function () {
    var lookAt,
        origin,
        up;

    lookAt = _this.model.get('lookAt');
    origin = _this.model.get('origin');
    up = _this.model.get('up');
    _zoom = _this.model.get('zoom');

    _camera = Camera({
      lookAt: lookAt,
      origin: origin,
      up: up
    });
  };


  /**
   * Project object coordinates.
   *
   * Sets the object properties `_projected` and `_z`.
   */
  _projectObject = function (obj) {
    var type;

    type = obj.el.nodeName;
    if (type === 'g') {
      obj.items.forEach(function (obj) {
        _projectObject(obj);
      });
      obj._z = Math.max.apply(Math, obj.items.map(function (p) {
        return p._z;
      }));
    } else if (type === 'text') {
      obj._projected = _this.project(obj.coords);
      obj._z = obj._projected[2];
      if (obj.direction) {
        obj._direction = obj.direction.map(_this.project);
      }
    } else if (type === 'path') {
      obj._projected = obj.coords.map(_this.project);
      obj._z = Math.max.apply(Math, obj._projected.map(function (c) {
        return c[2];
      }));
    } else {
      throw new Error('unexpected element type "' + type + '"');
    }
  };

  /**
   * Render object coordinates.
   *
   * Ignores objects that are behind the camera (z' <= 0).
   *
   * @param obj {Object}
   *        object to render.
   * @param el {SVGElement}
   *        Element where object should be appended.
   */
  _renderObject = function (obj, el) {
    var angle,
        direction,
        end,
        start,
        type,
        x,
        y;

    if (obj._z <= 0) {
      // behind camera
      return;
    }

    // attach element
    el.appendChild(obj.el);
    el = obj.el;
    type = el.nodeName;
    if (type === 'g') {
      // empty group element
      Util.empty(el);
      // sort to plot further objects first
      obj.items.sort(function (a, b) {
        return b._z - a._z;
      });
      // plot nested objects
      obj.items.forEach(function (item) {
        _renderObject(item, obj.el);
      });
    } else if (type === 'text') {
      x = obj._projected[0];
      y = obj._projected[1];
      el.setAttribute('x', x);
      el.setAttribute('y', y);
      if (obj._direction) {
        // direction representa a vector that should be parallel to the text
        end = Vector(obj._direction[1]);
        start = Vector(obj._direction[0]);
        direction = end.subtract(start);
        // check angle in camera plane
        direction.z(0);
        angle = direction.azimuth() * 180 / Math.PI;
        // subtract azimuth from 90, screen y axis is in opposite direction
        angle = 90 - angle;
        el.setAttribute('transform', 'rotate(' + [angle, x, y].join(' ') + ')');
      }
    } else if (type === 'path') {
      el.setAttribute('d',
          'M' +
          obj._projected.map(function (c) {
            return c[0] + ',' + c[1];
          }).join('L') +
          (obj.close !== false ? 'Z' : ''));
    } else {
      throw new Error('unexpected element type "' + type + '"');
    }
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _this.model.off('change:lookAt', _createCamera);
    _this.model.off('change:origin', _createCamera);
    _this.model.off('change:up', _createCamera);

    _centerX = null;
    _centerY = null;
    _createCamera = null;
    _initialize = null;
    _projectObject = null;
    _renderObject = null;
    _this = null;
    _zoom = null;
  }, _this.destroy);

  /**
   * Project a single coordinate into the view x/y plane.
   *
   * @param coords {Array<x, y, z>}
   * @return {Array<x', y', z'>} projected coordinates.
   *         z' represents the distance from the camera plane to the object.
   */
  _this.project = function (coords) {
    var projected,
        x,
        y,
        z;

    projected = _camera.project(coords);
    x = projected[0];
    y = projected[1];
    z = projected[2];

    // zoom and center
    x = x * _zoom + _centerX;
    y = (-y * _zoom) + _centerY;

    return [x, y, z];
  };

  /**
   * Render all views.
   *
   * @param info {Object}
   *        plot information.
   */
  _this.renderViews = function (info) {
    var plotArea,
        torender;

    // update projection
    _centerX = info.innerHeight / 2;
    _centerY = info.innerWidth / 2;

    // clear plot
    plotArea = info.el;
    Util.empty(plotArea);

    // get raw coordinates
    torender = [];
    _this.views.data().forEach(function (view) {
      torender.push(view.getData());
    });
    // compute position
    torender.forEach(function (r) {
      _projectObject(r);
    });
    // stack to plot closest elements last
    torender.sort(function (a, b) {
      return b._z - a._z;
    });
    // position elements
    torender.forEach(function (r) {
      _renderObject(r, plotArea);
    });

    // now that elements are positioned, have views update rendering
    _this.views.data().forEach(function (view) {
      view.render(_this);
    });
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D33dView;
