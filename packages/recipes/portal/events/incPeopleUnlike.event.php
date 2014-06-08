<?php

// event-type: return-object

$v = RecipesModel::incPeopleUnlike(post("recipe"));

echo "{peopleunlike: $v}";
