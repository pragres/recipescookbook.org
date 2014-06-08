<?php

if (is_null(app::getAuthUser())) die("Access denied");

app::connectToDB();

$recipes = objectDB::getObjs(array("tbName" => "recipe", "order" => "name"));

foreach($recipes as $idx => $item){
	$recipes[$idx] = RecipesModel::getRecipe($item->getId());
}

$order = "name";

e("recipes/admin/design/reipeslist.tpl", array(
	"records" => $recipes,
	"orderby_$order" => true
));


// End of file