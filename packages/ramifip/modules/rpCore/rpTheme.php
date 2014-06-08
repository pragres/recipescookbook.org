<?php

/**
 * Ramifip Template Engine
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpTheme extends div{

	static $singleton = false;


	/**
	 * Constructor
	 *
	 * @param string $src
	 * @param array $items
	 * @return div
	 */
	public function __construct($src, $items = null, $ignore = array()){

		if (rpTheme::$singleton === false){
			$setup = v('setup');

			// Routers

			$css_router = "css.php?f=";
			$js_router = "js.php?f=";
			$xml_router = "xml.php?f=";
			$img_router = "img.php?f=";
			$file_router = "img.php?f=";

			$back_path = rpURL::getCleanURLBackPath();

			$router_paths = v("router_paths|js");
			$first = true; foreach($router_paths as $x => $value) {if (substr($x,0,strlen(PATH)) == PATH || $first == true) $js_router = $x."/"; $first = false;}
			$router_paths = v("router_paths|css");
			$first = true; foreach($router_paths as $x => $value) {if (substr($x,0,strlen(PATH)) == PATH || $first == true) $css_router = $x."/";  $first = false;}
			$router_paths = v("router_paths|xml");
			$first = true; foreach($router_paths as $x => $value) {if (substr($x,0,strlen(PATH)) == PATH || $first == true) $xml_router = $x."/"; $first = false;}
			$router_paths = v("router_paths|img");
			$first = true; foreach($router_paths as $x => $value) {if (substr($x,0,strlen(PATH)) == PATH || $first == true) $img_router = $x."/"; $first = false;}
			$router_paths = v("router_paths|file");
			$first = true; foreach($router_paths as $x => $value) {if (substr($x,0,strlen(PATH)) == PATH || $first == true) $file_router = $x."/"; $first = false;}

			div::setGlobal("js_router", WWW.$back_path.$js_router);
			div::setGlobal("css_router",  WWW.$back_path.$css_router);
			div::setGlobal("xml_router",  WWW.$back_path.$xml_router);
			div::setGlobal("img_router",  WWW.$back_path.$img_router);
			div::setGlobal("file_router",  WWW.$back_path.$file_router);

			// Enabling system vars

			div::enableSystemVar("div.session");
			div::enableSystemVar("div.script_name");

			// Core's resources

			div::setGlobal("ramifip", array(
				"core_css" => array("ramifip/ramifip"),
				"core_js" => array("ramifip/lib/3rdParty/jquery",
					"ramifip/lib/3rdParty/phpjs/php_xml",	
					"ramifip/lib/3rdParty/phpjs/php_string",
					"ramifip/lib/3rdParty/phpjs/php_date",
					"ramifip/lib/3rdParty/phpjs/php_vars",
					"ramifip/modules/rpCore/client/rpApplication",
					"ramifip/modules/rpCore/client/rpJSON",
					"ramifip/modules/rpCore/client/rpDataType",
					"ramifip/modules/rpCore/client/rpString",
					"ramifip/modules/rpCore/client/rpCollection",
					"ramifip/modules/rpCore/client/ramifip"),
				"setup" => $setup));

			// Package's javascripts
			$arr = array();
			foreach (ramifip::$css as $f) {
				$less = false;
				if (strlen($f)>=4) if (substr($f,strlen($f) - 4) == ".css") substr($f, 0, strlen($f) - 4);
				if (!rpFileSystem::fileExists($f.".css") && rpFileSystem::fileExists($f.".less")) $less = true;
				$arr[] = array("path" => $f, "less" => $less);
			}

			div::setGlobal("app_css", $arr);

			// Aplication's javascripts
			$arr = array();

			$app_js = "app";
			if (isset($setup->app_js)){
				if (is_array($setup->app_js)){
					$index = PATH;
					if ($index == "") {
						$index = 0;
						if (isset($setup->app_js[$index])){
							$app_js = $setup->app_js[$index];
						} else if(isset($setup->app_js["/"])){
							$app_js = $setup->app_js["/"];
						}
					} else {
						if (isset($setup->app_js[$index])){
							$app_js = $setup->app_js[$index];
						}
					}
				}
			}

			if (rpFileSystem::getFileExtension($app_js) == ".js") $app_js = substr($app_js,0,strlen($app_js));
			if (rpFileSystem::fileExists($app_js) || rpFileSystem::fileExists($app_js.".js")) $arr[] = $app_js;

			// Package's javascripts
			$arr[] = "config";
			foreach (ramifip::$js as $f) $arr[] = $f;
			div::setGlobal("app_js", $arr);
			div::setGlobal("USE_CLEAN_URL", isset($setup->use_clean_url)?$setup->use_clean_url:false);
			div::setGlobal("PATH", PATH);
			div::setGlobal("FILES", FILES);
			div::setGlobal("WWW", WWW);
			div::setGlobal("PACKAGES", PACKAGES);
			div::setGlobal("CLEAN_URL", rpURL::getCleanURL());
			div::setGlobal("CLEAN_URL_BACK_PATH", rpURL::getCleanURLBackPath());
			div::setGlobal("CLEAN_URL_PARTS", rpURL::getCleanURLParts());
			div::setGlobal("WEB_RESOURCES", "ramifip/modules/rpCore/templates/web_resources");
			div::setGlobal("BACK_PATH", $back_path);

			rpTheme::$singleton = true;
		}

		parent::__construct($src, $items, $ignore);
	}

	/**
	 * Show
	 *
	 * @param mixed $data
	 */
	public function show($content = null, $subtitle = null){
		$this->__items = $content;
		parent::show();
	}
}

// End of file