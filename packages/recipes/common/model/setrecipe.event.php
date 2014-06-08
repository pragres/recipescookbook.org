<?php 
// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-15 11:03:20 - Event for Update recipe ODBObject
//event-type: return-object

$id = post("id");
app::connectToDB();
$r = objectDB::getObjs(array("tbName" => "recipe", "where" => "id_recipe = {$id}"));
$r = $r[0];
if (isset($_POST["id_recipe"])) $r->id_recipe = post("id_recipe");
if (isset($_POST["name"])) $r->name = post("name");
if (isset($_POST["description"])) $r->description = post("description");
if (isset($_POST["preparationmode"])) $r->preparationmode = post("preparationmode");
if (isset($_POST["numberofguests"])) $r->numberofguests = post("numberofguests");
if (isset($_POST["prepareinfamily"])) $r->prepareinfamily = post("prepareinfamily");
if (isset($_POST["secretoffamily"])) $r->secretoffamily = post("secretoffamily");
if (isset($_POST["peoplelike"])) $r->peoplelike = post("peoplelike");
if (isset($_POST["peopleunlike"])) $r->peopleunlike = post("peopleunlike");
if (isset($_POST["viewamount"])) $r->viewamount = post("viewamount");
if (isset($_POST["nationality"])) $r->nationality = post("nationality");
if (isset($_POST["diet"])) $r->diet = post("diet");
if (isset($_POST["preparationtype"])) $r->preparationtype = post("preparationtype");
if (isset($_POST["foodtype"])) $r->foodtype = post("foodtype");
if (isset($_POST["occasion"])) $r->occasion = post("occasion");
if (isset($_POST["cookingtime"])) $r->cookingtime = post("cookingtime");
if (isset($_POST["picture"])) $r->picture = post("picture");
if (isset($_POST["inserteddate"])) $r->inserteddate = post("inserteddate");
if (isset($_POST["keywords"])) $r->keywords = post("keywords");
if (isset($_POST["history_revised"])) $r->history_revised = post("history_revised");
if (isset($_POST["history_written"])) $r->history_written = post("history_written");
if (isset($_POST["in_catalog"])) $r->in_catalog = post("in_catalog");
if (isset($_POST["backlinks"])) $r->backlinks = post("backlinks");
if (isset($_POST["campaing"])) $r->campaing = post("campaing");
if (isset($_POST["to_sell"])) $r->to_sell = post("to_sell");

$r->setSaveStatus();
$r->save();

$json = new Services_JSON();
echo $json->encode($r);

// End of file
