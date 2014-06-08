<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update subscribe ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "subscribe", "where" => "id_subscribe = {$id}"));
$r = $r[0];
if (isset($_POST["id_subscribe"])) $r->id_subscribe = post("id_subscribe");
if (isset($_POST["email"])) $r->email = post("email");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
