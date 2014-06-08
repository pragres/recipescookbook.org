<?php

/**
 * Ramifip Exception
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpException extends Exception{
	
	var $message;

	/**
	 * Constructor
	 *
	 * @param string $message
	 */
	public function __constructor($message = null){
		$this->message = $message != null ? $message: error_get_last();
		logs("EXCEPTION: $message","EXCEPTION");
	}

	/**
	 * To string
	 *
	 * @return string
	 */
	public function __toString(){
		return $this->message;
	}
}

// End of file