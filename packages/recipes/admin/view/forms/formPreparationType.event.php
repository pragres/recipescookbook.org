<?php

//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();
$obj = array();
if ($action == "edit") {
    $col = objectDB::getObjs("preparationtype", "id_preparationtype = $id");
    $obj = $col[0];
}

e("recipes/admin/design/forms/formPreparationType", $obj);

// End of file