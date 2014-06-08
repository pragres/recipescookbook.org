<?php

/**
 * Ramifp Page
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpPage extends rpTheme{

	/**
	 * Constructor
	 *
	 * @param string $template
	 * @param mixed $content
	 * @param array $ignore
	 */
	public function __construct($template = null, $content = array(), $ignore = array()){
		parent::__construct($template, $content, $ignore);
	}

	/**
	 * Check the access to this page
	 *
	 * @return bool
	 */
	public function checkAccess($content = null){
		return true;
	}

	/**
	 * Show the page
	 *
	 * @param mixed $content
	 * @param string $subtitle
	 */
	public function show($content = null, $subtitle = ''){
		if ($this->checkAccess($content)==true){
			v('subtitle', $subtitle);
			if (!is_null($content)) $this->__items = cop($this->__items, $content);
			parent::show($this->__items, $subtitle);
		}
	}

}

// End of file