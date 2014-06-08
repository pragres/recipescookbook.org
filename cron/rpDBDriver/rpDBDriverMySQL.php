<?php

/**
 * Ramifip ORM for PHP
 * rpDBDriverMySQL
 * MySQL Database Server Driver
 * Common methods for working with database servers
 */

class rpDBDriverMySQL extends rpDBDriver {

	var $map_type = array("varchar"=>"string","date"=>"date","timestamp"=>"timestamp");

	/**
	 * Constructor
	 * @param <type> $url
	 */
	public function __construct($url) {
		$this->url = $url;
		$port = 3306;
		$url = parse_url($url);
		if (isset($url['scheme'])) $this->dbtype = $url['scheme'];
		if (isset($url['user'])) $this->user = $url['user'];
		if (isset($url['pass'])) $this->pass = $url['pass'];
		if (isset($url['host'])) $this->host = $url['host'];
		if (isset($url['path'])) $this->dbname = substr($url['path'], 1);
		if (isset($url['port'])) $this->port = $url['port'];

		$this->Connect();
		if (!$this->connection) die("Failed the connection to the database {$this->url}");
	}

	/**
	 * Connect to database
	 * @return boolean
	 */
	public function Connect() {
		$this->connection = mysql_connect($this->host.":".$this->port, $this->user, $this->pass);
		mysql_select_db($this->dbname, $this->connection);
		if ($this->connection) return true;
		return false;
	}

	/**
	 * Return query result
	 * @return resource
	 */
	public function getDefault($sql) {
		return mysql_query($sql, $this->connection);
	}

	/**
	 * Return array of objects. Each record as object.
	 *
	 * @param string $sql
	 * @return array;
	 */
	public function getAsObjects($sql) {
		$sql = str_replace("\'", "'", $sql);
		if ($this->connection) {
			if ($this->executing_bulk_transaction == true) {
				if ($transaction_id == null)
				$this->bulk_transactions[] = array("sql" => $sql, "result" => null, "as_objects" => true);
				else
				$this->bulk_transactions[$transaction_id] = array("sql" => $sql, "result" => null, "as_objects" => true);
				return true;
			} else {
				$result = $this->getDefault($sql);
				$array = array();
				while ($row = mysql_fetch_object($result)) {
					$array[] = $row;
				}
				return $array;
			}
		}
		return false;
	}


	/**
	 * Returns array of array. Each record as array with each fieldname as array item key.
	 * @param string $sql
	 * @return array
	 */
	public function getAsArray($sql) {
		$sql = str_replace("\'", "'", $sql);
		if ($this->connection) {
			if ($this->executing_bulk_transaction == true) {
				if ($transaction_id == null)
				$this->bulk_transactions[] = array("sql" => $sql, "result" => null, "as_objects" => false);
				else
				$this->bulk_transactions[$transaction_id] = array("sql" => $sql, "result" => null, "as_objects" => false);
				return true;
			} else {
				$result = $this->getDefault($sql);
				$array = array();
				if (!is_bool($result) && !is_numeric($result)) {
					if (mysql_num_rows($result) > 0)
					while ($row = mysql_fetch_array($result)) {
						foreach ($row as $k => $dat) {
							if (is_numeric($k))
							unset($row[$k]);
						}
						$array[] = $row;
					}
					return $array;
				} else
				return array('result' => 'ok');
			}
		}
		return false;
	}


	/**
	 * Check Field
	 * @param mixed $value
	 * @param string $type
	 * @return mixed
	 */
	public function checkField($value, $type) {

		switch ($type) {
			case 'boolean':
				if ($value == true || $value == 0 || $value == 't') {
					$value = '1';
				}
				else {
					$value = '0';
				}
				break;
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
			mysql_close($this->connection);
		}
	}


	/**
	 * Return a list of database/schema tables
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getTables($schema = null){
		if ($schema == null) $schema = $this->dbname;
		return parent::getTables($schema);
	}

	/**
	 * Return a list of database/schema views
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getViews($schema = null){
		if ($schema == null) $schema = $this->dbname;
		return parent::getViews($schema);
	}

	/**
	 * Return a list of database/schema routines
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getRoutines($schema = null){
		if ($schema == null) $schema = $this->dbname;
		return parent::getRoutines($schema);
	}

	/**
	 * Return the parameters of routine
	 *
	 * @param string $routine
	 * @param string $schema
	 * @return array
	 */
	public function getRoutineParams($routine, $schema = null){
		if ($schema == null) $schema = $this->dbname;
		return parent::getRoutineParams($routine, $schema);
	}

