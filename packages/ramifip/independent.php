<?php

/**
 * Ramifip Independent Functions
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

/**
 * Return value from $_GET
 *
 * @param string $varname
 * @param mixed $default
 */
function get($varname, $default = null) {
	if (is_array($varname)){
		foreach($varname as $vn){
			if (isset($_GET[$vn])) return urldecode($_GET[$vn]);
		}
		return $default;
	}
	return (isset($_GET[$varname])) ? urldecode($_GET[$varname]) : $default;
}

/**
 * Return value from $_POST
 *
 * @param mixed $varname
 * @param mixed $default
 */
function post($varname, $default = null) {
	if (is_array($varname)){
		foreach($varname as $vn){
			if (isset($_POST[$vn])) return $_POST[$vn];
		}
		return $default;
	}
	return (isset($_POST[$varname])) ? $_POST[$varname] : $default;
}

/**
 * Clear string
 *
 * @param string $str
 * @param string $q
 * @return string
 */
function cs($str, $q = "'") {
	$str = str_replace("\n", '\n', $str);
	if ($q === '"') return str_replace('"', '\\"', $str);
	return str_replace("'", "\\'", $str);
}


/**
 * Return an array value if it exists
 * @param Array $array
 * @param mixed $index
 * @param mixed $default
 */

function av($array = array(), $index = 0, $default = null){
	if (!isset($array[$index])){
		return $default;
	}
	return $array[$index];
}

/**
 * Complete object/array properties
 *
 * @param mixed $obj
 * @param mixed $prop
 */
function cop(&$source, $complement){

	$null = null;
	if (is_null($source)) return $complement;
	if (is_null($complement)) return $complement;
	if (is_scalar($complement)) return $complement;

	if (is_object($complement)){
		$vars = get_object_vars($complement);
		foreach($vars as $key => $value){
			if (is_object($source)){
				if (isset($source->$key)) $source->$key = cop($source->$key, $complement->$key);
				else  $source->$key = cop($null, $complement->$key);
			}
			if (is_array($source)){
				if (isset($source[$key])) $source[$key] = cop($source[$key], $complement->$key);
				else  $source[$key] = cop($null, $complement->$key);
			}
		}
	}

	if (is_array($complement)){
		foreach($complement as $key => $value){
			if (is_object($source)){
				if (isset($source->$key)) $source->$key = cop($source->$key, $complement[$key]);
				else $source->$key = cop($null, $complement[$key]);
			}
			if (is_array($source)){
				if (isset($source[$key])) $source[$key] = cop($source[$key], $complement[$key]);
				else  $source[$key] = cop($null, $complement[$key]);
			}
		}
	}

	return $source;
}

/**
 * HTTP redirect
 *
 * @param string $url
 * @param integer $response_code
 */
function go($url, $response_code = "301"){
	$host  = $_SERVER['HTTP_HOST'];
	$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
	$l = strlen($host.$uri);
	if (substr($url,0,$l) == $host.$uri) {
		$extra = substr($url, strlen($l));
		header("Location: http://$host$uri/$extra", true, $response_code);
	} else {
		header("Location: ". $url, true, $response_code);
	}
}

/**
 * Array's keys
 *
 * Return or search the keys in array 
 * 
 * @param array $array
 * @param array $keys
 * @param bool $all
 * @param bool $allownull
 * @param bool $allowblank
 * @param bool $allowempty
 * @return mixed
 */
function k($arr = array(), $keys = null, $all = true, $allownull = true, $allowblank = true, $allowempty = true){
	
	if (is_null($keys)) return array_keys($arr);
	
	$i = 0;
	
	foreach($keys as $k){
		$delete = false;
		if (isset($arr[$k])){
			if ($allownull == false && is_null($arr[$k])) $delete = true;
			if ($allowblank == false && trim("{$arr[$k]}") == "") $delete = true;
			if ($allowempty == false && empty($arr[$k])) $delete = true;
		}
		if ($delete) unset($arr[$k]);
	}
	foreach($keys as $k){
		if (isset($arr[$k]) && $all == false) return true;
		if (!isset($arr[$k]) && $all == true) return false;	
		if (isset($arr[$k])) $i++; 	
	}
	
	return $i;
}

/**
 * Object's properties
 *
 * Return or search the properties of array
 * 
 * @param object $obj
 * @param array $props
 * @param bool $all
 * @param bool $allownull
 * @param bool $allowblank
 * @param bool $allowempty
 * @return mixed
 */
function p($obj = null, $props = null, $all = true, $allownull = true, $allowblank = true, $allowempty = true){
	if (!is_null($obj)){
		$arr = get_object_vars($obj);
		return k($arr, $props, $all, $allownull, $allowblank, $allowempty);
	}
	return false;
}
// End of file