<?php

/**
 * Ramifip File
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

define("RAMIFIP_FILE_EXISTS", "RAMIFIP_FILE_EXISTS");
define("RAMIFIP_FILE_OPEN_SUCESSFUL", "RAMIFIP_FILE_OPEN_SUCESSFUL");
define("RAMIFIP_FILE_OPEN_FAILED", "RAMIFIP_FILE_OPEN_FAILED");
define("RAMIFIP_FILE_INVALID_MODE", "RAMIFIP_FILE_INVALID_MODE");

class rpFile{

	var $file = null;
	var $mode = null;
	var $filename = null;

	/**
	 * Constructor
	 */
	public function __construct($filename, $mode = "w", $rewrite = true){
		return $this->open($filename, $mode, $rewrite);
	}

	/**
	 * Is file readable?
	 *
	 * @return boolean
	 */
	public function isReadable(){
		$m = $this->mode;
		return $m == 'r' || $m == 'r+' || $m == 'w+' || $m == 'a+';
	}

	/**
	 * Is file writeable?
	 *
	 * @return boolean
	 */
	public function isWriteable(){
		$m = $this->mode;
		return $m == 'w' || $m == 'r+' || $m == 'w+' || $m == 'a+' || $m == 'a';
	}

	/**
	 * Throw exception if file is not writeable
	 *
	 */
	public function checkWriteable(){
		if (!$this->isWriteable())
		throw new rpException("The file is not writeable. Current mode is '{$this->mode}'");
	}

	/**
	 * Throw exceptio if file is not readable
	 *
	 */
	public function checkReadable(){
		if (!$this->isReadable())
		throw new rpException("The file is not readable. Current mode is '{$this->mode}'");
	}

	/**
	 * Open the file
	 *
	 * @param string $filename
	 * @param string $mode
	 * @param boolean $rewrite
	 */
	public function open($filename, $mode = "w", $rewrite = true){

		if ($mode != "w" && $mode != "r" && $mode != "r+" && $mode != "w+" && $mode != "a" && $mode != "a+"){
			throw new rpException("Invalid file mode '$mode'");
		}

		if (file_exists($filename) && $rewrite === false)
		return RAMIFIP_FILE_EXISTS;

		$this->filename = $filename;
		$this->mode = $mode;
		$this->file = fopen($filename, $mode);

		if (!$this->file)
		return RAMIFIP_FILE_OPEN_FAILED;

		return RAMIFIP_FILE_OPEN_SUCESSFUL;
	}

	/**
	 * Re-open the file
	 *
	 * @param string $mode
	 * @param boolean $rewrite
	 */
	public function reopen($mode = null, $rewrite = true){
		if ($mode == null){
			$mode = $this->mode;
		}
		$this->close();
		$this->open($this->filename, $mode, $rewrite);
	}

	/**
	 * Close the file
	 */
	public function close(){
		if ($this->file){
			@fclose($this->file);
		}
	}

	/**
	 * Is end of file?
	 *
	 * @return boolean
	 */
	public function isEof(){
		return feof($this->file);
	}

	/**
	 * Rewind the file
	 *
	 */
	public function rewind(){
		rewind($this->file);
	}

	/**
	 * Seek file
	 *
	 * @param integer $offset
	 */
	public function seek($offset = 0){
		fseek($this->file, $offset);
	}

	/**
	 * Destructor
	 *
	 */
	public function __destruct(){
		$this->close();
	}
}

// End of file
