<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Insert horary_recipe ODBObject
//event-type: return-object

$id_horary = post("id_horary");
$id_recipe = post("id_recipe");

app::connectToDB();

$r = new horary_recipe(array(
    "id_horary" => $id_horary,
    "id_recipe" => $id_recipe
));

$json = new Services_JSON();
echo $json->encode($r);

// End of file
