<?php

/**
 * Ramifip Package Manager
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpPackageMan{

	static $pkg_links = array();
	static $pkg_loaded = array();
	static $autouse = array();

	/**
	 * Return a real path from real path or some package link
	 * 
	 * @param string $pathorlink
	 * @return string
	 */
	static function getRealPath($pathorlink) {
		$ya = array();
		$pkg_links = v('pkg_links');
		while (isset($pkg_links[$pathorlink])) {
			if (!isset($ya[$pathorlink])) {
				$pathorlink = $pkg_links[$pathorlink];
				$ya[$pathorlink] = true;
			} else {
				// links are cicle, ignored human's error
				return false;
			}
		}
		return $pathorlink;
	}

	/**
	 * Return the relative path of packages
	 * 
	 * @param string $packages
	 * @return string
	 */
	static function getRelativePath($packages) {
		$prefix = "";
		$pos = strpos($packages, ":", 0);
		$arr = array($packages);

		if ($pos > 0) {
			$prefix = substr($packages, 0, $pos);
			$packages = substr($packages, $pos + 1);
			$arr = explode(",", $packages);
		}

		$packagesnames = array();

		foreach ($arr as $package_name) {
			$package_name = trim($package_name);

			// process package's links

			$package_name = self::getRealPath($package_name);
			$path = $prefix . "/" . $package_name;
			$path = str_replace("//", "/", $path);
			$packagesnames[] = $path;
		}

		return $packagesnames;
	}

	/**
	 * Return the package's path
	 * 
	 * @param string $packages
	 * @return string
	 */
	static function getPackagePath($packages) {
		$url = parse_url($packages);

		if (isset($url['scheme']))
		return array($packages);

		$packagesnames = self::getRelativePath($packages);

		$relative_path = PACKAGES;
		$relative_path .= "/";
		$relative_path = str_replace("//", "/", $relative_path);

		foreach ($packagesnames as $key => $pkgname) {
			$packagesnames[$key] = $relative_path . "/" . $pkgname;
			$packagesnames[$key] = str_replace("//", "/", $packagesnames[$key]);
		}
		return $packagesnames;
	}

	/**
	 * Use a package
	 *
	 * @param string $packages
	 * @param array $vars
	 * @param string $force
	 * @param bool $once
	 * @return bool
	 */
	static function usePackage($packages, $vars = array(), $once = true) {

		if (!isset($packages)) return false;
		if (trim($packages) == "") return false;
		if (is_null($packages)) return false;

		self::$pkg_loaded[$packages] = true;
		
		$temp_var_00001 = $packages;
		$temp_var_00002 = $vars;
		$temp_var_00004 = $once;

		$temp_var_00005 = v('setup');
		foreach ($temp_var_00002 as $temp_var_00006 => $temp_var_00007)
		$_POST["$temp_var_00006"] = $temp_var_00007;

		if (file_exists($temp_var_00001)) {
			if ($temp_var_00004 == true) include_once $temp_var_00001;
			else include $temp_var_00001;
			return true;
		}

		$temp_var_00008 = self::getPackagePath($temp_var_00001);

		foreach ($temp_var_00008 as $temp_var_00010) {
			$temp_var_00011 = parse_url($temp_var_00010);
			if (!isset($temp_var_00011['scheme'])) $temp_var_00010 = self::repairPackagePath($temp_var_00010);
			$temp_var_00012 = 0;
			while ($temp_var_00012++ < 3) {
				if (file_exists("$temp_var_00010.php")) {
					if ($temp_var_00004 === true) {
						include_once "$temp_var_00010.php";
						break; 
					} else {
						include "$temp_var_00010.php";
						break;
					}
				} else if ($temp_var_00012 > 2) throw new rpException("RAMIFIP: $temp_var_00010 NOT FOUND");
				$temp_var_00010 = self::repairPackagePath($temp_var_00010);
			}
		}

		return true;
	}

	/**
	 * Compare sub path with a pattern
	 * 
	 *    "any" === "any" is TRUE
	 *    "*" and "any" is TRUE
	 *    "any*" and "any??????" is TRUE
	 *    "*any" and "??????any" is TRUE
	 * 
	 * @param string $subpath
	 * @param string $pattern
	 * @return bool
	 */
	static function compareSubpathWithPattern($subpath, $pattern) {

		if ($subpath == $pattern)
		return true;

		if (trim($pattern) == "*")
		return true;

		if (substr($pattern, 0, 1) == "*") {
			$end = substr($pattern, 1);
			if (substr($subpath, strlen($subpath) - strlen($end), strlen($end)) == $end)
			return true;
		}

		if (substr($pattern, strlen($pattern) - 1, 1) == "*") {
			$begin = substr($pattern, 0, strlen($pattern) - 1);
			if (substr($subpath, 0, strlen($begin)) == $begin)
			return true;
		}

		return false;
	}

	/**
	 * Compare path with a pattern
	 * 
	 * The pattern is as
	 *    folder/folder/**  << - any subfolder recursive in (only in the end)
	 *    folder/ * /folder/ << - any subfolder
	 *    folder/ *der /folder/ << - end with "der"
	 *    folder/fol* /folder <<- begin with "fol"
	 * 
	 * @param string $path
	 * @param string $pattern
	 * @return bool
	 */
	static function comparePathWithPattern($path, $pattern) {

		$arr = explode("/", $path);
		$arr1 = explode("/", $pattern);

		$i = 0;
		foreach ($arr as $folder) {
			if (isset($arr1[$i])) {
				$p = $arr1[$i];
				if (!isset($arr1[$i + 1]) && trim($p) == "**")
				return true;
				if (self::compareSubpathWithPattern($folder, $p) == false)
				return false;
			}
			$i++;
		}
		return true;
	}

	/**
	 * Rrepair a path with valid PACKAGES prefix
	 *
	 * @param string $path
	 * @return string
	 */
	static function repairPackagePath(&$path){
		if (substr($path, 0, strlen(PACKAGES)) != PACKAGES){
			$path = PACKAGES . $path;
			$path = str_replace("//", "/", $path);
		}
		return $path;
	}
}

// End of file