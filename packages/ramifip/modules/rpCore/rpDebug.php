<?php

/**
 * Ramifip Debug System
 * 
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpDebug{

	static $errors = array();
	static $time_start = 0;
	static $time_end = 0;

	/**
	 * Custom receptor of errors
	 *
	 * @param integer $error_level
	 * @param string $message
	 * @param string $filename
	 * @param integer $line
	 * @param array $context
	 */
	static function errorHandler($error_level, $message, $filename, $line, $context){
		self::$errors[] = array(
			"level" => $error_level,
			"message" => $message,
			"filename" => $filename,
			"line" => $line,
			"context" => $context
		);
	}

	/**
	 * It shows the errors happened during the execution
	 *
	 */
	static function showErrors(){
		if (count(self::$errors)>0){
			$levels = array(1 => "FATAL", 2 => "WARNING", 8 => "NOTICE");

			$stats = array();
			foreach (self::$errors as $error){
				if (!isset($levels[$error['level']])) $levels[$error['level']] = "ERROR LEVEL {$error['level']}";
				if (!isset($stats[$levels[$error['level']]])) $stats[$levels[$error['level']]] = 1;
				else $stats[$levels[$error['level']]]++;
			}
			
			foreach (self::$errors as $error) logs("{$error['message']} in {$error['filename']} at line {$error['line']}", "{$levels[$error['level']]}");

			if (ramifip::isCli()){
				foreach ($stats as $st => $value) echo "$st: $value &nbsp;";
				foreach (self::$errors as $error){
					echo "{$levels[$error['level']]}: \n {$error['message']} \n in {$error['filename']} \n at line {$error['line']} \n";
				}
			} else {
				echo "<div class = \"rp-error\"><h1>Errors in the server side</h1>";
				foreach ($stats as $st => $value) echo "<span class = \"rp-error-stat-value\">$value</span> $st ";
				echo "<span class = \"rp-error-stat-value\">".number_format(self::getExecutionTime(),3)."</span> seconds";
				foreach (self::$errors as $error){
					echo "<div class = \"rp-error-message rp-error-{$levels[$error['level']]}\"><strong>{$levels[$error['level']]}</strong>: <br> <cite>{$error['message']}</cite> in {$error['filename']} at line {$error['line']}.";
					$code = self::extractCode($error['filename'], $error['line']);
					echo "<fieldset class = \"rp-code\"><legend>CODE</legend><pre>$code</pre></fieldset>";
					echo "<fieldset class = \"rp-error-context\"><legend>CONTEXT</legend>";
					echo "<table cellspacing = \"0\" width = \"100%\"><tr><th>Var</th><th>Value</th><th>Serialized</th></tr>";
					$alt = "odd";
					foreach($error['context'] as $var=>$value){
						if ($alt == "odd") $alt = "even"; else $alt = "odd";
						echo "<tr class = \"$alt\"><td><strong>$var</strong></td><td><p>$value</p></td><td>".substr(serialize($value),0,80)."</td></tr>";
					}
					echo "</table></fieldset>";
					echo "</div>";
				}
				echo "</div>";
			}
		}
	}

	/**
	 * Extract code from file
	 *
	 * @param string $filename
	 * @param integer $line
	 * @return string
	 */
	static function extractCode($filename, $line){
		$code = "";
		$f = @fopen($filename, "r");
		if ($f){
			$i = 0;
			$a = "";
			$s = "";
			while (!feof($f)){
				$i++;
				$a = $s;
				$s = fgets($f);
				if ($i == $line){
					if (!feof($f)) $n = fgets($f);
					$code = "...\n".($i-1).":{$a}"."{$i}:{$s}".($i+1).":{$n}"."...\n";
					break;
				}
			}
		}
		return $code;
	}

	/**
	 * Return the current execution time as seconds
	 *
	 * @return float
	 */
	static function getCurrentExecutionTime(){
		return microtime(true) - self::$time_start;
	}

	/**
	 * Return the execution time of script as seconds
	 *
	 * @return float
	 */
	static function getExecutionTime(){
		return self::$time_end - self::$time_start;
	}

}

// End of file