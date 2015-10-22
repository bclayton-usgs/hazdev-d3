<?php

if (!isset($TEMPLATE)) {
  $TITLE = 'D3View Example';
  $HEAD = '<link rel="stylesheet" href="hazdev-d3.css"/>';
  $FOOT = '<script src="hazdev-d3.js"></script>' .
      '<script src="D3View.js"></script>';
}
include '_example.inc.php';

?>

<div id="example">Example goes here.</div>

<h3>Other content</h3>
<p>This content exists to show how content flows around D3View.</p>
