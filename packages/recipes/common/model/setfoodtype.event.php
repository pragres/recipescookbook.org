<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update foodtype ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "foodtype", "where" => "id_foodtype = {$id}"));
$r = $r[0];
if (isset($_POST["id_foodtype"])) $r->id_foodtype = post("id_foodtype");
if (isset($_POST["name"])) $r->name = post("name");
if (isset($_POST["description"])) $r->description = post("description");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
