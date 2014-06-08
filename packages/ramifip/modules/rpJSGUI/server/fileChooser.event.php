<?php
//event-type: return-html

u("ramifip/modules/rpJSGUI/server/RemoteExplorer");

$path = post("path", "");
$root = post("root", "../files");

$fileselected = post("fileselected", "");
$id = post("id", "x");
$idcomponent = post("component", "filechooser-body");

echo "<input id=\"filechooser-$id-path\" type=\"hidden\" value=\"$path\">";

$breadcumb = "<table><tr>";

$arr = explode("/", str_replace("../files", "", $path));

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
    if ($p == false) $breadcumb .= "<td class =\"breadcumb-item folder-item\" onclick=\"mostrarBrowser_$id('$pathto');\">$folder&nbsp;</td>";
    else $breadcumb .= "<td class =\"breadcumb-item folder-item\" onclick=\"mostrarBrowser_$id('$root');\">Files /</td>";
    $p = false;
}

$breadcumb .="</table>";

$code = $breadcumb . "<div style =\"margin: auto;width: 94%;height:240px;overflow:auto;padding:5px;background:white;border:1px solid gray;\"><table width = \"100%\">";

$iconos = array(
    "bmp" => "image.png",
    "png" => "image.png",
    "gif" => "image.png",
    "jpeg" => "image.png",
    "jpg" => "image.png"
);

$icon = null;
$r = new RemoteExplorer($path);
$files = $r->getFiles();
$i = 0;
foreach ($files as $file) {
    if ($path == $root && $file['name'] == "..") continue;
    $i++;
    $tipo = $file['type'];
    $fn = $file['name'];
    $icon = "file_lite.png";

    $ext = strtolower($file['ext']);

    $action = "";

    if ($file['is_dir']) {
        $icon = "folder.png";
        $action = "onclick = \"mostrarBrowser_$id('{$file['path']}','{$root}');\"";
    } else {
        $icon = isset($iconos[$ext]) && $icon == null ? $iconos[$ext] : "file.png";
        $action = "onclick = \"selectFile_$id('{$file['path']}')\"";
    }
    $iconpath = "img.php?f=ramifip/modules/rpJSGUI/icons/{$icon}";

    if ($ext === "png" || $ext === "jpg" || $ext === "bmp" || $ext === "jpeg" || $ext === "gif") {
        //$iconpath = $file['path'];
        $iconpath = "img.php?f=ramifip/modules/rpJSGUI/icons/image.png";
    }
    $size = filesize($file['fullpath']);
    $fecha = date("F d Y H:i:s.", filectime($file['fullpath']));
    if ($i == 1)
        $code .= "<tr>";
    $code .= "<td $action width=\"40\">";

    if ($file['is_dir']) {
        $code .= "<img src=\"$iconpath\" width=\"32\">";
    } else {
        if ($iconpath == $file['path'])
            $code .= "<img src=\"$iconpath\" width=\"32\">";
        else
            $code .= "<img src=\"$iconpath\" width=\"32\">";
    }
    $code .= "</td><td $action><label class = \"pointer " . ($file['is_dir'] ? "folder-item" : "file-item") . "\">$fn</label></td>";
    if ($i == 2) {
        $code.="</tr>";
        $i = 0;
    }
}

$code .= "</table></div>";

$code .= "<div id = \"browser-$id-fileselected\" class = \"fileselected\"></div><br><img src=\"ramifip/modules/rpJSGUI/icons/zoom_in.png\" onclick =\"ramifip.gui.fileChooser.showImage({path: ramifip.gui.fileChooser.fileselected});\" class = \"pointer\">";

echo $code;

// -- end code event --//
?>
<script>
    function mostrarBrowser_<?php echo $id; ?>(path,root){
        app.events.ramifip.modules.rpJSGUI.server.fileChooser({
            id: '<?php echo $id; ?>',
            component: '<?php echo $idcomponent; ?>',
            fileselected: '<?php echo $fileselected; ?>',
            path: path,
            root: root,
        },'<?php echo $idcomponent; ?>');
    }
    function selectFile_<?php echo $id; ?>(fileselected){
        $("#browser-<?php echo $id ?>-fileselected").html('<table><tr><td width="30">' + img(fileselected+'&h=90', 'height = "90"')+ "</td><td>" + str_replace("../files/", "", fileselected) + "</td></tr></table>");
        $("#browser-<?php echo $id ?>-fileselected").effect('highlight',{},900);
        $("#filechooser-<?php echo $id ?>-path").val(fileselected);
        ramifip.gui.fileChooser.fileselected = fileselected;
    }
    $(function(){
        ramifip.gui.fileChooser.fileselected = '<?php echo $fileselected; ?>';
        ramifip.gui.fileChooser.path = '<?php echo $path; ?>';
    });
</script>