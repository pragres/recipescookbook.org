<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update diet ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "diet", "where" => "id_diet = {$id}"));
$r = $r[0];
if (isset($_POST["id_diet"])) $r->id_diet = post("id_diet");
if (isset($_POST["name"])) $r->name = post("name");
if (isset($_POST["description"])) $r->description = post("description");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
