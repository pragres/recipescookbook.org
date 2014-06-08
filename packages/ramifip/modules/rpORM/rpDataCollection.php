<?php

/**
 * Ramifip ORM for PHP
 *
 * Data Collection
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

class rpDataCollection extends rpCollection{

	var $collection = array();
	var $TABLE;
	var $LAST_LOAD_PARAMS;

	/**
	 * Constructor
	 */
	public function __construct($model = false) {
		if ($model != false){
			$this->model = $model;
		}
	}

	/**
	 * Reload objects to memory collection 
	 * with last offset and limit
	 */
	public function Reload() {
		if (method_exists($this,"loadItems"))
		$this->loadItems($this->LAST_LOAD_PARAMS);
	}

	/**
	 * Get count of records of database table
	 * 
	 * @updated: 23/12/10 01:41:58
	 * @version: 1.0
	 */
	public function getCountOfRecords() {
		return $this->TABLE->length();
	}

	/**
	 * Return count of items in the filtered collection
	 *
	 * @param string $where
	 * @return integer
	 */
	public function getCountInFilter($where){
		return $this->TABLE->getCountInFilter($where);
	}

	/**
	 * Return true if exists any items in filtered collection
	 *
	 * @param string $where
	 * @return boolean
	 */
	public function existsItemsWith($where){
		return $this->TABLE->existsRowsWith($where);
	}
		
}

// End of file