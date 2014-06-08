<?php

/**
 * Ramifip PHP Framework
 *
 * Router's common functionality
 *
 * @version 1.0
 * @link http://ramifip.com
 */

if (!defined("PATH"))     define("PATH", "");
if (!defined("PACKAGES")) define("PACKAGES", "../packages/");
if (!defined("FILES"))    define("FILES", "../files/");
if (!defined("WWW"))      define("WWW", "./");
if (!defined("LOGS"))     define("LOGS", "../logs/");
if (!defined("SCRIPTS"))  define("SCRIPTS", "../scripts/");
if (!defined("TEMP"))     define("TEMP", "../tmp/");
if (!defined("DATA"))     define("DATA", "../data/");

set_include_path(PACKAGES);

// Load framework

if (!class_exists('ramifip')) require PACKAGES . "ramifip/ramifip.php";

ramifip::start();

// Load setup

$setup = v('setup');

// Session start!

if (!ramifip::isCli()) {

	$proced = false;
	$path = PATH;

	if ($path == "") $path = "/";
	if (isset($setup->session_start)){
		if (is_array($setup->session_start)){
			foreach ($setup->session_start as $pattern => $value){
				if (rpPackageMan::comparePathWithPattern($path,$pattern)){
					$proced = true;
					break;
				}
			}
		}
	}

	if ($proced){
		if (!ramifip::$session_started){
			session_name(ramifip::getCorrectSessionName());
			session_start();
			ramifip::$session_started = true;
		}
	}

	if (isset($header)) if ($header != null) header($header);
}

include file_exists(PACKAGES . "config.php") ? PACKAGES . "config.php" : "blank.php";

if (!class_exists('app')){
	
	// Include the Application Script

	$app_php = "app.php";

	if (isset($setup->use_clean_url)) if ($setup->use_clean_url==true) v('use_clean_url', true);
	if (isset($setup->app_php)) if (isset($setup->app_php["/"])) $setup->app_php[0] = $setup->app_php["/"];

	if (isset($setup->app_php)){
		if (is_array($setup->app_php)){
			if (isset($setup->app_php[0])){
				if (rpFileSystem::fileExists($setup->app_php[0]))
				$app_php = $setup->app_php[0];
				else
				$app_php = $setup->app_php[0].".php";
			}
		}
	}

	if (isset($setup->app_php)){
		if (is_array($setup->app_php)){
			$index = PATH;
			if ($index == "") $index = 0;
			if (isset($setup->app_php[$index])){
				if (rpFileSystem::fileExists($setup->app_php[$index]))
				$app_php = $setup->app_php[$index];
				else
				$app_php = $setup->app_php[$index].".php";
			}
		}
	}

	if (!file_exists(PACKAGES . $app_php))
	ramifip::systemDie("Fatal error: Missing index of application 'PACKAGES/$app_php'. Please, create the index and specify it in the 'ramifip.ini' file.");

	if (file_exists(PACKAGES . $app_php)) require PACKAGES . $app_php;
}

$folder = get('folder', ''); 

if (!ramifip::isCli()){

	rpSecurity::secure();

	$path = get('f');
	if (is_null($path)) $path = rpURL::getCleanURL("f");
	if (is_null($path) || $path == "") $path = rpURL::getCleanURL("q");

	$path_parts = explode("&", $path);
	$path = $path_parts[0];
	array_shift($path_parts);

	foreach($path_parts as $k => $part){
		$getvars = explode("=", $part);
		$_GET[$getvars[0]] = null;
		if (isset($getvars[1]))$_GET[$getvars[0]] = $getvars[1];
	}

	if (!is_null($folder)){
		if (is_file($folder)) $path = $folder;
		elseif (is_file(PACKAGES.$folder)) $path = $folder;
		elseif (is_file(FILES.$folder)) $path = $folder;
	}

}

$external = false;
// End of file