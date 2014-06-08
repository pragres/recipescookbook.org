<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Delete ingredient_recipe ODBObject
//event-type: only-execute

$id_ingredient = post("id_ingredient");
$id_recipe = post("id_recipe");

app::connectToDB();
objectDB::remove("ingredient_recipe","id_ingredient = '$id_ingredient' AND id_recipe = '$id_recipe';");

// End of file
