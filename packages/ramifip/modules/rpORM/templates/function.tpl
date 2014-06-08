<?php

/**
 * Function of schema {$schema}
 *
 * @upadted {/div.now:Y-m-d h:i:s/}
 */

#{\n}class {$namespace}Functions extends rpDataAccess{
#?$false
class xFunctions extends rpDataAccess{
	#$false?

	/**
	 * Constructor
	 *
	 * @param rpDBDriver $driver
	 */
	public function __construct($driver = null){
		$this->orm_id = '{$orm_id}';
		parent::__construct($driver);
	}

	#[$functions]
	/**
	 * {$camelname} database function
	 #[$params]
	 * @params {$data_type} {$name}
	 #[/$params]
	 * @return {$return_specific}
	 */
	#{\n}{\t}public function {$camelname}(?$params [$params]${$name}!$_is_last, $_is_last! [/$params], $params? $asobjects = false){
	#?$false
	public function CamelName($params){
		#$false?
		#{?( '{$return}' == 'USER-DEFINED')?}
		$sql = "SELECT * FROM {$schema}.{$name}(";
		#@else@
		$sql = "SELECT {$schema}.{$name}(";
		#{/?}
		#[$params]
		$sql .= (is_string(${$name})?"'":"")."${$name}".(is_string(${$name})?"'":"");
		#!$_is_last
		$sql .= ", ";
		#$_is_last!
		#[/$params]
		$sql .= ");";

		if ($asobjects == true){
			$r = $this->driver->getAsObjects($sql);
		} else {
			$r = $this->driver->getAsArray($sql);
		}
		#{?( '{$return}' != 'USER-DEFINED')?}
		if (count($r) == 1)
		if (count($r[0]) == 1)
		if (isset($r[0]["{$name}"]))
		return $r[0]["{$name}"];
		#{/?}
		return $r;
	}
	#[/$functions]
}

// End of file