<?php

// event-type: return-object

$id = post("id");

$ing = RecipesModel::getIngredient($id);

echo "{id: $id, name: '{$ing->name}'}";

// End of file