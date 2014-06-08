<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Delete occasion ODBObject
//event-type: only-execute

$id = post("id");

app::connectToDB();
objectDB::remove("occasion","id_occasion = $id");

// End of file
