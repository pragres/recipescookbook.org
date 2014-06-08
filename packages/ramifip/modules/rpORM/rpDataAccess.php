<?php

/**
 * Ramifip ORM for PHP
 *
 * Data Access
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

define("RAMIFIP_DBTYPE_PGSQL", "RAMIFIP_DBTYPE_PGSQL");
define("RAMIFIP_DBTYPE_MYSQL", "RAMIFIP_DBTYPE_MYSQL");

class rpDataAccess{

	var $driver;
	var $dbtype;
	var $orm_id = null;

	/**
	 * Contructor
	 */
	function __construct($driver = null){
		if (is_null($driver) || $driver == false){
			$orm_id = null;
			if (isset($this->orm_id)) $orm_id = $this->orm_id;
			if (method_exists("app", "getDBDriver")) $driver = app::getDBDriver($orm_id);
		}
		$this->driver = $driver;
	}

	/**
	 * Get anything SQL query result
	 */
	public function getAnything($sql, $asobjects=false) {

		if (!$this->driver) {
			throw new rpException("rpORM - No DB driver specified. You can define app::getDBDriver() method.");
		}

		if ($asobjects == true){
			return $this->driver->getAsObjects($sql);
		}
		return $this->driver->getAsArray($sql);
	}

	/**
	 * Construct WHERE part of SQL query from phrase
	 *
	 * @param string $frase
	 * @param string $fields
	 * @return string
	 */
	function getWHEREPartOfSearchPhrase($frase, $fields) {
		$arr = explode(",", $fields);
		$words = explode(' ', trim($frase));
		$parteand = ' TRUE ';
		foreach ($arr as $field){
			foreach ($words as $word) {
				if (substr($word, 0, 1) == '"' || substr($word, strlen($word), 1) == '"') {
					$word = str_replace('"', '', $word);
					$parteand = $parteand . ' AND ' . $field . " LIKE '%" . $word . "%' ";
				}
			}
		}
		$parteor = ' AND (TRUE';

		foreach ($arr as $field){
			foreach ($words as $word) {
				if (!(substr($word, 0, 1) == '"' || substr($word, strlen($word), 1) == '"')) {
					$parteor = $parteor . ' OR ' . $field . " LIKE '%" . $word . "%' ";
				}
			}
		}
		$parteor = $parteor . ')';
		return $parteand . $parteor;
	}


	/**
	 * Get all records from table that match with a phrase
	 *
	 * @param string $table
	 * @param string $fields
	 * @param string $phrase
	 * @param string $extrawhere
	 * @param string $showfields
	 * @param boolean $asobjects
	 * @return array
	 */
	public function getAllWithPhraseIn($table, $fields, $phrase, $extrawhere = "true", $showfields="*", $asobjects=false) {
		return $this->getAnything("SELECT $showfields FROM $table WHERE (" . $this->getWHEREPartOfSearchPhrase($fields) . ") AND ($extrawhere);");
	}

	/**
	 * Return a sql string from peers field-alias in array
	 * 
	 * @param array $fields
	 * @return string
	 */
	public function arrayFieldsToSQL($fields = array()) {
		if (is_array($fields)) {
			$sql = '';
			$p = true;
			foreach ($fields as $field => $alias) {
				$sql .= ($p == false)?", ":"";
				$sql .= is_numeric($field) ? $alias:$field . ' AS "'. $alias.'"';
				$p = false;
			}
			$fields = $sql;
		}
		return $fields;
	}

	/**
	 * Get id replica
	 *
	 * @param string $prefix
	 * @param integer $min
	 * @param integer $max
	 * @param string $characters
	 * @return string
	 */
	public function getReplica($prefix = "", $min = 15, $max = 20, $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890") {
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
	 * Return "true" or "false" strings from boolean value
	 * @param <boolean> $v
	 * @return <string>
	 */
	function boolToString($v) {
		return $v == 0 ? "false" : "true";
	}

	/**
	 * Return a real boolean value
	 * 
	 * @param mixed $v
	 * @return boolean
	 */
	function somethingToBool($v) {
		if ("$v" == "true")	return true;
		if ("$v" == "false") return false;
		if ("$v" == "t") return true;
		if ("$v" == "f") return false;
		if ("$v" == "0") return false;
		if ("$v" == "1") return true;
		if (intval("$v") == 0) return false;
		if (intval("$v") == 1) return false;
		return (boolean) $v;
	}

	/**
	 * Return "true" or "false" strings from real boolean value
	 * 
	 * @param mixed $v
	 * @return string
	 */
	function somethingToStrbool($v) {
		return self::boolToString(self::somethingToBool($v));
	}
}

// End of file