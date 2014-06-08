<?php

//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();

$obj = array();
if ($action == "edit") {
    $col = objectDB::getObjs("foodtype", "id_foodtype = $id");
    $obj = $col[0];
}

e("recipes/admin/design/forms/formFoodType", $obj);

// End of file