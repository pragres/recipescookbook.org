<?php

/**
 * Ramifip Mail Toolkit
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpMail {

	/**
	 * Send a mail
	 *
	 * @param array $params
	 */
	static function send($params = array()) {

		if (!is_array($params))
		$params = array();

		if (!isset($params['mime-version']))
		$params['mime-version'] = "1.0";

		if (!isset($params['from']))
		$params['from'] = "user@domain";

		if (!isset($params['to']))
		$params['to'] = "user@domain";

		if (!isset($params['reply-to']))
		$params['reply-to'] = $params['from'];

		if (!isset($params['return-path']))
		$params['return-path'] = $params['from'];

		if (!isset($params['charset']))
		$params['charset'] = "iso-8859-1";

		if (!isset($params['content-type']))
		$params['content-type'] = "text/plain";

		if (!isset($params['subject']))
		$params['subject'] = "";

		if (!isset($params['cc']))
		$params['cc'] = "";

		if (!isset($params['bcc']))
		$params['bcc'] = "";

		if (!isset($params['body']))
		$params['body'] = "";

		$boundary = "";
		if (isset($params['boundary']))
		$boundary = "; boundary={$params['boundary']}";

		$headers = "From: {$params['from']}\r\n";
		$headers .= "Reply-To: {$params['reply-to']}\r\n";
		$headers .= "Return-path: {$params['return-path']}\r\n";
		$headers .= "MIME-Version: {$params['mime-version']}\r\n";
		$headers .= "Content-type: {$params['content-type']}; charset={$params['charset']}$boundary;\r\n";

		if ($params['cc'] != "")
		$headers .= "Cc: {$params['cc']}";

		if ($params['bcc'] != "")
		$headers .= "Bcc: {$params['bcc']}";

		@mail($params['to'], $params['subject'], $params['body'], $headers);
	}

	/**
	 * Send a text plain email
	 *
	 * @param array $params
	 */
	static function sendTextPlain($params = array()) {
		$params['content-type'] = "text/plain";
		self::send($params);
	}

	/**
	 * Send a email with html body
	 *
	 * @param array $params
	 */
	static function sendHTML($params = array()) {
		$params['content-type'] = "text/html";
		self::send($params);
	}

	/**
	 * Send email with attachment
	 *
	 * @param array $params
	 */
	static function sendHTMLWithAttachment($params = array()) {
		$s = md5(date('r', time()));

		$params['content-type'] = "multipart/mixed";
		$params['boundary'] = "Ramifip-alt-$s";

		if (!isset($params['body']))
		$params['body'] = "";

		$params['body'] =
                "--{$params['boundary']}\r\n" .
                "Content-Type: text/html; charset=ISO-8859-1\r\n" .
                "Content-Transfer-Encoding: 7bit\r\n\r\n" .
                "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\r\n" .
                "<html>\r\n" .
                "<head>\r\n" .
                "</head>\r\n" .
                "<body bgcolor=\"#ffffff\" text=\"#000000\">{$params['body']}</body>\r\n" .
                "</html>\r\n\r\n" .
                "--{$params['boundary']}\r\n" .
                "Content-Type: {$params['file-type']}; name={$params['file-name']}\r\n" .
                "Content-Transfer-Encoding: base64\r\n" .
                "Content-Disposition: attachment\r\n\r\n" .
		chunk_split(base64_encode(file_get_contents($params['file-path']))) . "\r\n" .
                "--{$params['boundary']}";
		self::send($params);
	}

	/**
	 * Check if email address is correct
	 *
	 * @param string $email
	 * @return boolean
	 */
	static function checkAddress($email){
		if (!ereg("^[^@]{1,64}@[^@]{1,255}$", $email)) return false; 
		$email_array = explode("@", $email);
		$local_array = explode(".", $email_array[0]);
		
		for ($i = 0; $i < sizeof($local_array); $i++)
		if (!ereg("^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$", $local_array[$i])) 
		return false;

		if (!ereg("^\[?[0-9\.]+\]?$", $email_array[1]))	{
			$domain_array = explode(".", $email_array[1]);
			if (sizeof($domain_array) < 2) return false; 
			
			for ($i = 0; $i < sizeof($domain_array); $i++) 
			if (!ereg("^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|([A-Za-z0-9]+))$", $domain_array[$i])) 
			return false;
		}
		return true;

	}

}

// End of file