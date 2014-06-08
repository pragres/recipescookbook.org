<?php
//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();

$obj = array();
if ($action == "edit") {
	$col = objectDB::getObjs("secretsofcooking", "id_secretsofcooking = $id");
	$obj = $col[0];
}

e("recipes/admin/design/forms/formSecret", $obj);

// End of file