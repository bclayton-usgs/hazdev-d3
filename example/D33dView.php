<?php

if (!isset($TEMPLATE)) {
  $TITLE = 'D33dView Example';
  $HEAD = '<link rel="stylesheet" href="hazdev-d3.css"/>
    <style>
      svg {
        border: 1px solid #ccc;
        shape-rendering: auto;
      }

      path {
        stroke: #000;
        stroke-width: 1;
      }
      text {
        fill: #999;
      }

      .side-x0 {
        fill: #900;
      }
      .side-x1 {
        fill: #f00;
      }
      .side-y0 {
        fill: #090;
      }
      .side-y1 {
        fill: #0f0;
      }
      .side-z0 {
        fill: #009;
      }
      .side-z1 {
        fill: #00f;
      }
    </style>
  ';
  $FOOT = '<script src="hazdev-d3.js"></script>' .
      '<script src="D33dView.js"></script>';
}
include '_example.inc.php';

?>

<div id="example">Example goes here.</div>

<h3>Other content</h3>
<p>This content exists to show how content flows around D3View.</p>
