<?php

// event-type: return-object

$v = RecipesModel::incPeopleLike(post("recipe"));

echo "{peoplelike: $v}";