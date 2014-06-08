<?php

/**
 * Ramifip Configuration Center
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpConfiguration{

	static $variables = array();

	/**
	 * Set value
	 *
	 * @param string $var
	 * @param mixed $value
	 */
	static function setValue($var, $value){

		// Create arrays

		$keys = explode("|", $var);
		array_pop($keys);
		$s = "";
		foreach($keys as $key){
			$s .= "['$key']";
			eval('if (!isset(self::$variables'.$s.')) self::$variables'.$s.' = array();');
		}

		// Assign the value
		
		$keys = explode("|", $var);
		$s = "";
		foreach($keys as $key){
			$s .= "['$key']";
		}
		
		eval('self::$variables'.$s.' = $value;');

	}

	/**
	 * Return a configuration value
	 *
	 * @param string $var
	 * @return mixed
	 */
	static function getValue($var){
		$keys = explode("|", $var);
		$s = "";
		
		foreach($keys as $key){
			$s .= "['$key']";
			$exit = false;
			eval('if (!isset(self::$variables'.$s.')) $exit = true;');
			if ($exit) return null;
		}
		
		$value = null;
		eval('$value = self::$variables'.$s.';');
		return $value;
	}

	/**
	 * Remove variable
	 *
	 * @param string $var
	 */
	static function remove($var){
		unset(self::$variables[$var]);
	}

}

// End of file