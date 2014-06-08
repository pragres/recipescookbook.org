<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update horary_recipe ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "horary_recipe", "where" => "id_horary_recipe = {$id}"));
$r = $r[0];
if (isset($_POST["id_horary"])) $r->id_horary = post("id_horary");
if (isset($_POST["id_recipe"])) $r->id_recipe = post("id_recipe");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
