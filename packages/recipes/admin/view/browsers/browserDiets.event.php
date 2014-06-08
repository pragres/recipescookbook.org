<?php

// event-type: return-html

e("recipes/admin/design/browsers/browserDiets", array(
	"section-title" => "Diets", 
	"records" => RecipesModel::getRecords("diet")));

//End of file