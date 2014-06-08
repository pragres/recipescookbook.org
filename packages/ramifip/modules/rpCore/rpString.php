<?php

/**
 * Ramifip String Library
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */
 
define("RAMIFIP_STRING_UPPER_CASE", "RAMIFIP_STRING_UPPER_CASE");
define("RAMIFIP_STRING_LOWER_CASE", "RAMIFIP_STRING_LOWER_CASE");
define("RAMIFIP_STRING_REVERSE_CASE", "RAMIFIP_STRING_REVERSE_CASE");

class rpString {

	/**
	 * Construct a unique id
	 * @name getReplica
	 * @return string
	 */
	static function getReplica($prefix = "", $min = 15, $max = 20, $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890") {
		$c = $characters;
		$count = rand($min, $max);
		$s = '';
		for ($i = 0; $i < $count; $i++){
			$s = $s . substr($c, rand(0, strlen($c) - 1), 1);
		}
		$momment = str_replace("/", "", date("Ymdhis"));
		$momment = str_replace(" ", "", $momment);
		$momment = str_replace(":", "", $momment);
		return $prefix . $momment . time() . $s;
	}

	/**
	 * Build a params list in string format from array
	 * 
	 * @name getStringParams
	 * @example $params = rpString::getStringParams(array("name" => "john", "age" => 45));
	 * @return string
	 */
	static function getStringParams($arr) {
		$result = "";

		foreach ($arr as $key => $value){
			$result = $result . $key . "=" . $value . " ";
		}

		return $result;
	}

	/**
	 * Replace all invalid characters of a string with a specific character
	 *
	 * @param string $s
	 * @param string $valid_chars
	 * @param string $c
	 * @param boolean $case_sensitive
	 */
	static function clearInvalidChars($s, $valid_chars, $c, $case_sensitive = false){

		if ($case_sensitive === false)
		$valid_chars = strtolower($valid_chars);
			
		$new_s = "";
		$l = strlen($s);

		for($i = 0; $i < $l; $i++){
			$compare = $s[$i];
			if ($case_sensitive === false)
			$compare = strtolower($compare);
			$new_s .= strpos($valid_chars, $compare) === false?$c:$s[$i];
		}
		return $new_s;
	}
	
	/**
	 * Returns an array with ranges of continues equal chars
	 *
	 * @param string $s
	 * @param string $char - if $char is null, the function returns all ranges
	 * @return array
	 */
	static function getCharRanges($s, $char = null){
		$ranges = array();
		
		$l = strlen($s);

		$from = null;
		$to = null;
		
		for($i = 0; $i < $l; $i++){
			$c = $s[$i];
			
			$next_char = null;
			$last_char = null;
			
			if ($i > 0)
				$last_char = $s[$i-1];
			if ($i < $l-1)
				$next_char = $s[$i+1];
				
			if ($from === null && ($char === null || $char === $c)){
				$from = $i;
			} else {
				if ($last_char !== null && $c !== $last_char || ($c === $last_char && $i === $l - 1)){
					$to = $i;
					$f = $from;
					if ($c != $last_char){
						$from = $to;
						$to--;
					}
					$ranges[] = array($f, $to);
					
					if ($from === $l - 1)
						$ranges[] = array($from, $from);
					$to = null;
				}
			}
		}
		
		return $ranges;
	}
	
	/**
	 * Return the max length of strings
	 * 
	 * @param a list of mixed values
	 * @return integer
	 */
	static function getMaxLength($arr = null){
		if ($arr == null || !is_array($arr)){
			$c = func_num_args();
			$arr = array();
			for($i = 0; $i < $c; $i++){
				$arr[] = func_get_arg($i);
			}
		}
		
		$max = 0;
		foreach($arr as $s){
			$l = strlen("$s");
			if ($max < $l)
				$max = $l;
		}
		return $max;
	}
	
	/**
	 * Return the min length of strings
	 * 
	 * @param a list of mixed values
	 * @return integer
	 */
	static function getMinLength($arr = null){
		if ($arr == null || !is_array($arr)){
			$c = func_num_args();
			$arr = array();
			for($i = 0; $i < $c; $i++){
				$arr[] = func_get_arg($i);
			}
		}
		
		$min = null;
		foreach($arr as $s){
			$l = strlen("$s");
			if ($min > $l || $min === null)
				$min = $l;
		}
		
		return $min;
	}
	
	/**
	 * Compare two strings and return similar's percent
	 * 
	 * @param string $s1
	 * @param string $s2
	 * @return float
	 */
	static function getSimilarPercent($s1, $s2){
		
		// identical?
		if ($s1 == $s2) 
			return 100;
		
		// s1 into s2
		if (strpos($s2, $s1) !== false)
			return strlen($s1) / strlen($s2) * 100;
		
		// s2 into s1
		if (strpos($s1, $s2) !== false)
			return strlen($s2) / strlen($s1) * 100;
		
		// char by char
		$l1 = strlen($s1);
		$l2 = strlen($s2);
		
		$l = max($l1, $l2);
		
		$c = 0;
		for($i = 0; $i < $l; $i++){
			$c1 = $i < $l1? $s1[$i]:"";
			$c2 = $i < $l2? $s2[$i]:"";
			if ($c1 == $c2)
				$c++;
		}
		
		return $c/$l*100;
	}
	
	/**
	 * Return the reverse of string
	 * 
	 * return string
	 */
	static function getReverse($s){
		$l = strlen($s);
		$ns = "";
		for($i = $l-1; $i > -1; $i--){
			$ns .= $s[$i];
		}
		return $ns;
	}
	
	/**
	 * Return a lower, upper or reverse case of string in specific range of characters
	 * 
	 * retrun string
	 */
	static function getCase($s, $from = 0, $count = null, $case = RAMIFIP_STRING_LOWER_CASE){
		
		if ($count === null || $count > strlen($s) - $from)
			$count = strlen($s) - $from ;
		
		$to = $from + $count - 1;
		
		if ($from === null || $from < 0)
			$from = 0;
		
		$ns = "";
		$l = strlen($s);
		
		for($i = 0; $i < $l; $i++){
			if ($i >= $from && $i <= $to){
				switch($case){
					case RAMIFIP_STRING_LOWER_CASE:
						$ns .= strtolower($s[$i]);
					break;
					case RAMIFIP_STRING_UPPER_CASE:
						$ns .= strtoupper($s[$i]);
					break;
					case RAMIFIP_STRING_REVERSE_CASE:
						if ($s[$i] === strtolower($s[$i]))
							$ns .= strtoupper($s[$i]);
						else
							$ns .= strtolower($s[$i]);	
					break;
				}
			} else
				$ns .= $s[$i];
		}
		return $ns;		
	}
}

// End of file