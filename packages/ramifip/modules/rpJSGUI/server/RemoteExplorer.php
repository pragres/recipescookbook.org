<?php

/**
 * Description of RemoteExplorerControl
 *
 * @author Administrador
 */
class RemoteExplorer {

	var $root;
	var $path;
	var $relative_path;

	/**
	 * RemoteExplorerControl's Constructor
	 */
	public function RemoteExplorer($path, $relative_path = WWW, $root = "../files") {
		$this->path = $this->repairPath($path);
		$this->relative_path = $relative_path;
		$this->root = $root;
	}

	public function repairPath($path) {

		$arr = explode("/", $path);
		if ($arr[count($arr) - 1] == "..") {
			unset($arr[count($arr) - 1]);
			unset($arr[count($arr) - 1]);
		}
		if ($arr[count($arr) - 1] == ".") {
			unset($arr[count($arr) - 1]);
		}
		return implode("/", $arr);
	}

	public function getFiles($path = null, $relative_path = null, $orderby = "type", $order = true) {
		$tipos = array(
            "bmp" => "Imagen",
            "gif" => "Imagen",
            "png" => "Imagen",
            "jpg" => "Imagen",
            "jpeg" => "Imagen"
            );

            if ($path == null)
            $path = $this->path;

            if ($relative_path == null)
            $relative_path = $this->relative_path;


            $files = array();
            $arr = scandir(str_replace("//", "/", $relative_path . "/" . $path));

            foreach ($arr as $item) {
            	$fullpath = str_replace("//", "/", $relative_path . "/" . $path . "/" . $item);
            	if ($item == ".")
            	continue;

            	if ($path == $this->root)
            	if ($item == "..")
            	continue;

            	$parts = explode(".", $item);
            	$ext = isset($parts[count($parts) - 1]) ? $parts[count($parts) - 1] : "";

            	$file = array("name" => $item,
                "is_dir" => is_dir($fullpath),
                "is_file" => is_file($fullpath),
                "fullpath" => $fullpath,
                "relativepath" => $relative_path,
                "path" => $path . "/" . $item,
                "type" => is_dir($fullpath) ? "Carpeta" : trim($ext) != "" ? (isset($tipos[$ext]) ? $tipos[$ext] : "Archivo") : "Carpeta",
                "ext" => $ext
            	);

            	if (substr($file['path'], strlen($file['path']) - 2) == "..") {
            		$arr = explode("/", $file['path']);
            		$file['path'] = "";
            		$ii = 0;
            		foreach ($arr as $ff)
            		if ($ii < count($arr) - 2)
            		$file['path'].= ( $ii++ > 0 ? "/" : "") . $ff;
            	}
            	$files[] = $file;
            }

            // order
            if ($orderby != null) {
            	for ($i = 0; $i < count($files) - 1; $i++)
            	for ($j = $i + 1; $j < count($files); $j++) {
            		if ($files[$i][$orderby] > $files[$j][$orderby] == $order) {
            			$tmp = $files[$i];
            			$files[$i] = $files[$j];
            			$files[$j] = $tmp;
            		}
            	}
            }

            return $files;
	}

	public function getBrowser($viewtype = "icon", $id = "x") {

		$breadcumb = "<input type = \"hidden\" id = \"browser-$id-path\" value =\"{$this->path}\"><div class = \"hidden\" id = \"breadcumb-archivos\"><table><tr><td>Archivos-</td>";

		$arr = explode("/", str_replace("../files", "", $this->path));
		$root = "../files";
		$pp = "";
		$p = true;

		foreach ($arr as $folder) {
			$pp .= $folder . "/";
			$pathto = "../files" . substr($pp, 0, strlen($pp) - 1);
			if ($folder == "..") {
				$pathto = "../files";
				$ii = 0;
				foreach ($arr as $ff) {
					if ($ii++ < count($arr) - 1)
					$pathto .= "/$ff";
				}
			}
			if ($p == false)
			$breadcumb .= "<td valign= \"center\"><label class = \"breadcumb-item folder-item\" onclick = \"app.admin.showArchivos('" . substr($pp, 0, strlen($pp) - 1) . "');\">{$folder}&nbsp;/</label></td>";
			else
			$breadcumb .= "<td valign= \"center\"><label class = \"breadcumb-item folder-item\" onclick = \"app.admin.showArchivos('" . $root . "');\">[raiz]:</label></td>";
			$p = false;
		}

		$breadcumb .= "</tr></table></div>";

		$code = $breadcumb . "<div id =\"file-browser\"><table><tr><td valign=\"top\"><table class = \"grid\" width = \"100%\"><tr><th></th><th>Archivo</th><th>Tama&ntilde;o</th><th>Tipo</th><th>Fecha de modificaci&oacute;n</th><th>&nbsp;</th>";


		$iconos = array(
            "bmp" => "imagen.png",
            "png" => "imagen.png",
            "gif" => "imagen.png",
            "jpeg" => "imagen.png",
            "jpg" => "imagen.png"
            );

            $icon = null;
            $files = $this->getFiles();

            foreach ($files as $file) {
            	$tipo = $file['type'];
            	$fn = $file['name'];
            	$icon = "file.png";
            	$ext = $file['ext'];

            	$action = "";
            	if ($file['is_dir']) {
            		$icon = "folder.png";
            		$action = "onclick = \"app.admin.showArchivos('{$file['path']}');\"";
            	} else {
            		if ($tipo == "Imagen") {
            			$ipath = str_replace(PACKAGES, "", $file['path']);
            			$action = "onclick = \"app.admin.showImage({path: '$ipath'});\"";
            		} else {
            			$icon = isset($iconos[$ext]) && $icon == null ? $iconos[$ext] : "file.png";
            			$action = ""; //onclick = \"selectFile('{$file['path']}')\"";
            		}
            	}
            	$iconpath = "img.php?f=ramifip/modules/rpJSGUI/icons/{$icon}";

            	if ($ext === "png" || $ext === "jpg" || $ext === "bmp" || $ext === "jpeg" || $ext === "gif")
            	$iconpath = $file['path'];

            	$size = filesize($file['fullpath']);
            	$fecha = date("F d Y H:i:s.", filectime($file['fullpath']));
            	$eliminar = $fn == '..' ? "&nbsp;" : "<div class = \"admin-link-delete\"onclick = \"goDeleteFile('{$file['path']}');\"></div>";
            	$code .= "<tr><td><img src=\"$iconpath\" heigh=\"28\"></td><td><label class = \"" . ($file['is_dir'] ? "folder-item" : "file-item") . " admin-gray-link\" $action>$fn</label></td><td>$size</td><td>$tipo</td><td>$fecha</td><td>$eliminar</td></tr>";
            }

            $code .="</table></td><td>";
            $code .= "<div id = \"browser-$id-fileselected\"></div></td></tr></table>";

            $code .="<script>
            $(function(){
                $(\"#browserArchivos-title\").html($(\"#breadcumb-archivos\").html());
            });
            </script>";
            return $code;
	}

}
?>
