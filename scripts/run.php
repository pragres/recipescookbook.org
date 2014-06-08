<?php

/**
 * Ramifip Script
 *
 * Production mode
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
		
		app::Run($args);
	}
}

// End of file