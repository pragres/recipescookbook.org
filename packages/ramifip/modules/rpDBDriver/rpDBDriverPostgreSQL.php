<?php

/**
 * Ramifip PostgreSQL Database Driver
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

class rpDBDriverPostgreSQL extends rpDBDriver {

	/**
	 * Constructor
	 * @param string $url
	 */
	public function __construct($url) {

		$this->url = $url;

		$url = parse_url($url);

		if (isset($url['scheme']))
		$this->dbtype = $url['scheme'];

		if (isset($url['user']))
		$this->user = $url['user'];

		if (isset($url['pass']))
		$this->pass = $url['pass'];

		if (isset($url['host']))
		$this->host = $url['host'];

		if (isset($url['path']))
		$this->dbname = substr($url['path'], 1);

		if (isset($url['port']))
		$this->port = $url['port'];

		$this->Connect();
		if (!$this->connection) die("Failed the connection to the database {$this->url}");

		$this->map_type = array_merge($this->map_type, array(
		"character varying" => "string",
		"integer" => "integer",
		"boolean" => "bool",
		"bool" => "bool",
		"array" => "codificador",
		"real" => "real",
		"\"char\"" => "char",
		"double precision" => "double",
		"varchar" => "string",
		"bigint" => "bigint",
		"text" => "memo",
		"date" => "date"));

		$this->reverse_map_type = array_merge($this->reverse_map_type, array(
		"string" => "varchar",
		"integer" => "integer",
		"code" => "varchar",
		"replica" => "varchar",
		"memo" => "text",
		"long" => "long",
		"bigint" => "bigint",
		"boolean" => "boolean",
		"bool" => "bool",
		"md5" => "varchar",
		"double" => "double precision",
		"datetime" => "date",
		"memo" => "text"));
	}

	/**
	 * Return true if value need quotes
	 *
	 * @param string $type
	 * @return boolean
	 */
	public function haveQuotes($type){
		$types = array("character varayin");
		if (array_search($type,$types)!==false) return true;
		return parent::haveQuotes($type);
	}

	/**
	 * Connect to database
	 * @return boolean
	 */
	public function Connect() {
		if (!function_exists("pg_connect")) {
			throw new rpException("The PostgreSQL extension for PHP is not enabled. May be you are using differents php.ini files.");
		}
		$this->connection = @pg_connect("host = {$this->host} port={$this->port} dbname={$this->dbname} user ={$this->user} password = {$this->pass}");

		if ($this->connection) return true;
		return false;
	}

	/**
	 * Return query result
	 * @return resource
	 */
	public function getDefault($sql) {
		$sql = str_replace("\'", "'", $sql);
		return @pg_query($this->connection, $sql);
	}

	/**
	 * Return array of objects. Each record as object.
	 * @return array
	 */
	public function getAsObjects($sql, $transaction_id = null) {

		if ($this->connection) {

			if ($this->executing_bulk_transaction == true) {
				if ($transaction_id == null)
				$this->bulk_transactions[] = array("sql" => $sql, "result" => null, "as_objects" => true);
				else
				$this->bulk_transactions[$transaction_id] = array("sql" => $sql, "result" => null, "as_objects" => true);
				return true;
			} else {
				$result = $this->getDefault($sql);

				if ($result === false)
				return array();

				$array = array();
				while ($row = pg_fetch_object($result)) {
					$array[] = $row;
				}
				return $array;
			}
		}
		return false;
	}

	/**
	 * Returns array of array. Each record as array with each fieldname as array item key.
	 * @return array
	 */
	public function getAsArray($sql) {
		if ($this->connection) {
			if ($this->executing_bulk_transaction == true) {
				if ($transaction_id == null)
				$this->bulk_transactions[] = array("sql" => $sql, "result" => null, "as_objects" => false);
				else
				$this->bulk_transactions[$transaction_id] = array("sql" => $sql, "result" => null, "as_objects" => false);
				return true;
			} else {
				$result = $this->getDefault($sql);
				if ($result !== false)
				return pg_fetch_all($result);
				return array();
			}
		}
		return false;
	}

	/**
	 * Get constraints from specific table
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getConstraints($schema, $table) {
		$s = "SELECT pg_catalog.pg_constraint.conname as constraint_name FROM pg_catalog.pg_constraint ";
		$s .= " INNER JOIN information_schema.constraint_column_usage ";
		$s .= " ON information_schema.constraint_column_usage.constraint_name = pg_catalog.pg_constraint.conname ";
		$s .= " WHERE table_schema = '$schema' and table_name = '$table' ";
		$s .= " GROUP BY pg_catalog.pg_constraint.conname;";

		$r = self::query($s);
		$c = array();
		foreach ($r as $item)
		$c[] = $item['constraint_name'];
		return $c;
	}

	/**
	 * Get unique constraints from specific table
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getUniqueConstraints($schema, $table) {
		$s = "SELECT pg_catalog.pg_constraint.conname as constraint_name FROM pg_catalog.pg_constraint ";
		$s .= " INNER JOIN information_schema.constraint_column_usage ";
		$s .= " ON information_schema.constraint_column_usage.constraint_name = pg_catalog.pg_constraint.conname ";
		$s .= " WHERE information_schema.constraint_column_usage.table_schema = '$schema' and information_schema.constraint_column_usage.table_name = '$table' AND pg_catalog.pg_constraint.contype = 'u'";
		$s .= " GROUP BY pg_catalog.pg_constraint.conname;";

		$r = $this->getAsArray($s);
		$c = array();
		if (is_array($r))
		foreach ($r as $item) {
			$s = "SELECT information_schema.constraint_column_usage.column_name as column_name FROM pg_catalog.pg_constraint ";
			$s .= " INNER JOIN information_schema.constraint_column_usage ";
			$s .= " ON information_schema.constraint_column_usage.constraint_name = pg_catalog.pg_constraint.conname ";
			$s .= " WHERE information_schema.constraint_column_usage.table_schema = '$schema' ";
			$s .= " AND information_schema.constraint_column_usage.table_name = '$table' ";
			$s .= " AND pg_catalog.pg_constraint.contype = 'u' AND pg_catalog.pg_constraint.conname = '{$item['constraint_name']}'";

			$rr = $this->getAsArray($s);
			$fields = array();
			if (is_array($rr))
			foreach ($rr as $it)
			$fields[] = $it['column_name'];

			$c[] = array(
                    "name" => $item['constraint_name'],
                    "fields" => $fields
			);
		}
		return $c;
	}

	/**
	 * Get unique constraints from specific table
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getForeignKeys($schema, $table) {
		$s = "SELECT pg_catalog.pg_constraint.conname as constraint_name FROM pg_catalog.pg_constraint ";
		$s .= " INNER JOIN information_schema.constraint_column_usage ";
		$s .= " ON information_schema.constraint_column_usage.constraint_name = pg_catalog.pg_constraint.conname ";
		$s .= " WHERE information_schema.constraint_column_usage.table_schema = '$schema' and information_schema.constraint_column_usage.table_name = '$table' AND pg_catalog.pg_constraint.contype = 'f'";
		$s .= " GROUP BY pg_catalog.pg_constraint.conname;";

		$r = $this->getAsArray($s);

		$c = array();
		if (is_array($r))
		foreach ($r as $item) {
			$s = "SELECT information_schema.constraint_column_usage.column_name as column_name FROM pg_catalog.pg_constraint ";
			$s .= " INNER JOIN information_schema.constraint_column_usage ";
			$s .= " ON information_schema.constraint_column_usage.constraint_name = pg_catalog.pg_constraint.conname ";
			$s .= " WHERE information_schema.constraint_column_usage.table_schema = '$schema' ";
			$s .= " AND information_schema.constraint_column_usage.table_name = '$table' ";
			$s .= " AND pg_catalog.pg_constraint.conname = '{$item['constraint_name']}'";

			$rr = $this->getAsArray($s);

			$fields = array();
			if (is_array($rr))
			foreach ($rr as $it){
				$fields[] = $it['column_name'];
			}
			$c[] = array(
	                    "name" => $item['constraint_name'],
	                    "fields" => $fields
			);
		}
		return $c;
	}

	/**
	 * Get check constraints
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getCheckConstraints($schema, $table) {
		$s = "SELECT pg_catalog.pg_constraint.conname as constraint_name, pg_catalog.pg_constraint.consrc as consrc FROM pg_catalog.pg_constraint ";
		$s .= " INNER JOIN information_schema.constraint_column_usage ";
		$s .= " ON information_schema.constraint_column_usage.constraint_name = pg_catalog.pg_constraint.conname ";
		$s .= " WHERE information_schema.constraint_column_usage.table_schema = '$schema' and information_schema.constraint_column_usage.table_name = '$table' AND pg_catalog.pg_constraint.contype = 'c'";
		$s .= " GROUP BY pg_catalog.pg_constraint.conname,pg_catalog.pg_constraint.consrc;";

		$r = $this->getAsArray($s);
		$c = array();
		if (is_array($r))
		foreach ($r as $item) {
			$s = "SELECT information_schema.constraint_column_usage.column_name as column_name FROM pg_catalog.pg_constraint ";
			$s .= " INNER JOIN information_schema.constraint_column_usage ";
			$s .= " ON information_schema.constraint_column_usage.constraint_name = pg_catalog.pg_constraint.conname ";
			$s .= " WHERE information_schema.constraint_column_usage.table_schema = '$schema' ";
			$s .= " AND information_schema.constraint_column_usage.table_name = '$table' ";
			$s .= " AND pg_catalog.pg_constraint.contype = 'c' AND pg_catalog.pg_constraint.conname = '{$item['constraint_name']}'";

			$rr = $this->getAsArray($s);
			$fields = array();
			if (is_array($rr))
			foreach ($rr as $it)
			$fields[] = $it['column_name'];

			$c[] = array(
                    "name" => $item['constraint_name'],
                    "expresion" => $item['consrc'],
                    "fields" => $fields
			);
		}
		return $c;
	}

	/**
	 * Generate a files with database metadata information
	 *
	 * @param string $folder
	 * @param stdClass $options
	 */
	public function generateMetadataFiles($folder, $options = null){
		$fecha = date("Y-m-d h:i:s");
		$folder = trim($folder);
		if (is_array($options)) $options = get_object_vars($options);
		if (substr($folder, strlen($folder)-1,1) != "/") $folder .= "/";
		if (substr($options->metadata,0,strlen($folder)) == $folder) $options->metadata = substr($options->metadata,strlen($folder));
		if (substr(PACKAGES.$options->metadata,0,strlen($folder)) == $folder) $options->metadata = substr(PACKAGES.$options->metadata, strlen($folder));
		//--------------------------------------------------------------------------- MAIN FILE

		$tables = $this->getTables();
		$f = fopen($folder . "{$options->metadata}", "w");

		fputs($f, "/** \n");
		fputs($f, "  *  _______________________________________ /    /\n");
		fputs($f, "  * |                                       |    /\n");
		fputs($f, "  * |         Ramifip ORM JSON Model        |   /\n");
		fputs($f, "  * |      generated by rpORMGenerator      |  /\n");
		fputs($f, "  * |       from a PostgreSQL database      | /\n");
		fputs($f, "  * |_______________________________________|/\n");
		fputs($f, "  *  - - - - - - - - - - - - - - - - - - - - \n");
		fputs($f, "  * | original name of database: {$this->dbname} \n");
		fputs($f, "  * | $fecha \n");
		fputs($f, "  *  - - - - - - - - - - - - - - - - - -  \n");
		fputs($f, "  */ \n");
		fputs($f, "  //-$ $fecha \n");
		fputs($f, "\n");
		fputs($f, "{ \n");
		fputs($f, " data: { \n");
		fputs($f, "	prefix: \"\", \n");
		fputs($f, "	tabledefs: [ \n");

		$first = true;
		if (is_array($tables)){
			foreach ($tables as $table) {
				$table_schema = $table['table_schema'];
				$table_name = $table['table_name'];

				if ($options != null){
					if (isset($options->tables_ignored)){
						if (isset($options->tables_ignored["$table_schema.$table_name"])) {
							continue;
						}
					}
					if (isset($options->schemas)){
						if (array_search($table_schema, $options->schemas) === false)
						continue;
					}
				}
				if ($first == false){
					fputs($f, ", \n");
				}

				fputs($f, "	            \"" . $table_schema . "." . $table_name . ".metadata\"");

				$first = false;
			}
		}
		fputs($f, "\n" . '              ],' . "\n");

		$views = $this->getViews();

		fputs($f, "\n" . '    viewdefs: [' . "\n");

		$primero = true;
		if (is_array($views)){
			foreach ($views as $view) {
				$table_schema = $view['table_schema'];
				$table_name = $view['table_name'];

				if (isset($options->schemas)){
					if (array_search($table_schema, $options->schemas) === false){
						continue;
					}
				}

				if ($primero == false)
				fputs($f, ", \n");

				fputs($f, "	            \"" . $table_schema . "." . $table_name . ".metadata\"");

				$primero = false;
			}
		}

		fputs($f, "\n" . '              ],' . "\n");
		fputs($f, "\n" . '    functiondefs: [' . "\n");

		$functions = $this->getRoutines();

		$primero = true;
		if (is_array($functions)){
			foreach ($functions as $function) {
				$schema = $function['specific_schema'];

				if (isset($options->schemas)){
					if (array_search($table_schema, $options->schemas) === false){
						continue;
					}
				}

				if ($primero == false)
				fputs($f, ", \n");

				$primero = false;
				fputs($f, '                  "' . $schema . "." . $function['specific_name'] . '.metadata"');
			}
		}
		fputs($f, "\n" . '              ]' . "\n");
		fputs($f, "\n" . '   }' . "\n");
		fputs($f, '}' . "\n");
		fclose($f);

		//--------------------------------------------------------------------------- FUNCTIONS

		if (is_array($functions)){
			foreach ($functions as $function) {
				rpRobot::debugMsg("Creating metadata for FUNCTION ".$function['specific_schema'].".".$function['specific_name'],"  ",true,true);

				$schema = $function['specific_schema'];

				if ($options != null){
					if (isset($options->schemas)){
						if (array_search($table_schema, $options->schemas) === false){
							continue;}
					}
				}

				$f = fopen($folder . "$schema." . $function['specific_name'] . ".metadata", "w");

				fputs($f, "/** \n");
				fputs($f, "  *  _______________________________________ /    /\n");
				fputs($f, "  * |                                       |    /\n");
				fputs($f, "  * |      Ramifip ORM JSON SubModel        |   /\n");
				fputs($f, "  * |      generated by rpORMGenerator      |  /\n");
				fputs($f, "  * |      from a PostgreSQL function       | /\n");
				fputs($f, "  * |_______________________________________|/\n");
				fputs($f, "  *  - - - - - - - - - - - - - - - - - - - - \n");
				fputs($f, "  * |    schema: $schema \n");
				fputs($f, "  * |  function: " . $function['routine_name'] . " \n");
				fputs($f, "  * |  $fecha \n");
				fputs($f, "  *  - - - - - - - - - - - - - - - - - -  \n");
				fputs($f, "  */ \n");
				fputs($f, "  //-$ $fecha \n");
				fputs($f, "\n");
				fputs($f, '{' . "\n");
				fputs($f, '   schema: "' . $function['specific_schema'] . '",' . "\n");
				fputs($f, '     name: "' . $function['routine_name'] . '",' . "\n");
				fputs($f, '   return: "' . $function['data_type'] . '",' . "\n");
				fputs($f, '   return_specific: "' . $function['type_udt_name'] . '",' . "\n");
				fputs($f, '   params: [' . "\n");

				$parameters = $this->getRoutineParams($function['specific_name']);

				$ini = true;
				if (is_array($parameters)){
					foreach ($parameters as $param) {
						if ($ini == false){
							fputs($f, ", \n");
						}
						$ini = false;
						fputs($f, '         {' . "\n");
						fputs($f, '            name: "' . $param['parameter_name'] . '",' . "\n");
						fputs($f, '       data_type: "' . $this->getMapType($param['data_type']) . '",' . "\n");
						fputs($f, '            mode: "' . $param['parameter_mode'] . '"' . "\n");
						fputs($f, '         }');
					}
				}
				fputs($f, "\n" . '       ]' . "\n");
				fputs($f, "\n" . '}' . "\n");
				fclose($f);
			}
		}

		//----------------------------------------------------------------------- TABLES
		if (is_array($tables)){
			foreach ($tables as $table) {
				
				$table_schema = $table['table_schema'];
				$table_name = $table['table_name'];
				
				rpRobot::debugMsg("Creating metadata for TABLE $table_schema.$table_name","  ",true,true);

				if ($options != null){
					if (isset($options->tables_ignored["$table_schema.$table_name"])) {
						continue;
					}

					if (isset($options->schemas)){
						if (array_search($table_schema, $options->schemas) === false){
							continue;
						}
					}
				}

				$f = fopen($folder . "$table_schema." . $table_name . ".metadata", "w");

				fputs($f, "/** \n");
				fputs($f, "  *  _______________________________________ /    /\n");
				fputs($f, "  * |                                       |    /\n");
				fputs($f, "  * |          Ramifip ORM JSON SubModel    |   /\n");
				fputs($f, "  * |       generated by rpORMGenerator     |  /\n");
				fputs($f, "  * |         from a PostgreSQL table       | /\n");
				fputs($f, "  * |_______________________________________|/\n");
				fputs($f, "  *  - - - - - - - - - - - - - - - - - - - - \n");
				fputs($f, "  * | schema: $table_schema \n");
				fputs($f, "  * | table: $table_name \n");
				fputs($f, "  * | $fecha \n");
				fputs($f, "  *  - - - - - - - - - - - - - - - - - -  \n");
				fputs($f, "  */ \n");
				fputs($f, "  //-$ $fecha \n");
				fputs($f, "\n");
				fputs($f, "{ \n");
				fputs($f, '  schema: "' . $table_schema . '",' . "\n");
				fputs($f, '    name: "' . $table_name . '",' . "\n");
				fputs($f, '   title: "' . $table_name . '",' . "\n");
				fputs($f, '  plural: "' . $table_name . '",' . "\n");
				fputs($f, "  fields: [" . "\n");


				$columns = $this->getColumns($table_schema, $table_name);
				$i = 0;
				foreach ($columns as $column) {

					if ($options != null){
						if (isset($options->columns_ignored)){
							if (isset($options->columns_ignored["$table_schema.$table_name.{$column['column_name']}"])) {
								continue;
							}
						}
					}

					$i++;
					if ($i > 1)
					fputs($f, ',' . "\n");
					$nulo = 'false';
					if ($column['is_nullable'] == "YES")
					$nulo = 'true';

					if ($column['character_maximum_length'] == '')
					$long = '255'; else
					$long = $column['character_maximum_length'];

					$type = $this->getMapType($column['data_type']);

					// Data type force?
					if ($options != null){
						if (isset($options->force_type)){
							if (isset($options->force_type["$table_schema.$table_name.{$column['column_name']}"])){
								$type = $options->force_type["$table_schema.$table_name.{$column['column_name']}"];
							}
							elseif (isset($options->force_type["$table_name.{$column['column_name']}"])){
								$type = $options->force_type["$table_name.{$column['column_name']}"];
							}
							elseif (isset($options->force_type["{$column['column_name']}"])){
								$type = $options->force_type["{$column['column_name']}"];
							}
						}
					}

					fputs($f, '            {' . "\n");
					fputs($f, '                 name: "' . $column['column_name'] . '", ' . "\n");
					fputs($f, '                 type: "' . $type . '", ' . "\n");
					fputs($f, '                 long: ' . $long . ',' . "\n");
					fputs($f, '              default: "' . $column['column_default']. '",' . "\n");
					fputs($f, '            allownull: ' . $nulo . "\n");
					fputs($f, '            }');
				}

				$pconstraints = $this->getPrimaryKeys($table_schema, $table_name);

				$llave = "";
				$ya = array();
				if (is_array($pconstraints))
				foreach ($pconstraints as $row) {
					$fieldn = $this->getConstraintColumnUsage($row['constraint_name']);
					$primera = true;
					foreach ($fieldn as $r) {
						if (!isset($ya[$r['column_name']])) { // a veces sale repetido un campo
							// podre resolverlo con un group by en la consulta?
							if ($primera == false){
								$llave .= ', ';
							}
							$llave .='"' . $r['column_name'] . '"';
							$primera = false;
							$ya[$r['column_name']] = true;
						}
					}
				}

				$fconstraints = parent::getForeignKeys($table_schema, $table_name);

				$foraneas = "";
				$primera = true;
				if (is_array($fconstraints))
				foreach ($fconstraints as $row) {
					if ($primera == false){
						$foraneas .= ", \n";
					}
					$primera = false;
					$foraneas .= '                   {' . "\n" . '                    foreign_name: "'.$row['constraint_name'].'",'."\n";
					$foraneas .= '                    fields: [' . "\n";

					$fieldn = $this->getKeyColumnUsageOfTable($table_schema, $table_name, $row['constraint_name']);
					$fieldnn = $this->getConstraintColumnUsage($row['constraint_name']);

					$ff = "";
					$primero = true;
					foreach ($fieldn as $k => $r) {
						if ($primero == false)
						$ff .= ", \n";
						$primero = false;
						$ff .= '                              {' . "\n" . '                                localfield: "' . $r['column_name'] . '", ' . "\n" . '                                foreign_key: "' . $fieldnn[$k]['column_name'] . '"' . "\n" . '                              }';
					}
					$foraneas .= $ff . "\n" . '                            ], ' . "\n" . '                    foreign_schema: "' . $fieldnn[0]['table_schema'] . '",' . "\n" . '                    foreign_table: "' . $fieldnn[0]['table_name'] . '", ' . "\n" . '                    on_delete_cascade: true, ' . "\n" . '                    on_update_cascade: true' . "\n" . '                   }';
				}

				fputs($f, "\n" . '   ],' . "\n" . '   primary_key: [' . $llave . '],' . "\n" . '   foreign_keys: [' . "\n" . $foraneas . "\n" . '               ],' . "\n");

				$uniques = $this->getUniqueConstraints($table_schema, $table_name);

				fputs($f, '   unique: [' . "\n");
				foreach ($uniques as $unique) {
					fputs($f, '        {' . "\n");
					fputs($f, "           name: '{$unique['name']}',\n");
					fputs($f, "           fields: [\n");
					$i = 0;
					foreach ($unique['fields'] as $ufield){
						fputs($f, "                  {name: '{$ufield}'}" . ($i++ < count($unique['fields']) - 1 ? "," : "") . "\n");
					}
					fputs($f, "           ]\n");
					fputs($f, '        }' . "\n");
				}
				fputs($f, '   ],' . "\n");

				$checks = $this->getCheckConstraints($table_schema, $table_name);
				fputs($f, '   checks: [' . "\n");
				foreach ($checks as $check) {
					$check['expresion'] = str_replace('"','\"', $check['expresion']);
					fputs($f, '        {' . "\n");
					fputs($f, "           name: '{$check['name']}',\n");
					fputs($f, "           expresion: \"{$check['expresion']}\",\n");
					fputs($f, "           fields: [\n");
					$i = 0;
					foreach ($check['fields'] as $ccheck){
						fputs($f, "                  {name: '{$ccheck}'}" . ($i++ < count($check['fields']) - 1 ? "," : "") . "\n");
					}
					fputs($f, "           ]\n");
					fputs($f, '        }' . "\n");
				}
				fputs($f, '   ]' . "\n");

				fputs($f, " }\n");
				fclose($f);
			}
		}

		// ------------------------------------------------------------------------ VIEWS

		if (is_array($views)){
			foreach ($views as $view) {
				$table_schema = $view['table_schema'];
				$table_name = $view['table_name'];

				rpRobot::debugMsg("Creating metadata for TABLE $table_schema.$table_name...","  ",true,true);


				if ($options != null){
					if (isset($options->schemas)){
						if (array_search($table_schema, $options->schemas) === false){
							continue;
						}
					}
				}

				$f = fopen($folder . "$table_schema." . $table_name . ".metadata", "w");

				fputs($f, "/** \n");
				fputs($f, "  *  _______________________________________ /    /\n");
				fputs($f, "  * |                                       |    /\n");
				fputs($f, "  * |          Ramifip JSON SubModel        |   /\n");
				fputs($f, "  * |   generated by PHP-MDA Model Creator  |  /\n");
				fputs($f, "  * |         from a PostgreSQL view        | /\n");
				fputs($f, "  * |_______________________________________|/\n");
				fputs($f, "  *  - - - - - - - - - - - - - - - - - - - - \n");
				fputs($f, "  * | schema: $table_schema \n");
				fputs($f, "  * |   view: $table_name \n");
				fputs($f, "  * |   $fecha \n");
				fputs($f, "  *  - - - - - - - - - - - - - - - - - -  \n");
				fputs($f, "  */ \n");
				fputs($f, "  //-$ $fecha \n");
				fputs($f, "\n");

				fputs($f, "{ \n");
				fputs($f, '  schema: "' . $table_schema . '",' . "\n");
				fputs($f, '    name: "' . $table_name . '",' . "\n");
				fputs($f, '   title: "' . $table_name . '",' . "\n");
				fputs($f, '  plural: "' . $table_name . '",' . "\n");
				fputs($f, '     SQL: "' . $view['view_definition'] . '",' . "\n");
				fputs($f, "} \n");
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
			default:
				$value = parent::checkField($value, $type);
		}

		return $value;
	}

	/**
	 * Disconnect from the server
	 */
	public function Disconnect() {
		if ($this->connection) {
			pg_close($this->connection);
		}
	}

}

// End of file