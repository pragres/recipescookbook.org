<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update ingredient_recipe ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "ingredient_recipe", "where" => "id_ingredient_recipe = {$id}"));
$r = $r[0];
if (isset($_POST["id_ingredient"])) $r->id_ingredient = post("id_ingredient");
if (isset($_POST["id_recipe"])) $r->id_recipe = post("id_recipe");
if (isset($_POST["ammount"])) $r->ammount = post("ammount");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
