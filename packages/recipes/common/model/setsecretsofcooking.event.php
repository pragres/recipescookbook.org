<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2013-07-29 09:26:28 - Event for Update secretsofcooking ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "secretsofcooking", "where" => "id_secretsofcooking = {$id}"));
$r = $r[0];
if (isset($_POST["id_secretsofcooking"])) $r->id_secretsofcooking = post("id_secretsofcooking");
if (isset($_POST["secret"])) $r->secret = post("secret");
if (isset($_POST["header"])) $r->header = post("header");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
