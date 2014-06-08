<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Insert ingredient_recipe ODBObject
//event-type: return-object

$id_ingredient = post("id_ingredient");
$id_recipe = post("id_recipe");
$ammount = post("ammount");

app::connectToDB();

$r = new ingredient_recipe(array(
    "id_ingredient" => $id_ingredient,
    "id_recipe" => $id_recipe,
    "ammount" => $ammount
));

$json = new Services_JSON();
echo $json->encode($r);

// End of file
