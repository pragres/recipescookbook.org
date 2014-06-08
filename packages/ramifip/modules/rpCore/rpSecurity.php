<?php

/**
 * Ramfip Security
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

define("RAMIFIP_ACCESS_DENIED", "ramifip.access.denied");

class rpSecurity{

	static $traces = array();
	
	/**
	 * Return TRUE if the current PATH have a HTTP Authentication
	 *
	 * @param string $path
	 * @return boolean
	 */
	static function getHTTPAuthentication($path){
		$setup = v('setup');
		if (isset($setup->http_authentication[$path])) return $setup->http_authentication[$path];
		return false;
	}

	/**
	 * Run security instructions
	 *
	 */
	static function secure(){

		// Verify available hosts
		$h = rpNetwork::getClientIPAddress();

		$access = false;

		$setup = v('setup');
		
		foreach($setup->available_hosts as $ah){
			if ($h == $ah || $ah == "*")
			$access = true;
		}

		if ($access == false){
			ramifip::systemDie("Access denied<br>Sorry, the IP address <i>".rpNetwork::getClientIPAddress()."</i> has been banned");
		}

		// Verify HTTP Authentication

		if (self::getHTTPAuthentication(PATH."/") == true
		|| self::getHTTPAuthentication(PATH) == true
		|| self::getHTTPAuthentication("*") == true){
			$r = false;
			if (isset($_SERVER['PHP_AUTH_USER'])) {

				if (class_exists("app")){
					$r = app::verifyHTTPAuth($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);
				}
			}

			if (!isset($_SERVER['PHP_AUTH_USER']) || $r == false) {
				header('WWW-Authenticate: Basic realm="Please, type your user/password for access to this site."');
				ramifip::bootMessage("Access denied<br>Unauthorized");
				die();
			}
		}
	}

	/**
	 * Verify if this page are allowed for current PATH
	 * 
	 * @return bool
	 */
	static function verifyPagePaths($page) {
		if (isset(ramifip::$page_paths[$page]))	if (is_array(ramifip::$page_paths[$page])) {
			foreach (ramifip::$page_paths[$page] as $ap) {
				$r = rpPackageMan::compareSubpathWithPattern(PATH, $ap);
				if ($r === false)
				return false;
			}
		}
		return true;
	}

	/**
	 * Trace the event's activity
	 *
	 * @param string $event
	 */
	static function trace($event){
		foreach(self::$traces as $p => $t){
			if (rpPackageMan::comparePathWithPattern($event, $p)==true){
				foreach($t as $act){
					logs(" $act | $event ", "ACTIVITY");
					sm("app", "trace","'$act','$event'");
				}		
			}
		}		
	}
}

// End of file