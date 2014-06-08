<?php

/**
 * Ramifip URL Tools
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

if (!defined('CLEAN_URL_BACK_PATH')) define('CLEAN_URL_BACK_PATH', post('CLEAN_URL_BACK_PATH'));

class rpURL{

	/**
	 * Return a base URL
	 *
	 * @return string
	 */
	static function getBaseURL(){
		$root = self::getHTTPProtocol() . '://' . $_SERVER['HTTP_HOST'];
		$base_url = $root;
		if ($dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '\/')) $base_url .= $dir;
		return $base_url;
	}

	/**
	 * Retur TRUE if $path is an URL
	 *
	 * @param string $path
	 * @return bool
	 */
	static function isURL($path){
		$url = parse_url($path);
		if (isset($url['scheme'])){
			if ("{$url['scheme']}" != ""){
				return true;
			}
		}
		return false;
	}

	/**
	 * Return TRUE if the HTTP protocol is secure
	 *
	 * @return bool
	 */
	static function isHTTPS(){
		return isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) == 'on';
	}

	/**
	 * Get HTTP Protocol
	 *
	 * @return string
	 */
	static function getHTTPProtocol(){
		return self::isHTTPS() ? 'https' : 'http';
	}

	/**
	 * Return an array with parts of url clean
	 *
	 * @return array
	 */
	static function getCleanURLParts() {
		$uri = self::getCleanURL();
		return explode("/", $uri);
	}

	/**
	 * Get path to back of url clean
	 *
	 * @return string
	 */
	static function getCleanURLBackPath() {
		$bp = "";
		if (v('use_clean_url') == true) {
			if (is_null(CLEAN_URL_BACK_PATH)){
				$parts = self::getCleanURLParts();
				$c = count($parts);
				$bp = str_repeat("../", $c-1);
			} else $bp = CLEAN_URL_BACK_PATH;
		}
		return $bp;
	}

	/**
	 * Get clean URL
	 *
	 * @return string
	 */
	static function getCleanURL($query_index = "q") {
		if (ramifip::isCli()) return "";

		if (v('use_clean_url') == true) {
			if (!isset($_SERVER['REQUEST_URI']) || !isset($_SERVER['QUERY_STRING']) || !isset($_SERVER['PHP_SELF'])) return "";
			$uri = $_SERVER['REQUEST_URI'];
			$qs = $_SERVER['QUERY_STRING'];
			$uri = str_replace($qs,"",$uri);
			if (substr($uri,strlen($uri)-1,1)=="?")	$uri = substr($uri,0,strlen($uri)-1);
			$self = $_SERVER['PHP_SELF'];
			$scriptname = explode("/",$self);
			$scriptname = $scriptname[count($scriptname)-1];
			$self = str_replace($scriptname, "", $self);
			$uri = substr($uri,strlen($self));
			$uri = trim($uri);
			if (substr($uri, strlen($uri) - 1, 0) == "/") $uri = substr($uri, 0, strlen($uri) - 1);
			if ($uri != $scriptname){
				if (trim($uri) !=="") return urldecode($uri); // if the user use $query_index with url clean!
			}
		}

		if (isset($_GET[$query_index])) return urldecode($_GET[$query_index]);

		return null;
	}

	/**
	 * Return the current protocol
	 *
	 * @return string
	 */
	static function getProtocol() {
		$p = $_SERVER['SERVER_PROTOCOL'];
		if (strpos(0, "HTTPS", $p)) return "https";
		return "http";
	}

	/**
	 * Return the current URL
	 *
	 * @return string
	 */
	static function getURLSelf() {
		return self::getHost() . "/" . ramifip::getDocumentName();
	}

	/**
	 * Return the host of current script
	 *
	 * @return string
	 */
	static function getHost() {
		$n = substr($_SERVER['PHP_SELF'], 1);
		$arr = explode("/", $n);
		$h = '';
		$c = count($arr);
		$i = 0;
		foreach ($arr as $item) {
			$i++;
			if ($i < $c)
			$h.=$item;
		}
		$port = self::getPort();

		if ($port == 80) return self::getProtocol() . "://{$_SERVER['SERVER_NAME']}/" . $h;
		return self::getProtocol() . "://{$_SERVER['SERVER_NAME']}:$port/" . $h;
	}

	/**
	 * Return server port
	 *
	 * @return integer
	 */
	static function getPort() {
		return intval("{$_SERVER['SERVER_PORT']}");
	}

	/**
	 * Parsing an URL
	 *
	 * @param string $url
	 * @return string
	 */
	static function parseUrl($url) {
		$a = parse_url($url);
		$a["path"] = $url;
		if (!isset($a["port"])) $a["port"] = 80;
		if (!isset($a["host"])) $a["host"] = 'localhost';
		return $a;
	}
}

// End of file