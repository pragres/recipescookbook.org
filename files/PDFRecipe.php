<?php

u("recipes/common/view/RecipePDF");

$id = get("id");

if ($id != null) {
    $file = new RecipePDF($id);
    $file->Output('recipe.pdf', 'D');
} else
    echo "Recipe not found!";