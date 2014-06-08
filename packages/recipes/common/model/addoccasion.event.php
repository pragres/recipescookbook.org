<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Insert occasion ODBObject
//event-type: return-object

$name = post("name");
$description = post("description");

app::connectToDB();

$r = new occasion(array(
    "name" => $name,
    "description" => $description,
));

$json = new Services_JSON();
echo $json->encode($r);

// End of file
