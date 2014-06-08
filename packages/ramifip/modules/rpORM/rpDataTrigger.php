<?php

/**
 * Ramifip ORM for PHP
 * 
 * Data Trigger
 * 
 */

abstract class rpDataTrigger {

	public function beforeInsert($params){
		return true;
	}

	public function afterInsert($params){
		return true;
	}

	public function afterRemove($params){
		return true;
	}

	public function beforeRemoveBy($where){
		return true;
	}

	public function afterRemoveBy($where, $result){
		return true;
	}

	public function beforeClean(){
		return true;
	}

	public function afterClean(){
		return true;
	}

	public function beforeUpdate($set){
		return true;
	}

	public function afterUpdate($set, $result){
		return true;
	}

	public function beforeUpdateBy($where, $set){
		return true;
	}

	public function afterUpdateBy($where, $set, $result){
		return true;
	}

}

// End of file