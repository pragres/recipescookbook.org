<?php
// event-type: return-html

app::connectToDB();

$recipe = post("recipe");
$cmp = post("component");

$col = objectDB::getObjs(array(
            "tbName" => "ingredient_recipe",
            "where" => "id_recipe = $recipe"
        ));
foreach ($col as $i=>$item) {
        	$h = objectDB::getObjs("ingredient", "id_ingredient = {$item->id_ingredient}");
        	$col[$i]->name=  $h[0]->name;     
        }
   $options = array();

$r = objectDB::getObjs("ingredient");     

foreach ($r as $item) {
    $continue = false;
    foreach ($col as $h)
        if ($h->id_ingredient === $item->getId()) {
            $continue = true;
            break;
        }
    if ($continue === true)
        continue;
    $options[] = array("id" =>$item->getId(), "name"=>$item->name);
} 

e("recipes/admin/design/browsers/browserIngredientByRecipe", array(
	"id_recipe" => $recipe,
	"ingredientsby" => $col,
	"ingredients" => $options
));       

// End of file