	/**
	 * Return the columns list of a table
	 *
	 * @param string $table_name
	 * @param string $schema
	 * @return array
	 */
	public function getColumns($table_name, $schema = null){
		if ($schema == null) $schema = $this->dbname;
		return parent::getColumns($schema, $table_name);
	}

	/**
	 * Return the primary keys list of a table
	 *
	 * @param string $table_name
	 * @param string $schema
	 * @return array
	 */
	public function getPrimaryKeys($table_name, $schema = null){
		if ($schema == null) $schema = $this->dbname;
		return parent::getPrimaryKeys($this->dbname, $table_name);
	}

	/**
	 * Return the  foreign keys list of a table
	 *
	 * @param string $table_name
	 * @param string $schema
	 * @return array
	 */
	public function getForeignKeys($table_name, $schema = null){
		if ($schema == null) $schema = $this->dbname;
		return parent::getForeignKeys($this->dbname, $table_name);
	}

	/**
	 * Return a list of key column usage of table
	 *
	 * @param string $schema
	 * @param string $table
	 * @return array
	 */
	public function getKeyColumnUsageOfTable($table_name, $constraint_name, $schema = null){
		if ($schema == null) $schema = $this->dbname;
		return $this->getAsArray("select * from information_schema.key_column_usage where constraint_name = '$constraint_name' and table_schema = '$schema' and table_name = '$table_name' order by ordinal_position;");
	}

