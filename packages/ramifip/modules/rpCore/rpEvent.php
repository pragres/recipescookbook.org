<?php

/**
 * Ramifip Event
 * 
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

abstract class rpEvent {

	static $params = array();

	/**
	 * Default method for execute the event
	 * 
	 * @param stdClass $params
	 */
	static function Run(&$params) {
		self::$params = $params;
	}

	/**
	 * Check the access to event
	 *
	 * @param string $method
	 * @return bool
	 */
	static function checkAccess($method = ""){
		return true;
	}
}

// End of file