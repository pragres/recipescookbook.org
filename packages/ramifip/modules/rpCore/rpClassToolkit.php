<?php

/**
 * Ramifip Class Toolkit
 * 
 * This file is part of the Ramifip PHP Framework.
 * 
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpClassToolkit{

	/**
	 * Get classname of object
	 * 
	 * @param object $obj
	 * @return string
	 */
	static function getClass($obj){
		if (!isset($obj)){
			return null;
		}

		if ($obj == null){
			return null;
		}
			
		return get_class($obj);
	}

	/**
	 * Return the parent of object
	 * 
	 * @params object $obj
	 * @return string
	 */
	static function getParent($obj){
		return get_parent_class($obj);
	}

	/**
	 * Get all parents of object in the hierarchy
	 * 
	 * @params object $obj
	 * @return array
	 */
	static function getParents($obj){
		$parents = array();
		$parent = self::getParent($obj);
		if ("$parent" != ""){
			$parents = self::getParents($parent);
			$parents[] = $parent;
		}
		return $parents;
	}

	/**
	 * Get vars of object
	 *
	 * @param object $obj
	 * @return array
	 */
	static function getVars($obj = null){
		if (isset($obj)) if (!is_null($obj)) return get_class_vars(self::getClass($obj));
		return array();
	}

	/**
	 * Return the object vars
	 *
	 * @param object $obj
	 * @return array
	 */
	static function getValues($obj){
		if (isset($obj)) if (!is_null($obj)) return get_object_vars($obj);
		return array();
	}
	
	/**
	 * Get value object of object
	 *
	 * @param object $obj
	 * @return object
	 */
	static function getValueObject($obj, $ignore = array()){
		$vo = new stdClass();
		$vars = self::getValues($obj);
		foreach ($vars as $key => $value){
			if (isset($ignore[$key])) continue;
			if (is_object($value)){
				$value = self::getValueObject($value);
			}
			$vo->$key = $value;
		}
		return $vo;
	}

	/**
	 * Return the JSON of an object
	 *
	 * @param object $obj
	 * @return string
	 */
	static function getAsJson($obj, $ignore = array()){
		if (!isset($obj)) return '';
		$vars = get_object_vars($obj);

		$json = "{";
		$i = 0;
		foreach ($vars as $var => $value) {
			if (isset($ignore[$var])) continue;
			$value = $obj->$var;
			$i++;
			if ($i > 1)	$json .= ",";
			$json .= $var . ": ";
			if (is_string($value)) {
				$value = str_replace("'", '\\'."'", $value);
				$value = str_replace("\n", "'+ \"".'\n'."\" + '", $value);
				$c = "'{$value}'";
			} elseif (is_numeric($value))
			$c = $value;
			elseif (is_bool($value))
			$c = ($value === true ? "true" : "false");
			elseif ($value == null){
				$c = "null";
			} elseif(is_object($value)) {
				if (method_exists($value, "asJSON")){
					$c = $value->asJSON($ignore);
				} else {
					$s = new Services_JSON();
					$c = $s->encode($value);
				}
			}
			$json.= $c;
		}
		$json .="}";

		return $json;
	}

	/**
	 * Return a list of classes from all *.php in PACKAGES
	 *
	 * @return array
	 */
	static function getAllClasses($ext = "php", $debug = false){
		$list = rpFileSystem::listFiles(PACKAGES, $ext);
		$count = count($list);
		$classes = array();

		if ($debug) {$esp = "|/-\\"; $e = -1;}
		
		$i = 0;
		foreach($list as $item) {
			$i++;
			if ($debug) {
				$e++;
				if ($e==4) $e = 0;
				rpCLI::msg(number_format($i / $count*100)."% | Parsing file: $item",$esp[$e],true,true);
			}
			
			$c = self::getClasses(file_get_contents($item));
			
			foreach ($c as $k=>$cc){
				$c[$k]['path'] = substr($item,strlen(PACKAGES));
			}
			
			$classes = array_merge($classes, $c);
		}

		if ($debug) rpCLI::msg(count($classes)." classes where found!");

		return $classes;
	}

	/**
	 * Return a list of classes from PHP code
	 *
	 * @param string $code
	 * @return array
	 */
	static function getClasses($code){
		$r = token_get_all($code);
		$classes = array();
		foreach($r as $key => $token){
			if (is_array($token)){
				if (token_name($token[0])=="T_CLASS"){
					$classes[$r[$key+2][1]] = array();
				}
			}
		}
		return $classes;
	}
}

// End of file