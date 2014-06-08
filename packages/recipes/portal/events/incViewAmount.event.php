<?php

// event-type: return-object

$v = RecipesModel::incViewAmmount(post("recipe"));

echo "{viewamount: $v}";
