<?php

/**
 * Ramifip Event Manager
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

define("RAMIFIP_NO_EVENTS", "ramifip.noevents");
define("RAMIFIP_EVENTS_EXECUTED", "ramifip.events.executed");
define("RAMIFIP_EVENTS_IGNORED", "ramifip.events.ignored");

class rpEventMan{

	static $events = array();
	static $triggers = array();
	static $entry = "";
	static $entry_args = array();

	/**
	 * Load events from GET and POST
	 */
	static function loadEvents() {
		//events from post

		foreach ($_POST as $key => $value)
		if (substr($key, 0, strlen("EVENT")) == "EVENT")
		self::$events[$value] = $value;

		//events from get
		foreach ($_GET as $key => $value)
		if (substr($key, 0, strlen("EVENT")) == "EVENT" || $key == "e") self::$events[$value] = $value;

		//events from entries
		if (PATH == "") $p = "/"; else $p = PATH;
		$entries = v('entry|'.$p);
		if (!is_null($entries)){
			$max = 0;
			$url = rpURL::getCleanURL();
			$e = "";
			foreach($entries as $entry => $event){
				$le = strlen($entry);
				if ($le > $max && substr($url,0,strlen($entry)) == $entry) {
					$e = $event;
					$max = $le;
					self::$entry = $entry;
					if ($le < strlen($url)){
						$ea = substr($url, $le);
						if (substr($ea,0,1)=="/") $ea = substr($ea,1);
						if (trim($ea)!="/") self::$entry_args = explode("/",$ea);
					} else self::$entry_args = array();
				}
			}
			if ($e!="") self::$events[$e] = $e;
		}
	}

	/**
	 * @desc Execute a specific event
	 *
	 * @param string $e
	 * @param array $params
	 * @param array $exceptions
	 */
	static function executeEvent($e, &$params = array(), $exceptions = array()) {

		$access = sm("app","checkEventAccess", "'$e'");
		if ($access === false) return RAMIFIP_ACCESS_DENIED;

		sm("app","beforeEvent");

		// Lookup event class name and action name
		// pattern eventname/actionname

		$method = "Run";
		$url = rpURL::getCleanURL();
		$url = trim($url);
		$l = strlen($url);
		if ($l>0) if ($url[$l-1]=="/") $url = substr($url,0,$l-1);

		if (self::$entry != ""){
			foreach(self::$entry_args as $key => $value) {
				$params["param_".$key] = $value;
			}
		} elseif (!rpFileSystem::fileExists($e.".event.php")){
			$parts = explode("/", $e);
			$c = count($parts);
			$method = $parts[$c-1];
			array_pop($parts);
			$e = implode("/",$parts);
			if (trim($url) != ""){
				$parts = explode("/", $url);
				foreach($parts as $key=>$value) {
					$params["param_".$key] = $value;
				}

			}
		} else {
			if (trim($url) != ""){
				$parts = explode("/", $url);
				$method = $parts[0];
				array_shift($parts);
				foreach($parts as $key=>$value) {
					$params["param_".$key] = $value;
				}
			}
		}

		$eclass = explode("/", $e);
		$eclass = $eclass[count($eclass) - 1];
		$e = trim($e);

		$_POST = array_merge($_POST, $params);

		if (isset($exceptions[$e])) return RAMIFIP_EVENTS_EXECUTED;

		$exceptions[$e] = true;

		if (file_exists(PACKAGES . "$e.event.php")) {

			// execute triggers before
			foreach (self::$triggers as $p => $ts){
				$p = trim($p);
				$c = rpPackageMan::comparePathWithPattern($e,$p);
				if ($c === true || $c === "*"){
					foreach($ts as $trigger){
						if ($trigger['momment'] === 'before'){
							self::executeEvent($trigger['execute'], $params, $exceptions);
						}
					}
				}
			}

			// "Execute event" is "include a php script"
			// or execute method Run() of the rpEvent class

			if (!class_exists($eclass)) {
				include PACKAGES . "$e.event.php";
				rpSecurity::trace($e);
			}

			if (class_exists($eclass)) {

				// Preparing parametres
				$params = ramifip::getParams();

				eval("if (isset($eclass::" . '$params)) ' . $eclass . '::$params = $params;');

				// Executing methods

				if (self::$entry != "") if(isset(self::$entry_args[0])) {
					if (!method_exists($eclass, self::$entry_args[0])) {
						$method = self::$entry_args[0];
						foreach(self::$entry_args as $key => $value) {
							unset($params["param_".$key]);
						}
						array_shift(self::$entry_args);
						foreach(self::$entry_args as $key => $value) {
							$params["param_".$key] = $value;
						}
					}	
				}

				if (!method_exists($eclass, $method)) $method = "Run";

				if (method_exists($eclass, "checkAccess")){
					$r = sm($eclass, "checkAccess","'$method'");
					if ($r === false) return RAMIFIP_ACCESS_DENIED;
				}

				if (method_exists($eclass, $method)){
					eval($eclass . '::' . $method . '($params);');
				}

				rpSecurity::trace($e);

			}

			// execute triggers after
			foreach (self::$triggers as $p => $trigger){
				$p = trim($p);
				$c = rpPackageMan::comparePathWithPattern($e,$p);
				if ($c == true || $c == "*"){
					foreach($ts as $trigger){
						if ($trigger['momment'] === 'after'){
							self::executeEvent($trigger['execute'], $params, $exceptions);
						}
					}
				}
			}
			sm("app","afterEvent");
			return RAMIFIP_EVENTS_EXECUTED;
		}
	}

	/**
	 * @desc Execute Events
	 */
	static function executeEvents() {
		$no_events = true;
		$r = array();
		if (is_array(self::$events))
		foreach (self::$events as $e) {
			$r[] = self::executeEvent($e);
			$no_events = false;
		}

		return $no_events === true ? RAMIFIP_NO_EVENTS : RAMIFIP_EVENTS_IGNORED;
	}
}

// End of file