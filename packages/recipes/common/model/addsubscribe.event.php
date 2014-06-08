<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Insert subscribe ODBObject
//event-type: return-object

$email = post("email");

app::connectToDB();

$r = new subscribe(array(
    "email" => $email,
));

$json = new Services_JSON();
echo $json->encode($r);

// End of file
