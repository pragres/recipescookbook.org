<?php

if (is_null(app::getAuthUser())) die("Access denied");

header("Content-type: text/plain");
header('Content-disposition: attachment; filename="RecipesCookBookSubscribeList-' . date('Y-m-d-h-i-s'). '.txt"');

echo RecipesModel::getSubsribeListAsTxt();

// End of file