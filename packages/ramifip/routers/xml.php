<?php

/**
 * Ramifip PHP Framework
 * XML Router
 *  
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program as the file LICENSE.txt; if not, please see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 * 
 * @version 1.0
 * @link http://ramifip.com
 */

$header = "Content-type: text/xml";

if (!defined("PATH"))     define("PATH", "");
if (!defined("PACKAGES")) define("PACKAGES", "../packages/");
if (!defined("FILES"))    define("FILES", "../files/");
if (!defined("WWW"))      define("WWW", "./");
if (!defined("LOGS"))     define("LOGS", "../logs/");
if (!defined("SCRIPTS"))  define("SCRIPTS", "../scripts/");
if (!defined("TEMP"))     define("TEMP", "../tmp/");

include PACKAGES . "ramifip/router.php";

if (rpFileSystem::fileExists($folder)) $path = $folder;
if ($path == null){
	echo '<?xml version = "1.0" encoding = "UTF-8"?><ramifip>Please, specify the parameter "f"</ramifip>';
	exit();
}

$path = rpPackageMan::repairPackagePath($path);

$temp = substr($path,strlen(PACKAGES));
if (substr($temp, 0, 9) == "../files/") $temp = substr($temp, 9);
if (strpos($temp, "../") !== false) {
	echo '<?xml version = "1.0" encoding = "UTF-8"?><ramifip>Access denied!</ramifip>';
	exit();
}

if (rpFileSystem::getFileExtension($path) != "xml" && substr($path, strlen($path) - 8) != ".xml.php") exit();

if (rpFileSystem::fileExists($path) === false && $external === false) {
	echo '<?xml version = "1.0" encoding = "UTF-8"?><ramifip>'.str_replace(PACKAGES,"",$path).' not found!</ramifip>';
	exit();
}

if (class_exists("app")) if (app::checkRouterAccess("xml", $path) === false || app::beforeRouter("xml", $path) === false) {
	echo '<?xml version = "1.0" encoding = "UTF-8"?><ramifip>Access denied!</ramifip>';
	exit();
}

if (substr($path, strlen($path) - 8) === ".xml.php") include $path;	
else rpFileSystem::readfile($path);

if (class_exists("app")) app::afterRouter("xml", $path);

// End of file