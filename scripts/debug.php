<?php

/**
 * Ramifip Script
 * 
 * Debug mode
 */

$header = null;

set_include_path(getcwd());

if (!defined("PATH"))     define("PATH", "");
if (!defined("PACKAGES")) define("PACKAGES", "../packages/");
if (!defined("FILES"))    define("FILES", "../files/");
if (!defined("WWW"))      define("WWW", "./");
if (!defined("LOGS"))      define("LOGS", "../logs/");
if (!defined("SCRIPTS"))      define("SCRIPTS", "../scripts/");

include PACKAGES . "/ramifip/router.php";

if (ramifip::isCli()){
	
	if (class_exists("app")){
		
		ramifip::useResources();
		
		$args = array();
		$first = true;
		foreach($_SERVER['argv'] as $arg){
			if ($first){
				$first = false;
				continue;
			}
			$args[] = $arg;
		}

		echo "\n------------------------------------\n";
		echo app::$title."\n";
		$t1 = microtime(true);
		echo "Begin at: ".date("Y-m-d h:i:s")."\n";
		echo "------------------------------------\n\n";
		app::Run($args);
		echo "\n\n------------------------------------\n";
		echo "\n\nEnd at: ".date("Y-m-d h:i:s")."\n\n";
		$t2 = microtime(true);
		echo "\n";
		echo "Script ".PATH." end - ".number_format($t2-$t1,5)."secs\n";
	}
}

// End of file