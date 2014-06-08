<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Insert usercomments ODBObject
//event-type: return-object

$username = post("username");
$usercomment = post("usercomment");
$recipe = post("recipe");

app::connectToDB();

$r = new usercomments(array(
    "username" => $username,
    "usercomment" => $usercomment,
    "recipe" => $recipe,
));

$json = new Services_JSON();
echo $json->encode($r);

// End of file
