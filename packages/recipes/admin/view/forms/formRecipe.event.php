<?php
//event-type: return-html

$action = post("action");
$id = post("id");

app::connectToDB();

$obj = new stdClass();
if ($action == "edit") {
    $col = objectDB::getObjs("recipe", "id_recipe = $id");
    $obj = $col[0];
}
$obj->nationalities = RecipesModel::getRecords("nationality");
$obj->diets = RecipesModel::getRecords("diet");
$obj->foodtypes = RecipesModel::getRecords("foodtype");
$obj->preparationtypes = RecipesModel::getRecords("preparationtype");
$obj->occasions = RecipesModel::getRecords("occasion");

e("recipes/admin/design/forms/formRecipe", $obj);

// End of file