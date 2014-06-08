<?php

//event-type: return-html

e('recipes/admin/design/browsers/browserIngredients',array(
	'section-title' => 'Ingredients', 
	'records' => RecipesModel::getRecords("ingredient")));

// End of file