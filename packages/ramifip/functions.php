<?php

/**
 * Ramifip Dependent Functions
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

/**
 * Function u
 *
 * @param string $packages
 * @param array $vars
 * @param boolean $force
 * @param boolean $once
 */
function u($packages, $vars = array(), $once = true) {
	rpPackageMan::usePackage($packages, $vars, $once);
}

/**
 * Set or return a configuration value
 *
 * @param string $var
 * @param mixed $value
 * @return mixed
 */
function v($var, $value = null){
	if (!is_null($value)) rpConfiguration::setValue($var, $value);
	return rpConfiguration::getValue($var);
}

/**
 * Load classes under demand
 *
 * @param string $classname
 */
function __autoload($classname) {
	$autouse = v('autouse');
	if (isset($autouse[$classname])) u($autouse[$classname]);
}

/**
 * Return a valid url
 *
 * @param string $url
 * @return string
 */
function url($url = "index.php", $for_not_clean_url = "?q=") {
	$self = $_SERVER['PHP_SELF'];
	$self = str_replace("index.php", "", $self);
	if (v('use_clean_url') == true) $self .= $url;
	else $self .= $for_not_clean_url . $url;
	return $self;
}

/**
 * Return a valid html link
 *
 * @param string $url
 * @param string $caption
 * @param string $title
 * @param string $target
 * @return string
 */
function l($url = "index.php", $caption = "", $title = "", $target = "") {

	if ($caption == "")
	$caption = $url;

	$url = url($url);

	$l = "<a href = \"$url\"";
	if ($target != "")
	$l .= " target = \"$target\" ";

	if ($title != "")
	$l .= " title = \"$title\" ";

	$l.=">$caption</a>";

	return $l;
}

/**
 * Logger
 *
 * @param string $message
 * @param string $type
 */
function logs($message, $type = "ERROR"){
	$d = dirname(__FILE__);
	chdir($d);
	$f = new rpTextFile("../../logs/$type.log","a");
	$f->putLine(date("Y-m-d h:i:s")." - ".$message);
}

/**
 * Execute a static method
 *
 * @param string $class_name
 * @param string $method
 * @param string $params
 * @return mixed
 */
function sm($class_name, $method, $params = ""){
	return ramifip::executeStaticMethod($class_name, $method, $params);
}

/**
 * Get output of script
 *
 * @param string $path
 * @return string
 */
function o($path){
	return ramifip::getScriptOutput($path);
}

/**
 * Template engine
 *
 * @param string $src - TPL code or TPL filename
 * @param array $items - Vars and values
 * @return string
 */
function tpl($src, $items = null, $ignore = null) {
	return new rpTheme($src, $items, $ignore);
}

/**
 * Echo
 *
 * @param string $template
 * @param mixed $content
 */
function e($template = '', $content = null){	
	echo tpl($template, $content);
}

/**
 * Routing
 *
 * @param string $router
 * @param array $args
 */
function routing($router, $args = array()){
	$_GET = array_merge($_GET, $args);
	u('ramifip/routers/'.$router);
}

// End of file