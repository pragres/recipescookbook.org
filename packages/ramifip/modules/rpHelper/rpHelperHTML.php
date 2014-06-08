<?php


class rpHelperHTML {

	/**
	 * Original PHP code by Chirp Internet: www.chirp.com.au
	 * Please acknowledge use of this code by including this header.
	 * @param <type> $input
	 * @return <type>
	 */
	static function restoreTags($input) {
		$opened = array();

		// loop through opened and closed tags in order
		if (preg_match_all("/<(\/?[a-z]+)>?/i", $input, $matches)) {
			foreach ($matches[1] as $tag) {
				if (preg_match("/^[a-z]+$/i", $tag, $regs)) {
					// a tag has been opened
					if (strtolower($regs[0]) != 'br') {
						$opened[] = $regs[0];
					} elseif (preg_match("/^\/([a-z]+)$/i", $tag, $regs)) {
						// a tag has been closed
						unset($opened[array_pop(array_keys($opened, $regs[1]))]);
					}
				}
			}
		}
		// close tags that are still open

		if ($opened) {
			$tagstoclose = array_reverse($opened);
			foreach ($tagstoclose as $tag)
			$input .= "</$tag>";
		} return $input;
	}

	/**
	 * Truncate a HTML code
	 * @param <type> $maxLength
	 * @param <type> $html
	 */
	static function truncateHTML($maxLength, $html) {

		$result = "";

		$printedLength = 0;
		$position = 0;
		$tags = array();

		while ($printedLength < $maxLength && preg_match('{</?([a-z]+)[^>]*>|&#?[a-zA-Z0-9]+;}', $html, $match, PREG_OFFSET_CAPTURE, $position)) {
			list($tag, $tagPosition) = $match[0];

			// Print text leading up to the tag.
			$str = substr($html, $position, $tagPosition - $position);
			if ($printedLength + strlen($str) > $maxLength) {
				$result .= ( substr($str, 0, $maxLength - $printedLength));
				$printedLength = $maxLength;
				break;
			}

			$result .= ( $str);
			$printedLength += strlen($str);

			if ($tag[0] == '&') {
				// Handle the entity.
				$result .= ( $tag);
				$printedLength++;
			} else {
				// Handle the tag.
				$tagName = $match[1][0];
				if ($tag[1] == '/') {
					// This is a closing tag.

					$openingTag = array_pop($tags);
					assert($openingTag == $tagName); // check that tags are properly nested.

					$result .= ( $tag);
				} else if ($tag[strlen($tag) - 2] == '/') {
					// Self-closing tag.
					$result .= ( $tag);
				} else {
					// Opening tag.
					$result .= ( $tag);
					$tags[] = $tagName;
				}
			}

			// Continue after the tag.
			$position = $tagPosition + strlen($tag);
		}

		// Print any remaining text.
		if ($printedLength < $maxLength && $position < strlen($html))
		$result .= ( substr($html, $position, $maxLength - $printedLength));

		// Close any open tags.
		while (!empty($tags))
		$result .= sprintf('</%s>', array_pop($tags));

		return $result;
	}

	/**
	 * Highlight word in content
	 * @param <type> $word
	 * @param <type> $content
	 * @return <type>
	 */
	static function highLightWord($word, $content) {

		$aux = $reemp = str_ireplace($word, '%s', $content);

		$k = substr_count($reemp, '%s');

		if ($k == 0)
		return $content;

		$wordso = array();

		for ($i = 0; $i < $k; $i++) {
			$wordso[] = '<strong>' . substr($content, strpos($aux, '%s'), strlen($word)) . '</strong>';
			$aux = substr($aux, 0, strpos($aux, '%s')) . $word . substr($aux, strlen(substr($aux, 0, strpos($aux, '%s'))) + 2);
		}

		return vsprintf($reemp, $wordso);
	}

	/**
	 * Highlight somes words in content
	 * @param <type> $words
	 * @param <type> $content
	 */
	static function highLightWords($words, $content) {
		foreach ($words as $word)
		$content = self::highLightWord($word, $content);
		return $content;
	}

}

// End of file