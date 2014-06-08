<?php

/**
 * Ramifip Command Line Interpreters's Common Toolkit
 * 
 * This file is part of the Ramifip PHP Framework.
 * 
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

define("RAMIFIP_CLI_DEFAULT_ICON", "  ");
define("RAMIFIP_CLI_MAX_LINE_WIDTH", 79);

class rpCLI {

	/**
	 * Show a message
	 *
	 * @param string $message
	 * @param string $icon
	 * @param boolean $inline
	 * @param boolean $carreturn
	 */
	static function msg($message, $icon = RAMIFIP_CLI_DEFAULT_ICON, $inline = false, $carreturn = false) {
		if (ramifip::isCli()){
			$message = str_replace("\n","",$message);
			$msg = "$icon $message";

			if (strlen($msg) > RAMIFIP_CLI_MAX_LINE_WIDTH) $msg = substr($msg,RAMIFIP_CLI_MAX_LINE_WIDTH);

			$msg .= str_repeat(" ",RAMIFIP_CLI_MAX_LINE_WIDTH - strlen($msg));
			if ($carreturn == true) {
				for($i = 0; $i < RAMIFIP_CLI_MAX_LINE_WIDTH; $i++) $msg .= chr(8);
			}
			echo $msg;
			if ($inline == false) {
				echo "\n";
			}
		}
	}

	/**
	 * Input a string from command line shell
	 *
	 * @param string $msg
	 * @return string
	 */
	static function input($msg = ""){
		if (ramifip::isCli()){
			echo $msg;
			$f = fopen("php://stdin","r");
			$s = fgets($f);
			if ($f) fclose($f);
			$s = str_replace("\n","",$s);
			$s = str_replace("\r","",$s);
			return $s;
		}
	}
}

// End of file