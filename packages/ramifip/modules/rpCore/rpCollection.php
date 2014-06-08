<?php

/**
 * Ramifip Collection
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpCollection extends Object{

	var $collection = array();

	/**
	 * Return a length of collection
	 *
	 * @return integer
	 */
	public function getLength() {
		if (is_array($this->collection)) return count($this->collection);
		return 0;
	}

	/**
	 * Return a specific item
	 *
	 * @param mixed $idx
	 * @return mixed
	 */
	public function get($idx) {
		if (isset($this->collection[$idx])) return $this->collection[$idx];
		return null;
	}

	/**
	 * Create a representation as JSON of this object
	 *
	 * @return string
	 */
	public function asJSON(){
		$json = "[";
		$i = 0;
		foreach ($this->collection as $item){
			$i++;
			if ($i>1)
			$json .=",";
			if (method_exists($item, "asJSON"))
			$json .= $item->asJson();
		}
		$json .= "]";
		return $json;
	}

	/**
	 * Add an item to this collection
	 *
	 * @param mixed $value
	 * @param mixed $index
	 */
	public function addItem($value, $index = null){
		if ($index == null)	$this->collection[] = $value;
		else $this->collection[$index] = $value;
	}

	/**
	 * Remove an item of this collection
	 *
	 * @param mixed $index
	 */
	public function remove($index){
		if (isset($this->collection[$index])) unset($this->collection[$index]);
	}

	/**
	 * Clear this collection
	 *
	 */
	public function clear(){
		$this->collection = array();
	}
	
}

// End of file