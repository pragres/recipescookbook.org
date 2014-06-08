<?php

/**
 * Ramifip Datatypes Library
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpDataType {

	/**
	 * Return "true" or "false" strings from boolean value
	 * @param <boolean> $v
	 * @return <string>
	 */
	static function boolToString($v) {
		return $v == 0 ? "false" : "true";
	}

	/**
	 * Return a real boolean value
	 * @param <any> $v
	 * @return <boolean>
	 */
	static function somethingToBool($v) {

		if ("$v" == "true")
		return true;
		if ("$v" == "false")
		return false;
		if ("$v" == "t")
		return true;
		if ("$v" == "f")
		return false;
		if ("$v" == "0")
		return false;
		if ("$v" == "1")
		return true;
		if (intval("$v") == 0)
		return false;
		if (intval("$v") == 1)
		return false;

		return (boolean) $v;
	}

	/**
	 * Return "true" or "false" strings from real boolean value
	 * @param <any> $v
	 * @return <string>
	 */
	static function somethingToStrbool($v) {
		return self::boolToString(self::somethingToBool($v));
	}

	/**
	 * Return true if $arr is array of array
	 *
	 * @param array $arr
	 * @return boolean
	 */

	static function isArrayOfArray($arr){
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
	static function isArrayOfObjects($arr){
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
	static function isNumericList($arr){
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
}

// End of file