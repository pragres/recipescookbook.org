<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Delete horary ODBObject
//event-type: only-execute

$id = post("id");

app::connectToDB();
objectDB::remove("horary","id_horary = $id");

// End of file
