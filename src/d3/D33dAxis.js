'use strict';

var D33dGroup = require('./D33dGroup'),
    D33dPath = require('./D33dPath'),
    D33dText = require('./D33dText'),
    Util = require('util/Util'),
    Vector = require('math/Vector');


var _DEFAULTS = {
  className: 'D33dAxis',
  extent: [[0, 0, 0], [1, 0, 0]],
  format: function (coord) {
    return ''+coord;
  },
  padding: 0.05,
  scale: null,
  ticks: 10,
  tickVector: [0, 0, 1],
  title: 'Axis',
  titleVector: null
};


/**
 * A 3d axis.
 *
 * @param options {Object}
 * @param options.extent {Array<Array<Number>>}
 *        default [[0, 0, 0], [1, 0, 0]].
 *        axis extent.
 * @param optoins.format {Function(Array<Number>)}
 *        format one coordinate (for ticks).
 * @param options.labelVector {Array<Number>}
 *        default tickVector.multiply(2).
 *        placement of tick labels
 * @param options.padding {Number}
 *        default 0.05
 *        padding outside extent.  0.05 would be 5% padding based on extent.
 * @param options.ticks {Number}
 *        number of ticks to create.
 * @param options.tickVector {Array<Number>}
 *        direction and length of tick marks.
 * @param options.title {String}
 *        axis title.
 */
var D3Axis = function (options) {
  var _this,
      _initialize,
      // variables
      _extent,
      _ticks,
      _title,
      // methods
      _createTicks;


  _this = D33dGroup(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.model.set({
      extent: options.extent,
      format: options.format,
      labelVector: options.labelVector,
      padding: options.padding,
      ticks: options.ticks,
      tickVector: options.tickVector,
      title: options.title
    }, {silent: true});

    _extent = D33dPath({
      className: 'axis-extent'
    });
    _title = D33dText({
      className: 'axis-title'
    });
    _ticks = [];

    _createTicks();
    _this.model.on('change', _createTicks);
  };

  /**
   * Update the _ticks array and model "items" property.
   */
  _createTicks = function () {
    var extent,
        format,
        i,
        labelVector,
        padding,
        tickEnd,
        tick,
        ticks,
        tickStart,
        tickUnit,
        tickVector,
        title;

    _ticks.forEach(function (tick) {
      tick.destroy();
    });
    _ticks = [];

    extent = _this.model.get('extent');
    format = _this.model.get('format');
    labelVector = _this.model.get('labelVector');
    padding = _this.model.get('padding');
    ticks = _this.model.get('ticks');
    tickVector = _this.model.get('tickVector');
    title = _this.model.get('title');

    tickEnd = Vector(extent[1]);
    tickStart = Vector(extent[0]);
    tickVector = Vector(tickVector);

    // update extent
    if (padding !== 0) {
      padding = tickEnd.subtract(tickStart).multiply(padding);
      extent[0] = Vector(extent[0]).subtract(padding).data();
      extent[1] = Vector(extent[1]).add(padding).data();
    }
    _extent.model.set({
      coords: extent
    });
    _title.model.set({
      coords: Vector(extent[0])
          // center within axis
          .add(tickEnd.subtract(tickStart).multiply(0.5))
          // offset
          .add(tickVector.multiply(5)).data(),
      text: title,
      textAnchor: 'middle'
    });

    // create ticks
    tickUnit = tickEnd.subtract(tickStart).multiply(1 / ticks);
    labelVector = (labelVector ? Vector(labelVector) : tickVector.multiply(2));
    for (i = 0; i <= ticks; i++) {
      tick = tickStart.add(tickUnit.multiply(i));

      _ticks.push(D33dGroup({
        className: 'axis-tick',
        items: [
          D33dPath({
            coords: [
              tick.data(),
              tick.add(tickVector).data()
            ]
          }),
          D33dText({
            text: format(tick.data()),
            coords: tick.add(labelVector).data()
          })
        ]
      }));
    }

    _this.model.set({
      items: [
        _extent,
        _title
      ].concat(_ticks)
    }, {silent: true});
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _this.model.off('change', _createTicks);

    _extent.destroy();
    _title.destroy();
    _ticks.forEach(function (tick) {
      tick.destroy();
    });

    _createTicks = null;
    _extent = null;
    _initialize = null;
    _this = null;
    _ticks = null;
    _title = null;
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3Axis;
