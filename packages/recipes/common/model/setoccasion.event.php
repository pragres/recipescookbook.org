<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update occasion ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "occasion", "where" => "id_occasion = {$id}"));
$r = $r[0];
if (isset($_POST["id_occasion"])) $r->id_occasion = post("id_occasion");
if (isset($_POST["name"])) $r->name = post("name");
if (isset($_POST["description"])) $r->description = post("description");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
