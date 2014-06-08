<?php

/**
 * Ramifip ORM for PHP
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

class rpORM {

	var $options = array();
	var $metadata = null;
	var $folder = "./";
	var $phpkeywords = array("echo", "print", "if", "else", "function", "class", "public", "private", "fputs", "print_r");

	/**
	 * Constructor
	 *
	 * @param string $metadatafile
	 * @param string $folder
	 * @param array $options
	 * @return rpORM
	 */
	public function __construct($metadatafile, $folder = null, $options = null){

		$this->metadata = $this->loadMetadata($metadatafile);
		if ($folder == null) $folder = $this->getFolderOf($metadatafile);
		$folder = trim($folder);
		if (substr($folder,strlen($folder)-1,1) != "/")	$folder .= "/";
		$this->folder = $folder;
		if (!is_null($options))	$this->options = $options; else $this->options = new stdClass();
		if (is_array($options)) {
			$this->options = new stdClass();
			foreach($options as $key=>$value) $this->options->$key = $value;
		}
		if (!isset($this->options->id)) $this->options->id = null;
	}

	/**
	 * getFolderOf
	 * @param string $filename
	 * @return string
	 */
	public function getFolderOf($filename) {

		if (is_dir($filename)) return $filename;

		$folder = "";
		$arr = explode("/", $filename);
		$i = 0;

		foreach ($arr as $f) {
			$i++;
			if ($i < count($arr))
			$folder .= "$f/";
		}

		return $folder;
	}

	/**
	 * Load metadata
	 *
	 * @param string $modelfilename
	 * @return object
	 */

	public function loadMetadata($modelfilename) {

		$modelfilename = PACKAGES.$modelfilename;

		if (!file_exists($modelfilename)){
			die("Metadata '$modelfilename' not found! \n");
		}

		$metadata = new stdClass();

		// check dependences

		if (!class_exists("Services_JSON")){
			die("FATAL: Class Services_JSON not found\n");
		}

		$foldersrc = $this->getFolderOF($modelfilename);

		if (!file_exists($modelfilename)) $modelfilename = strtolower($modelfilename);

		if (file_exists($modelfilename)) {
			$json = new Services_JSON();
			$jsoncode = file_get_contents($modelfilename);
			$metadata = $json->decode($jsoncode);
			$metadata->data->tables = array();

			foreach ($metadata->data->tabledefs as $td) {
				if (ramifip::isCli()){
					rpCLI::msg("Loading the metadata $td","  ",true,true);
				}
				$jsoncode = file_get_contents($foldersrc . "$td");
				$metadata->data->tables[] = $json->decode($jsoncode);

			}

			$metadata->data->views = array();

			if (is_array($metadata->data->viewdefs))
			foreach ($metadata->data->viewdefs as $td) {
				$jsoncode = file_get_contents($foldersrc . "$td");
				$jtd = $json->decode($jsoncode);
				if (!isset($metadata->data->views[$jtd->schema])){
					$metadata->data->views[$jtd->schema] = array();
				}
				$metadata->data->views[$jtd->schema][] = $jtd;
			}

			$metadata->data->functions = array();

			foreach ($metadata->data->functiondefs as $td) {
				$jsoncode = file_get_contents($foldersrc . "$td");
				$jtd = $json->decode($jsoncode);
				if (!isset($metadata->data->functions[$jtd->schema])){
					$metadata->data->functions[$jtd->schema] = array();
				}
				$metadata->data->functions[$jtd->schema][] = $jtd;
			}
		}

		return $metadata;
	}

	/**
	 * Search the class name
	 *
	 * @param array $c
	 * @param string $classname
	 * @return boolean
	 */

	public function searchClassName(&$c, $classname) {
		if (is_array($c)) {
			foreach ($c as $s){
				if (is_array($s)){
					foreach ($s as $t){
						if ($classname === $t) return true;

					}
				}
			}
		}
		return false;
	}

	/**
	 * Create a class names from metadata
	 * @param <type> $m
	 * @return string
	 */
	public function classNames(&$m) {
		$prefix = "";
		if (isset($this->options->classname_prefix)) $prefix = $this->options->classname_prefix;
		$classNames = array();

		// Working with PUBLIC schema
		foreach ($m->data->tables as $t) {
			if ($m->data->tables == '')	$m->data->tables = 'public';
			if (!isset($classNames[$t->schema])) $prefix.$classNames[$t->schema] = array();

			if ($t->schema === '' || $t->schema === 'public') {
				$classNames['public'][$t->name] = $prefix.$this->camelCase($t->name);
			}
		}

		if (isset($classNames['public'])) $classNames[''] = $classNames['public'];

		// Working with ohter schemas
		foreach ($m->data->tables as $t) {
			if ($t->schema != '' && $t->schema != 'public') {
				$cn = $this->camelCase($t->name);
				if ($this->searchClassName($classNames, $cn) === true) {
					$cn = $cn . $this->camelCase($t->schema);
				}
				$classNames[$t->schema][$t->name] = $prefix.$cn;
			}
		}

		return $classNames;
	}

	/**
	 * Depure schema name
	 * @param string $schema
	 * @param string $concat
	 * @return string
	 */
	public function depureSchema($schema, $concat='.') {
		if ($schema != '') $schema.=$concat;
		return $schema;
	}

	/**
	 * Get code of PHP parameters
	 * @param object $metadata
	 * @param string $schema
	 * @param string $tablename
	 * @return string
	 */
	public function getPHPParams($metadata, $schema, $tablename, $defaultnull = false) {
		$table = $this->getTableObjectModel($metadata, $schema, $tablename);

		$fieldsphp = "";
		if ($table) {
			$i = 0;
			foreach ($table->fields as $field)
			if ($field->type != 'replica') {
				$i++;
				if ($i > 1)
				$fieldsphp = $fieldsphp . ", ";
				$fieldsphp = $fieldsphp . "$" . $field->name. ($defaultnull?" = null":"");
			}
		}
		return $fieldsphp;
	}

	/**
	 * getTableObjectModel
	 * @param <type> $metadata
	 * @param string $schema
	 * @param <type> $tablename
	 * @return <type>
	 */
	public function getTableObjectModel($metadata, $schema, $tablename) {
		if ($schema == 'public')
		$schema = '';

		$table = null;
		foreach ($metadata->data->tables as $tab) {
			if ($tab->schema == 'public')
			$tab->schema = '';
			if ($tab->name == $tablename && $schema == $tab->schema) {
				$table = $tab;
				break;
			}
		}

		return $table;
	}

	/**
	 * Return TRUE if datatype have a quotes
	 * @param <type> $type
	 * @return <type>
	 */
	public function haveQuotes($type) {
		if (isset($this->options->type_with_quote[$type])){
			return $this->options->type_with_quote[$type] === true;
		}
		return true;
	}

	/**
	 * needQuotes
	 * @param string $metadata
	 * @param string $schema
	 * @param string $table
	 * @param string $field
	 * @return string
	 */
	public function needQuotes($metadata, $schema, $table, $field) {
		foreach ($metadata->data->tables as $tablex) {
			if ($this->sameSchemas($tablex->schema, $schema) === true && $tablex->name == $table) {
				foreach ($tablex->fields as $fd) {
					if ($fd->name == $field){
						return $this->haveQuotes($fd->type);
					}
				}
			}
		}
		return null;
	}

	/**
	 * Return a CAMELCASE of text
	 * @param <type> $text
	 * @return string
	 */
	public function camelCase($text) {
		$s = '';
		$arr = explode("_", $text);
		$first = true;
		foreach ($arr as $word) {
			if ($first === true && $word == "rp") $s = "rp";
			else $s .= strtoupper(substr($word, 0, 1)) . substr($word, 1, strlen($word));
			$first = false;
		}
		return $s;
	}

	/**
	 * Return TRUE if the schemas are same
	 * @param string $s1
	 * @param string $s2
	 * @return string
	 */
	public function sameSchemas($s1, $s2) {
		if ($s1 == $s2)	return true;
		if ($s1 == 'public' && $s2 == '') return true;
		if ($s1 == '' && $s2 == 'public') return true;
		return false;
	}

	/**
	 * Compile Div code for generate PHP code
	 *
	 * @param string $template
	 * @param mixed $data
	 * @return string
	 */
	public function compileCode($template, $data){
		$tpl = new div($template, $data);
		$code = "$tpl";
		$code = str_replace("\n\n\n","\n\n",$code);
		$lines = explode("\n", $code);
		$newlines = array();
		foreach($lines as $line){
			if (trim($line) != "#" && trim($line) != "//"){
				$newlines[] = $line;
			}
		}
		$code = implode("\n",$newlines);
		return $code;
	}

	/**
	 * Return the methods for work with table's joins
	 *
	 * @param object $metadata
	 * @param object $table
	 * @return unknown
	 */
	public function getForeignMethods($metadata, $table){
		$classNames = $this->classNames($metadata);

		// Analizando llaves foraneas que apuntan a la tabla actual
		$foreign_methods = array();
		foreach ($metadata->data->tables as $tablex) {

			// todas las tablas excepto la actual
			if ($tablex->name != $table->name || $tablex->schema != $table->schema) {

				$fks = array();
				$yes = false;

				// buscando de todas las tablas las que tienen llaves foraneas apuntando a la tabla actual
				foreach ($tablex->foreign_keys as $fk) {
					if ($this->sameSchemas($fk->foreign_schema, $table->schema) && $fk->foreign_table == $table->name) {
						$fks[] = $fk;
						$yes = true;
					}
				}
				if ($yes == true) {
					$rcn = $classNames[$tablex->schema][$tablex->name];
					$foreign_methods[] = array(
							"rcn" => $rcn,
							"fks" => $fks
					);
				}
			}
		}
		return $foreign_methods;
	}

	/**
	 * Generate ORM PHP Class for work with tables
	 *
	 */
	public function generateORMTables(){

		$metadata = $this->metadata;
		$classNames = $this->classNames($metadata);
		$folder = $this->folder;

		$subfolder = "";
		if (isset($this->options->classes_subfolder_php)) {
			$subfolder = $this->options->classes_subfolder_php;
			if ($subfolder !=""){
				if (!file_exists($folder.$subfolder)) mkdir($folder.$subfolder);
			}
		}
			
		$esp = "|/-\\";
		$e = -1;
		foreach ($metadata->data->tables as $table) {
			$e++;
			if ($e==4) $e = 0;
			rpRobot::debugMsg("Generating ORM for '{$table->name}' table", $esp[$e], true, true);
			$classname = $classNames[$table->schema][$table->name];
			$metodosufijo = $this->camelCase($table->name);
			$tnombre = $this->depureSchema($table->schema) . $metadata->data->prefix . $table->name;
			$i = 0; $sqlfields = ""; foreach ($table->fields as $field) if ($i++ > 1) $sqlfields = $sqlfields . ","; $sqlfields = $sqlfields . $field->name;

			$fieldsbool = array();
			foreach ($table->fields as $field) if ($field->type == 'bool' || $field->type == 'boolean') {
				$fieldsbool[] = $field->name;
			}

			foreach ($table->foreign_keys as $k => $foranea) {
				$table->foreign_keys[$k]->foreign_class = $classNames[$foranea->foreign_schema][$foranea->foreign_table];
				$table->foreign_keys[$k]->foreign_namespace = $this->camelCase($table->foreign_keys[$k]->foreign_schema);
				if ($table->foreign_keys[$k]->foreign_namespace == "Public"){
					$table->foreign_keys[$k]->foreign_namespace = "";
				}
				$table->foreign_keys[$k]->foreign_prefix = $table->foreign_keys[$k]->foreign_namespace . $metadata->data->prefix . $this->camelCase($foranea->foreign_table);
				foreach($foranea->fields as $kk => $ff){
					$table->foreign_keys[$k]->fields[$kk]->localproperty = $this->camelCase($ff->localfield);
					$table->foreign_keys[$k]->fields[$kk]->foreignproperty = $this->camelCase($ff->foreign_key);
				}
			}

			foreach($table->fields as $k => $field){
				$table->fields[$k]->property_name = $this->camelCase($field->name);
			}

			$compile_vars = array(
				"classname" => $classname,
				"fields" => $table->fields,
				"fieldsbool" => $fieldsbool,
				"tablename" => $tnombre,
				"primary_keys" => $table->primary_key,
				"foreign_keys" => $table->foreign_keys,
				"foreign_methods" => $this->getForeignMethods($metadata, $table),
				"metadata" => addslashes(serialize($table)),
				"orm_id" => $this->options->id
			);

			file_put_contents($folder.$subfolder."/{$classname}Table.php", $this->compileCode("ramifip/modules/rpORM/templates/table", $compile_vars));
			file_put_contents($folder.$subfolder."/{$classname}Collection.php", $this->compileCode("ramifip/modules/rpORM/templates/collection", $compile_vars));
			file_put_contents($folder.$subfolder."/{$classname}Entity.php", $this->compileCode("ramifip/modules/rpORM/templates/entity",$compile_vars));
		}
		rpRobot::debugMsg("All classes for ORM was generated");
	}

	/**
	 * fixFunctionName
	 * @param <type> $n
	 * @param <type> $prefix
	 * @return string
	 */
	public function fixFunctionName($n, $prefix = "go") {
		$nn = $this->camelCase($n);
		$phpkeywords = $this->phpkeywords;
		if (array_search($n, $phpkeywords))
		$nn = $prefix . $nn;
		return $nn;
	}

	/**
	 * Generate ORM of functions
	 *
	 */
	public function generateORMFunctions(){
		$metadata = $this->metadata;
		$folder = $this->folder;

		$subfolder = "";
		if (isset($this->options->classes_subfolder_php)) {
			$subfolder = $this->options->classes_subfolder_php;
			if ($subfolder !=""){
				if (!file_exists($folder.$subfolder)) mkdir($folder.$subfolder);
			}
		}

		foreach ($metadata->data->functions as $key => $functions) {
			$funcsnames = array();
			foreach($functions as $k => $function){
				$funcname = $this->fixFunctionName($function->name);
				if (isset($funcsnames[$funcname])) $funcsnames[$funcname]++; else $funcsnames[$funcname] = 1;
				$funcname .= ($funcsnames[$funcname] == 1 ? '' : '_v' . $funcsnames[$funcname]);
				$functions[$k]->camelname = $funcname;

				foreach($function->params as $kk => $param){
					if ($param->name == '')	$functions[$k]->params[$kk]->name = "param$i";
				}
			}

			$compile_vars = array(
				"functions" => $functions,
				"schema" => $key,
				"namespace" => $this->camelCase($key),
				"orm_id" => $this->options->id
			);



			file_put_contents($folder.$subfolder."/".$this->camelCase($key) . "Functions.php", $this->compileCode("ramifip/modules/rpORM/templates/function",$compile_vars));
		}
	}

	/**
	 * Generate ORM for Javascript
	 *
	 */
	public function generateORMJavascript(){

		$metadata = $this->metadata;
		$folder = $this->folder;
		$options = $this->options;
		$classNames = $this->classNames($metadata);

		$subfolder = "";
		if (isset($this->options->classes_subfolder_js)) {
			$subfolder = $this->options->classes_subfolder_js;
			if ($subfolder !=""){
				if (!file_exists($folder.$subfolder)) mkdir($folder.$subfolder);
			}
		}
			
		// Tables

		foreach ($metadata->data->tables as $t) {

			rpRobot::debugMsg("Generating ORM for Javascript of table {$t->schema}.{$t->name}","  ", true,true);

			$classname = $classNames[$t->schema][$t->name];
			$collectionname = $classname . "Collection";
			$phpfields = "";
			$i = 0;
			foreach ($t->fields as $field)
			if ($field->type != 'replica') {
				$i++;
				if ($i > 1)
				$phpfields = $phpfields . ","; $phpfields = $phpfields . "$" . $field->name;
			}
			$campsarr = explode(",", $phpfields);

			foreach($t->fields as $k => $field){
				$t->fields[$k]->property_name = $this->camelCase($field->name);
			}

			$pathevent = str_replace(PACKAGES, "", $folder);
			if (isset($options->dbevents_path)) $pathevent = $options->dbevents_path."/";
			$pathevent = str_replace("//", "/", $pathevent);

			$compile_vars = array(
				"classname" => $classname,
				"fields" =>$t->fields,
				"primary_keys" => $t->primary_key,
				"pathevent" => $pathevent,
				"foreign_methods" => $this->getForeignMethods($metadata, $t),
				"orm_id" => $this->options->id
			);

			file_put_contents($folder."$subfolder/$classname.js", $this->compileCode("ramifip/modules/rpORM/templates/jsdao",$compile_vars));
		}

		// Stored procedures...

		foreach ($metadata->data->functions as $key => $functions) {
			$schema = rpRobot::camelCase($key);
			rpRobot::debugMsg("Generating ORM for Javascript of schema {$key}","  ", true,true);
			$f = fopen($folder.$subfolder."/".$schema."Functions.js", "w");
			if ($f) {
				fputs($f, "{$schema}Functions = {\n");
				fputs($f, "\n");
				$j = 0;
				foreach ($functions as $func) {
					$nevent = rpRobot::camelCase($func->schema . "_" . $func->name);
					$funcname = rpRobot::fixFunctionName($func->name);
					if (isset($funcsnames[$funcname])) $funcsnames[$funcname]++; else $funcsnames[$funcname] = 1;
					fputs($f, "   $funcname: function(params){\n");
					fputs($f, "      return ramifip.loadObjectFromEvent({\n");
					fputs($f, "          event: '{$pathevent}{$nevent}',\n");
					$i = 0;
					if (is_array($func->params))
					foreach ($func->params as $param) {
						$i++;
						if ($i > 1)
						fputs($f, ",");
						if ($param->name == '') $param->name = "param$i";
						fputs($f, "          {$param->name}: params.{$param->name}" . ($i < count($func->params) ? "," : "") . "\n");
					}
					fputs($f, "      });\n");
					$j++;
					if ($j < count($functions)) fputs($f, "   },\n"); else fputs($f, "   };\n");
				}
				fputs($f, "}; \n");
				fclose($f);
			}
		}
	}

	/**
	 * Generate ORM classes for database views
	 *
	 */
	public function generateORMViews(){
		$metadata = $this->metadata;
		$folder = $this->folder;
		foreach ($metadata->data->views as $key => $tables) {
			foreach($tables as $k => $v){
				$tables[$k]->camelname = $this->camelCase($v->name);
			}

			$compile_vars = array(
				"schema" => $this->camelCase($key),
				"views" => $tables,
				"orm_id" => $this->options->id
			);

			file_put_contents($folder . $this->camelCase($key) . 'Views.php', $this->compileCode("ramifip/modules/rpORM/templates/view", $compile_vars));

		}
	}
}

// End of file