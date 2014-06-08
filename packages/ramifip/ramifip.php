<?php

/**
 * Ramifip PHP Framework
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

// Include core independent functions
include PACKAGES."ramifip/independent.php";

// Include core libraries

// -- Div PHP Template Engine
include_once PACKAGES."ramifip/lib/div/div.php";

// -- phPull Referencial, Serialized and Hierarchical Databases
if (!defined("PHPULL_ROOT")) define("PHPULL_ROOT", PACKAGES."../data/");
include_once PACKAGES."ramifip/lib/phpull/phpull.php";

/**
 * Load classes and their dependences
 *
 * @param string $class
 * @return bool
 */
function loadclass($class){
	if (is_dir($class)) return false;
	if (substr($class,strlen($class)-4)!=".php") $class.= ".php";
	if (!file_exists($class)) return false;
	$parts = explode("/", $class);
	array_pop($parts);
	$folder = implode("/", $parts);

	$f = fopen($class, "r");
	if ($f) while(!feof($f)){
		$s = fgets($f);
		$extends = strpos($s, "extends ");
		$implements = strpos($s, "implements ");
		if (strpos($s, "class ")!== false){
			if ($extends !== false){
				$p = strpos($s," ",$extends);
				$p1 = strpos($s,"{", $p+1);
				$p2 = strpos($s," ", $p+1);
				$p2 = strpos($s,"\n", $p+1);
				$px = false;
				if ($p1<$p2 && $p1!==false) $px = $p1; elseif($p2!==false) $px=$p2;
				if ($px){
					$classname = trim(substr($s,$p,$px-$p));
					loadclass($folder."/".$classname.".php");
				}
			}

			if ($implements !== false){
				$p = strpos($s," ",$implements);
				$p1 = strpos($s,"{", $p+1);
				$p2 = strpos($s," ", $p+1);
				$p2 = strpos($s,"\n", $p+1);
				$px = false;
				if ($p1<$p2 && $p1!==false) $px = $p1; elseif($p2!==false) $px=$p2;
				if ($px){
					$classname = trim(substr($s,$p,$px-$p));
					loadclass($folder."/".$classname.".php");
				}
			}
			break;
		}
	}
	fclose($f);
	$l = strlen($class);
	if (substr($class, $l - 4) == ".php") {
		include_once $class;
	}
}

// Include core classes
$dir = scandir(PACKAGES."ramifip/modules/rpCore/");

foreach ($dir as $entry){
	if ($entry != "." && $entry != ".." && !is_dir($entry)){
		loadclass(PACKAGES."ramifip/modules/rpCore/".$entry);
	}
}

// Include core dependent functions
include PACKAGES."ramifip/functions.php";

// Include 3rd Party libraries
include_once PACKAGES . "ramifip/lib/3rdParty/JavaScriptPacker.php";
include_once PACKAGES . "ramifip/lib/3rdParty/Services_JSON.php";


/**
 * Ramifip Namespace
 */
class ramifip {

	public static $setup = null;
	public static $packages = array();
	public static $langs = array();
	public static $paths = array();
	public static $path = "";
	public static $executing = false;
	public static $css = array();
	public static $js = array();
	public static $page_paths = array();
	public static $resources_loaded = array();
	public static $shutdown = array();
	public static $session_started = false;

	/**
	 * Start the system
	 */
	static function start(){

		set_error_handler('rpDebug::errorHandler');

		// Verify setup configuration file

		if (!file_exists(PACKAGES."../ramifip.ini")){
			self::systemDie("Fatal error<br>Missing the setup configuration file <i>ramifip.ini</i>");
		}

		self::loadSetup();
		self::registerShutdown("rpFileSystem::removeTemporalFiles();");
		rpDebug::$time_start = microtime(true);
	}

	/**
	 * Register a shutdown code
	 *
	 * @param string $fn
	 */
	static function registerShutdown($fn){
		self::$shutdown[] = $fn;
	}

	/**
	 * Shutdown the system
	 *
	 */
	static function shutdown(){
		foreach(self::$shutdown as $func){
			if (function_exists($func)){
				$func();
			} else {
				eval($func);
			}
		}
		self::$shutdown = array();
		rpDebug::$time_end = microtime(true);

		$setup = v('setup');
		if (isset($setup->run_mode)) if (strtolower($setup->run_mode) != 'production') rpDebug::showErrors();
	}

