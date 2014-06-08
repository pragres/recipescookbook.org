<?php

#{\n}class {$classname}Collection extends rpDataCollection{
#?$false
class xCollection extends rpDataCollection{
	#$false?

	/**
	 * Constructor
	 *
	 * @param boolean $load
	 * @param rpDBDriver $driver
	 * @param rpDataTable $table
	 */
	public function __construct($load = false, $driver = false, $table = false){

		if ($table != false) $this->TABLE = $table;
		#{\n}{\t}{\t}else $this->TABLE = new {$classname}Table($driver);
			
		parent::__construct($table);
		if ($load === true) $this->loadItems();

	}

	/**
	 * Repair collection item
	 *
	 * @param mixed $item
	 */
	public function repairItem(&$item){
		#[$fields]
		if (!isset($item->{$name})) $item->{$name} = null;
		#[/$fields]
	}

	/**
	 * Enter description here...
	 *
	 * @param array $properties
	 * @param mixed $index
	 * @return {$classname}Entity
	 */
	public function addItem($properties, $index = null){
		if (class_exists("{$classname}")){
			$parent = rpClassToolkit::getParent("{$classname}");
			if ($parent == "{$classname}Entity"){
				#{\n}{\t}{\t}{\t}{\t}$item = new {$classname}($properties);
			} else {
				#{\n}{\t}{\t}{\t}{\t}$item = new {$classname}Entity($properties);
			}
		} else {
			#{\n}{\t}{\t}{\t}{\t}$item = new {$classname}Entity($properties);
		}

		parent::addItem($item, $index);
		return $item;
	}

	/**
	 * Load items to collection
	 *
	 * @param array $params
	 * @return array
	 */
	public function loadItems($params = array()){
		$this->collection = array();
		$params["asobjects"] = true;
		$r = $this->TABLE->getRows($params);
		if (is_array($r)){
			foreach($r as $row){
				$this->RepairItem($row);
				if (class_exists("{$classname}")){
					$parent = rpClassToolkit::getParent("{$classname}");
					if ($parent == "{$classname}Entity"){
						#{\n}{\t}{\t}{\t}{\t}$obj = new {$classname}();
					} else {
						#{\n}{\t}{\t}{\t}{\t}$obj = new {$classname}Entity();
					}
				} else {
					#{\n}{\t}{\t}{\t}$obj = new {$classname}Entity();
				}
				#[$fields]
				$obj->{$name} = $row->{$name};
				#[/$fields]
				$this->collection[] = $obj;
			}
		}
		$this->LAST_LOAD_PARAMS = $params;
	}

	#?$primary_keys
	/**
	 * Get entity by their keys
	 *
	 * @param array $keys
	 * @return {$classname}Entity
	 */
	public function getItem($keys = array()){
		
		$r = $this->TABLE->get($keys);
		if ($r == false) return null;
		
		if (class_exists("{$classname}")){
			$parent = rpClassToolkit::getParent("{$classname}");
			if ($parent == "{$classname}Entity"){
				#{\n}{\t}{\t}{\t}{\t}$obj = new {$classname}();
			} else {
				#{\n}{\t}{\t}{\t}{\t}$obj = new {$classname}Entity();
			}
		} else {
			#{\n}{\t}{\t}{\t}$obj = new {$classname}Entity();
		}

		#[$fields]
		$obj->{$name} = $r['{$name}'];
		#[/$fields]
		return $obj;
	}
	#$primary_keys?

	/**
	 * Remove an item by their keys
	 *
	 * @param array $keys
	 */
	public function removeItem($keys){
		$this->TABLE->remove($keys);
	}

	/**
	 * Remove an item by ther index in collection
	 *
	 * @param integer $idx
	 * @return boolean
	 */
	public function remove($idx){
		if (isset($this->collection[$idx])){
			$keys = array();
			#[$primary_keys]
			$keys['{$value}'] = $this->collection[$idx]->{$value};
			#[/$primary_keys]
			$this->removeItem($keys);
			unset($this->collection[$idx]);
			return true;
		}
		return false;
	}
}

// End of file