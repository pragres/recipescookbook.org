<?php

/**
 * Ramifip Object Superclass
 *
 * This file is part of the Ramifip PHP Framework.
 * 
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class Object {

	/**
	 * Constructor
	 *
	 * @param array $properties
	 * @return Object
	 */
	public function __construct($properties = array()){
		foreach ($properties as $key => $value) $this->$key = $value;
	}

	/**
	 * Return a value object similar to stdClass
	 * 
	 * @return stdClass
	 */
	public function getVO($ignore = array()){
		return rpClassToolkit::getValueObject($this,$ignore);
	}

	/**
	 * Create a representation as JSON of this object
	 * @return string
	 */
	public function asJSON($ignore = array()){
		return rpClassToolkit::getAsJson($this, $ignore);
	}

	/**
	 * Return the object serialized
	 * @return string
	 */
	public function serialize(){
		if(!isset($this)) return '';
		return serialize($this);
	}

	/**
	 * Return the parent of this object
	 *
	 * @return string
	 */
	public function getParent(){
		return rpClassToolkit::getParent($this);
	}
	
	/**
	 * Return the parents of this objects
	 *
	 * @return array
	 */
	public function getParents(){
		return rpClassToolkit::getParents($this);
	}
	
	/**
	 * Return the class name of this object
	 *
	 * @return string
	 */
	public function getClass(){
		return rpClassToolkit::getClass($this);
	}
	
	/**
	 * Return the vars of this objects
	 *
	 * @return array
	 */
	public function getVars(){
		return rpClassToolkit::getVars($this);
	}
}

// End of file