	/**
	 * Generate a metadata file of the database information as JSON
	 *
	 * @param string $folder
	 * @param array $options
	 */
	public function generateMetadataFiles($folder, $options = array()){

		$fecha = date("Y-m-d h:i:s");
		$dbname = $this->dbname;
		$mtf = $options->metadata;
		if (is_array($options)){
			$t = $options;
			$options = new stdClass();
			foreach ($t as $key => $value) $options->$key = $value;
		}

		$folder = trim($folder);
		if (substr($folder, strlen($folder)-1,1) != "/") $folder .= "/";

		//--------------------------------------------------------------------------- MAIN FILE
		$tables = $this->getTables();

		$f = fopen(PACKAGES.$mtf, "w");
		fputs($f, "/** \n");
		fputs($f, "  *  _______________________________________ /    /\n");
		fputs($f, "  * |                                       |    /\n");
		fputs($f, "  * |          Ramifip JSON Model           |   /\n");
		fputs($f, "  * |   generated by Ramifip ReverseDB Job  |  /\n");
		fputs($f, "  * |          from a MySQL database        | /\n");
		fputs($f, "  * |_______________________________________|/\n");
		fputs($f, "  *  - - - - - - - - - - - - - - - - - - - - \n");
		fputs($f, "  * | original name of database: $dbname \n");
		fputs($f, "  * | $fecha \n");
		fputs($f, "  *  - - - - - - - - - - - - - - - - - -  \n");
		fputs($f, "  */ \n");
		fputs($f, "  //-$ $fecha \n");
		fputs($f, "\n");
		fputs($f, "{ \n");
		fputs($f, " data: { \n");
		fputs($f, " prefix: \"\", \n");
		fputs($f, " tabledefs: [ \n");

		$primero = true;

		if (is_array($tables)) foreach ($tables as $table) {
			
			$table_schema = $table['TABLE_SCHEMA'];
			$table_name = $table['TABLE_NAME'];

			// Ignorando tablas
			if (isset($options->tables_ignored["$table_schema.$table_name"])) continue;
			if (isset($options->tables_ignored["$table_name"])) continue;

			if ($primero == false) fputs($f, ", \n");

			fputs($f, "             \"" . $table_schema . "." . $table_name . ".metadata\"");

			$primero = false;
		}
		fputs($f, "\n" . '              ],' . "\n");

		// ------------------ MYSQL VIEWS ------------------------- //


		$vistas = $this->getViews();

		fputs($f, "\n" . '    viewdefs: [' . "\n");

		$primero = true;
		if (is_array($vistas)) foreach ($vistas as $vista) {
			$table_schema = $vista['TABLE_SCHEMA'];
			$table_name = $vista['TABLE_NAME'];

			if ($primero == false) fputs($f, ", \n");

			fputs($f, "             \"" . $table_schema . "." . $table_name . ".metadata\"");

			$primero = false;
		}
		fputs($f, "\n" . '              ],' . "\n");
		fputs($f, "\n" . '    functiondefs: [' . "\n");

		$funciones = $this->getRoutines();

		$primero = true;
		if (is_array($funciones)) foreach ($funciones as $funcion) {

			$schema = $funcion['ROUTINE_SCHEMA'];

			if (isset($options->schemas)) if (rpLArrays::search($options->schemas, $table_schema) == false) continue;

			if ($primero == false) fputs($f, ", \n");
			$primero = false;
			fputs($f, '                  "' . $schema . "." . $funcion['specific_name'] . '.metadata"');
		}

		fputs($f, "\n" . '              ]' . "\n");
		fputs($f, "\n" . '   }' . "\n");
		fputs($f, '}' . "\n");
		fclose($f);

		$f = null;
		if (is_array($funciones)) foreach ($funciones as $funcion) {
			$schema = $funcion['ROUTINE_SCHEMA'];

			$f = fopen($folder . "/$schema." . $funcion['SPECIFIC_NAME'] . ".metadata", "w");

			fputs($f, "/** \n");
			fputs($f, "  *  _______________________________________ /    /\n");
			fputs($f, "  * |                                       |    /\n");
			fputs($f, "  * |          Ramifip JSON SubModel        |   /\n");
			fputs($f, "  * |   generated by Ramifip ReverseDB Job  |  /\n");
			fputs($f, "  * |         from a MySQL function         | /\n");
			fputs($f, "  * |_______________________________________|/\n");
			fputs($f, "  *  - - - - - - - - - - - - - - - - - - - - \n");
			fputs($f, "  * |    schema: $schema \n");
			fputs($f, "  * |  function: " . $funcion['ROUTINE_NAME'] . " \n");
			fputs($f, "  *  - - - - - - - - - - - - - - - - - -  \n");
			fputs($f, "  */ \n");
			fputs($f, "  //-$ $fecha \n");
			fputs($f, "\n");
			fputs($f, '{' . "\n");
			fputs($f, '   schema: "' . $funcion['ROUTINE_SCHEMA'] . '",' . "\n");
			fputs($f, '     name: "' . $funcion['ROUTINE_NAME'] . '",' . "\n");
			fputs($f, '   return: "' . $funcion['DATA_TYPE'] . '",' . "\n");
			fputs($f, '   return_specific: "' . $funcion['DATA_TYPE'] . '",' . "\n");
			fputs($f, '   params: [' . "\n");

			$parametros = $this->getRoutineParams($funcion['ROUTINE_NAME']);

			$ini = true;
			if (is_array($parametros)) foreach ($parametros as $param) {
			 if ($ini == false) fputs($f, ", \n");
			 $ini = false;
			 fputs($f, '         {' . "\n");
			 fputs($f, '            name: "' . $param['PARAMETER_NAME'] . '",' . "\n");
			 fputs($f, '       data_type: "' . getMapaType($param['DATA_TYPE']) . '",' . "\n");
			 fputs($f, '            mode: "' . $param['PARAMETER_MODE'] . '"' . "\n");
			 fputs($f, '         }');
			}

			fputs($f, "\n" . '       ]' . "\n");
			fputs($f, "\n" . '}' . "\n");
		}

		if ($f != null)	fclose($f);

		if (is_array($tables)) foreach ($tables as $table){

			$table_schema = $table['TABLE_SCHEMA'];
			$table_name = $table['TABLE_NAME'];

			//ignorando tablas
			if (isset($options->tables_ignored["$table_schema.$table_name"])) continue;

			$f = fopen($folder . "$table_schema." . $table_name . ".metadata", "w");

			fputs($f, "/** \n");
			fputs($f, "  *  _______________________________________ /    /\n");
			fputs($f, "  * |                                       |    /\n");
			fputs($f, "  * |          Ramifip JSON SubModel        |   /\n");
			fputs($f, "  * |   generated by PHP-MDA Model Creator  |  /\n");
			fputs($f, "  * |            from a MySQL table         | /\n");
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

			$columns = $this->getColumns($table_name);

			$i = 0;
			foreach ($columns as $column) {

				//ignorando columnas
				if (isset($options->columns_ignored["$table_schema.$table_name.{$column['COLUMN_NAME']}"])) continue;

				$i++;
				if ($i > 1)
				fputs($f, ',' . "\n");
				$nulo = 'false';
				if ($column['IS_NULLABLE'] == "YES") $nulo = 'true';

				$unico = 'false';
				if (isset($column['COLUMN_KEY'])) $unico = ($column['COLUMN_KEY'] == "UNI")?"true":"false";

				//TODO: falta sacarlo de la metadata

				if ($column['CHARACTER_MAXIMUM_LENGTH'] == '') $long = '255'; else $long = $column['CHARACTER_MAXIMUM_LENGTH'];

				$type = $this->getMapType($column['DATA_TYPE']);

				if (isset($options->force_types)){
					if (isset($options->force_types[$column['COLUMN_NAME']]))
					$type = $options->force_types[$column['COLUMN_NAME']];

					if (isset($options->force_types[$table_name.".".$column['COLUMN_NAME']]))
					$type = $options->force_types[$table_name.".".$column['COLUMN_NAME']];

					if (isset($options->force_types[$table_schema.".".$table_name.".".$column['COLUMN_NAME']]))
					$type = $options->force_types[$table_schema.".".$table_name.".".$column['COLUMN_NAME']];
				}

				fputs($f, '            {' . "\n");
				fputs($f, '                 name: "' . $column['COLUMN_NAME'] . '", ' . "\n");
				fputs($f, '                 type: "' . $type . '", ' . "\n");
				fputs($f, '                 long: ' . $long . ',' . "\n");
				fputs($f, '            allownull: ' . $nulo . ',' . "\n");
				fputs($f, '               unique: ' . $unico . "\n");
				fputs($f, '            }');
			}

			$pconstraints = $this->getPrimaryKeys($table_name);

			$llave = "";
			$ya = array();
			if (is_array($pconstraints)) foreach ($pconstraints as $row) {
				$fieldn = $this->getKeyColumnUsageOfTable($table_name, $row['CONSTRAINT_NAME']);

				$primera = true;
				foreach ($fieldn as $r) {
					if (!isset($ya[$r['COLUMN_NAME']])) {  // a veces sale repetido un campo
						// podre resolverlo con un group by en la consulta?
						if ($primera == false)
						$llave .= ', ';
						$llave .='"' . $r['COLUMN_NAME'] . '"';
						$primera = false;
						$ya[$r['COLUMN_NAME']] = true;
					}
				}
			}

			$rkeys = $this->getKeyColumnUsage();
			$fconstraints = $this->getForeignKeys($table_name);

			$foraneas = "";
			$primera = true;
			if (is_array($fconstraints))
			foreach ($fconstraints as $row) {
				if ($primera == false) $foraneas .= ", \n";
				$primera = false;
				$foraneas .= '                   {' . "\n" . '                    fields: [' . "\n";
				$fieldn = $this->getKeyColumnUsageOfTable($table_name, $row['CONSTRAINT_NAME']);
				$fieldnn = $this->getConstraintColumnUsage($row['CONSTRAINT_NAME']);
				$ff = "";
				$primero = true;
				foreach ($fieldn as $k => $r) {
					if ($primero == false)
					$ff .= ", \n";
					$primero = false;
					$ff .= '                              {' . "\n" . '                                localfield: "' . $r['COLUMN_NAME'] . '", ' . "\n" . '                                foreign_key: "' . $r['REFERENCED_COLUMN_NAME'] . '"' . "\n" . '                              }';
				}
				$foraneas .= $ff . "\n" . '                            ], ' . "\n" . '                    foreign_schema: "' . $fieldn[0]['REFERENCED_TABLE_SCHEMA'] . '",' . "\n" . '                    foreign_table: "' . $fieldn[0]['REFERENCED_TABLE_NAME'] . '", ' . "\n" . '                    on_delete_cascade: true, ' . "\n" . '                    on_update_cascade: true' . "\n" . '                   }';
			}

			fputs($f, "\n" . '   ],' . "\n" . '   primary_key: [' . $llave . '],' . "\n" . '   foreign_keys: [' . "\n" . $foraneas . "\n" . '               ]' . "\n");
			fputs($f, " }\n");
			fclose($f);
		}

		if (is_array($vistas)) foreach ($vistas as $vista) {
			$table_schema = $vista['TABLE_SCHEMA'];
			$table_name = $vista['TABLE_NAME'];

			$f = fopen($folder . "$table_schema." . $table_name . ".metadata", "w");

			fputs($f, "/** \n");
			fputs($f, "  *  _______________________________________ /    /\n");
			fputs($f, "  * |                                       |    /\n");
			fputs($f, "  * |          Ramifip JSON SubModel        |   /\n");
			fputs($f, "  * |   generated by PHP-MDA Model Creator  |  /\n");
			fputs($f, "  * |           from a MySQL view           | /\n");
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
			fputs($f, '     SQL: "' . $vista['VIEW_DEFINITION'] . '",' . "\n");
			fputs($f, "} \n");
		}

	}
}

// End of file