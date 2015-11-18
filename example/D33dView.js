'use strict';

var D33dAxis = require('d3/D33dAxis'),
    D33dCuboid = require('d3/D33dCuboid'),
    D33dView = require('d3/D33dView');


var el,
    subview,
    view;

el = document.querySelector('#example');


view = D33dView({
  el: el,
  title: 'D33dView Example',
  lookAt: [10, 25, 0],
  origin: [100, -25, 25],
  up: [0, 0, 1],
  zoom: 5
});


view.views.add(D33dAxis({
  className: 'axis x-axis',
  extent: [[0, 0, 0], [50, 0, 0]],
  format: function (c) { return ''+c[0]; },
  ticks: 5,
  tickVector: [0, -1, 0],
  title: 'X'
}));

view.views.add(D33dAxis({
  className: 'axis y-axis',
  extent: [[0, 0, 0], [0, 50, 0]],
  format: function (c) { return ''+(c[1]/10).toFixed(1); },
  ticks: 5,
  tickVector: [-1, 0, 0],
  title: 'Y'
}));

view.views.add(D33dAxis({
  className: 'axis z-axis',
  extent: [[0, 0, 0], [0, 0, 50]],
  format: function (c) { return ''+c[2]; },
  ticks: 5,
  tickVector: [0, -1, 0],
  title: 'Z'
}));


subview = D33dCuboid({
  className: 'box',
  x0: 5,
  x1: 10,
  y0: 10,
  y1: 15,
  z0: 15,
  z1: 20
});
view.views.add(subview);



var cameraX,
    cameraY,
    cameraZ,
    setCamera;

el = el.parentNode.insertBefore(document.createElement('div'), el.nextSibling);
el.innerHTML =
    '<label for="camera-x">Camera X</label>' +
    '<input type="range" id="camera-x" min="-300" max="300" value="100"/>' +
    '<span class="camera-x"></span>' +
    '<br/>' +
    '<label for="camera-y">Camera Y</label>' +
    '<input type="range" id="camera-y" min="-300" max="300" value="-25"/>' +
    '<span class="camera-y"></span>' +
    '<br/>' +
    '<label for="camera-z">Camera Z</label>' +
    '<input type="range" id="camera-z" min="-300" max="300" value="25"/>' +
    '<span class="camera-z"></span>';

cameraX = el.querySelector('#camera-x');
cameraY = el.querySelector('#camera-y');
cameraZ = el.querySelector('#camera-z');


setCamera = function () {
  view.model.set({
    'origin': [cameraX.value, cameraY.value, cameraZ.value]
  });
  el.querySelector('.camera-x').innerHTML = cameraX.value;
  el.querySelector('.camera-y').innerHTML = cameraY.value;
  el.querySelector('.camera-z').innerHTML = cameraZ.value;
};
cameraX.addEventListener('change', setCamera);
cameraY.addEventListener('change', setCamera);
cameraZ.addEventListener('change', setCamera);
cameraX.addEventListener('input', setCamera);
cameraY.addEventListener('input', setCamera);
cameraZ.addEventListener('input', setCamera);
setCamera();
