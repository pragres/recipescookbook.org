<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Delete foodtype ODBObject
//event-type: only-execute

$id = post("id");

app::connectToDB();
objectDB::remove("foodtype","id_foodtype = $id");

// End of file
