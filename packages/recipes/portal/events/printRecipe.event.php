<?php

// event-type: return-html

$id = get("id");

if ($id != null){
	$recipe = RecipesModel::getRecipe($id);
	if ($recipe != null)
		echo new PrintRecipe($recipe);
}

// End of file