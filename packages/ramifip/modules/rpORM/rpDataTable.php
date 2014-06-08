<?php

/**
 * Ramifip ORM for PHP
 *
 * Data Table
 *
 * @version 1.0
 * @link http://ramifip.com
 */

class rpDataTable extends rpDataAccess{

	var $tablename;

	/**
	 * Contructor
	 */
	function __construct($driver = null, $tablename = null){
		parent::__construct($driver);
		if (is_null($tablename)) {
			$tablename = strtolower(get_class($this));
			if (substr($tablename,strlen($tablename)-5) == "table")
			$tablename = substr($tablename, 0, strlen($tablename) - 5);
		}
		$this->tablename = $tablename;
	}

	/**
	 * Return the count of records
	 *
	 * @param string $fieldcount
	 * @return integer
	 */
	public function getLength($fieldcount = "*"){
		$r = $this->getAnything("SELECT count($fieldcount) as c FROM {$this->tablename};");
		if (isset($r[0])) return $r[0]["c"];
		return 0;
	}

	public function length($fieldcount = "*"){
		return $this->getLength($fieldcount);
	}

}

// End of file