	/**
	 * Load setup
	 */
	static function loadSetup(){

		// Load setup configuration
		$setup = new rpPropertiesFile("../ramifip.ini");

		// Default properties
		$properties = array(
			"run_mode" => "development",
			"js_compression_mode" => "precompression",
			"available_hosts" => array("*"),
			"http_authentication" => array()			
		);


		foreach($properties as $prop => $value){
			if (!isset($setup->$prop)){
				$setup->$prop = $value;
			}
		}

		rpConfiguration::setValue("setup", $setup);
	}

	/**
	 * Show a boot message
	 *
	 * @param string $message
	 */
	static function bootMessage($message){
		echo "<div style = \"background: red; padding:5px; color: white;\"><h3>$message</h3>";
		echo "Contact with your administrator</div>";
	}

	/**
	 * Die the system and show message
	 *
	 * @param string $message
	 */
	static function systemDie($message){
		self::bootMessage($message);
		die();
	}

	/**
	 * Return a version of package or version of Ramifip core
	 * @param <string> $package_name
	 */
	static function getVersion($package_id = "ramifip") {
		$packages = v('packages');
		if (isset($packages[$package_id])) return $packages[$package_id][$package_id]['version'];
		return "";
	}

	/**
	 * Return the name of current document/script
	 * @return string
	 */
	static function getDocumentName() {
		$n = substr($_SERVER['PHP_SELF'], 1);
		$arr = explode("/", $n);
		$n = $arr[count($arr) - 1];
		return $n;
	}

	/**
	 * Check POST send indexes
	 * @param <string> $var Index names separate by commas
	 * @return <boolean>
	 */
	static function checkPOST($var) {
		$indexes = explode(",", $var);
		foreach ($indexes as $index) if (!isset($_POST[$index])) return false;
		return true;
	}

	/**
	 * Check GET send indexes
	 * @param <string> $var Index names separate by commas
	 * @return <boolean>
	 */
	static function checkGET($var) {
		$indexes = explode(",", $var);
		foreach ($indexes as $index) if (!isset($_GET[$index])) return false;
		return true;
	}

	/**
	 * Return application's title
	 * @param <type> $default
	 * @return <type>
	 */
	static function getAppTitle($default = "Ramifip Application") {

		if ($default == "Ramifip Application"){
			if (class_exists("app")){
				if (isset(app::$title)){
					$default = app::$title;
				}
			}
		}

		$sufix = "";

		if (isset(self::$paths[PATH])){
			$sufix = self::$paths[PATH];
		}

		$sufix = trim($sufix) == "" ? "" : " - " . $sufix;
		$subtitle = trim(v('subtitle')) == "" ? "" : " - " . self::$subtitle;

		return $default . $sufix . $subtitle;
	}

	/**
	 * Get params from POST and GET
	 * @return stdClass
	 */
	static function getParams() {
		$params = new stdClass();

		foreach ($_POST as $key => $value)
		if (substr($key, 0, strlen("event")) != "event") $params->$key = $value;

		foreach ($_GET as $key => $value)
		if (substr($key, 0, strlen("event")) != "event") $params->$key = $value;

		return $params;
	}

	/**
	 * Execute static method
	 * @param string $class_name
	 * @param string $method
	 * @param string $params
	 * @return boolean
	 */
	static function executeStaticMethod($class_name, $method, $params = "", $ignore = true) {
		$r = null;
		if (class_exists($class_name) === true) {
			if (method_exists($class_name, $method) === true){
				eval('$r = '. "$class_name::$method($params);");
			} else {
				if (!$ignore) throw new rpException("Method not exists: '$class_name::$method'");
			}
		} else {
			throw new rpException("Class '$class_name' not exists");
		}
		return $r;
	}

	/**
	 * Use CSS
	 * @param string $package
	 */
	static function useCSS($package) {
		self::$css[] = $package;
	}

	/**
	 * Use JavaScript
	 * @param string $package
	 */
	static function useJS($package) {
		self::$js[] = $package;
	}

