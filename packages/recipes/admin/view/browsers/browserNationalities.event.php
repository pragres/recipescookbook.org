<?php

//event-type: return-html

e('recipes/admin/design/browsers/browserNationalities',array(
	'section-title' => 'Nationalities', 
	'records' => RecipesModel::getRecords("nationality")));

// End of file