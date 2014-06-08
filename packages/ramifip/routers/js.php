<?php

/**
 * Ramifip Framework
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

$header = "Content-type: text/javascript";

if (!defined("PATH"))     define("PATH", "");
if (!defined("PACKAGES")) define("PACKAGES", "../packages/");
if (!defined("FILES"))    define("FILES", "../files/");
if (!defined("WWW"))      define("WWW", "./");
if (!defined("LOGS"))     define("LOGS", "../logs/");
if (!defined("SCRIPTS"))  define("SCRIPTS", "../scripts/");
if (!defined("TEMP"))     define("TEMP", "../tmp/");

include PACKAGES . "ramifip/router.php";

$compression = false;

if ($path == null) exit();

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

if (rpFileSystem::getFileExtension($path) != "js") {
	$pathmin = FILES.$setup->js_compression_folder."/".$temp.".min.js";

	switch($setup->js_compression_mode){
		case "hot":
			$compression = true;
			if (file_exists($path.".js")){
				$path .= ".js";
			} else {
				$path .= ".min.js";
				$compression = false;
			}
			break;
		case "mixed":
			if (file_exists($path.".min.js")){
				$path .= ".min.js";
			} else {
				if (file_exists($path.".js")){
					if (file_exists($pathmin)){
						$path = $pathmin;
					} else {
						$path = ".js";
						$compression = true;
					}
				}
			}
			break;
		case "precompression":
			if (!file_exists($path.".min.js")){
				if (file_exists($pathmin)){
					$path = $pathmin;
				} else {
					$path .= ".js";
				}
			} else {
				if (!file_exists($pathmin)){
					$path .= ".min.js";
				} else $path = $pathmin;
			}
			break;
		case "none":
			if (!file_exists($path.".js") && file_exists($pathmin)){
				$path = $pathmin;
			} elseif (!file_exists($path.".js") && file_exists($path.".min.js")){
				$path .= ".min.js";
			} else $path .= ".js";
			break;
	}
	if ($setup->js_compression_mode == "hot") $compression = true;
}

if (class_exists("app")) if (app::checkRouterAccess("js", $path) == false) exit();

if (class_exists("app")) if (app::beforeRouter("js", $path) == false) exit();

if (!file_exists($path)) {
	if ($setup->run_mode == "development"){
		echo "alert('SCRIPT $path NOT FOUND ');";
	}
	exit();
}

if ($compression === false){
	readfile($path);
	exit();
}

$script = file_get_contents($path);
$packer = new JavaScriptPacker($script);
echo $packer->pack();

if (class_exists("app")) app::afterRouter("js", $path);

// End of file