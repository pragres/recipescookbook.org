<?php

$header = null;

set_include_path(getcwd());

if (!defined("PATH"))     define("PATH", "");
if (!defined("PACKAGES")) define("PACKAGES", "packages/");
if (!defined("FILES"))    define("FILES", "files/");
if (!defined("WWW"))      define("WWW", "www/");
if (!defined("LOGS"))      define("LOGS", "logs/");
if (!defined("SCRIPTS"))      define("SCRIPTS", "scripts/");
if (!defined("ROBOT"))      define("ROBOT", "robot/");

include_once PACKAGES . "ramifip/router.php";

ini_set("date.timezone", "America/New_York");

//error_reporting(E_ALL);

if (ramifip::isCli()){
	set_include_path("./");
	rpCommander::Run();
}