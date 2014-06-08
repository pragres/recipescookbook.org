<?php

/**
 * {$classname} -> {$tablename}
 *
 * This class have methods to access and work with table {$tablename}
 *
 * @updated {/div.now:Y-m-d h:i:s/}
 */

#{\n}class {$classname}Table extends rpDataTable{
# ?$false
class xModel extends rpDataTable{
	#$false?

	static $METADATA;
	
	/**
	 * Contructor
	 */
	function __construct($driver = null){
		$this->orm_id = '{$orm_id}';
		parent::__construct($driver);
		$this->tablename = "{$tablename}";
	}
	
	#?$fieldsbool
	public function repairBoolean($obj, $asobject = true){
		if ($asobject == true){
			#[$fieldsbool]
			if (isset($obj->{$value})) {
				if ($obj->{$value} == "f")
				$obj->{$value} = false;
				else
				$obj->{$value} = true;
			}
			#[/$fieldsbool]
		} else {
			#[$fieldsbool]
			if (isset($obj['{$value}'])) {
				if ($obj['{$value}'] == "f")
				$obj['{$value}'] = false;
				else
				$obj['{$value}'] = true;
			}
			#[/$fieldsbool]
		}
		return $obj;
	}
	#$fieldsbool?

	/**
	 * Add new record
	 *
	 * @param array $fields
	 * @return array
	 */
	public function add($fields = array()){

		// Check sql injection
		#[$fields]
		#{?( '{$type}' != 'replica' )?}
		if (isset($fields['{$name}'])) $fields['{$name}'] = $this->driver->checkField($fields['{$name}'], '{$type}');
		#{/?}
		#[/$fields]

		#[$fields]
		if (!isset($fields['{$name}'])) $fields['{$name}'] = null;
		#[/$fields]

		// Create ID replicas
		$replicas = array();
		
		#[$fields]
		#{?( '{$type}' == 'replica' )?}
		$fields['{$name}'] = $this->getReplica();		
		$replicas['{$name}'] = $fields['{$name}'];
		#{/?}
		#[/$fields]

		#?$primary_keys
		$keys = array();
		#[$primary_keys]
		$keys['{$value}'] = $fields['{$value}'];
		#[/$primary_keys]
		#@else@
		$keys = null;
		$result = $fields;
		#$primary_keys?
		
		#[$fields]
		#{?( '{$type}' == 'bool' || '{$type}' == 'boolean' )?}
		$fields['{$name}'] = $this->somethingToStrbool($fields['{$name}']);
		#{/?}
		#[/$fields]
		
		$default = array();
		#[$fields]
		if (is_null($fields['{$name}'])) {
			#{?( "{$default}" !== "" )?}
			$r = $this->getAnything("select {$default} as result;");
			if (isset($r[0])) if (isset($r[0]['result'])) $default['{$name}'] = $r[0]['result']; 
			$fields['{$name}'] = "{$default}";
			#@else@
		 	#!$allownull
			throw new rpException("Ramifip ORM NOT NULL exception for {$tablename}.{$name}");
			#@else@
			$fields['{$name}'] = 'null';
			#$allownull!
			#{/?}
		}
		else {
			#{?( '{$type}' == 'string' || '{$type}' == 'varchar' || '{$type}' == 'date')?}
			$fields['{$name}'] = "'".$fields['{$name}']."'";
			#@else@
			if ($this->driver->haveQuotes('{$type}')) $fields['{$name}'] = "'".$fields['{$name}']."'";
			else if (is_string($fields['{$name}'])) $fields['{$name}'] = "'".$fields['{$name}']."'";
			#{/?}
		}
		#[/$fields]

		#[$fields]
		#{?( '{$type}' == 'md5' )?}
		$fields['{$name}'] = "md5(".$fields['{$name}'].")";
		#{/?}
		#[/$fields]

		#[$fields]
		#{?( '{$type}' == 'sha1' )?}
		$fields['{$name}'] = "sha1(".$fields['{$name}'].")";
		#{/?}
		#[/$fields]

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}$r = {$classname}Trigger::beforeInsert($fields);
			if ($r == false) return false;
		}

		$sql = "INSERT INTO {$tablename} (".implode(",", array_keys($fields)).") VALUES (".implode(",",$fields).");";

		$r = $this->getAnything($sql);

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}{$classname}Trigger::afterInsert($fields);
		}
		
		#?$primary_keys
		if (!is_null($keys)) $result = $this->get($keys);
		#@else@
		#[$fields]
		#{?( "{$default}" !== "" )?}
		if (isset($default['{$name}'])) $fields['{$name}'] = $default['{$name}']; else $fields['{$name}'] = null;
		#{/?}
		#[/$fields]
		$result = $fields;
		#$primary_keys?
		return $result;
	}

	/**
	 * Remove records by $keys
	 *
	 * @param array $keys
	 * @return mixed
	 */
	public function remove($keys){

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}$r = {$classname}Trigger::beforeRemove($keys);
			if ($r == false) return false;
		}

		$kkeys = $keys;

		foreach($kkeys as $k => $v){
			if (is_string($v)) $v = "'".addslashes($v)."'";
			if (is_bool($v)) $v = $this->somethingToStrbool($v);
			$kkeys[$k] = "{$k} = $v";
		}

		$sql = "DELETE FROM {$tablename} WHERE ".implode(" AND ", $kkeys).";";

		$r = $this->getAnything($sql);

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}{$classname}Trigger::afterRemove($keys);
		}

		return $r;
	}

	/**
	 * Remove records where
	 *
	 * @param string $where
	 * @param boolean $asobjects
	 * @return mixed
	 */
	public function removeBy($where, $asobjects = false){
		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}$r = {$classname}Trigger::beforeRemoveBy($where);
			if ($r == false) return false;
		}

		$r = $this->getAnything("DELETE FROM {$classname} WHERE $where", $asobjects);

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}{$classname}Trigger::afterRemoveBy($where,$result);
		}

		return $r;
	}

	/**
	 * Clean
	 *
	 * @param boolean $asobjects
	 * @return mixed
	 */
	public function clean($asobjects = false){
		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}$r = {$classname}Trigger::beforeClean();
			if ($r == false) return false;
		}

		$r = $this->getAnything("DELETE FROM {classname};", $asobjects);

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}{$classname}Trigger::afterClean($r);
		}

		return $r;
	}

	/**
	 * Set all
	 *
	 * @param string $set
	 * @param bool $asobjects
	 * @return mixed
	 */
	public function set($set, $asobjects = false){
		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}$r = {$classname}Trigger::beforeUpdate($set);
			if ($r == false) return false;
		}

		$r = $this->getAnything("UPDATE {$tablename} SET $set;", $asobjects);

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}{$classname}Trigger::afterUpdate($set, $r);
			if ($r == false) return false;
		}

		return $r;
	}

	/**
	 * Set by
	 *
	 * @param string $where
	 * @param string $set
	 * @param bool $asobjects
	 * @return mixed
	 */
	public function setBy($where, $set, $asobjects = false){

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}$r = {$classname}Trigger::beforeUpdateBy($where, $set);
			if ($r == false) return false;
		}

		$r = $this->getAnything("UPDATE {$tablename} SET $set WHERE $where;");

		if (class_exists('{$classname}Trigger')){
			#{\n}{\t}{\t}{\t}{$classname}Trigger::afterUpdateBy($where, $set, $result);
		}

		return $r;
	}

	/**
	 * Get record by $keys
	 *
	 * @param array $keys
	 * @param bool $asobject
	 * @return mixed
	 */
	public function get($keys, $asobject = false){
		$kkeys = $keys;

		foreach($kkeys as $k => $v){
			if (is_string($v)) $v = "'".addslashes($v)."'";
			if (is_bool($v)) $v = $this->somethingToStrbool($v);
			$kkeys[$k] = "{$k} = $v";
		}

		$sql = "SELECT * FROM {$tablename} WHERE ".implode(" AND ", $kkeys).";";

		$r = $this->getAnything($sql,$asobject);

		#?$fieldsbool
		if (isset($r[0])) return $this->repairBoolean($r[0], true); else return false;
		#@else@
		if (isset($r[0])) return $r[0]; else return false;
		#$fieldsbool?
	}

	/**
	 * Get all records
	 *
	 * @param string $fields
	 * @param bool $asobjects
	 * @return array
	 */
	public function getAll($fields = "*", $asobjects = false){
		$r = $this->getAnything("SELECT $fields FROM {$tablename}", $asobjects);
		#?$fieldsbool
		if (is_array($r)) foreach($r as $key => $record){
			$r["$key"] = $this->repairBoolean($record, $asobjects);
		}
		#$fieldsbool?
		return $r;
	}

	/**
	 * Get all records $where
	 *
	 * @param string $where
	 * @param string $fields
	 * @param boolean $asobjects
	 * @return array
	 */
	public function getAllBy($where, $fields = "*", $asobjects = false){
		$r = $this->getAnything("SELECT $fields FROM {$tablename} WHERE $where;", $asobjects);
		#?$fieldsbool
		if (is_array($r)) foreach($r as $key => $record){
			$r[$key] = $this->repairBoolean($record, $asobjects);
		}
		#$fieldsbool?
		return $r;
	}

	/**
	 * Get records with limit
	 *
	 * @param integer $limit
	 * @param integer $offset
	 * @param string $fields
	 * @param bool $asobjects
	 * @return mixed
	 */
	public function getLimit($limit, $offset = 0, $fields = "*", $asobjects = false){
		$r = $this->getAnything("SELECT $fields FROM {$tablename} LIMIT $limit OFFSET $offset;", $asobjects);
		#?$fieldsbool
		if (is_array($r)) foreach($r as $key => $record){
			$r[$key] = $this->repairBoolean($record, $asobjects);
		}
		#$fieldsbool?
		return $r;
	}

	/**
	 * Get records limit and where
	 *
	 * @param integer $limit
	 * @param integer $offset
	 * @param string $where
	 * @param string $fields
	 * @param bool $asobjects
	 * @return array
	 */
	public function getLimitBy($limit, $offset, $where, $fields = "*", $asobjects = false){
		$r = $this->getAnything("SELECT $fields FROM {$tablename} WHERE $where LIMIT $limit OFFSET $offset;", $asobjects);
		#?$fieldsbool
		if (is_array($r)) foreach($r as $key => $record){
			$r[$key] = $this->repairBoolean($record, $asobjects);
		}
		#$fieldsbool?
		return $r;
	}


	/**
	 * Get records
	 *
	 * @param array $params
	 * @return mixed
	 */
	public function getRows($params){

		$xparams = array();
		foreach($params as $key => $value){
			if (!is_null($value) && trim("$value") != "" && trim("$value") != "null"){
				$xparams[$key] = $value;
			}
		}

		$params = $xparams;

		$fields = isset($params["fields"])? $this->arrayFieldsToSQL($params["fields"]) : "*";
		$where = isset($params["where"])?" WHERE ".$params["where"]:"";
		$order = isset($params["order"])?" ORDER BY ".$params["order"]:"";
		$limit = isset($params["limit"])?" LIMIT ".$params["limit"]:"";
		$offset = isset($params["offset"])?" OFFSET ".$params["offset"]:"";
		$asobjects = isset($params["asobjects"])? $params["asobjects"]:false;
		$sql = "SELECT $fields FROM {$tablename} ".$where.$order.$offset.$limit;
		$r = $this->getAnything($sql,$asobjects);
		#?$fieldsbool
		if (is_array($r)) foreach($r as $key => $record){
			$r[$key] = $this->repairBoolean($record, $asobjects);
		}
		#$fieldsbool?

		return $r;
	}

	/**
	 * Return count of rows in filter
	 *
	 * @param string $where
	 * @return array
	 */
	public function getCountInFilter($where){
		$r = $this->getAnything("SELECT count(*) as cant FROM {$tablename} WHERE $where;",false);
		return $r[0]["cant"];
	}

	/**
	 * Return tro if exists rows in filter
	 *
	 * @param string $where
	 * @return bool
	 */
	public function existsRowsWith($where){
		return $this->getCountInFilter($where)>0?true:false;
	}

	#[$foreign_keys]
	/**
	 * Get {$fields.0.localproperty} join with {$foreign_prefix}
	 *
	 * @param array $params
	 * @return array
	 */
	#{\n}{\t}public function get{$fields.0.localproperty}JoinWith{$foreign_prefix}($params = array(), $asobjects = false){
	#?$false
	public function getJoinWith($params = array(), $asobjects = false){
		#$false?

		if (isset($params['fields'])) $fields = $params['fields']; else $fields = "*";
		if (isset($params['where'])) $where = " WHERE ".$params['where']; else $where = "";
		if (isset($params['order'])) $order = " ORDER BY ".$params['order']; else $order = "";
		if (isset($params['limit'])) $limit = " LIMIT ".$params['limit']; else $limit = "";
		if (isset($params['offset'])) $offset = " OFFSET ".$params['offset']; else $offset = "";

		$sql = "SELECT $fields FROM {$tablename} INNER JOIN {$foreign_table} ON ";
		#[$fields]
		$sql .= "{$tablename}.{$localfield} = {$foreign_table}.{$foreign_key}";
		#!$_is_last
		$sql.= " AND ";
		#$_is_last!
		#[/$fields]

		$sql .= " ".$where.$order.$limit.$offset;

		$r = $this->getAnything($sql, $asobjects);

		#?$fieldsbool
		if (is_array($r)) foreach($r as $key => $record){
			$r[$key] = $this->repairBoolean($record, $asobjects);
		}
		#$fieldsbool?

		return $r;
	}
	#[/$foreign_keys]
	
	/**
	 * Retrieve the metadata/information of table
	 *
	 * @return mixed
	 */
	static function getMetadata(){
		if (isset(self::$METADATA))
		return unserialize(stripslashes(self::$METADATA));
	}
}

#{\n}{$classname}Table::$METADATA = '{$metadata}';

// End of file

