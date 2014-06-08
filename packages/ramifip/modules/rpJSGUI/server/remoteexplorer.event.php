<?php
//event-type: return-html

u("ramifip/modules/rpJSGUI/server/RemoteExplorer");

$path = post("path", "files");
$viewtype = post("viewtype", "icon");
$re = new RemoteExplorer($path);
echo $re->getBrowser($viewtype);

?>
<script>
    function selectFile(path){
        var arr = explode(".", path);
        var extension = arr[arr.length - 1];
        var html = "Archivo: " + path + "<br>";
        if (extension == "png" || extension == "bmp" || extension == "jpg" || extension == "gif"  || extension == "jpeg")
            html = "<table><tr><td>" + img(path, "width = \"100\"") + "</td></tr><tr><td>" + html + "</td></tr></table>";

        $("#browser-x-fileselected").html(html);
    }
    function goDeleteFile(path){
        $("#fileToDelete").val(path);
        $("#frameDeleteFile").fadeIn("slow");
    }
  /*  function subeFile(){
        var iframe = document.getElementById('frameFile');
        iframe.contentWindow.document.formFile.submit();
        app.admin.showArchivos("<?php echo $path; ?>");
    }
    */
</script>
<input type ="hidden" value ="" id ="fileToDelete">
<div class ="hidden frameDelete" id ="frameDeleteFile">
    Est&aacute; seguro que desea eliminar el fichero?
    <button onclick = "app.RemoteExplorer.deleteFile($('#fileToDelete').val());">S&iacute;</button>
    <button onclick = "$('#frameDeleteFile').fadeOut('slow')">No</button>
</div>