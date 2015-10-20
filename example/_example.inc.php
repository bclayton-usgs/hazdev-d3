<?php

if (!isset($TEMPLATE)) {
  // embed in the template
  $useTemplate = isset($_GET['template']) && $_GET['template'] === 'true';
  $pageUrl = str_replace(
      strstr($_SERVER['REQUEST_URI'], '?'), '',
      $_SERVER['REQUEST_URI']);
  if ($useTemplate) {
    include 'template.inc.php';
  } else {
    include 'minimal.inc.php';
  }
}

// this is only output during the "content" phase of the template
$nav = array(
  navItem($pageUrl . '?template=true', 'View with template'),
  navItem($pageUrl . '?template=false', 'View without template')
);
if ($pageUrl !== '/example.php') {
  $nav[] = navItem('/example.php?template=' . $useTemplate, 'Examples Index');
}

echo '<nav>', implode(' ', $nav), '</nav>';
if (!$useTemplate) {
  echo '<h1>' . $TITLE . '</h1>';
}

?>
