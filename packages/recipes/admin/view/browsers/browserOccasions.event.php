<?php

// event-type: return-html

e('recipes/admin/design/browsers/browserOccasions',array(
	'section-title' => 'Occasions', 
	'records' => RecipesModel::getRecords("occasion")));

// End of file