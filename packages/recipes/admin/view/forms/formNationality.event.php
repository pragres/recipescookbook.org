<?php

//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();
$obj = array();
if ($action == "edit") {
    $col = objectDB::getObjs("nationality", "id_nationality = $id");
    $obj = $col[0];
}

e("recipes/admin/design/forms/formNationality", $obj);

// End of file