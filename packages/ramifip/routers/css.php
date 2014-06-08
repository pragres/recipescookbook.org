<?php

/**
 * Ramifip PHP Framework
 *
 * CSS Router
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

if (!defined("PATH"))     define("PATH", "");
if (!defined("PACKAGES")) define("PACKAGES", "../packages/");
if (!defined("FILES"))    define("FILES", "../files/");
if (!defined("WWW"))      define("WWW", "./");
if (!defined("LOGS"))     define("LOGS", "../logs/");
if (!defined("SCRIPTS"))  define("SCRIPTS", "../scripts/");
if (!defined("TEMP"))     define("TEMP", "../tmp/");

$header = "Content-type: text/css";

include PACKAGES . "ramifip/router.php";

if ($path == null)	exit();

if (substr($path,0,strlen(PACKAGES)) == PACKAGES) $path = substr($path,strlen(PACKAGES));

$folder = $_GET['folder'];

if (!is_null($folder)) {
	$subfolder = rpFileSystem::getFolderOf($path);
	if (rpFileSystem::folderExists($folder."/".$subfolder)) {
		$path = $folder."/".$path;
	}
}

$path = rpPackageMan::repairPackagePath($path);

$temp = substr($path,strlen(PACKAGES));

if (substr($temp, 0, 9) == "../files/") $temp = substr($temp, 9);
if (strpos($temp, "../") !== false) exit();

$extension = rpFileSystem::getFileExtension($path);
$less = false;
if ($extension != "css" && $extension != "less") {
	if (!rpFileSystem::fileExists($path.".css") && rpFileSystem::fileExists($path.".less")){
		$less = true;
		$path .= ".less";
	} else {
		$path .= ".css";
	}
}

if (class_exists("app")) if (app::checkRouterAccess("css", $path) == false) exit();

if (rpFileSystem::fileExists($path) == false) exit();

if (class_exists("app")) if (app::beforeRouter("css", $path) === false) exit();

$css = rpRouterTools::parseCSS($path, $setup->css_compression);

echo $css;

if (class_exists("app")) app::afterRouter("css", $path);

// End of file