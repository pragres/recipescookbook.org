<?php

// event-type: return-html

$recipe = post("recipe");

if ($recipe != null) {
    $limit = post("limit", null);
    $r = RecipesModel::getLastComments($recipe);
    $total = count($r);
    $comments = array();
    foreach($r as $item) $comments[] = $item;
    
    $recipe = RecipesModel::getRecipe($recipe);
    $recipe->path = RecipesModel::recipePath($recipe);
    
    $i=0;
    foreach($comments as $item) $comments[$i++]->id = $item->getId();
    
    e("recipes/portal/design/last_comments",array(
    	"recipe" => $recipe,
    	"comments" => $comments,
    	"limit" => $limit,
    	"total" => $total
    ));
}

// End of file