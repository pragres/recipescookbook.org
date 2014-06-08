<?php

/**
 * Ramifip Properties File
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpPropertiesFile {

	var $properties;

	/**
	 * Constructor
	 *
	 * @param string $path
	 * @param rpPropertiesFile
	 */
	public function __construct($path, $from_packages = true, $phpfile = false) {

		if ($from_packages) if (substr($path,0,strlen(PACKAGES)) != PACKAGES) $path = PACKAGES.$path;
		 
		$folder = rpFileSystem::getFolderOf($path);
		
		if (substr($folder,0,strlen(PACKAGES)) == PACKAGES) $folder = substr($folder,strlen(PACKAGES));
		
		$folder = str_replace("//","/",$folder);

		$this->properties = array();

		if (file_exists($path)) {
			$f = fopen($path, "r");
			if (!$f) return false;
			while (!feof($f)) {
				$s = fgets($f);
				$s = trim($s);
				if ($s != "")
				if ((substr($s, 0, 1) != "#" && $phpfile == false) || ($phpfile === true && substr($s,0,1) == "#")) {
					if ($phpfile ===true) if (substr($s,0,1)=="#") $s = substr($s,1);
					$prop = substr($s, 0, strpos($s, "="));
					$prop = trim($prop);
					$value = trim(substr($s, strpos($s, "=") + 1));

					$value = str_replace('{$folder}',$folder, $value);

					$p = strpos($prop, "[");
					$p2 = strpos($prop, "]");
					if ($p > 0 && $p < strlen($prop) + 2 && $p2 > $p) {
						$narr = substr($prop, 0, $p);
						$index = substr($prop, $p + 1, $p2 - $p - 1);

						@eval('if (!isset($this->' . $narr . ')) $this->' . $narr . '= array();');
						if ($index != "")
						@eval('$this->' . $narr . '["' . trim($index) . '"] = ' . $value . ';');
						else
						@eval('$this->' . $narr . '[] = ' . $value . ';');

						if (!isset($this->properties[$narr]))
						$this->properties[$narr] = array();
						if ($index != "")
						@eval('$this->properties[$narr][$index] = ' . $value . ';');
						else
						@eval('$this->properties[$narr][] = ' . $value . ';');
					}
					else {
						@eval('$this->' . $prop . '=' . $value . ';');
						@eval('$this->properties[$prop] = ' . $value . ';');
					}
				}
			}
		}
	}

	/**
	 * Return properties as string format separated with $separator
	 * 
	 * @param string $separator
	 * @return string
	 */
	public function asString($separator = " ") {
		$s = "";
		$primero = true;
		foreach ($this->properties as $key => $value) {
			$s .= ( $primero == false ? $separator : "") . "$key = $value";
			$primero = false;
		}
		return $s;
	}
}

// End of file