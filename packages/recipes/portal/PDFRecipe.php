<?php

$id = get("id");

$url = rpURL::getCleanURL();

if (is_null($id)) $id = $url;

if ($id != null) {
    $file = new RecipePDF($id);
    $recipe = RecipesModel::getRecipe($id);
    $file->Output("How-to-make-".str_replace(" ","-",$recipe->name)."-".date("Y-m-d-h-i-s").'.pdf', 'D');
} else {
    echo "Recipe not found!";
}

// End of file