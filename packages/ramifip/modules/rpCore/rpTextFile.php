<?php

/**
 * Ramifip Text File
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpTextFile extends rpFile{

	/**
	 * Put a string in the file
	 * @param string $s
	 */
	public function putString($s){
		$this->checkWriteable();
		fputs($this->file, $s);
	}
	
	/**
	 * Put a line in the file
	 *
	 * @param string $s
	 * @param string $prefix
	 * @param integer $line_number
	 * @return bool
	 */
	public function putLine($s, $prefix = "", $line_number = null){
		
		$this->checkWriteable();
			
		if (is_array($s))
			$this->putLines($s);
		else {
			$p = $prefix;
			
			if ($line_number == null) {
				if ($this->isReadable())
					$line_number = $this->getCurrentLineNumber();
			}
			
			$p = str_replace("%rp-line-number%", "$line_number", $p);
			$p = str_replace("%rp-time%", date("h:i:s"), $p);
			$p = str_replace("%rp-date%", date("Y-m-d"), $p);
			$p = str_replace("%rp-datetime%", date("Y-m-d h:i:s"), $p);
			
			$this->putString($p.$s."\r\n");
		}
		return true;
	}
	
	/**
	 * Put some ines in the file
	 *
	 * @param array $array
	 * @param string $prefix
	 */
	public function putLines($array, $prefix = ""){
		$this->checkWriteable();
		
		$i = 1;
	
		if ($this->isReadable())
			$i = $this->getCurrentLineNumber();

		foreach($array as $line) 
			$this->putLine($line, $prefix, $i++);
	
	}
	
	/**
	 * Get current line number
	 *
	 * @return integer
	 */
	public function getCurrentLineNumber(){
	
		$this->checkReadable();
	
		// Get current position
		$pos = ftell($this->file);
		
		// Rewind the file
		$this->rewind();
		$i = 1;
		while (!$this->isEof()){
			$s = $this->getLine();
			if ($pos == ftell($this->file))
				return $i;
			$i++;
		}
		
		$this->seek($pos);
		
		return null;
	}
	
	/**
	 * Explode string with separator and put the array of lines
	 *
	 * @param string $s
	 * @param string $separator
	 * @param string $prefix
	 */
	public function explodeAndPut($s, $separator = ";", $prefix = ""){
		$this->checkWriteable();
		$arr = explode($separator, $s);
		$this->putLines($arr);
	}
	
	/**
	 * Get specific line
	 *
	 * @param integer $line_number
	 * @return string
	 */
	public function getLine($line_number = null){
		$this->checkReadable();
		
		if ($this->isEof() === true)
			return null;
			
		if ($line_number == null)
			return fgets($this->file);
		
		// Get current position
		$pos = ftell($this->file);
		
		// Rewind the file
		$this->rewind();
		
		// Searching the line
		$s = null;
		for($i = 1; $i<= $line_number; $i++){
			$s = fgets($this->file);
		}
		
		// Restore the file position
		$this->seek($pos);
		
		return $s;
	}
	
	/**
	 * Go to 
	 *
	 * @param integer $line
	 */
	public function go($line = 1){
		$this->rewind();
		$i = 1;
		for($i=1; $i<$line; $i++){
			$s = $this->getLine();
		}
	}
	
	/**
	 * Return a fragment of text file (line's list)
	 *
	 * @param integer $length
	 * @param integer $from
	 * @return array
	 */
	public function getLines($length = null, $from = null){
		$this->checkReadable();
		
		$lines = array();
		
		// Get current position
		$pos = ftell($this->file);
		
		if ($from != null)
			$this->goto($from);
			
		$i = 0;
		for($i = 0; $i < $length || $length == null; $i++){
			if ($this->isEof() == false){
				$lines[] = $this->getLine();
			}
		}
		
		// Restore the file position
		$this->seek($pos);
		
		return $lines;
	}	
}

// End of file