<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Delete horary_recipe ODBObject
//event-type: only-execute

$id_horary = post("id_horary");
$id_recipe = post("id_recipe");

app::connectToDB();
objectDB::remove("horary_recipe","id_horary = '$id_horary' AND id_recipe = '$id_recipe';");

// End of file
