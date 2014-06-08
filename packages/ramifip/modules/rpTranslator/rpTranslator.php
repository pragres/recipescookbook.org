<?php

/**
 * Ramifip Translator
 * 
 * Package type: Module
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program as the file LICENSE.txt; if not, please see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 * 
 * @version 1.0
 * @link http://ramifip.com
 */

if (!defined('RAMIFIP_CACHE_TRANSLATOR_VAR')) define ('RAMIFIP_CACHE_TRANSLATOR_VAR', "ramifip_cache_i18n");

class rpTranslator{

	static $langs = array();

	/**
	 * Set language
	 * 
	 * @param string $lang
	 */
	static function setLang($lang) {
		$_SESSION['lang'] = $lang;
	}

	/**
	 * Save translation cache
	 *
	 * @param string $message
	 * @param string $translation
	 * @param string $lang
	 */
	static function saveCache($message, $translation, $lang){
		if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR]))	$_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR] = array();
		if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang])) $_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang] = array();
		$_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang][$message] = $translation;
	}

	/**
	 * Load translation cache
	 *
	 * @param string $message
	 * @param string $lang
	 */
	static function getTranslationFromCache($message, $lang){
		if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR])){
			if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang])){

				if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang][$message])){
					return $_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang][$message];
				}
			}
		}
		return null;
	}

	/**
	 * Clear the translation cache
	 *
	 * @param string $lang
	 */
	static function clearCache($lang = null){
		if (is_null($lang)){
			if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR])){
				unset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR]);
			}
		} else {
			if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR])){
				if (isset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang])){
					unset($_SESSION[RAMIFIP_CACHE_TRANSLATOR_VAR][$lang]);
				}
			}
		}
	}
	
	/**
	 * Translate message
	 * @param string $message
	 * @param string $lang
	 * @return string
	 */
	static function translate($message, $lang) {

		$st = self::getTranslationFromCache($message, $lang);
		if ($st != null) return $st;

		if (isset(self::$langs[$lang]))	foreach (self::$langs[$lang] as $item) {
			$fname = $item;

			if (file_exists($fname)) {
				$f = fopen($fname, "r");
				while (!feof($f)) {
					$s = fgets($f);
					$s = trim($s);
					$st = $s;

					$p = 0;
					if ($s != "")
					if (substr($s, 0, 1) != "#") {
						if (!feof($f)) {
							$st = fgets($f);
							$st = trim($st);
						}
						if (strtolower($s) == strtolower($message)){
							self::saveCache($message, $st, $lang);
							return $st;
						}
					}
				}
			}
		}
		return $message;
	}
}

/**
 * Translate message
 * @param string $message
 */
function t($message) {
    $lang = "default";
    if (isset($_SESSION['lang'])) $lang = $_SESSION['lang'];
    return rpTranslator::translate($message, $lang);
}

// End of file