<?php

/**
 * Ramifip Network Toolkit
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpNetwork {

	static $client_ip_address = null;

	/**
	 * Return the IP address of client
	 * 
	 * @return string
	 */
	static function getClientIPAddress() {
		if (self::$client_ip_address == null){
			$ip = '127.0.01';
			if (!isset($_SERVER) && !isset($HTTP_SERVER_VARS)) $ip = '0.0.0.0';
			if (!isset($_SERVER)) $_SERVER = $HTTP_SERVER_VARS;
			if (isset($_SERVER['REMOTE_ADDR']))	$ip = $_SERVER['REMOTE_ADDR'];
			if (isset($HTTP_SERVER_VARS['HTTP_X_FORWARDED_FOR'])) $ip = $HTTP_SERVER_VARS['HTTP_X_FORWARDED_FOR'];
			self::$client_ip_address = $ip;
		}
		return self::$client_ip_address;
	}

	/**
	 * Check ip in range ip
	 *
	 * @param string $from
	 * @param string $to
	 * @param string $ip
	 * @return bool
	 */
	static function checkRangeIP($from, $to, $ip){
		$from = ip2long($from);
		$to = ip2long($to);
		$ip = ip2long($ip);
		return $ip >= $from && $ip <= to;
	}
}

// End of file