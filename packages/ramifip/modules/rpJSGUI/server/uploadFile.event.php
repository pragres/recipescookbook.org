<?php
$folder = get('folder', "../files");
$fileselected = "";

function UploadFile($nameinput, $folder) {
	global $fileselected;
	$tam_max = 1048576;
	if (is_uploaded_file($_FILES[$nameinput]['tmp_name'])) {
		if ($_FILES[$nameinput]['size'] > $tam_max) {
			unlink($_FILES[$nameinput]['tmp_name']);
			echo "File size exceded the limit";
			return false;
		} else {
			if (strstr($_FILES[$nameinput]['name'], '..')) {
				echo "Access denied";
				return false;
			} else {
				echo "Upload file successful";
				$fn = $_FILES[$nameinput]['name'];
				copy($_FILES[$nameinput]['tmp_name'], WWW . "$folder/$fn");
				$fileselected = WWW . "$folder/$fn";
				unlink($_FILES[$nameinput]['tmp_name']);
				return $fn;
			}
		}
	}

	echo "An error ocurred: " . $_FILES['archivo']['error'];
	return false;
}

echo "Browse a file: ";
if (isset($_FILES['edtFile'])) {
	$fn = UploadFile("edtFile", $folder);
}
?>
<table>
	<tr>
		<td valign="top" align="center"><?php

		if (isset($fn)) {
			echo "<img src=\"img.php?f=width-150/$folder/$fn\">";
			echo "<br>".substr($fn,0,30);
			echo "<input id=\"edtLastUploadFile\" value = \"$folder/$fn\" type=\"hidden\">";
		}
		?></td>
		<td valign="top">
		<form name="formFile"
			action="index.php?e=ramifip/modules/rpJSGUI/server/uploadFile&folder=<?php echo $folder; ?>"
			method="POST" enctype="multipart/form-data"><input type="file"
			name="edtFile"> <input type="submit" value="Upload"></form>
		</td>
	</tr>
</table>