	/**
	 * Load package's resources
	 * @param string $pkg
	 */
	static function useResourcesOf($pkg) {
		$packages = v('packages');
		$use = v('use');
		$bootstrap = v('bootstrap');

		// Break if package not exists
		if (!isset($packages[$pkg])) return false;

		// To stop the load of loaded resources previously and to foresee the execution
		// of an infinite cycle
		if (isset($packages[$pkg]['resources_loaded']))
		if ($packages[$pkg]['resources_loaded'] == true) return false;

		// Loading the resources of the dependences
		$p = $packages[$pkg];
		if (isset($p->dependences))
		if (is_array($p['dependences'])) {
			foreach ($p['dependences'] as $d) {
				// Continue if packages is the dependence (prevent infinity bucle)
				if ($pkg == $d) continue;
				self::useResourcesOf($d);
			}
		}

		// Loading the resources of the package
		if (is_array($p["js"]))
		foreach ($p["js"] as $js) {
			$arr = explode(">>", $js);
			if (count($arr) === 2) {
				if (rpPackageMan::comparePathWithPattern(PATH, trim($arr[0])) == true)
				self::useJS(trim($arr[1]));
			}
			else
			self::useJS($js);
		}

		if (is_array($p["css"]))
		foreach ($p["css"] as $css) {
			$arr = explode(">>", $css);
			if (count($arr) === 2) {
				if (rpPackageMan::comparePathWithPattern(PATH, trim($arr[0])) == true){
					self::useCSS(trim($arr[1]));
				}
			}
			else
			self::useCSS($css);
		}

		// Use another files
		if (isset($use[$p['id']])) {
			if (is_array($use[$p['id']])){
				foreach($use[$p['id']] as $item){
					u($item,array(),null,true);
				}
			}
		}

		// Bootstrap
		if (isset($bootstrap[$p['id']])) {
			if (is_array($bootstrap[$p['id']])){
				foreach($bootstrap[$p['id']] as $item){
					try{
						eval($item.";");
					} catch(Exception $e){
						throw new rpException("PACKAGE {$p['id']}: BOOTSTRAP $item FAILED");
					}
				}
			}
		}

		// Marking the loaded resources for not loading them again
		$packages[$pkg]['resources_loaded'] = true;
		return true;
	}

	/**
	 * Load packages's resources
	 */
	static function useResources() {
		$packages = rpConfiguration::getValue('packages');
		if (is_array($packages)) foreach ($packages as $key => $p){
				
			// Discard the non actived packages
			$prop = new rpPropertiesFile($p['path']);
			if (isset($prop->active)) if ($prop->active === false) continue;
				
			// Then load de package's resources
			self::useResourcesOf($key);
		}
	}

	/**
	 * Detect whether the current script is running in a command-line environment.
	 */
	static function isCli(){
		return (!isset($_SERVER['SERVER_SOFTWARE']) && (php_sapi_name() == 'cli' || (is_numeric($_SERVER['argc']) && $_SERVER['argc'] > 0)));
	}

	/**
	 * Return a correct session name base on URL
	 *
	 * @return string
	 */
	static function getCorrectSessionName(){
		$is_https = rpURL::isHTTPS();
		$base_url = rpURL::getBaseURL();
		list( , $session_name) = explode('://', $base_url, 2);

		if (!empty($_SERVER['HTTP_HOST'])) {
			$cookie_domain = $_SERVER['HTTP_HOST'];
			$cookie_domain = ltrim($cookie_domain, '.');
			if (strpos($cookie_domain, 'www.') === 0) $cookie_domain = substr($cookie_domain, 4);
			$cookie_domain = explode(':', $cookie_domain);
			$cookie_domain = '.' . $cookie_domain[0];
			if (count(explode('.', $cookie_domain)) > 2 && !is_numeric(str_replace('.', '', $cookie_domain))) ini_set('session.cookie_domain', $cookie_domain);
		}

		if ($is_https) ini_set('session.cookie_secure', TRUE);

		$prefix = ini_get('session.cookie_secure') ? 'RPSSESSION' : 'RPSESSION';
		$session_name = $prefix . substr(hash('sha256', $session_name), 0, 32);
		$session_name = strtoupper($session_name);

		return $session_name;
	}

	/**
	 * Return the output of script
	 *
	 * @param string $path
	 */
	static function getScriptOutput($path){
		$content = "";
		$path = rpPackageMan::repairPackagePath($path);
		$r = file_exists($path);
		if ($r){
			if (!is_dir(PACKAGES . $path)){
				ob_start();
				include $path;
				$content = ob_get_contents();
				ob_end_clean();
			}
		}
		return $content;
	}
}

// Classes's alias

class rp extends ramifip {/* Alias for ramifip class */}
class db extends phpull {/* Alias for phPull */}

register_shutdown_function("ramifip::shutdown");

// End of file
