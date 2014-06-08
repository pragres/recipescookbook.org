<?php

/**
 * Ramifip Framework
 *
 * Image Router
 *
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

if ($path == null) exit();

$parts = explode("/",$path);
$newparts = array();
$transforms = array();
$transformations = array("default","nocache","quality","width","height","resize","crop-center","crop-top","crop-bottom","crop-left","crop-right");

foreach($parts as $part){
	$t = true;
	foreach($transformations as $trans){
		if (substr($part,0,strlen("$trans-")) == "$trans-"){
			if ($trans != "nocache")
			if ($trans == "default")
			$default = substr($part,strlen("$trans-"));
			else
			$transforms[$trans] = substr($part,strlen("$trans-"));

			$t = false;
			break;
		}
	}
	if ($t){
		$newparts[] = $part;
	}
}

$path = implode("/", $newparts);

$temp = substr($path,strlen(PACKAGES));
if (substr($temp, 0, 9) == "../files/") $temp = substr($temp, 9);

$temp = rpFileSystem::fixPath($temp);

if (class_exists("app")) if (app::checkRouterAccess("img", $path) === false) exit();

$exts = array("png", "gif", "jpeg", "jpg", "bmp", "ico");

$file_ext = strtolower(rpFileSystem::getFileExtension($path));
$file_name = rpFileSystem::getFileNameOf($path);

if (in_array($file_ext, $exts) === false){
	$path = PACKAGES.$folder."/".$path . ".img.php";
	if (rpFileSystem::fileExists($path)){
		include $path;
		exit();
	}
}

$default = null;
$w = -1;
$h = -1;
$q = 100;

if(app::beforeRouter("img", $path) === false) exit();

if (substr($path,0,strlen(PACKAGES)) == PACKAGES) $path = substr($path,strlen(PACKAGES));

if (!rpFileSystem::fileExists($path) && $folder != "") {
	$path = $folder."/".$path;
	$path = str_replace("//","/",$path);
}

if (rpFileSystem::fileExists($path) == false && $default !== null){
	$path = $default;
	$path = rpPackageMan::repairPackagePath($path);

	$temp = substr($path,strlen(PACKAGES));
	if (substr($temp, 0, 9) == "../files/") $temp = substr($temp, 9);
	if (strpos($temp, "../") !== false) exit();

	$file_ext = rpFileSystem::getFileExtension($path);
	$file_name = rpFileSystem::getFileNameOf($path);
	if (in_array($file_ext, $exts) === false){
		if (rpFileSystem::fileExists($path . ".img.php")){
			include $path . ".img.php";
			exit();
		}
	}
}

if (substr($path,0,strlen(PACKAGES)) == PACKAGES) $path = substr($path,strlen(PACKAGES));

//if (!rpFileSystem::fileExists($path) && $folder != "") $path = $folder."/".$path;

if (in_array($file_ext, $exts) === false) exit();

$image = rpImageTookit::getImage(PACKAGES.$path);

foreach($transforms as $trans => $params){
	switch($trans){
		case "height": //ex: height-200
			$h = intval($params);
			if ($h != 0) $image->resize($h, 'height');
			break;
		case "width": //ex: width-100
			$w = intval($params);
			if ($w != 0) $image->resize($w, 'width');
			break;
		case "resize": //ex: resize-100x200
			$parts = explode("x",$params);
			if (isset($parts[0])) $w = intval($parts[0]);
			if (isset($parts[1])) $h = intval($parts[1]);
			if ($w !=0 && $h != 0){
				if ($h > $w) $image->resize($h, 'height');
				else $image->resize($w, 'width');
			} else {
				if ($h != 0) $image->resize($h, 'height');
				if ($w != 0) $image->resize($w, 'width');
			}
			break;
		case "crop-center": //ex: crop-center-100x200
			$parts = explode("x",$params);
			if (isset($parts[0])) $w = intval($parts[0]);
			if (isset($parts[1])) $h = intval($parts[1]);
			$image->crop($w, $h, 'center');
			break;
		case "crop-left": //ex: crop-left-100x200
			$parts = explode("x",$params);
			if (isset($parts[0])) $w = intval($parts[0]);
			if (isset($parts[1])) $h = intval($parts[1]);
			$image->crop($w, $h, 'left');
			break;
		case "crop-right": //ex: crop-right-100x200
			$parts = explode("x",$params);
			if (isset($parts[0])) $w = intval($parts[0]);
			if (isset($parts[1])) $h = intval($parts[1]);
			$image->crop($w, $h, 'right');
			break;
		case "crop-top": //ex: crop-top-100x200
			$parts = explode("x",$params);
			if (isset($parts[0])) $w = intval($parts[0]);
			if (isset($parts[1])) $h = intval($parts[1]);
			$image->crop($w, $h, 'top');
			break;
		case "crop-bottom": //ex: crop-bottom-100x200
			$parts = explode("x",$params);
			if (isset($parts[0])) $w = intval($parts[0]);
			if (isset($parts[1])) $h = intval($parts[1]);
			$image->crop($w, $h, 'bottom');
			break;
	}
}

if (isset($transforms['quality'])) $q = $transforms['quality'];

$img_type = rpImageTookit::getImageType(PACKAGES.$path);

if (is_null($img_type)) $img_type = $file_ext;

header("Content-type: image/$img_type; name = \"$file_name\"");

if (count($transforms) == 0) {
	rpFileSystem::readfile(PACKAGES.$path);
} else {
	$image->show($q);
}

if (class_exists("app")) app::afterRouter("img", $path);

// End of file