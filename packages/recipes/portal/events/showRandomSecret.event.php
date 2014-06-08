<?php

// event-type: return-html

$s = RecipesModel::getRandomSecret();

e("recipes/portal/design/secret", array("secret" => $s));

// End of file