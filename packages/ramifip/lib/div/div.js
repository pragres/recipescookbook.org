/**
 * [[]] Div JS Template Engine
 *
 * Div (division) is a template engine for PHP 5.x or higher.
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
 * @author Rafael Rodriguez Ramirez
 * @email rrodriguezramirez@gmail.com
 * @version: 2.8
 * @link http://divengine.com
 */

/**
 * Some functions
 */
function isset(v){return typeof v !== 'undefined';}

function get_class(obj){
    if(obj instanceof Object&&!(obj instanceof Array)&&!(obj instanceof Function)&&obj.constructor&&obj!=this.window){
        var arr=obj.constructor.toString().match(/function\s*(\w+)/);
        if(arr&&arr.length==2){
            return arr[1];
        }
    }
    return false;
}

/**
 * Constants
 *
 * PACKAGES contain the path of templates's root directory.
 * DIV_DEFAULT_TPL_FILE_EXT contain the default extension for template files
 * DIV_DEFAULT_DATA_FILE_EXT contain the default extension for data files
 * DIV_CLASS_NAME contain the name of div class if programmer change the name of the div class
 * DIV_MAX_PARSE_CYCLES the max number of cycles of the parser (to prevent infinite cycle and more)
 * DIV_MAX_FILENAME_SIZE the max size of file name or dir name in your operating system
 */

if (!defined("DIV_CLASS_NAME")) define("DIV_CLASS_NAME", "div");
if (!defined("DIV_MAX_PARSE_CYCLES")) define("DIV_MAX_PARSE_CYCLES", 100);
if (!defined("DIV_MAX_FILENAME_SIZE")) define("DIV_MAX_FILENAME_SIZE",250);

define("DIV_ERROR_WARNING", "WARNING");
define("DIV_ERROR_FATAL", "FATAL");
define("DIV_METHOD_NOT_EXISTS", "DIV_METHOD_NOT_EXISTS");

/**
 * The div class is the complete implementation of Div.
 *
 * See the following example:
 *
 * echo new div('Hello {$name}', array('name' => 'Peter Pan'));
 *
 */
