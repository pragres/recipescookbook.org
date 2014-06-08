<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Delete ingredient ODBObject
//event-type: only-execute

$id = post("id");

app::connectToDB();
objectDB::remove("ingredient","id_ingredient = $id");

// End of file
