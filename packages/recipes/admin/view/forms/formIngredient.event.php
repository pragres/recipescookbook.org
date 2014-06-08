<?php

//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();

$obj = array();
if ($action == "edit") {
    $col = objectDB::getObjs("ingredient", "id_ingredient = $id");
    $obj = $col[0];
}

e("recipes/admin/design/forms/formIngredient", $obj);

// End of file