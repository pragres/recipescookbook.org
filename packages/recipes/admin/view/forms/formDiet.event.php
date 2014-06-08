<?php

//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();
$obj = array();
if ($action == "edit") {
    $col = objectDB::getObjs("diet", "id_diet = $id");
    $obj = $col[0];
}

e("recipes/admin/design/forms/formDiet", $obj);