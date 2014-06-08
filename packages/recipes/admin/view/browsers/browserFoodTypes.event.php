<?php

//event-type: return-html

e("recipes/admin/design/browsers/browserFoodTypes", array(
	"section-title" => "Food types", 
	"records" => RecipesModel::getRecords("foodtype")));

// End of file