<?php

//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();
$obj = array();
if ($action == "edit") {
    $col = objectDB::getObjs("occasion", "id_occasion = $id");
    $obj = $col[0];
}

e("recipes/admin/design/forms/formOccasion", $obj);

// End of file