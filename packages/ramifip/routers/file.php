<?php

/**
 * Ramifip Framework
 *
 * File Router
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

$header = null;

if (!defined("PATH"))     define("PATH", "");
if (!defined("PACKAGES")) define("PACKAGES", "../packages/");
if (!defined("FILES"))    define("FILES", "../files/");
if (!defined("WWW"))      define("WWW", "./");
if (!defined("LOGS"))     define("LOGS", "../logs/");
if (!defined("SCRIPTS"))  define("SCRIPTS", "../scripts/");
if (!defined("TEMP"))     define("TEMP", "../tmp/");

include PACKAGES . "ramifip/router.php";

$redirect = get('redirect', false);

if ($path == null) exit();

$external = rpURL::isURL($path);

if ($external === true && $redirect === true) header("Location: $path");

$path = str_replace("../files/","",$path);

$path = rpFileSystem::repairFilePath($path);

$temp = substr($path,strlen(FILES));

if (strpos($temp, "../") !== false) exit();

if (class_exists("app")) if (app::checkRouterAccess("file", $path) === false) exit();

if (class_exists("app")) if (app::beforeRouter("file", $path) === false) exit();

if (rpFileSystem::getFileExtension($path) == "php"){
	include $path;
	exit();
}

if (file_exists($path) === false && $external === false) exit();

$file_name = rpFileSystem::getFileNameOf($path);

$size = 0;

if ($external == false) $size = filesize($path);

$headers = array(
'Content-type: force-download',
'Content-disposition: attachment; filename="' . $file_name . '"',
'Content-Type: ' . rpFileSystem::getFilegetMimetype($path) . '; name="' . $file_name . '"',
'Content-Length: ' . $size,
'Content-Transfer-Encoding: binary',
'Pragma: no-cache',
'Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
'Expires: 0',
'Accept-Ranges: bytes'
);

foreach ($headers as $h) header($h);

rpFileSystem::readfile($path);

if (class_exists("app")) app::afterRouter("file", $path);

// End of file