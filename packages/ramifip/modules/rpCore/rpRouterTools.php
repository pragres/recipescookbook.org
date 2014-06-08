<?php

/**
 * Ramifip Router Tools
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpRouterTools {

	/**
	 * Parse CSS code
	 *
	 * @param string $path
	 * @param bool $compression
	 * @return string
	 */
	static function parseCSS($path, $compression = false){
		if (rpFileSystem::fileExists($path)){
			$folder = rpFileSystem::getFolderOf($path);
			$f = fopen($path, "r");
			$css = "";
			while (!feof($f)) {
				$s = fgets($f);
				$k = $s;
				$kk = $s;
				$kk = str_replace("@import", "", $kk);
				if ($kk == $s) {

					if (stripos($s,".jpg")!==false ||
					stripos($s,".bmp")!==false ||
					stripos($s,".gif")!==false ||
					stripos($s,".tif")!==false ||
					stripos($s,".png")!==false ||
					stripos($s,".jpeg")!==false ){
							
						$s = str_replace("url(", "url(img.php?f=$folder", $s);
						$s = str_replace("url(img.php?f={$folder}data:image", "url(data:image", $s);
						$s = str_replace("url(img.php?f=\"", "url(img.php?f=", $s);
						$s = str_replace("url(img.php?f='", "url(img.php?f=", $s);
							
						$router_paths = v('router_paths');
						
						foreach($router_paths['img'] as $pat => $xfolder){
							if (substr($xfolder,0,1)=="/") $xfolder = susbtr($xfolder,1);
							if (substr($xfolder,strlen($xfolder)-1,1)=="/") $xfolder = susbtr($xfolder,strlen($xfolder)-1);

							if ($xfolder != ""){
								$s = str_replace("url(img.php?f=".PACKAGES, "url(".WWW.rpURL::getCleanURLBackPath()."$pat/", $s);
								break;
							}
						}
					}

					if ($k != $s) {
						$s = str_replace("/'", "/", $s);
						$s = str_replace("')", ")", $s);
					}
				} else {
					$s = str_replace("@import \"", "@import \"css.php?f=$folder", $s);
					$s = str_replace("@import url(\"", "@import url(\"css.php?f=$folder", $s);
				}
				$css .= trim($s)."\n";
			}

			fclose($f);
		} else{
			$css = $path;
		}

		if ($compression == true){
			$css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
			$css = str_replace(': ', ':', $css);
			$css = str_replace(array("\r\n","\r","\n","\t"), '', $css);
			$css = str_replace(array("   ","   ","  ","  ")," ",$css);
		}

		return $css;
	}
}

// End of file