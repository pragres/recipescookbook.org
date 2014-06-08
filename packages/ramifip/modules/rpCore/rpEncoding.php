<?php

/**
 * Ramifip Encoding Toolkit
 * 
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpEncoding{
	
	/**
	 * Convert string to UFT8 encoding
	 *
	 * @param string $data
	 * @param string $encoding
	 * @return string
	 */
	static function convertToUTF8($data, $encoding) {
		$out = $data;

		if (function_exists('iconv')) {
			$out = @iconv($encoding, 'utf-8', $data);
		}
		else if (function_exists('mb_convert_encoding')) {
			$out = @mb_convert_encoding($data, 'utf-8', $encoding);
		}
		else if (function_exists('recode_string')) {
			$out = @recode_string($encoding .'..utf-8', $data);
		}

		return $out;
	}

	/**
	 * UTF8 Encode
	 *
	 * @param string $data
	 * @return string
	 */
	static function utf8Encode($data){
		if (!mb_check_encoding($data,"UTF-8")){
			return utf8_encode($data);
		}
		return $data;
	}

	/**
	 * UTF8 Decode
	 *
	 * @param string $data
	 * @return string
	 */
	static function utf8Decode($data){
		if (mb_check_encoding($data,"UTF-8")){
			return utf8_decode($data);
		}
		return $data;
	}
}

// End of file