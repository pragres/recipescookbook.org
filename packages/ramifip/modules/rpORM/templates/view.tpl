<?php

/**
 * Database View
 *
 * {$schema}Views
 *
 * @updated {/div.now:Y-m-d h:i:s/}
 */

#{\n}class {$schema}Views extends rpDataAccess{
#?$false
class xViews extends rpDataAccess{
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

	#[$views]
	/**
	 * View {$camelname}
	 *
	 * @param array $params
	 * @param bool $asobjects
	 * @return array
	 */
	#{\n}{\t}public function get{$camelname}($params = array()){
	#?$false
	public function getView($params, $asobjects = false){
		#$false?
		$fields = isset($params["fields"])? $this->arrayFieldsToSQL($params["fields"]):"*";
		$where = isset($params["where"])?" WHERE ".$params["where"]:"";
		$order = isset($params["order"])?" ORDER BY ".$params["order"]:"";
		$limit = isset($params["limit"])?" LIMIT ".$params["limit"]:"";
		$offset = isset($params["offset"])?" OFFSET ".$params["offset"]:"";
		$asobjects = isset($params["asobjects"])? $params["asobjects"]:false;
		$sql = "SELECT $fields FROM {$name} ".$where.$order.$offset.$limit;
		$r = $this->getAnything($sql,$asobjects);
		return $r;
	}
	#[/$views]
}

// End of file