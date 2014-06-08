<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update usercomments ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "usercomments", "where" => "id_usercomments = {$id}"));
$r = $r[0];
if (isset($_POST["id_usercomments"])) $r->id_usercomments = post("id_usercomments");
if (isset($_POST["username"])) $r->username = post("username");
if (isset($_POST["usercomment"])) $r->usercomment = post("usercomment");
if (isset($_POST["recipe"])) $r->recipe = post("recipe");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
