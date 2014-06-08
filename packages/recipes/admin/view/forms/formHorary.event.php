<?php

//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();

$obj = array();
if ($action == "edit") {
    $col = objectDB::getObjs("horary", "id_horary = $id");
    $obj = $col[0];
}

e("recipes/admin/design/forms/formHorary", $obj);

// End of file