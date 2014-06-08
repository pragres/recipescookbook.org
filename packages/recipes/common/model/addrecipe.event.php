<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Insert recipe ODBObject
//event-type: return-object

$name = post("name");
$description = post("description");
$preparationmode = post("preparationmode");
$numberofguests = post("numberofguests");
$prepareinfamily = post("prepareinfamily");
$secretoffamily = post("secretoffamily");
$peoplelike = post("peoplelike");
$peopleunlike = post("peopleunlike");
$viewamount = post("viewamount");
$nationality = post("nationality");
$diet = post("diet");
$preparationtype = post("preparationtype");
$foodtype = post("foodtype");
$occasion = post("occasion");
$cookingtime = post("cookingtime");
$picture = post("picture");
$inserteddate = post("inserteddate");
$keywords = post("keywords");
$history_revised = post("history_revised");
$history_written = post("history_written");
$in_catalog = post("in_catalog");
$backlinks = post("backlinks");
$campaing = post("campaing");
$to_sell = post("to_sell");

app::connectToDB();

$r = new recipe(array(
    "name" => $name,
    "description" => $description,
    "preparationmode" => $preparationmode,
    "numberofguests" => $numberofguests,
    "prepareinfamily" => $prepareinfamily,
    "secretoffamily" => $secretoffamily,
    "peoplelike" => $peoplelike,
    "peopleunlike" => $peopleunlike,
    "viewamount" => $viewamount,
    "nationality" => $nationality,
    "diet" => $diet,
    "preparationtype" => $preparationtype,
    "foodtype" => $foodtype,
    "occasion" => $occasion,
    "cookingtime" => $cookingtime,
    "picture" => $picture,
    "inserteddate" => $inserteddate,
    "keywords" => $keywords,
    "history_revised" => $history_revised,
    "history_written" => $history_written,
    "in_catalog" => $in_catalog,
    "backlinks" => $backlinks,
    "campaing" => $campaing,
    "to_sell" => $to_sell,
));

$json = new Services_JSON();
echo $json->encode($r);

// End of file
