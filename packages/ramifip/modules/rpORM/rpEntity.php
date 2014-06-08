<?php

/**
 * Ramifip ORM for PHP
 *
 * The Ramifip Entity
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

class rpEntity extends Object{

	// All the names of generated properties are in lowercase,
	// the follow code won't collapse!

	var $TABLE = null;

	/**
	 * Constructor
	 *
	 * @param array $properties
	 */
	public function __construct($properties = array(), $construct = true, $load = true, $table = null, $driver = null){

		if (is_object($properties)) $properties = get_object_vars($properties);

		if (count($properties) == 0) {
			$construct = false;
			$load = false;
		}

		$classname = get_class($this);
		$lclassname = strlen($classname);
		$classtable = null;

		if ($classname !== "Entity"){
			if (substr($classname, $lclassname - 6) == "Entity") {
				$classtable = substr($classname,0, $lclassname - 6)."Table";
			} else {
				$classtable = $classname."Table";
			}
		}

		if (is_null($table) || $table == false) {
			if (is_null($classtable)) throw new rpException("rpDataTable instance not resolved for $classname");
			if (!class_exists($classtable)) throw new rpException("rpDataTable instance not found for $classname");
			$this->TABLE = new $classtable($driver);
		} else $this->TABLE = $table;

		if ($construct) {
			$r = $this->TABLE->add($properties);
			if (!is_array($r) && is_object($r)) $r = get_object_vars($r);
			if (is_array($r)) foreach($r as $prop => $value) $this->$prop = $value;
		} elseif ($load) {
			$r = $this->TABLE->get($properties);
			if (is_array($r)) foreach($r as $prop => $value) $this->$prop = $value;
		} else {
			parent::__construct($properties);
		}
	}

	/**
	 * Create a representation as JSON of this object
	 * 
	 * @return string
	 */
	public function asJSON($ignore = array()){
		$ignore["TABLE"] = true;
		$ignore["CACHE"] = true;
		return parent::asJSON($ignore);
	}
	
	/**
	 * Get value-object
	 *
	 * @param array $ignore
	 * @return stdClass
	 */
	public function getVO($ignore = array()){
		$ignore["TABLE"] = true;
		$ignore["CACHE"] = true;
		return parent::getVO($ignore);
	}
}

// End of file