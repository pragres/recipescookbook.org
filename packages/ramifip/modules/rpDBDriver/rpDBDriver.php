<?php

/**
 * Ramifip Database Driver
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

abstract class rpDBDriver {

	var $connection;
	var $bulk_transactions = array();
	var $executing_bulk_transaction = false;
	var $dbtype = "";
	var $user = "";
	var $pass = "";
	var $host = "localhost";
	var $dbname;
	var $port;
	var $url;

	var $map_type = array(
	   "varchar" => "string",
	   "numeric" => "numeric",
	   "text" => "memo",
	   "double precision" => "float",
	   "bool" => "boolean",
	   "timestamp" => "time");

	var $reverse_map_type = array(
	   "md5" => "varchar",
	   "sha1" => "varchar",
	   "password" => "varchar",
	   "email" => "varchar");

	/**
	 * Break bulk transaction and free the transactions history
	 */
	public function freeBulkTransaction() {
		$this->executing_bulk_transaction = false;
		$this->bulk_transactions = array();
	}

	/**
	 * Begin a bulk transaction
	 */
	public function beginBulkTransaction() {
		$this->executing_bulk_transaction = true;
		$this->bulk_transactions = array();
	}

	/**
	 * Finish a bulk transaction
	 */
	public function endBulkTransaction() {
		$this->executing_bulk_transaction = false;

		foreach ($this->bulk_transactions as $key => $transaction) {
			if ($transaction['as_objects'] == true) {
				$this->bulk_transactions[$key]['result'] = $this->getAsObjects($sql);
			} else {
				$this->bulk_transactions[$key]['result'] = $this->getAsArray($sql);
			}
		}
	}

	/**
	 * Check Field
	 * @param mixed $value
	 * @param string $type
	 * @return mixed
	 */
	public function checkField($value, $type) {

		switch ($type) {
			case 'integer':
				$value = intval("$value");
				break;
			case 'varchar' || 'string' || 'md5' || 'sha1':
				$value = addcslashes($value,"'`");
				break;
			case 'char':
				$value = substr("$value",0,1);
				break;
			case 'boolean':
				if ($value == true || $value == 0 || $value == 't') $value = 'true'; else 	$value = 'false';
				break;
			default:
				$value = addcslashes($value,"'`");
		}
		return $value;
	}

	/**
	 * Get schemas from database
	 * @return array
	 */
	public function getSchemas() {
		return $this->getAsArray("SELECT * FROM information_schema.schemata;");
	}

	/**
	 * Return a list of database/schema tables
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getTables($schema = "*"){
		if ($schema != "*"){
			return $this->getAsArray("select * from information_schema.tables where table_type = 'BASE TABLE' and table_schema = '$schema'");
		}
		return $this->getAsArray("select * from information_schema.tables where table_type='BASE TABLE' and table_schema <> 'pg_catalog' AND table_schema <> 'information_schema' order by table_schema;");
	}

	/**
	 * Return a list of database/schema views
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getViews($schema = "*"){
		if ($schema != "*"){
			return $this->getAsArray("select * from information_schema.views where table_schema = '$schema'");
		}
		return $this->getAsArray("select * from information_schema.views where table_schema <> 'pg_catalog' AND table_schema <> 'information_schema' order by table_schema;");
	}

	/**
	 * Return a list of database/schema routines
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getRoutines($schema = "*"){
		if ($schema != "*"){
			return $this->getAsArray("select * from information_schema.routines where routine_schema = '$schema'");
		}
		return $this->getAsArray("select * from information_schema.routines where routine_schema <> 'pg_catalog' AND routine_schema <> 'information_schema';");
	}

	/**
	 * Return the routine's parameters
	 *
	 * @param string $routine
	 * @return array
	 */
	public function getRoutineParams($routine, $schema = null){
		if ($schema == null){
			return $this->getAsArray("select * from information_schema.parameters where specific_name = '$routine' AND parameter_name is not null order by ordinal_position");
		} else {
			return $this->getAsArray("select * from information_schema.parameters where specific_name = '$routine' and specific_schema = '$schema' AND parameter_name is not null order by ordinal_position");
		}
		return array();
	}

	/**
	 * Return TRUE if table exists
	 *
	 * @param string $schema
	 * @param string $table
	 * @return boolean
	 */
	public function tableExists($schema, $table_name){
		$tables = $this->getTables($schema);
		foreach($tables as $table){
			if (strtolower($table['table_name']) == strtolower($table_name)){
				return true;
			}
		}
		return false;
	}

	/**
	 * Return TRUE if view exists
	 *
	 * @param string $schema
	 * @param string $table
	 * @return boolean
	 */
	public function viewExists($schema, $view_name){
		$views = $this->getViews($schema);
		foreach($views as $view){
			if (strtolower($view['table_name']) == strtolower($view_name)){
				return true;
			}
		}
		return false;
	}

	/**
	 * Return a list of table columns
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getColumns($schema, $table){
		return $this->getAsArray("select * from information_schema.columns where table_schema = '$schema' and table_name = '$table' order by ordinal_position;");
	}

	/**
	 * Return a list of table constraints
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getConstraints($schema, $table){
		return $this->getAsArray("select * from information_schema.table_constraints where table_schema = '$schema' and table_name = '$table';");
	}

	/**
	 * Return a list of table primary keys
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getPrimaryKeys($schema, $table){
		return $this->getAsArray("select * from information_schema.table_constraints where table_schema = '$schema' and table_name = '$table' and constraint_type = 'PRIMARY KEY';");
	}

	/**
	 * Return a list of table foreign keys
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getForeignKeys($schema, $table){
		return $this->getAsArray("select * from information_schema.table_constraints where table_schema = '$schema' and table_name = '$table' and constraint_type = 'FOREIGN KEY';");
	}

	/**
	 * Return a list of key column usage
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getKeyColumnUsage($constraint_name = null){
		if ($this->viewExists("information_schema", "key_column_usage")){
			if ($constraint_name == null) return $this->getAsArray("select * from information_schema.key_column_usage;");
			return $this->getAsArray("select * from information_schema.key_column_usage where constraint_name = '$constraint_name';");
		}
		return array();
	}

	/**
	 * Return a list of key column usage of table
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getKeyColumnUsageOfTable($schema, $table, $constraint_name){
		if ($this->viewExists("information_schema", "key_column_usage")){
			return $this->getAsArray("select * from information_schema.key_column_usage where constraint_name = '$constraint_name' and table_schema = '$schema' and table_name = '$table' order by ordinal_position;");
		}
		return array();
	}

	/**
	 * Return a list of constraint column usage of table
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getConstraintColumnUsage($constraint_name){
		if ($this->viewExists("information_schema", "constraint_column_usage")){
			return $this->getAsArray("select * from information_schema.constraint_column_usage where constraint_name = '$constraint_name';");
		}
		return array();
	}

	/**
	 * Return map type
	 *
	 * @param string $type
	 * @param boolean $reverse
	 * @return string
	 */
	public function getMapType($type, $reverse = false){
		if ($reverse == false){
			if (isset($this->map_type[$type])) return $this->map_type[$type];
		} else {
	   
			if (isset($this->reverse_map_type[$type]))
			return $this->reverse_map_type[$type];
	   
			foreach($this->map_type as $typex => $map_type){
				if ($map_type == $type)
				return $typex;
			}
		}
		return $type;
	}

	/**
	 * Return true if value need quotes
	 *
	 * @param string $type
	 * @return boolean
	 */
	public function haveQuotes($type){
		$types = array("varchar","date","text","char", "string");
		if (array_search($type,$types)!==false) return true;
		return false;
	}
}

// End of file