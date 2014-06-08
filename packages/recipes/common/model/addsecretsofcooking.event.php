<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2013-07-29 09:26:28 - Event for Insert secretsofcooking ODBObject
//event-type: return-object

$secret = post("secret");
$header = post("header");

app::connectToDB();

$r = new secretsofcooking(array(
    "secret" => $secret,
    "header" => $header,
));

$json = new Services_JSON();
echo $json->encode($r);

// End of file