div = function(src, items, ignore){

	this.__src = null;
	this.__src_original = null;
	this.__items = [];
	this.__path = "";
	this.__ignore = [];
	this.__restore = [];
	this.__packages = PACKAGES;
	
	this.__version = "2.8";
	this.__globals = [];
	this.__globals_design = [];
	this.__globals_design_protected = [];
	this.__defaults = [];
	this.__defaults_by_var = [];
	this.__parent_method_names = [];
	this.__method_names = null;
	this.__system_data = null;
	this.__system_data_allowed = {
		"div.version": true,
		"div.post": true,
		"div.get": true,
		"div.now": true
	};
	
	this.__discard_file_system = false;
	this.__allowed_functions = [];
	this.__log_mode = false;
	this.__log_file = null;
	this.__is_cli = null;
	this.__parse_duration = null;

	//self::log("Building new instance of div...");

	$decode = true;
	$classname = get_class(this);
	$discardfs = this.__discard_file_system;

	if (is_null(this.__parent_method_names)) this.__parent_method_names = get_class_methods(DIV_CLASS_NAME);
	if ($classname != DIV_CLASS_NAME && is_null($src) && is_null(this.__src)) $src = $classname;
	if (is_null($src) && !is_null(this.__src)) $src = this.__src;

		if (is_null($items)) {
			$items = $src;
			$items = str_replace("." + DIV_DEFAULT_TPL_FILE_EXT, "", $items);
			$decode = false;
		}

		if (!$discardfs){
			if (is_string($items)) if (strlen(this.__packages + $items + "." + DIV_DEFAULT_DATA_FILE_EXT) < 255){

				$exists = false;

				if (self::fileExists($items)) {
					$items = file_get_contents($items);
					$exists = true;
				}
				elseif (self::fileExists($items + "." + DIV_DEFAULT_DATA_FILE_EXT)) {
					$items = file_get_contents($items + "." + DIV_DEFAULT_DATA_FILE_EXT);
					$exists = true;
				}
				elseif (self::fileExists(this.__packages + $items + "." + DIV_DEFAULT_DATA_FILE_EXT)) {
					$items = file_get_contents(this.__packages + $items + "." + DIV_DEFAULT_DATA_FILE_EXT);
					$exists = true;
				}

				if ($exists === true || $decode === true) $items = self::jsonDecode($items);
			}
		

		if (is_object($items)) $items = get_object_vars($items);

		if (!$discardfs){
			$paths = array(this.__packages.$src, this.__packages.$src . ".".DIV_DEFAULT_TPL_FILE_EXT, $src, $src . ".".DIV_DEFAULT_TPL_FILE_EXT);

			for($path in $paths) {
				if (strlen($path) < 255) if (self::fileExists($path)) if (!self::isDir($path)) {
					$src = file_get_contents($path);
					this.__path = $path;
					break;
				}
			}
		}

		if (!is_array($items)) $items = [];

		this.__src = $src;
		this.__src_original = $src;
		this.__items = $items;

		if (isset($ignore[0])) foreach ($ignore as $key => $val) this.__ignore[$val] = true;
	}

	/**
	 * Enable system var for utility
	 *
	 * @param string $var
	 */
	this.enableSystemVar = function ($var){
		this.__system_data_allowed[$var] = true;
	};

	/**
	 * Disable system var for performance
	 *
	 * @param string $var
	 */
	this. = function disableSystemVar($var){
		if (isset(this.__system_data_allowed[$var])) unset(this.__system_data_allowed[$var]);
	}

	/**
	 * Loaded data automatically from the system
	 *
	 * @return array
	 */
	this.getSystemData = function(){
		if (this.__system_data == null){
			this.__system_data = [];
			if (isset(this.__system_data_allowed['div.now'])) this.__system_data['div.now'] = time();
			if (isset(this.__system_data_allowed['div.post'])) this.__system_data['div.post'] = $_POST;
			if (isset(this.__system_data_allowed['div.get'])) this.__system_data['div.get'] = $_GET;
			if (isset(this.__system_data_allowed['div.server'])) this.__system_data['div.server'] = $_SERVER;
			if (isset(this.__system_data_allowed['div.session'])) this.__system_data['div.session'] = isset($_SESSION) ? $_SESSION : [];
			if (isset(this.__system_data_allowed['div.version'])) this.__system_data['div.version'] = this.__version;
			if (isset(this.__system_data_allowed['div.script_name'])) {
				$script_name = explode("/", $_SERVER['SCRIPT_NAME']);
				$script_name = $script_name[count($script_name)-1];
				this.__system_data['div.script_name'] = $script_name;
			}
		}

		return this.__system_data;
	}

	/**
	 * Set allowed function
	 *
	 * @param string $funcname
	 */
	this. = function setAllowedFunction($funcname){
		this.__allowed_functions[$funcname] = true;
	}

	/**
	 * Unset allowed function
	 *
	 * @param string $funcname
	 */
	this. = function unsetAllowedFunction($funcname){
		this.__allowed_functions[$funcname] = false;
	}

	/**
	 * Add or set a global var
	 *
	 * @param string $var
	 * @param mixed $value
	 */
	this. = function setGlobal($var, $value){
		this.__globals[$var] = $value;
	}

	/**
	 * Remove a global var
	 *
	 * @param string $var
	 */
	this. = function delGlobal($var){
		unset(this.__globals[$var]);
	}

	/**
	 * Add or set a default replacement of value
	 *
	 * @param mixed $search
	 * @param mixed $replace
	 */
	this. = function setDefault($search, $replace){
		$pass = true;
		for(this.__defaults as $key => $value){
			if ($value[0] === $search){
				this.__defaults[$key] = array($search, $replace);
				$pass = false;
				break;
			}
		}
		if ($pass === true) this.__defaults[] = array($search, $replace);
	}

	/**
	 * Add or set a default replacement of value by var
	 *
	 * @param string $var
	 * @param mixed $search
	 * @param mixed $replace
	 * @param boolean $update
	 */
	this. = function setDefaultByVar($var, $search, $replace, $update = true){

		if (!isset(this.__defaults_by_var[$var]))	this.__defaults_by_var[$var] = [];

		$pass = true;
		for(this.__defaults_by_var[$var] as $key => $value){
			if ($value[0] === $search){
				if ($update == true) this.__defaults_by_var[$var][$key] = array($search, $replace);
				$pass = false;
				break;
			}
		}

		if ($pass === true) this.__defaults_by_var[$var][] = array($search, $replace);
	}

	/**
	 * Remove a default replacement
	 *
	 * @param mixed $search
	 */
	this. = function delDefault($search){
		for(this.__defaults as $key => $value){
			if ($value[0] === $search){
				unset(this.__defaults[$key]);
				break;
			}
		}
	}

	/**
	 * Remove a default replacement by var
	 *
	 * @param string $var
	 * @param mixed $search
	 */
	this. = function delDefaultByVar($var, $search){
		if (isset(this.__defaults_by_var[$var]))
		for(this.__defaults_by_var[$var] as $key => $value){
			if ($value[0] === $search){
				unset(this.__defaults_by_var[$var][$key]);
				break;
			}
		}
	}

	/**
	 * Add or Set item of information
	 *
	 * @param string $index
	 * @param mixed $value
	 * @return mixed
	 */
	this. = function setItem($index, $value){
		if (isset(this.__items[$index])) $item = this.__items[$index]; else $item = null;
		this.__items[$index] = $value;
		return $item;
	}

	/**
	 * Delete an item of information
	 *
	 * @param mixed $index
	 */
	this. = function delItem($index){
		unset(this.__items[$index]);
	}

	/**
	 * Return an item
	 *
	 * @param array $array
	 * @param mixed $index
	 * @param mixed $default
	 * @return mixed
	 */
	this. = function getItem($index, $default = null){
		if (!isset(this.__items[$index])){
			return $default;
		}
		return this.__items[$index];
	}

	/**
	 * Return a list of block's ranges
	 *
	 * @param string $tagini
	 * @param string $tagend
	 * @return array
	 */
	this. = function getRanges($tagini, $tagend, $src = null, $onlyfirst = false, $pos = 0){

		if (is_null($src)) $src = this.__src;
		if (!isset($src[0]) || empty($src)) return [];

		$ltagini = strlen($tagini);
		$ltagend = strlen($tagend);

		$ini = strpos($src, $tagini);
		if ($ini === false) return [];
		if (!isset($src[$ini + $ltagini])) return [];

		$fin = strpos($src, $tagend, $ini + $ltagini);

		if ($ini === false || $fin === false) return [];

		$ranges = [];
		$l = strlen($src);

		$last_pos = -1;

		while (true) {

			$ini =  strpos($src, $tagini, $pos);
			if ($ini === false || ($ini !== false && $pos == $last_pos)) break;

			$open = $ini;
			$end = false;
			$plus = 1;
			$posi = $ini + $ltagini;
			$last_posi = $posi-1;
			while (true){

				$open = strpos($src, $tagini, $posi);
				$close = strpos($src, $tagend, $posi);

				if (($open === false && $close === false) || // ni abrieron ni cerraron
				($open === false && $close !== false && $posi === $last_posi) || // cerraron y no abrieron
				($open !== false && $close === false && $posi === $last_posi) // abrieron y no cerraron
				) break;


				if ($open !== false || $close !== false){
					if (($close < $open || $open === false) && $close !== false){
						$last_posi = $posi;
						$posi = $close + $ltagend;
						$plus--;
					} elseif (($open < $close || $close === false) && $open !== false){ // no separar estos IF del else
						$last_posi = $posi;
						$posi = $open + $ltagini;
						$plus++;
					}
				}

				if ($plus === 0){
					$end = $close;
					break;
				}
				if ($open >= $l) break;
			}

			$last_pos = $pos;

			if ($end != false){
				$ranges[] = array($ini, $end);
				if ($onlyfirst == true) return $ranges;
				$pos = $ini + $ltagini;
				continue;
			}
		}

		return $ranges;
	}

	/**
	 * Return a default replacement of value
	 *
	 * @param mixed $value
	 * @return mixed
	 */
	this. = function getDefault($value){
		foreach (this.__defaults as $v){
			if ($v[0] === $value){
				return $v[1];
			}
		}
		return $value;
	}

	/**
	 * Return a default replacement of value by var
	 *
	 * @param string $var
	 * @param mixed $value
	 * @return mixed
	 */
	this. = function getDefaultByVar($var, $value){
		if (isset(this.__defaults_by_var[$var]))
		foreach (this.__defaults_by_var[$var] as $v){
			if ($v[0] === $value){
				return $v[1];
			}
		}
		return $value;
	}

	/**
	 * Search a position in the list of ranges
	 *
	 * @param array $ranges
	 * @param integer $pos
	 * @return boolean
	 */
	this. = function searchInRanges($ranges, $pos){
		foreach ($ranges as $range){
			if ($pos>= $range[0] && $pos <= $range[1])
			return true;
		}
		return false;
	}

	/**
	 * Return any value as boolean
	 *
	 * @param mixed $value
	 * @return boolean
	 */
	this. = function mixedBool($value){

		if (is_scalar($value)) if ("$value" === "0") return false;
		if (is_object($value)) if (method_exists($value, "__toString")) $value = "$value";
		if (is_object($value)) return count(get_object_vars($value)) > 0;

		if (is_array($value)) $value = count($value) > 0;
		elseif (is_string($value)) $value = strlen(trim($value)) > 0;
		elseif (is_numeric($value)) $value = $value > 0;
		elseif (is_null($value)) $value = false;

		return $value;
	}

	/**
	 * Return a ranges of conditional parts
	 *
	 * @param string $src
	 * @param string $ch
	 * @return array
	 */
	this. = function getRangesOfConditionalParts($src = null, $ch = null){

		if (is_null($ch)){
			$r = this.getRangesOfConditionalParts($src, "?");
			$r1 = this.getRangesOfConditionalParts($src, "!");
			return array_merge($r, $r1);
		}
		if (is_null($src)) $src = &this.__src;

		$p = -1;

		$ranges = [];

		while(true){
			if ($p + 1 < strlen($src)) $p = strpos($src, "$ch$", $p + 1); else break;
			if ($p === false) break;
			$p1 = strpos($src, " ", $p);
			$p2 = strpos($src, "\n", $p);
			if ($p1 === false) $p1 = $p2; elseif ($p1 > $p2) $p1 = $p2;
			$key = trim(substr($src, $p + 2, $p1 - $p - 2));
			if ($key != "" && !empty($key)) {
				$r = this.getRanges($ch.'$'.$key, '$'.$key.$ch, $src);
				$ranges = array_merge($ranges, $r);
			}
		}
			
		return $ranges;
	}

	/**
	 * Return the correct @else@ mark of conditional block
	 *
	 * @param string $subsrc
	 * @return mixed
	 */
	this. = function getElseMark($subsrc){

		$else = false;
		$range_conditions = this.getRanges("{?(","{/?}", $subsrc);
		$range_conditionals = this.getRangesOfConditionalParts($subsrc);
		$rangesx = array_merge($range_conditions,$range_conditionals);

		$pelse = 0;
		$ls = strlen($subsrc);
		do{
			$continue = false;
			if ($pelse < $ls) $else = strpos($subsrc, "@else@", $pelse); else $else = false;

			// checking that the mark doesn't belong to another IF inside this IF
			if ($else !== false){
				for($rangesx as $r)
				if ($else >= $r[0] && $else <= $r[1]) {
					$pelse = $r[1] + 1;
					$else = false;
					$continue = true;
					break;
				}
			}
		} while($continue == true);

		return $else;
	}

	/**
	 * Parse conditional blocks
	 *
	 * @param string $src
	 * @param string $key
	 * @param mixed $value
	 * @return string
	 */
	this. = function parseConditionalBlock($key, $value){

		//self::log("Parsing conditional block: $key");

		if (isset(this.__ignore[$key])) return false;
		$src = &this.__src;

		if (is_array($value) || is_object($value)){
			$vars = $value;
			if (is_object($vars)) $vars = get_object_vars($vars);
			for($vars as $k => $val){
				if (is_numeric($k)) break;
				this.parseConditionalBlock("$key.$k", $val);
			}
		}

		$value = this.mixedBool($value);

		$passes = array("?" => false, "!" => true);

		$pos = 0;

		for($passes as $char => $flag){
			while(true){

				if (strpos($src,"{$char}$$key") === false) break;
				$ranges = this.getRanges("{$char}$$key", "$$key{$char}", $src, true, $pos);

				if (count($ranges) > 0){
					$ini = $ranges[0][0];
					$fin = $ranges[0][1];

					// Controlling injected vars
					// _is_last _is_first _is_odd _is_even

					$continue = false;
					if (array_search($key, array("_is_last", "_is_first", "_is_odd", "_id_even")) !== false){
						$rangx = this.getRanges("[$", "[/$", null);

						for($rangx as $rang) if ($rang[0] < $ini && $rang[1] > $fin){
							$pos = $fin + 1;
							//self::log("Ignore the injected var inside another list block: $key..");
							$continue = true;
							break;
						}
						if ($continue === true) continue;
					}

					$l = strlen("{$char}$$key");
					$subsrc = substr($src, $ini + $l, $fin - ($ini + $l));
					$else = this.getElseMark($subsrc);

					if ($value === $flag){
						if ($else !== false){
							$src = substr($src,0,$ini) .
							substr($src, $ini + $l + $else + 6, $fin - ($ini + $l + $else + 6)).
							substr($src, $fin + $l);
						} else {
							$src = substr($src,0,$ini) . substr($src,$fin + $l);
						}
					} else {
						if ($else !== false){
							$src = substr($src, 0, $ini).
							substr($src, $ini + $l, $else).
							substr($src, $fin + $l);
						} else {
							$src = substr($src, 0, $ini).
							substr($src, $ini + $l, $fin - ($ini + $l)).
							substr($src, $fin + $l);
						}
					}
				} else break;
			}
		}

		// Saving complex vars

		$id1 = null;
		$id2 = null;

		// If not exists $key then not exists $key.$subkey... dont's worry

		if (strpos($src, "!$$key.")) {
			$id1 = uniqid();
			$src = str_replace("!$$key.", $id1, $src);
		}

		if (strpos($src, "?$$key.")) {
			$id2 = uniqid();
			$src = str_replace("?$$key.", $id2, $src);
		}

		// Clean wrong tags to prevent infinite cycles

		$l = strlen("!$$key");
		$ll = strlen($src);

		$p = strpos($src, "!$$key");

		// Exclude the list's blocks
		$rangx = this.getRanges("[$", "[/$", null);

		foreach ($rangx as $rang) if ($p>$rang[0] && $p <$rang[1]) {$p = false; break;}

		$procede = true;
		if ($p === false) {
			$procede = false;
		} else {
			if ($p+$l+1<$ll){
				if (substr($src,$p+$l+1,1) != " " && substr($src,$p+$l+1,1) != "\n") $procede = false;
			}
		}
		if ($procede) $src = str_replace("!$$key","",$src);

		$p = strpos($src, "?$$key");

		// Exclude the list's blocks
		$rangx = this.getRanges("[$", "[/$", null);
		foreach ($rangx as $rang) if ($p>$rang[0] && $p <$rang[1]) {$p = false; break;}

		$ll = strlen($src);
		$procede = true;
		if ($p === false) {
			$procede = false;
		} else {
			if ($p + $l + 1 < $ll){
				if (substr($src,$p+$l+1,1) != " " && substr($src,$p+$l+1,1) != "\n") $procede = false;
			}
		}

		if ($procede) $src = str_replace("?$$key","",$src);

		$p = strpos($src, "$$key!");

		// Exclude the list's blocks
		$rangx = this.getRanges("[$", "[/$", null);
		foreach ($rangx as $rang) if ($p>$rang[0] && $p <$rang[1]) {$p = false; break;}

		if ($p!==false) $src = str_replace("$$key!","",$src);

		// Restoring complex vars
		if ($id1 != null) $src = str_replace($id1, "!$$key.", $src);
		if ($id2 != null) $src = str_replace($id2, "?$$key.", $src);
	}

	/**
	 * Format for number
	 *
	 * @param string $key
	 * @param string $src
	 * @return string
	 */
	this. = function numberFormat($key, $value){

		if (isset(this.__ignore[$key])) return false;
		if (strpos(this.__src,"{#$key:") === false) return false;
		if (strpos(this.__src,"#}") === false) return false;

		$p1 = strpos(this.__src, "{=");
		$pos = 0;
		while(true){
			$ranges = this.getRanges("{#$key:", "#}", null, true, $pos);

			if (count($ranges)<1) break;

			//self::log("Formatting number $key = $value");

			if ($ranges[0][0] > $p1 && $p1 !== false) return true;

			// Ignore the formulas
			$rangs = this.getRanges("{=", "=}",null,true);

			if (isset($rangs[0])){
				if ($rangs[0][0] < $ranges[0][0] ) {
					$pos = $ini + 1;
					continue;
				}
			}

			$range = $ranges[0];
			$l1 = strlen("{#$key:");
			$format = substr(this.__src, $range[0] + $l1, $range[1] - ($range[0]+$l1));
			if (trim($format)=="") $format = "0.";

			if (!is_numeric($value)){
				this.__src = substr(this.__src,0,$range[0])."{#$value:".$format."#}".substr(this.__src,$range[1]+2);
				return true;
			}

			$separator = ".";
			$miles_sep = "";

			if (!is_numeric(substr($format,strlen($format)-1))){
				$separator = substr($format,strlen($format)-1);
				$format = substr($format, 0, strlen($format)-1);
			}

			if (!is_numeric(substr($format,strlen($format)-1))){
				$miles_sep = $separator;
				$separator = substr($format,strlen($format)-1);
				$format = substr($format, 0, strlen($format)-1);
			}

			$decimals = intval($format);
			this.__src = substr(this.__src,0,$range[0]).number_format($value, $decimals, $separator, $miles_sep).substr(this.__src,$range[1]+2);
		}
	}

	/**
	 * Giving formats to the dates
	 *
	 * @param string $key
	 * @param integer $value
	 * @return boolean
	 */
	this. = function dateFormat($key, $value){

		if (strpos(this.__src,"{/$key:") === false) return false;
		if (strpos(this.__src,"/}") === false) return false;

		while(true){
			$ranges = this.getRanges("{/$key:", "/}", null, true);
			if (count($ranges)<1) break;
			$ini = $ranges[0][0];
			$fin = $ranges[0][1];

			$l1 = strlen("{/$key:");
			$format = substr(this.__src, $ini+$l1,$fin-($ini+$l1));
			if (trim($format)=="") $format = "Y-m-d";

			if (!is_numeric($value)){
				this.__src = substr(this.__src,0,$ini)."{/$value:".$format."/}".substr(this.__src, $fin+2);
				return true;
			}
			this.__src = substr(this.__src,0,$ini). date($format, $value).substr(this.__src,$fin+2);
		}

		return true;
	}

	/**
	 * Parse submatch
	 *
	 * @param mixed $items
	 * @param string $key
	 * @param mixed $value
	 * @param string $modifiers
	 * @return boolean
	 */
	this. = function parseSubmatch(&$items, $key, $value, $modifiers){

		if (isset(this.__ignore[$key])) return false;
		if (strpos(this.__src, "{$key}:")!==false)
		for($modifiers as $modifier) while(true){
			$ranges = this.getRanges("{{$modifier}$key:", "}", null, true);
			$l = strlen("{{$modifier}$key:");
			if (count($ranges) < 1) break;

			//self::log("Parse submatch {{$modifier}$key:");

			$r = substr(this.__src, $ranges[0][0] + $l, $ranges[0][1] - ($ranges[0][0] + $l));
			$arr = explode(",",$r);
			if (count($arr)<2) $arr = array(0,$arr[0]);
			$arr[0] = trim($arr[0]);
			$arr[1] = trim($arr[1]);

			$nkey = str_replace(".","",uniqid("submatch",true));

			if (!is_numeric($arr[0]) || !is_numeric($arr[1])) {
				if (substr("{$arr[1]}",0,1) == "~") {
					$items[$nkey] = self::teaser("{$value}", intval(substr($arr[1],1)));
				} else if(substr("{$arr[1]}",0,1) == "/"){
					$items[$nkey] = wordwrap("{$value}", intval(substr($arr[1],1)), "\n", 1);
				} else break;
			} else $items[$nkey] = substr("{$value}", $arr[0], $arr[1]);

			$right = "";
			if ($ranges[0][1]+1 < strlen(this.__src)) $right = substr(this.__src,$ranges[0][1]+1);
			this.__src = substr(this.__src,0,$ranges[0][0])."{{$modifier}$nkey}".$right;
		}

		if (strpos(this.__src, "$key.") !== false){
			if (is_object($value)){
				$vars = get_object_vars($value);
				for($vars as $kk => $v)	this.parseSubmatch($items,"$key.$kk", $v, $modifiers);
			}
			if (is_array($value)) for($value as $kk => $v) this.parseSubmatch($items, "$key.$kk", $v, $modifiers);
		}

		return true;
	}

	/**
	 * Parsing sub matches
	 *
	 * @param mixed $items
	 */
	this. = function parseSubmatches(&$items = null){

		//self::log("Parsing submatches...");

		if (is_null($items)) $items = &this.__items;

		$modifiers = [];
		$lmodifiers = array('$','^','^^','^^^','_','%','%%','%%%','%%%%','&','html:', 'br:');

		for($lmodifiers as $m){
			if (strpos(this.__src, '{'."$m") !== false) {
				$modifiers[] = $m;
			}
		}

		for($items as $key => $value){
			this.parseSubmatch($items, $key, $value, $modifiers);
		}
	}

	/**
	 * Parse matches
	 *
	 * @param string $src
	 * @param string $key
	 * @param mixed $value
	 */
	this. = function parseMatch($key, $value, &$engine = null){

		if (is_null($engine)){
			$classname = get_class($this);
			$engine = new $classname("", this.__items);
		}

		if (isset(this.__ignore[$key])) return false;

		$value = self::getDefault($value);
		$value = self::getDefaultByVar($key, $value);

		if (is_bool($value)) $value = $value ? "true":"false";

		if (is_string($value) || is_numeric($value) || method_exists($value, "__toString")){

			$p1 = strpos(this.__src, "{=");

			if ($p1 === false) {
				$substr = &this.__src;
			} else {
				$substr = substr(this.__src,0,$p1);
			}

			$px = strpos($substr,"$key}");

			if ($px != false){

				//self::log("Parse match: $key");

				$value = trim("$value");
				$engine->__src = $value;
				$engine->parse(false);
				$value = $engine->__src;

				$substr = str_replace('{$' . $key . '}', $value, $substr); // simple replacement

				if (strpos($substr,'{^') !== false){
					$substr = str_replace(array(
					  	'{^'    . $key . '}', // capitalize
				    	'{^^'   . $key . '}', // capitalize each word
				    	'{^^^'  . $key . '}', // upper case
					),array(
					ucfirst($value),
					ucwords($value),
					strtoupper($value)
					), $substr);
				}

				if (strpos($substr,'{%') !== false){
					$substr = str_replace(array(
					  	'{%'    . $key . '}', // count of characters
				    	'{%%'   . $key . '}', // count of words
				    	'{%%%'  . $key . '}', // count of sentences
				    	'{%%%%' . $key . '}',  // count of paragraphs
					),array(
					strlen($value),
					self::getCountOfWords($value),
					self::getCountOfSentences($value),
					self::getCountOfParagraphs($value),
					), $substr);
				}

				$substr = str_replace(array(
				    '{_'    . $key . '}', // lower case
					'{&'    . $key . '}', // url enconde
					'{html:'. $key . '}', // html entities
					'{br:'  . $key . '}' // convert newlines to <br/>
				), array(
				strtolower($value),
				urlencode($value),
				htmlentities($value),
				nl2br($value)
				),
				$substr);

			}
			if ($p1 !== false)this.__src = $substr.substr(this.__src, $p1);
		}

		if (strpos(this.__src, "$key.") !== false){
			if (is_object($value)){
				$vars = get_object_vars($value);
				for($vars as $kk => $v)	this.parseMatch("$key.$kk", $v, $engine);
			}

			if (is_array($value)) for($value as $kk => $v) this.parseMatch("$key.$kk", $v, $engine);
		}

		if (strpos(this.__src , "{json:$key}")!==false){

			this.__src = str_replace("{json:$key}", self::jsonEncode($value), this.__src);
		}
	}

	/**
	 * Parse iterations
	 *
	 * @param mixed $items
	 * @param string $src
	 */
	this. = function parseIterations(&$items, &$src = null){

		//self::log("Parsing iterations...");

		if (is_null($src)) $src = &this.__src;
		$continue = true;
		$p = 0;
		$last_ranges = array(array(-99));
		while(true){
			$ranges = this.getRanges("[:","[/]",$src,true);

			if (count($ranges) < 1) break;
			if ($ranges[0][0] === $last_ranges[0][0]) break;

			$last_ranges = $ranges;

			$p = $ranges[0][0];
			$p2 = $ranges[0][1];
			$p1 = strpos($src, ":]", $p + 1);
			$s = substr($src, $p + 2, $p1 - ($p + 2));

			$range = explode(",", $s);
			$c = count($range);
			if ($c < 2) {$range[1] = $range[0]; $range[0] = 1;}
			$itervar = "value";
			$step = 1;

			if ($c == 3) {
				if (is_numeric($range[2])) $step = trim($range[2]) * 1;
				else $itervar = trim($range[2]);
			}

			if ($c == 4){
				$itervar = $range[2];
				$step = trim($range[3]) * 1;
			}

			if (is_numeric($range[0]) && is_numeric($range[1])){

				$range[0] = trim($range[0]) * 1;
				$range[1] = trim($range[1]) * 1;

				$key = uniqid();
				$l = strlen($key);

				$subsrc = substr($src, $p1+2, $p2 -($p1+2));

				$sitervar = " $itervar =>";

				if (strpos($subsrc, '=>')) $sitervar = '';

				$src = substr($src,0,$p + 1)."$$key]$sitervar".$subsrc. "[/$$key".substr($src,$p2+2);
				$items[$key] = [];

				if ($range[1] >= $range[0]) {
					for($i = $range[0]; $i >= $range[0] && $i <= $range[1]; $i = $i + $step){
						$items[$key][] = $i;
					}
				} else {
					for($i = $range[0]; $i >= $range[1] && $i <= $range[0]; $i = $i - $step){
						$items[$key][] = $i;
					}
				}
			}
		}
	}

	/**
	 * Parse list block
	 *
	 * @param mixed $value
	 * @param string $key
	 * @param mixed $items
	 */
	this. = function parseListBlock($value, $key, $items){

		if (isset(this.__ignore[$key])) return false;
		if (strpos(this.__src, "[$$key]") === false) return false;

		$l = strlen("[$$key]");
		$ranges = [];
		$classname = get_class($this);
		$pos = 0;
		$total = 0; $subtotal = 0;

		while(true){

			$lists = this.getRanges("[$$key]", "[/$$key]", null, true, $pos);

			if (count($lists) < 1) break;

			//self::log("Parsing the list: $key..");

			$list = $lists[0];

			$p1 = $list[0];
			$p2 = $list[1];

			// Check previus data
			$rang = this.getRanges("{=", "=}", null, true);

			if (count($rang)>0){
				if ($rang[0][0] < $p1){
					$pos = $p2 + 1;
					//self::log("Ignore the list after vars in template: $key..");
					continue;
				}
			}

			// Check if list is inside another list block
			$rangs = this.getRanges("[$", "[/$");
			$continue = false;
			for($rangs as $rang){
				if ($rang[0] < $p1 && $rang[1] > $p2){
					$pos = $p2 + 1;
					//self::log("Ignoring the list '$key' inside another list block");
					$continue = true;
					break;
				}
			}
			if ($continue) continue;

			$ranges[] = $list;

			if ($p2 > $p1){
				$minihtml = substr(this.__src, $p1 + $l, $p2 - $p1 - $l);
				$itemkey = "value";
					
				// The itemkey/itervar can't have space or newline chararters
				if (strpos($minihtml, "=>")!==false){
					$arr = explode("=>", $minihtml,2);
					if(strpos($arr[0], "\n")===false){
						$arr[0] = trim($arr[0]);
						if(strpos($arr[0], " ")===false){
							if ($itemkey != "") $itemkey = $arr[0];
							$minihtml = $arr[1];
						}
					}
				}

				$ii = 0;
				$randoms = [];
				$count = count($value);
					
				$ii = 0;

				$keys = array_keys($value);
				$ckeys = count($keys);

				$go_index = strpos($minihtml,'$_index')!==false;
				$go_key = strpos($minihtml,'$_key')!==false;
				$go_index_random = strpos($minihtml,'$_index_random')!==false;
				$go_is_odd = strpos($minihtml,'$_is_odd')!==false;
				$go_is_even = strpos($minihtml,'$_is_even')!==false;
				$go_is_first = strpos($minihtml,'$_is_first')!==false;
				$go_is_last = strpos($minihtml,'$_is_last')!==false;
				$go_list = strpos($minihtml,'$_list')!==false;
				$go_item = strpos($minihtml,'$_item')!==false;
				$go_order = strpos($minihtml,'$_order')!==false;

				$xitems = [];

				// Preparing xitems data

				foreach ($value as $kk => $item){
					$ii++;
					$anothers = [];

					if (is_object($item)) $item = get_object_vars($item);

					if ($go_index) $anothers['_index'] = $ii - 1;
					if ($go_key)  $anothers['_key'] = $kk;
					if ($go_index_random) {
						do {
							$random = rand(1, $count);
						} while (isset($randoms[$random]));

						$randoms[$random] = true;
						$anothers['_index_random'] = $random - 1;
					}
					if ($go_is_odd) $anothers['_is_odd'] = ($ii % 2 != 0);
					if ($go_is_even) $anothers['_is_even'] = ($ii % 2 == 0);
					if ($go_is_first) $anothers['_is_first'] = ($ii === 1);
					if ($go_is_last) $anothers['_is_last'] = ($ii == $ckeys);
					if ($go_list) $anothers['_list'] = $key;
					if ($go_item) $anothers['_item'] = $item;
					if ($go_order) $anothers['_order'] = $ii;

					$asString = is_object($item) && (is_subclass_of($item, DIV_CLASS_NAME) || get_class($item) == DIV_CLASS_NAME || method_exists($item, "__toString"));

					$isscalar = false;
					if (!is_array($item) || is_scalar($value) || $asString == true) {
						$item = array($itemkey => $item);
						$isscalar = true;
					} else if ($itemkey != "value") $item[$itemkey] = $item;

					$item = array_merge($item, $anothers);
					$item = array_merge($items, $item);

					$xitems[] = $item;

				}

				// Parsing

				$h = "";

				// Intance a new object

				$tmp = this.__discard_file_system;

				this.__discard_file_system = true;

				//self::log("A new $classname instance will be created for parsing the listitems..");

				$hh = new $classname($minihtml, $xitems);

				this.__discard_file_system = $tmp;

				for($xitems as $xkey => $item) {

					$tempglobal = []; // priority to item's properties

					// Save similar global design vars

					for($item as $kkk => $vvv) if (isset(this.__globals_design[$kkk])){
						$tempglobal[$kkk] = this.__globals_design[$kkk];
						unset(this.__globals_design[$kkk]);
					}

					//self::log("Parsing item $xkey of the list...");
					$hh->parse(true, null, $xkey);

					// Restore global design vars
					this.__globals_design = array_merge(this.__globals_design, $tempglobal);

					$break = strpos($hh->__src, "@break@");

					if ($break !== false) {
						$hh->__src = substr($hh->__src, 0, $break);
						$h .= $hh->__src;
						break;
					}
					$h .= $hh->__src;
				}

				// Replace
				this.__src = substr(this.__src , 0, $p1) . $h . substr(this.__src , $p2 + $l + 1);
			}
		}
	}

	/**
	 * Parse list
	 *
	 * @param mixed $items
	 * @param string $superkey
	 */
	this. = function parseList($items = null, $superkey = ""){

		//self::log("Parsing list's blocks, SUPERKEY = '$superkey'...");

		if (isset(this.__ignore[$superkey])) return false;
		if ($items == null) $items = this.__items;

		if (!is_array($items)) if (is_object($items)) {
			$items = array(get_object_vars($items));
		} else continue;

		if ($superkey == "") this.parseListBlock($items, "", []);

		if (is_array($items)) for($items as $key => $value){
			if (!is_array($value)) if (is_object($value)) {
				$value = array(get_object_vars($value));
			} else continue;

			$items[$key] = $value;

			for($value as $kk => $item){
				if (!is_array($item) && !is_object($item) || is_scalar($item)) continue;
				if ($key != "") $items["$key.$kk"] = $item;
				else $items[$kk] = $item;
			}
		}

		$pos = [];
		foreach ($items as $key => $value) {
			$p = strpos(this.__src,"[\$$key]");
			if ($p !== false){
				$pos[$key] = $p;
			}
		}

		asort($pos);

		if (is_array($items)) foreach ($pos as $key => $value) {
			$value = $items[$key];
			if (is_array($value)) this.parseListBlock($value, $key, $items);
		}
	}

	/**
	 * Ignore parts of template
	 *
	 */
	this. = function parseIgnore($ignores = []){

		//self::log("Parsing ignore's blocks...");

		while(true){
			$ranges = this.getRanges("{ignore}", "{/ignore}",  null, true);
			if (count($ranges) < 1) break;
			$id = uniqid();
			$ignores[$id] = substr(this.__src, $ranges[0][0] + 10, $ranges[0][1] - $ranges[0][0] - 10);
			this.__src = substr(this.__src, 0, $ranges[0][0]).$id.substr(this.__src, $ranges[0][1] + 10);
		}
		return $ignores;
	}

	/**
	 * Return the full path or relative path for include and preprocessed
	 *
	 * @param string $path
	 * @return string
	 */
	this. = function getTplPath($path){
		if (self::fileExists(this.__packages.$path.".".DIV_DEFAULT_TPL_FILE_EXT)) $path .= ".".DIV_DEFAULT_TPL_FILE_EXT;
		// Relative path
		if (!self::fileExists(this.__packages.$path)){
			if (this.__path != ""){
				if (self::fileExists(this.__path)){
					$flds = explode("/", this.__path);
					array_pop($flds);
					$folder = implode("/", $flds);
					if (self::fileExists($folder."/".$path.".".DIV_DEFAULT_TPL_FILE_EXT)) $path .= ".".DIV_DEFAULT_TPL_FILE_EXT;
					return $folder."/".$path;
				}
			}
		}
		return this.__packages.$path;
	}

	/**
	 * Include others templates
	 *
	 * @param mixed $items
	 */
	this. = function parseInclude(&$items){

		//self::log("Parsing includes...");

		if (is_object($items)) $items = get_object_vars($items);
		if (is_array($items)) foreach ($items as $key => $value) {
			if (isset(this.__ignore[$key])) continue;
			if (strpos(this.__src, "{% $key %}") !== false ){
				if (self::fileExists(this.__packages.$value.".".DIV_DEFAULT_TPL_FILE_EXT))
				$value .= ".".DIV_DEFAULT_TPL_FILE_EXT;
				this.__src = str_replace("{% $key %}", "{% $value %}", this.__src);
			}
		}

		$restore = [];
		$pos = 0;
		while(true){
			$ranges = this.getRanges("{% ", " %}", null, true, $pos);
			if (count($ranges)<1) break;
			$ini = $ranges[0][0];
			$fin = $ranges[0][1];

			$rangex = this.getRanges("{=", "=}");
			$procede = true;
			for($rangex as $rx) {
				if ($ini >= $rx[0] && $ini <= $rx[1]) {
					$pos = $ini + 1;
					$procede = false;
					break;
				}
			}

			if (!$procede) continue;

			$path = trim(substr(this.__src, $ini + 3, $fin-$ini-3));
			$path = this.getTplPath($path);
							
			if (self::fileExists($path)){
				$c = "[[]] ERROR: TEMPLATE '$path' NOT FOUND OR IS NOT A TEMPLATE!";
				if (!is_dir($path)){
					$c = file_get_contents($path);
				}
				this.__src = substr(this.__src, 0, $ini). $c . substr(this.__src,$fin+3);
			} else {
				$id = uniqid();
				$restore[$id] = substr(this.__src,$ini,($fin+3)-$ini);
				this.__src = substr(this.__src,0,$ini) .$id. substr(this.__src,$fin+3);
			}
		}

		for($restore as $id => $restor) this.__src = str_replace($id, $restor, this.__src);
	}



	/**
	 * Parsing preprocessed templates
	 *
	 * @param mixed $items
	 */
	this. = function parsePreprocessed($items){

		//self::log("Parsing preprocessed...");

		$classname = get_class($this);
		if (is_object($items)) $items = get_object_vars($items);
		if (is_array($items)) foreach ($items as $key => $value) {
			if (isset(this.__ignore[$key])) continue;
			if (strpos(this.__src, "{%% $key %%}") !== false ){
				if (self::fileExists(this.__packages.$value.".".DIV_DEFAULT_TPL_FILE_EXT)) $value .= ".".DIV_DEFAULT_TPL_FILE_EXT;
				this.__src = str_replace("{%% $key %%}", "{%% $value %%}", $pre);
			}
		}

		$restore = [];

		$tmp = this.__discard_file_system;
		this.__discard_file_system = true;
		//self::log("A new $classname instance will be created for parsing the preprocessed tpls..");
		$engine = new $classname("", $items);
		this.__discard_file_system = $tmp;

		$pos = 0;
		while(true){
			$ranges = this.getRanges("{%% ", " %%}", null, true, $pos);
			if (count($ranges)<1) break;
			$ini = $ranges[0][0];
			$fin = $ranges[0][1];

			$rangex = this.getRanges("{=", "=}");
			$procede = true;
			for($rangex as $rx) {
				if ($ini >= $rx[0] && $ini <= $rx[1]) {
					$pos = $ini + 1;
					$procede = false;
					break;
				}
			}

			if (!$procede) continue;

			$path = trim(substr(this.__src, $ini + 4, $fin-$ini-4));
			$path = this.getTplPath($path);
			
			if (self::fileExists($path)){
				$c = file_get_contents($path);
				$engine->__src = $c;
				$engine->parse(false);
				$pre = $engine->__src;
				this.__src = substr(this.__src, 0, $ini). $pre . substr(this.__src,$fin+4);
			} else {
				$id = uniqid();
				$restore[$id] = substr(this.__src,$ini,($fin + 4)-$ini);
				this.__src = substr(this.__src,0,$ini) .$id. substr(this.__src,$fin+4);
			}
		}

		for($restore as $id => $restor) this.__src = str_replace($id, $restor, this.__src);
	}

	/**
	 * Parse comments
	 *
	 */
	this. = function parseComments(){

		//self::log("Parsing comments...");

		while(true){
			$ranges = this.getRanges("<!--{", "}-->",null,true);
			if (count($ranges)<1) break;
			this.__src = substr(this.__src, 0, $ranges[0][0]) . substr(this.__src, $ranges[0][1] + 4);
		}
	}

	/**
	 * Parse data
	 *
	 * @param array $items
	 */
	this. = function parseData(&$items){

		//self::log("Parsing data in templates...");

		$varsya = [];

		$classname = get_class($this);
		$pos = 0;

		$tmp = this.__discard_file_system;
		this.__discard_file_system = true;
		//self::log("A new $classname instance will be created for parsing the template vars...");
		$engine = new $classname("", $items);
		this.__discard_file_system = $tmp;

		while(true){
			$ranges = this.getRanges("{=", "=}",null, true, $pos);
			if (count($ranges)<1) break;

			$ini = $ranges[0][0];
			$fin = $ranges[0][1];

			$ignore = false;

			// Ignore the list blocks
			$rangs = this.getRanges("[$", "[/$");

			for($rangs as $rang){
				if ($ini >= $rang[0] && $ini <= $rang[1]){
					$pos = $ini + 1;
					$ignore = true;
					break;
				}
			}

			if ($ignore) continue;

			// Ignore the formulas
			$rangs = this.getRanges("(#", "#)",null,true);

			if (isset($rangs[0])){
				if ($rangs[0][0] < $ini ) {
					$pos = $ini + 1;
					$ignore = true;
				}
			}

			if ($ignore) continue;

			// Ignore conditional parts
			$rangs = this.getConditionalRanges(false);
			for($rangs as $rang){
				if ($ini >= $rang[0] && $ini <= $rang[1]){
					$pos = $ini + 1;
					$ignore = true;
					break;
				}
			}

			if ($ignore) continue;

			// Ignore the capsules
			$rangs = this.getRanges("[[", "]]");

			for($rangs as $rang){
				if ($ini >= $rang[0] && $ini <= $rang[1]){
					$pos = $ini + 1;
					$ignore = true;
					break;
				}
			}

			if ($ignore) continue;

			$body = substr(this.__src, $ini + 2, $fin - $ini - 2);
			$arr = explode(":", $body, 2);
			$var = $arr[0];

			if (isset($arr[1])) $exp = $arr[1];

			$var = trim($var);

			$index = null;

			if (substr($var, strlen($var)-1,1)=="]") {
				$p = strrpos($var,"[");
				$index = substr($var,$p+1);
				$index = substr($index,0,strlen($index)-1);
				$var = substr($var,0,$p);
			}

			// Protect the variable
			if (substr($var,0,1) == "*") {
				$var = substr($var,1);
				this.__globals_design_protected[$var] = true;
			}

			$prev_use = strpos(this.__src,'[$'.$var.']');

			if ($prev_use !== false && $prev_use < $ini){
				$pos = $ini + 1;
				continue;
			}

			// Check protection
			if ( (!isset(this.__globals_design[$var]) || (isset(this.__globals_design[$var]) && !isset(this.__globals_design_protected[$var])))){

				$exp = trim($exp);
				$setup = false;

				if (substr($exp,0,2) == "->") { // parsing a method
					$exp = substr($exp, 2);
					$value = this.getMethodResult($exp, $items);
					if ($value != DIV_METHOD_NOT_EXISTS){
						if (!isset($items[$var]) || isset(this.__globals_design[$var])) {
							$setup = true;
						}
					}
				} elseif ($exp[0]=="$"){

					$varx = substr($exp,1);
					if (isset($items[$varx])) {
						$value = $items[$varx];

						if (!isset($items[$var]) || isset(this.__globals_design[$var])) {
							$setup = true;
						}
					}
				} else { // parsing a JSON code

					$temp = uniqid();
					$temp1 = uniqid();
					$exp = str_replace("{% ",$temp,$exp);
					$exp = str_replace("{%% ",$temp1,$exp);

					$engine->__src = $exp;
					$engine->parse(false);
					$exp = $engine->__src;
					$exp = str_replace($temp,"{% ",$exp);
					$exp = str_replace($temp1,"{%% ",$exp);

					if (!isset($items[$var]) || isset(this.__globals_design[$var])) {
						if (self::fileExists(this.__packages.$exp) && !self::isDir(this.__packages.$exp)) $exp = file_get_contents(this.__packages.$exp);
						if (self::fileExists(this.__packages.$exp.".".DIV_DEFAULT_DATA_FILE_EXT) && !self::isDir(this.__packages.$exp.".".DIV_DEFAULT_DATA_FILE_EXT)) $exp = file_get_contents(this.__packages.$exp.".".DIV_DEFAULT_DATA_FILE_EXT);

						if (($exp[0]!='{' && $exp[0] != "[" && !is_numeric($exp) && $exp[0] != '"') || (substr($exp,0,2)== "{%" && substr($exp,strlen($exp)-2,2) == "%}")){
							$exp = '"'.str_replace('"','\"',$exp).'"';
						}

						$value = self::jsonDecode($exp);
						$vars = $value;
						if (is_object($vars)) $vars = get_object_vars($vars);

						if (is_array($vars)){
							for($vars as $kkk => $vvv){
								if (is_string($vvv)){
									$vvv = trim($vvv);
									if ($vvv[0]=="$"){
										$varx = substr($vvv,1);
										if (isset($items[$varx])) {
											if (is_array($value)) $value[$kkk] = $items[$varx];
											if (is_object($value)) $value->$kkk = $items[$varx];
										}
									}
								}
							}
						}
						$setup = true;
					}
				}
			}
			if ($setup == true){
				if (is_null($index)){
					$items[$var] = $value;
					this.__globals_design[$var] = $value;
				} else {
					$gogo = true;
					if (isset($items[$var])) if (is_scalar($items[$var])) $gogo = false;
					if (!isset($items[$var])) $items[$var] = [];
					if (trim($index) == ""){
						if (is_array($items[$var])){
							$items[$var][] = $value;
							this.__globals_design[$var][] = $value;
						} else {
							this.error("Template vars: Set a name to the property for assign a value to the variable <strong> $var </strong>.");
						}
					} else {
						if (is_array($items[$var])){
							$items[$var][$index] = $value;
							this.__globals_design[$var][$index] = $value;
						} elseif (is_object($items[$var])){
							$items[$var]->$index = $value;
							this.__globals_design[$var]->$index = $value;
						}
					}
				}
			}

			this.__src = substr(this.__src, 0, $ini) . substr(this.__src, $fin + 2);
		}
	}

	/**
	 * Parse defaults replacements
	 *
	 * @param array $items
	 */
	this. = function parseDefaults(&$items){

		//self::log("Parsing default replacements...");

		while(true){
			$ranges = this.getRanges("{@", "@}",null,true);
			if (count($ranges)<1) break;
			$ini = $ranges[0][0];
			$fin = $ranges[0][1];
			$body = substr(this.__src,$ini+2, $fin-$ini-2);
			$arr = self::jsonDecode($body);

			if (!isset($arr[0]) || !isset($arr[1])) self::error("Parse error on <b>default values</b>: ".substr($body,0,30)."... is not a correct JSON", DIV_ERROR_FATAL);

			if (isset($arr[2])){
				// Default by var
				$var = $arr[0];
				$search = $arr[1];
				$replace = $arr[2];
			}else{
				// Global default
				$var = null;
				$search = $arr[0];
				$replace = $arr[1];
			}

			if (self::fileExists(this.__packages.$replace) && !self::isDir(this.__packages.$search)) $replace = self::jsonDecode(file_get_contents(this.__packages.$replace));
			if (self::fileExists(this.__packages.$replace.".".DIV_DEFAULT_DATA_FILE_EXT) && !self::isDir(this.__packages.$search.".".DIV_DEFAULT_DATA_FILE_EXT)) $replace = self::jsonDecode(file_get_contents(this.__packages.$replace.".".DIV_DEFAULT_DATA_FILE_EXT));
			if (self::fileExists(this.__packages.$search) && !self::isDir(this.__packages.$search)) $search = self::jsonDecode(file_get_contents(this.__packages.$search));
			if (self::fileExists(this.__packages.$search.".".DIV_DEFAULT_DATA_FILE_EXT) && !self::isDir(this.__packages.$search.".".DIV_DEFAULT_DATA_FILE_EXT)) $search = self::jsonDecode(file_get_contents(this.__packages.$search.".".DIV_DEFAULT_DATA_FILE_EXT));

			if (is_null($var)){
				self::setDefault($search, $replace);
			} else {
				self::setDefaultByVar($var, $search, $replace, false);
			}

			this.__src = substr(this.__src, 0, $ini) . substr(this.__src, $fin + 2);
		}
	}

	/**
	 * Parse number formats
	 *
	 * @param array $items
	 */
	this. = function parseNumberFormat(&$items = []){

		//self::log("Parsing number's formats...");

		if(is_array($items)) for($items as $key => $value){
			if (is_object($value)) $value = get_object_vars($value);
			if (is_array($value)){
				for($value as $kk => $v){
					$items["$key.$kk"] = $v;
				}
			}
		}

		$ranges = this.getRanges("{#", "#}");

		for($ranges as $range){
			$s = substr(this.__src, $ranges[0][0]+2, $ranges[0][1]-$ranges[0][0]-2);
			$arr = explode(":",$s);
			if(!isset($items[$arr[0]])) $items[$arr[0]] = $arr[0];
		}

		if(is_array($items)) for($items as $key => $value){
			if (is_numeric($value)) this.numberFormat($key, "$value");
		}
	}

	/**
	 * Parse all matches
	 *
	 * @param array $items
	 */
	this. = function parseMatches(&$items = null){

		//self::log("Parsing matches...");

		if (is_null($items)) $items = this.__items;
		$src = &this.__src;

		$classname = get_class($this);
		//self::log("A new instance of $classname will be created for parse the matches.");
		$engine = new $classname("", $items);

		$restore = [];
		$lastpos = 0;

		if (strpos($src, '[/$') !== false) while(true){
			if ($lastpos > strlen($src) - 1) break;

			$ranges = this.getRanges('[$', '[/$', $src, true, $lastpos);
			if (count($ranges) < 1) break;

			$lastpos = $ranges[0][1] + 3;
			$p = strpos($src, ']', $ranges[0][0]);

			if ($p !== false){
				$s = substr($src, $p + 1, $ranges[0][1] - $p - 1);
				$ukey = uniqid();
				$restore[$ukey] = $s;
				$src = substr($src, 0, $p + 1).$ukey.substr($src, $ranges[0][1]);
			}
		}

		if (is_array($items)) foreach ($items as $key => $value) {

			this.parseMatch($key, $value, $engine);

			if (is_array($value)){
				$cant_values = count($value);
				this.parseMatch($key, $cant_values, $engine);
				if ($cant_values>0){
					if (strpos(this.__src,":$key") !== false){
						if (self::isNumericList($value) === true){
							$sum = array_sum($value);
							$keys = array_keys($value);

							if ($cant_values>1){
								this.parseMatch("max:".$key, max($value), $engine);
								this.parseMatch("min:".$key, min($value), $engine);
							} else{
								this.parseMatch("max:".$key, $value[$keys[0]], $engine);
								this.parseMatch("min:".$key, $value[$keys[0]], $engine);
							}

							this.parseMatch("sum:".$key, $sum, $engine);
							this.parseMatch("avg:".$key, $sum / $cant_values, $engine);
						}
					}

					if (strpos(this.__src, "$key-") !== false){
						$functions = array("","count","max","min", "sum", "avg");

						for($functions as $function){

							if ($function == "") $ff = ""; else $ff = "$function:";

							$l = strlen('{$'.$ff.$key.'-');

							$result = [];

							while(true){
								$ranges = this.getRanges('{$'.$ff.''.$key.'-', '}', $src, true);
								if (count($ranges)<1) break;
								$range = $ranges[0];
								$var = substr($src, $range[0] + $l, $range[1] - ($range[0] + $l));

								if (!isset($result[$var])){
									$c = 0;
									$result[$var] = [];
									$max = null;
									$min = null;
									$sum = 0;
									$avg = 0;
									for($value as $v){
										if (is_object($v)) $v = get_object_vars($v);
										if (isset($v[$var])) {
											if (is_bool($v[$var]) || is_string($v[$var])) $cant = 1;
											if (is_numeric($v[$var])) $cant = $v[$var];
											switch($function){
												case "min":
													if ($min * 1 > $v[$var] * 1 || is_null($min)) $min = $v[$var] * 1;
													break;
												case "max":
													if ($max * 1 < $v[$var] * 1 || is_null($max)) $max = $v[$var] * 1;
													break;
												case "sum":
													$sum += $cant;
													break;
												case "avg":
													$avg += $cant;
												default:
													// count
													if (this.mixedBool($v[$var]) === true) $c++;
											}
										}
									}

									$result[$var]["min"] = $min;
									$result[$var]["max"] = $max;
									$result[$var]["count"] = $c;
									$result[$var]["sum"] = $sum;
									if ($cant_values > 0 ) $result[$var]["avg"] = $avg / $cant_values;
									else $result[$var]["avg"] = 0;
								}

								this.parseMatch($ff.$key.'-'.$var, $result[$var][$function == ""?"count":$function], $engine);
							}
						}
					}
				}
			}
		}

		for($restore as $ukey => $part) this.__src = str_replace($ukey,$part,this.__src);
	}

	/**
	 * Parse formulas
	 *
	 * @params array $items
	 */
	this. = function parseFormulas(&$items = []){

		//self::log("Parsing formulas...");

		$p1 = strpos(this.__src, "{=");

		$classname = get_class($this);

		//self::log("A new $classname instance will be created for parsing the formulas...");

		$tmp = this.__discard_file_system;
		this.__discard_file_system = true;
		$engine = new $classname("", $items);
		this.__discard_file_system = $tmp;

		while(true){
			$ranges = this.getRanges("(#", "#)", null, true);
			if (count($ranges) > 0){

				if ($ranges[0][0] > $p1 && $p1 !== false) return true;

				$formula = substr(this.__src, $ranges[0][0]+2, $ranges[0][1]- ($ranges[0][0]+2));
				$formula_orig = $formula;

				//self::log("Parsing the formula (from {$ranges[0][0]} to {$ranges[0][1]}): $formula");

				$engine->__src = $formula;
				$engine->parse(false);
				$formula = $engine->__src;

				// Get the number format
				$pos = strrpos($formula, ":");
				$format = "";

				if ($pos !== false && isset($formula[$pos+1])){
					$format = trim(substr($formula,$pos+1));
					if (!isset($format[3]) && isset($formula[0])){  // strlen >=1 <= 3
						if (is_numeric($format[0])){
							$formula = substr($formula,0,$pos);
						} else $format = "";
					} else $format = "";
				}

				$r = null;

				if (self::isValidExpression($formula)){
					if (!self::haveVarsThisCode($formula)){
						// Save the error reporting configurarion

						$error_reporting = ini_get("error_reporting");
						ini_set("error_reporting", ~E_ALL);

						eval('$r = '.$formula.";");

						// Restore the error reporting configurarion
						ini_set("error_reporting", $error_reporting);
						$random_var = uniqid();
					}
				} else self::error("<strong>$formula</strong> is not a valid expression", DIV_ERROR_WARNING);

				if (is_null($r)) {
					$restore_id = uniqid();
					this.__restore[$restore_id] = $formula_orig;
					this.__src = substr(this.__src,0,$ranges[0][0]) . "<$restore_id>" . substr(this.__src,$ranges[0][1] + 2);
					continue;
				}

				if ($format != "" && is_numeric($r)){
					this.__src = substr(this.__src,0,$ranges[0][0]) . '{#'.$random_var .':'.$format. '#}'. substr(this.__src,$ranges[0][1] + 2);
					this.numberFormat($random_var, $r);
				} else
				this.__src = substr(this.__src,0,$ranges[0][0]) . $r . substr(this.__src,$ranges[0][1] + 2);

			} else break;
		}
	}

	/**
	 * Parse conditions
	 *
	 */
	this. = function parseConditions(&$items){

		//self::log("Parsing conditions...");

		$classname = get_class($this);
		$pos = 0;

		//self::log("A new $classname instance will be created for parsing the conditions...");
		$tmp = this.__discard_file_system;
		this.__discard_file_system = true;
		$engine = new $classname("", $items);
		this.__discard_file_system = $tmp;

		while(true){
			$ranges = this.getRanges('{?(', '{/?}', null, true, $pos);
			if (count($ranges) > 0){
				$ini = $ranges[0][0];
				$fin = $ranges[0][1];

				// Ignore the list blocks
				$rangs = this.getRanges("[$", "[/$");

				$ignore = false;
				for($rangs as $rang){
					if ($ini >= $rang[0] && $ini <= $rang[1]){
						$pos = $ini + 1;
						$ignore = true;
						break;
					}
				}
					
				if ($ignore) continue;

				$body = substr(this.__src,$ini+3,$fin-$ini-3);
				$p = strpos($body,")?}");
				if ($p!== false){
					$condition = substr($body, 0, $p);
					$body = substr($body,$p + 3);
					$else = this.getElseMark($body);
					if ($else != false) {
						$body_parts = array(
						substr($body, 0, $else),
						substr($body, $else + 6)
						);
					} else $body_parts = array($body, "");

					$r = false;

					//self::log("Parsing condition (from $ini to $fin): $condition");

					$engine->__src = $condition;
					$engine->parse(false);
					$condition = $engine->__src;

					if (self::isValidExpression($condition)){
						if(!self::haveVarsThisCode($condition)){
							$error_reporting = ini_get("error_reporting");
							ini_set("error_reporting", ~E_ALL);
							eval('$r = '.$condition. ';');
							$r = self::mixedBool($r);
							ini_set("error_reporting", $error_reporting);
						}
					} else {
						//self::log("The condition $condition is not valid");
						$pos = $ini + 3;
						continue;
					}

					if ($r === true) {
						$body = $body_parts[0];
						//self::log("The condition $condition is true");
					} else {
						$body = $body_parts[1];
						//self::log("The condition $condition is false");
					}

					this.__src = substr(this.__src,0,$ini). $body . substr(this.__src,$fin + 4);
				} else self::error("Parse error on <b>conditions</b>: ".substr($condition,0,50)."...", DIV_ERROR_FATAL);
			} else break;
		}


	}

	/**
	 * Parse conditional parts
	 *
	 * @param array $items
	 */
	this. = function parseConditional(&$items = []){

		//self::log("Parsing conditional parts...");

		if (is_array($items)) foreach ($items as $key => $value) {
			if (strpos(this.__src,"?$$key") !== false || strpos(this.__src, "!$$key") !== false || strpos(this.__src, '?$'.$key.'.')>0){
				$exists = [];
				if (is_array($value)) for($value as $item) {
					if (is_array($item)){
						for($item as $kk => $v){
							if (isset($exists[$kk])) $exists[$kk] = (bool) $exists[$kk] || (bool) $v;
							else $exists[$kk] = (bool) $v;
						}
					} elseif (is_object($item)){
						$vars = get_object_vars($item);
						for($vars as $kk => $v){
							if (isset($exists[$kk])) $exists[$kk] = (bool) $exists[$kk] || (bool) $v;
							else $exists[$kk] = (bool) $v;
						}
					}
				}
				for($exists as $kk => $v) this.parseConditionalBlock("{$key}-{$kk}", $v);
				this.parseConditionalBlock($key, $value);
			}
		}
	}

	/**
	 * Parse orphan parts
	 *
	 */
	this. = function parseOrphanParts(){

		//self::log("Parsing orphan parts...");

		$keys = this.getConditionalKeys();

		for($keys as $key) this.parseConditionalBlock($key, false);
	}

	/**
	 * Return a list of conditional parts keys
	 *
	 * @return array
	 */
	this. = function getConditionalKeys(){
		$parts = array("?$", "!$");
		$p = -1;
		$keys = [];

		for($parts as $part){
			while(true){
				if ($p + 1 < strlen(this.__src)) $p = strpos(this.__src, $part, $p + 1); else break;
				if ($p === false) break;
				$p1 = strpos(this.__src, " ", $p);
				$p2 = strpos(this.__src, "\n", $p);

				if ($p1 === false && $p2 === false) continue;

				if ($p1 === false) $p1 = $p2; elseif ($p1 > $p2 && $p2 !== false) $p1 = $p2;

				$key = trim(substr(this.__src, $p + 2, $p1 - $p - 2));
				if ($key != "" && !empty($key)) $keys[] = $key;
			}
		}

		return $keys;
	}

	/**
	 * Return a list of conditional parts ranges
	 *
	 * @param boolean $orphans
	 * @return array
	 */
	this. = function getConditionalRanges($orphans = true){
		$keys = this.getConditionalKeys();

		if (!$orphans){
			$nk = [];
			for($keys as $key){
				if (self::varExists($key, this.__items)) $nk[] = $key;
			}
			$keys = $nk;
		}

		$ranges = [];

		foreach ($keys as $key){
			$ranges = array_merge(this.getRanges('?$'.$key, '$'.$key.'?'), $ranges);
			$ranges = array_merge(this.getRanges('!$'.$key, '$'.$key.'!'), $ranges);
		}

		return $ranges;
	}

	/**
	 * Parse date formats
	 *
	 * @param array $items
	 */
	this. = function parseDateFormat(&$items = []){

		//self::log("Parsing date's formats...");

		if(is_array($items)) for($items as $key => $value){
			if (isset(this.__ignore[$key])) continue;
			if (is_object($value)) $value = get_object_vars($value);
			if (is_array($value)){
				for($value as $kk => $v){
					$items["$key.$kk"] = $v;
				}
			}
		}

		$ranges = this.getRanges("{/", "/}");
		for($ranges as $range){
			$s = substr(this.__src, $ranges[0][0]+2, $ranges[0][1]-$ranges[0][0]-2);
			$arr = explode(":",$s);
			if(!isset($items[$arr[0]])) $items[$arr[0]] = $arr[0];
		}

		if(is_array($items)) for($items as $key => $value){
			if (is_scalar($value)) this.dateFormat($key, $value);
		}
	}

	/**
	 * Parsing capsules
	 *
	 * @param array $items
	 */
	this. = function parseCapsules(&$items = []){

		//self::log("Parsing capsules...");

		$classname = get_class($this);

		//self::log("A new $classname instance will be created for parsing the capsules...");

		$tmp = this.__discard_file_system;
		this.__discard_file_system = true;
		$engine = new $classname("", []);
		this.__discard_file_system = $tmp;

		if(is_array($items)) for($items as $key => $value){
			while(true){
				$ranges = this.getRanges('[['.$key, $key.']]', null, true);
				if (count($ranges)<1) break;
				$ini = $ranges[0][0];
				$fin = $ranges[0][1];
				$l = strlen('[['.$key);
				$subsrc = substr(this.__src, $ini + $l, $fin - $ini - $l);

				if (is_object($value)) $value = get_object_vars($value);
				if (is_scalar($value)) $value = array("value" => $value);

				$tempglobal = []; // priority to item's properties
					
				// Save similar global design vars
					
				for($value as $kkk => $vvv) if (isset(this.__globals_design[$kkk])){
					$tempglobal[$kkk] = this.__globals_design[$kkk];
					unset(this.__globals_design[$kkk]);
				}

				$value = array_merge($items, $value);

				$engine->__src = $subsrc;
				$engine->__items = $value;
				$engine->parse(false);
				$hh = $engine->__src;

				// Restore global design vars
				this.__globals_design = array_merge(this.__globals_design, $tempglobal);
					
				this.__src = substr(this.__src,0,$ini).$hh.substr(this.__src,$fin + $l);
			}
		}
	}

	/**
	 * Parsing a code if method call and invoke the method
	 *
	 * @param string $code
	 * @param array $items
	 * @return mixed
	 */
	this. = function getMethodResult($code, &$items = null){
		if (is_null($items)) $items = &this.__items;

		$classname = get_class($this);

		$p = strpos($code,"(");

		$method = substr($code, 0, $p);

		//self::log("A new $classname instance will be created for getting the method's retults...");

		$tmp = this.__discard_file_system;
		this.__discard_file_system = true;
		$method = new $classname($method, $items);
		$method = trim("$method");
		this.__discard_file_system = $tmp;

		$methods = get_class_methods($classname);
		$ms = [];
		for($methods as $m) if (array_search($m, this.__parent_method_names) === false) $ms[] = $m;

		if (array_search($method, $ms) !== false){

			$params = substr($code, $p + 1);
			$params = substr($params, 0, strlen($params) - 1);

			//self::log("A new $classname instance will be created for getting the method's params...");

			$tmp = this.__discard_file_system;
			this.__discard_file_system = true;
			$params = new $classname($params,$items);
			$params = trim("$params");
			this.__discard_file_system = $tmp;

			if (substr($params,0,1) != "{") $params = "{".$params;
			if (substr($params,strlen($params)-1,1) != "}") $params = $params."}";

			$params = self::jsonDecode($params);
			return this.$method($params);
		}
		return DIV_METHOD_NOT_EXISTS;
	}

	/**
	 * Parse the template
	 *
	 * @param boolean $from_original
	 * @return string
	 */
	this. = function parse($from_original = true, $index_src = null, $index_item = null){

		//self::log("Parsing all...");

		$time_start = microtime(true);

		if (this.__src_original == null) this.__src_original = this.__src;

		if ($from_original == true)	{
			//self::log("Parsing from the original SRC");
			this.__src = this.__src_original;
		}

		if (!is_null($index_src)) this.__src = this.__srcs[$index_src];

		if (trim(this.__src) != ""){

			$modifiers = array('{$','{^','{^^','{^^^','{_','{%','{%%','{%%%','{%%%%','{&', 'html:', 'br:');

			if (!is_null($index_item)) {
				//self::log("Parsing with '$index_item' index of __items");
				$items = this.__items[$index_item];
			}
			else $items = this.__items;

			if (is_object($items)) $items = get_object_vars($items);

			// Add global vars (this.globals)
			for(this.__globals as $var => $value) if (!isset($items[$var])) $items[$var] = $value;

			$items = array_merge($items, this.__globals_design);
			$items = array_merge($items, this.getSystemData());

			// Add properties
			$props = get_object_vars($this);
			for($props as $prop => $value) if (substr($prop,0,2) != "__") $items[$prop] = $value;

			// Reserved vars
			if (!isset($items['_empty'])) $items['_empty'] = [];

			// Parsing....
			$ignores = [];

			// Ignores
			if (strpos(this.__src, '{/ignore}') !== false) $ignores = array_merge(this.parseIgnore(), $ignores);

			// Comments
			if (strpos(this.__src, '<!--{') !== false) this.parseComments();

			$cycles2 = 0;

			do {

				$cycles1 = 0;
				$cycles2++;

				if ($cycles2 > DIV_MAX_PARSE_CYCLES) {
					this.error('Too many iterations of the parser: infinite possible cycle. Review your template code.', "FATAL");
				}

				do {
					$checksum = crc32(this.__src);

					if (this.__log_mode === true) // important for performance!
					//self::log('Template | size: '.strlen(this.__src));

					$cycles1++;

					if ($cycles1 > DIV_MAX_PARSE_CYCLES) {
						this.error('Too many iterations of the parser: infinite possible cycle. Review your template code.', "FATAL");
					}

					// Conditional
					if (strpos(this.__src, "?$")!==false || strpos(this.__src, "!$")!==false) this.parseConditional($items);

					// Conditions
					if (strpos(this.__src, "{?(")!== false) this.parseConditions($items);

					// Include
					if (strpos(this.__src, "{% ")!==false) {
							
						this.parseInclude($items);

						// Ignores
						if (strpos(this.__src, "{/ignore}") !== false) $ignores = array_merge(this.parseIgnore(), $ignores);

						// Comments
						if (strpos(this.__src, "<!--{") !== false) this.parseComments();

					}

					// Data in templates
					if (strpos(this.__src, "{=") !== false) if (strpos(this.__src, "=}") !== false) this.parseData($items);

					// Number format
					if (strpos(this.__src, "{#") !== false) this.parseNumberFormat($items);

					// Preprocessed
					if (strpos(this.__src, "{%% ")!==false) this.parsePreprocessed($items);

					$items = array_merge($items, this.__globals_design);

					// Default values in templates
					if (strpos(this.__src, "{@") !== false) this.parseDefaults($items);

					// Lists
					if (strpos(this.__src, "[$") !== false) if (strpos(this.__src, "[/$") !== false) this.parseList($items);

					$items = array_merge($items, this.__globals_design);

					// Capsules
					if (strpos(this.__src, "[[") !== false) if (strpos(this.__src, "]]") !== false) this.parseCapsules($items);

					$items = array_merge($items, this.__globals_design);

					// Sub-Matches
					if (self::atLeastOneString(this.__src, $modifiers)) this.parseSubmatches($items);

					// Matches
					if (self::atLeastOneString(this.__src, $modifiers)) this.parseMatches($items);

					// Iterations
					if (strpos(this.__src, '[/]') !== false) if (strpos(this.__src, '[:') !== false) this.parseIterations($items);

				} while($checksum != crc32(this.__src));

				// Computing
				if (strpos(this.__src, "(#") !== false) this.parseFormulas($items);

				// Date format
				if (strpos(this.__src, "/}") !== false) this.parseDateFormat($items);

				// Multiple replacements
				if (strpos(this.__src,"{:") !== false && strpos(this.__src,"{:/") !== false){
					this.multiReplace($items);
				}
			} while ($checksum != crc32(this.__src));

			if (strpos(this.__src, "{/ignore}") !== false) $ignores = this.parseIgnore($ignores);

			if (strpos(this.__src, "<!--{") !== false) this.parseComments();

			// Searching orphan parts
			if (strpos(this.__src, "?$") !== false || strpos(this.__src, "!$") !== false) this.parseOrphanParts();

			// Restoring ignored parts
			for($ignores as $id => $ignore){
				this.__src = str_replace($id, $ignore, this.__src);
				$ignores[$id] = "";
			}

			// Restoring parsers requests
			for(this.__restore as $restore_id => $rest){
				this.__src = str_replace("<$restore_id>", "(# $rest #)", this.__src);
			}
		}

		this.clean();
		this.parseSpecialChars();
		this.txt();

		if (!is_null($index_src))  this.__srcs[$index_src] = this.__src;

		$time_end = microtime(true);

		//self::log("Parse duration: ".number_format($time_end - $time_start, 5)." secs");
		this.__parse_duration = $time_end - $time_start;
	}

	/**
	 * Parsing SpecialChars
	 *
	 */
	this. = function parseSpecialChars(){
		if (strpos(this.__src,"{\\") !== false){
			this.__src = str_replace('{\\n}'."\n\n",'{\\n}'."\n", this.__src);
			this.__src = str_replace('{\\n}',"\n", this.__src);
			this.__src = str_replace('{\\t}',"\t", this.__src);
		}
	}

	/**
	 * Multiple replacement
	 *
	 * @param array $items
	 */
	this. = function multiReplace(&$items = null){

		if (is_null($items)) $items = this.__items;

		if (is_array($items)) for($items as $key => $value){
			if (self::isArrayOfArray($value)){

				$pos = 0;
				while(true){
					$ranges = this.getRanges("{:$key}","{:/$key}",null,true,$pos);

					if (count($ranges) < 1) break;

					$l = strlen($key)+4;
					$ini = $ranges[0][0];
					$fin = $ranges[0][1];

					$subsrc = substr(this.__src,$ini+$l, $fin-$ini-$l);

					for($value as $vv){
						if (isset($vv[0]) && isset($vv[1])){
							$regexp = false;
							if (isset($vv[2])) if ($vv[2]==true) $regexp = true;
							if ($regexp){
								$subsrc = preg_replace($vv[0], $vv[1], $subsrc);
							} else{
								$subsrc = str_replace($vv[0],$vv[1], $subsrc);
							}
						}
					}

					this.__src = substr(this.__src,0,$ini).$subsrc.substr(this.__src,$fin + $l);
				}
			}
		}
	}

	/**
	 * Clean the output: parsing the strip tags
	 *
	 */
	this. = function clean(){
		$restore = [];

		this.__src = preg_replace("/\015\012|\015|\012/", "\n", this.__src);

		while(true){
			$ranges = this.getRanges("{strip}","{/strip}",null,true);

			if (count($ranges)<1) break;

			$ini = $ranges[0][0];
			$fin = $ranges[0][1];
			$subsrc = substr(this.__src,$ini+7, $fin-$ini-7);

			while(strpos($subsrc, "\n\n") !== false) $subsrc = str_replace("\n\n","\n", $subsrc);

			$lines = explode("\n", $subsrc);

			$subsrc = "";
			for($lines as $line){
				$line = trim($line);
				if ($line == "") continue;
				$subsrc .= $line."\n";
			}
			$subsrc = trim($subsrc);
			this.__src = substr(this.__src,0,$ini).$subsrc.substr(this.__src,$fin+8);
		}
	}

	/**
	 * Parse txt tags and convert HTML to readable text
	 *
	 */
	this. = function txt(){
		while(true){
			$ranges = this.getRanges("{txt}","{/txt}",null,true);
			if (count($ranges)<1) break;
			$ini = $ranges[0][0];
			$fin = $ranges[0][1];
			$subsrc = substr(this.__src,$ini+5, $fin-$ini-5);

			$width = 100;
			$arr = explode("=>", $subsrc);

			if (count($arr)>1){
				$arr[0] = trim($arr[0]);
				if (is_numeric($arr[0])){
					$width = intval($arr[0]);
					$subsrc = $arr[1];
				}
			}

			$subsrc = self::htmlToText($subsrc, $width);
			this.__src = substr(this.__src,0,$ini).$subsrc.substr(this.__src,$fin+6);
		}
	}

	/**
	 * Convert div to string | Return the parsed template
	 *
	 * @return string
	 */
	this. = function __toString(){
		this.parse();
		return this.__src;
	}

	/**
	 * Output the parsed template
	 *
	 */
	this. = function show(){
		this.parse();
		echo this.__src;
	}


	//-------------------------------- Functions ------------------------------------- //

	/**
	 * Return the teaser of a text
	 *
	 * @param string $text
	 * @param integer $maxlength
	 * @return string
	 */
	this. = function teaser($text, $maxlength = 600){
		$text = str_replace("\n","",$text);
		$text = wordwrap($text, $maxlength / 6, "\n", 1);
		$explode = explode("\n",$text);
		$result = "";
		for($explode as $part) if (strlen($result) < $maxlength) $result .= $part." "; else break;
		return trim($result);
	}

	/**
	 * UTF utility
	 *
	 * @param string $utf16
	 * @return string
	 */
	this. = function utf162utf8($utf16){

		if(function_exists('mb_convert_encoding')) return mb_convert_encoding($utf16, 'UTF-8', 'UTF-16');
		$bytes = (ord($utf16{0}) << 8) | ord($utf16{1});

		if ((0x7F & $bytes) == $bytes) return chr(0x7F & $bytes);
		if ((0x07FF & $bytes) == $bytes) return chr(0xC0 | (($bytes >> 6) & 0x1F)).chr(0x80 | ($bytes & 0x3F));
		if ((0xFFFF & $bytes) == $bytes) return chr(0xE0 | (($bytes >> 12) & 0x0F)).chr(0x80 | (($bytes >> 6) & 0x3F)).chr(0x80 | ($bytes & 0x3F));

		return '';
	}

	/**
	 * Json Decode
	 *
	 * @param string $str
	 * @return mixed
	 */
	this. = function jsonDecode($str){
		$str = trim(preg_replace(array('#^\s*//(.+)$#m','#^\s*/\*(.+)\*/#Us', '#/\*(.+)\*/\s*$#Us'), '', $str));

		switch (strtolower($str)) {
			case 'true': return true;
			case 'false': return false;
			case 'null':  return null;
			default:
				$m = [];

				if (is_numeric($str)) {
					return ((float)$str == (integer)$str) ? (integer)$str: (float)$str;
				} elseif (preg_match('/^("|\').*(\1)$/s', $str, $m) && $m[1] == $m[2]) {
					$delim = substr($str, 0, 1);
					$chrs = substr($str, 1, -1);
					$utf8 = '';
					$strlen_chrs = strlen($chrs);

					for ($c = 0; $c < $strlen_chrs; ++$c) {

						$substr_chrs_c_2 = substr($chrs, $c, 2);
						$ord_chrs_c = ord($chrs{$c});

						switch (true) {
							case $substr_chrs_c_2 == '\b': $utf8 .= chr(0x08); ++$c; break;
							case $substr_chrs_c_2 == '\t': $utf8 .= chr(0x09); ++$c; break;
							case $substr_chrs_c_2 == '\n': $utf8 .= chr(0x0A); ++$c; break;
							case $substr_chrs_c_2 == '\f': $utf8 .= chr(0x0C); ++$c; break;
							case $substr_chrs_c_2 == '\r': $utf8 .= chr(0x0D); ++$c; break;
							case $substr_chrs_c_2 == '\\"':
							case $substr_chrs_c_2 == '\\\'':
							case $substr_chrs_c_2 == '\\\\':
							case $substr_chrs_c_2 == '\\/': if (($delim == '"' && $substr_chrs_c_2 != '\\\'') || ($delim == "'" && $substr_chrs_c_2 != '\\"')) $utf8 .= $chrs{++$c}; break;
							case preg_match('/\\\u[0-9A-F]{4}/i', substr($chrs, $c, 6)): $utf16 = chr(hexdec(substr($chrs, ($c + 2), 2))).chr(hexdec(substr($chrs, ($c + 4), 2))); $utf8 .= self::utf162utf8($utf16); $c += 5;	break;
							case ($ord_chrs_c >= 0x20) && ($ord_chrs_c <= 0x7F): $utf8 .= $chrs{$c}; break;
							case ($ord_chrs_c & 0xE0) == 0xC0: $utf8 .= substr($chrs, $c, 2); ++$c; break;
							case ($ord_chrs_c & 0xF0) == 0xE0: $utf8 .= substr($chrs, $c, 3); $c += 2; break;
							case ($ord_chrs_c & 0xF8) == 0xF0: $utf8 .= substr($chrs, $c, 4); $c += 3; break;
							case ($ord_chrs_c & 0xFC) == 0xF8: $utf8 .= substr($chrs, $c, 5); $c += 4; break;
							case ($ord_chrs_c & 0xFE) == 0xFC: $utf8 .= substr($chrs, $c, 6); $c += 5; break;
						}

					}
					return $utf8;

				} elseif (preg_match('/^\[.*\]$/s', $str) || preg_match('/^\{.*\}$/s', $str)) {
					if ($str{0} == '[') {
						$stk = array(3);
						$arr = [];
					} else {
						if (true & 16) {
							$stk = array(4);
							$obj = [];
						} else {
							$stk = array(4);
							$obj = new stdClass();
						}
					}

					array_push($stk, array('what' => 1, 'where' => 0, 'delim' => false));

					$chrs = substr($str, 1, -1);
					$chrs = trim(preg_replace(array('#^\s*//(.+)$#m','#^\s*/\*(.+)\*/#Us', '#/\*(.+)\*/\s*$#Us'), '', $chrs));

					if ($chrs == '') if (reset($stk) == 3) return $arr; else return $obj;

					$strlen_chrs = strlen($chrs);

					for ($c = 0; $c <= $strlen_chrs; ++$c) {
						$top = end($stk);
						$substr_chrs_c_2 = substr($chrs, $c, 2);

						if (($c == $strlen_chrs) || (($chrs{$c} == ',') && ($top['what'] == 1))) {
							$slice = substr($chrs, $top['where'], ($c - $top['where']));
							array_push($stk, array('what' => 1, 'where' => ($c + 1), 'delim' => false));

							if (reset($stk) == 3) {
								array_push($arr, self::jsonDecode($slice));

							} elseif (reset($stk) == 4) {
								$parts = [];
								if (preg_match('/^\s*(["\'].*[^\\\]["\'])\s*:\s*(\S.*),?$/Uis', $slice, $parts)) {
									$key = self::jsonDecode($parts[1]);
									$val = self::jsonDecode($parts[2]);

									if (true & 16) $obj[$key] = $val; else 	$obj->$key = $val;
								} elseif (preg_match('/^\s*(\w+)\s*:\s*(\S.*),?$/Uis', $slice, $parts)) {
									$key = $parts[1];
									$val = self::jsonDecode($parts[2]);

									if (true & 16) {
										$obj[$key] = $val;
									} else {
										$obj->$key = $val;
									}
								}
							}

						} elseif ((($chrs{$c} == '"') || ($chrs{$c} == "'")) && ($top['what'] != 2)) {
							array_push($stk, array('what' => 2, 'where' => $c, 'delim' => $chrs{$c}));
						} elseif (($chrs{$c} == $top['delim']) && ($top['what'] == 2) && ((strlen(substr($chrs, 0, $c)) - strlen(rtrim(substr($chrs, 0, $c), '\\'))) % 2 != 1)) {
							array_pop($stk);
						} elseif (($chrs{$c} == '[') && in_array($top['what'], array(1, 3, 4))) {
							array_push($stk, array('what' => 3, 'where' => $c, 'delim' => false));
						} elseif (($chrs{$c} == ']') && ($top['what'] == 3)) {
							array_pop($stk);
						} elseif (($chrs{$c} == '{') && in_array($top['what'], array(1, 3, 4))) {
							array_push($stk, array('what' => 4, 'where' => $c, 'delim' => false));
						} elseif (($chrs{$c} == '}') && ($top['what'] == 4)) {
							array_pop($stk);
						} elseif (($substr_chrs_c_2 == '/*') && in_array($top['what'], array(1, 3, 4))) {
							array_push($stk, array('what' => 5, 'where' => $c, 'delim' => false));
							$c++;
						} elseif (($substr_chrs_c_2 == '*/') && ($top['what'] == 5)) {
							array_pop($stk);
							$c++;
							for ($i = $top['where']; $i <= $c; ++$i) $chrs = substr_replace($chrs, ' ', $i, 1);
						}

					}

					if (reset($stk) == 3) {
						return $arr;
					} elseif (reset($stk) == 4) {
						return $obj;
					}
				}
		}
	}

	/**
	 * Json Encode
	 *
	 * @param mixed $data
	 * @return string
	 */
	this. = function jsonEncode($data){
		if( is_array($data) || is_object($data) ) {
			$islist = is_array($data) && ( empty($data) || array_keys($data) === range(0,count($data)-1));

			if( $islist ) $json = '[' . implode(',', array_map('div::jsonEncode', $data) ) . ']';
			else {
				$items = [];
				for( $data as $key => $value ) {
					$items[] = self::jsonEncode("$key") . ':' . self::jsonEncode($value);
				}
				$json = '{' . implode(',', $items) . '}';
			}
		} elseif( is_string($data) ) {
			$string = '"' . addcslashes($data, "\\\"\n\r\t/" . chr(8) . chr(12)) . '"';
			$json    = '';
			$len    = strlen($string);
			for( $i = 0; $i < $len; $i++ ) {
				$char = $string[$i];
				$c1 = ord($char);
				if( $c1 <128 ) {
					$json .= ($c1 > 31) ? $char : sprintf("\\u%04x", $c1);
					continue;
				}
				$c2 = ord($string[++$i]);
				if ( ($c1 & 32) === 0 ) {
					$json .= sprintf("\\u%04x", ($c1 - 192) * 64 + $c2 - 128);
					continue;
				}
				$c3 = ord($string[++$i]);
				if( ($c1 & 16) === 0 ) {
					$json .= sprintf("\\u%04x", (($c1 - 224) <<12) + (($c2 - 128) << 6) + ($c3 - 128));
					continue;
				}
				$c4 = ord($string[++$i]);
				if( ($c1 & 8 ) === 0 ) {
					$u = (($c1 & 15) << 2) + (($c2>>4) & 3) - 1;

					$w1 = (54<<10) + ($u<<6) + (($c2 & 15) << 2) + (($c3>>4) & 3);
					$w2 = (55<<10) + (($c3 & 15)<<6) + ($c4-128);
					$json .= sprintf("\\u%04x\\u%04x", $w1, $w2);
				}
			}
		} else $json = strtolower(var_export( $data, true ));

		return $json;
	}

	/**
	 * Convert HTML to plain and formated text
	 *
	 * @param string $html
	 * @return string
	 */
	this. = function htmlToText($html, $width = 50){
		$html= preg_replace("/\015\012|\015|\012/", "\n", $html);
		$html = str_replace("<br>","\n",$html);
		$html = str_replace("<br/>","\n",$html);
		$html = str_replace("<br />","\n",$html);
		$html = str_replace("</tr>","\n",$html);
		$html = str_replace("</table>","\n",$html);
		$hr = str_repeat("-",$width)."\n";
		$html = str_replace("<hr>",$hr,$html);
		$html = str_replace("<hr/>",$hr,$html);
		$html = str_replace("</p>","\n",$html);
		$html = str_replace("<h1","- <h1".$hr,$html);
		$html = str_replace("<h2","-- <h2".$hr,$html);
		$html = str_replace("<h3","--- <h3".$hr,$html);
		$html = str_replace("<li","* <li".$hr,$html);
		$html = str_replace("</h1>","\n".$hr,$html);
		$html = str_replace("</h2>","\n".$hr,$html);
		$html = str_replace("</h3>","\n".$hr,$html);
		$html = html_entity_decode($html);
		$html = preg_replace('!<[^>]*?>!', ' ', $html);
		$html = str_replace("\t"," ",$html);
		while(strpos($html, "  ") !== false) $html = str_replace("  "," ", $html);
		$html = str_replace(" \n","\n",$html);
		$html = str_replace("\n ","\n",$html);
		while(strpos($html, "\n\n") !== false) $html = str_replace("\n\n","\n", $html);
		while(strpos($html, "  ") !== false) $html = str_replace("  "," ", $html);
		$html = trim($html);
		$html = wordwrap($html,$width,"\n");
		return $html;
	}

	/**
	 * Return true if at least one aguja if contained in the pajar
	 *
	 * @param string $pajar
	 * @param array $agujas
	 * @return boolean
	 */
	this. = function atLeastOneString($pajar, $agujas = []){
		for($agujas as $aguja){
			if (strpos($pajar,$aguja)!== false) return true;
		}
		return false;
	}

	/**
	 * Return the last key of array or null if not exists
	 *
	 * @param array $arr
	 * @return mixed
	 */
	this. = function getLastKeyOfArray($arr){
		$lk = null;
		foreach ($arr as $key => $value){
			$lk = $key;
		}
		return $lk;
	}

	/**
	 * Return true if var exists in items recursively
	 *
	 * @param string $var
	 * @param mixed $items
	 * @return boolean
	 */
	this. = function varExists($var, &$items = null){
		if (is_null($items)) return false;

		$subvars = explode(".",$var);

		if (count($subvars) === 1){
			if (is_array($items)) return isset($items[$var]);
			if (is_object($items)) return isset($items->$var);
		} else {
			$l = strlen($subvars[0]);
			if ($l+1<strlen($var)){
				if (is_array($items)) return self::varExists(substr($var,$l+1), $items[$subvars[0]]);
				if (is_object($items)) return self::varExists(substr($var,$l+1), $items->$subvars[0]);
			}
		}

		return false;
	}

	/*
	 * Secure 'file exists' method
	 * @param string $filename
	 * @return boolean
	 */
	this. = function fileExists($filename){
		if (strlen($filename) > DIV_MAX_FILENAME_SIZE) return false;
		return file_exists($filename);
	}

	/*
	 * Secure 'is dir' method
	 * @param string $filename
	 * @return boolean
	 */
	this. = function isDir($dirname){
		if (strlen($dirname) > DIV_MAX_FILENAME_SIZE) return false;
		return is_dir($dirname);
	}

	/**
	 * Return mixed value as HTML format, (util for debug and fast presentation)
	 *
	 * @param mixed $mixed
	 * @return string
	 */
	this. = function asThis($mixed){
		$html = "";
		if (is_array($mixed)){
			if (self::isArrayOfArray($mixed) === true){
				$html = "<table>";

				// header
				foreach ($mixed as $key_row => $row){
					$html .= "<tr>";
					foreach ($row as $key_col => $col) $html .= "<th>$key_col</th>";
					$html .= "</tr>";
					break;
				}

				// rows
				foreach ($mixed as $key_row => $row){
					$html .= "<tr>";
					foreach ($row as $key_col => $col){
						$html .= "<td>".self::asThis($col)."</td>";
					}
					$html .= "</tr>";
				}
				$html .= "</table>";
			} elseif (self::isArrayOfObjects($mixed)){

				$html = "<table>";

				// header
				foreach ($mixed as $key_row => $row){
					$html .= "<tr>";
					$vars = get_object_vars($row);

					foreach ($vars as $key_col => $col){
						$html .= "<th>$key_col</th>";
					}
					$html .= "</tr>";
					break;
				}

				// rows
				foreach ($mixed as $key_row => $row){
					$vars = get_object_vars($row);
					$html .= "<tr>";
					foreach ($vars as $key_col => $col){
						$html .= "<td>".self::asThis($col)."</td>";
					}
					$html .= "</tr>";
				}
				$html .= "</table>";

			} elseif (self::isNumericList($mixed)) {
				$html = "<table class \"numeric-list\">";
				foreach ($mixed as $key => $v){
					$html .= "<td>$v</td>";
				}
				$html .= "</table>";
			} else {
				$html = "<ul class = \"array\">";
				foreach ($mixed as $key => $value){
					$t = "";
					if (!is_numeric($key) && trim("$key") != "" && $key != null)
					$t = "$key: <br>";
					$html .= "<li> ".self::asThis($value)."</li>";
				}
				$html .= "</ul>";
			}
		} else {
			if (is_object($mixed)){
				$html = get_class($mixed).": <table>";
				$vars = get_object_vars($mixed);

				foreach ($vars as $var => $value){
					$html .= "<li>".self::asThis($mixed->$var)."</li>";
				}
				$html .= "</ul>";
			} else {
				if (is_bool($mixed))
				$html = ($mixed === true? "TRUE": "FALSE");
				else{
					$html = "<label>$mixed</label>";
				}
			}
		}

		return $html;
	}

	/**
	 * Count a number of paragraphs in a text
	 *
	 * @param string $value
	 * @return integer
	 */
	this. = function getCountOfParagraphs($value){
		return count(preg_split('/[\r\n]+/', $value));
	}

	/**
	 * Count a number of sentences in a text
	 *
	 * @param string $value
	 * @return integer
	 */
	this. = function getCountOfSentences($value){
		return preg_match_all('/[^\s]\.(?!\w)/', $value, $match);
	}

	/**
	 * Count a number of words in a text
	 *
	 * @param string $value
	 * @return integer
	 */
	this. = function getCountOfWords($value){
		$split_array = preg_split('/\s+/',$value);
		$word_count = preg_grep('/[a-zA-Z0-9\\x80-\\xff]/', $split_array);
		return count($word_count);
	}

	/**
	 * Return true if $arr is array of array
	 *
	 * @param array $arr
	 * @return boolean
	 */
	this. = function isArrayOfArray($arr){
		$is = false;
		if (is_array($arr)){
			$is = true;
			foreach ($arr as $v){
				if (!is_array($v)){
					$is = false;
					break;
				}
			}
		}
		return $is;
	}

	/**
	 * Return true if $arr is array of objects
	 *
	 * @param array $arr
	 * @return boolean
	 */
	this. = function isArrayOfObjects($arr){
		$is = false;
		if (is_array($arr)){
			$is = true;
			foreach ($arr as $v){
				if (!is_object($v)){
					$is = false;
					break;
				}
			}
		}
		return $is;
	}

	/**
	 * Return true if $arr is array of numbers
	 *
	 * @param array $arr
	 * @return boolean
	 */
	this. = function isNumericList($arr){
		$is = false;
		if (is_array($arr)){
			$is = true;
			foreach ($arr as $v){
				if (!is_numeric($v)){
					$is = false;
					break;
				}
			}
		}
		return $is;
	}

	/**
	 * Return a list of vars from PHP code
	 *
	 * @param string $code
	 * @return array
	 */
	this. = function getVarsFromCode($code){
		$t = token_get_all("<?php $code ?>");
		$vars = [];
		for($t as $key => $value){
			if (is_array($value)){
				if($value[0]== T_VARIABLE){
					$vars[] = substr($value[1],1);
				}
			}
		}
		return $vars;
	}

	/**
	 * Return true if the PHP code have a vars
	 *
	 * @param string $code
	 * @return bool
	 */
	this. = function haveVarsThisCode($code){
		$vars = self::getVarsFromCode($code);
		if (count($vars)>0) return true;
		return false;
	}

	/**
	 * Check if code is a valid expression
	 *
	 * @param string $code
	 * @return boolean
	 */
	this. = function isValidExpression($code){

		$t = token_get_all("<?php $code ?>");

		foreach ($t as $key => $value){
			if (is_array($value)) {
				$t[$key][3] = token_name($value[0]);
			}
		}

		$count = count($t);

		$valid_tokens = array(
		T_ARRAY,         T_ARRAY_CAST,   T_BOOLEAN_AND,       T_BOOLEAN_OR,          T_BOOL_CAST,
		T_CHARACTER,     T_CONSTANT_ENCAPSED_STRING,          T_DNUMBER,             T_DOUBLE_CAST,
		T_EMPTY,         T_INT_CAST,     T_ISSET,             T_IS_EQUAL,            T_IS_GREATER_OR_EQUAL,
		T_SR,
		T_IS_IDENTICAL,  T_IS_NOT_EQUAL, T_IS_NOT_IDENTICAL,  T_IS_SMALLER_OR_EQUAL, T_LNUMBER,
		T_LOGICAL_AND,	 T_LOGICAL_OR,   T_LOGICAL_XOR,       T_SL,                  T_SL_EQUAL,
		T_SR_EQUAL,	     T_STRING_CAST,  T_STRING_VARNAME,    T_VARIABLE,            T_WHITESPACE,
		T_CURLY_OPEN);

		$valid_functions = array(
		"isset", "empty", "is_null", "is_numeric", "is_bool", "is_integer", "is_double",
		"sizeof", "is_finite", "is_float", "is_infinite", "is_int", "is_long", "is_nan", "is_real", "is_scalar",
		"is_string", "mt_rand", "rand", "urlencode", "urldecode", "uniqid", "date", "time");

		for($t as $idx => $token) {
			if ($token == ";") return false;
			if (is_array($token)){
				$n = $token[0];
				switch($n){
					case T_OPEN_TAG:
						if ($idx > 0) return false;
						break;
					case T_CLOSE_TAG:
						if ($idx < $count - 1) return false;
						break;
					case T_STRING:
						$f = $token[1];
						$lw = strtolower($f);
						if ($lw != "true" && $lw != "false" && $lw != "null"){
							if (is_callable($f)){
								if (!array_search($f, $valid_functions)){
									if (!isset(this.__allowed_functions[$f])) return false;
									if (this.__allowed_functions[$f] === false) return false;
								}
							}
							else return false;
						}
						break;
					default:
						if (!array_search($n, $valid_tokens)){
							return false;
						}
				}
			}
		}
		return true;
	}

	/**
	 * Return true if the script was executed in the CLI enviroment
	 *
	 * @return boolean
	 */
	this. = function isCli(){
		if (is_null(this.__is_cli)) {
			this.__is_cli =  (!isset($_SERVER['SERVER_SOFTWARE']) && (php_sapi_name() == 'cli'
			|| (is_numeric($_SERVER['argc']) && $_SERVER['argc'] > 0)));
		}
		return this.__is_cli;
	}

	/**
	 * Show error and die
	 *
	 * @param string $errmsg
	 * @param string $level
	 */
	this. = function error($errmsg, $level = "WARNING"){
		$iscli = self::isCli();
		if ($iscli) $errmsg = self::htmlToText($errmsg);
		if ($iscli === false) echo "<div style = \"z-index:9999; position: fixed; top: 20px; right: 20px;font-family: verdana; -moz-border-radius: 5px; padding: 10px;";
		switch($level){
			case DIV_ERROR_WARNING:
				if (!$iscli) echo "background: yellow; border: 1px solid black; color: black;\"><strong>[[]]</strong> <cite>$level</cite>: $errmsg</div>";
				else echo "[[]] $level: $errmsg\n";
				break;
			case DIV_ERROR_FATAL:
				if (!$iscli) echo "background: red; border: 1px solid black; color: white;\"><strong>[[]]</strong> <cite>$level</cite>: $errmsg</div>";
				else echo "[[]] $level: $errmsg\n";
				die();
				break;
		}
		//self::log($errmsg, $level);
	}

	/**
	 * Switch ON log mode
	 *
	 * @param string $log_file
	 */
	this. = function logOn($log_file = "div.log"){
		this.__log_mode = true;
		this.__log_file = $log_file;
		//self::log("Starting div with logs...");
	}

	/**
	 * Logger
	 *
	 * @param string $msg
	 */
	this. = function log($msg, $level = "    "){
		if (this.__log_mode === true){
			$f = fopen("div.log", "a");
			$msg = self::htmlToText($msg,500);
			fputs($f, "[".substr($level,0,4)."] ".date("Y-m-d h:i:s")." - ".$msg."\n");
			fclose($f);
		}
	}
}

// End of file