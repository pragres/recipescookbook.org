<?php

//event-type: return-html

e('recipes/admin/design/browsers/browserPreparationTypes',array(
	'section-title' => 'Preparation types', 
	'records' => RecipesModel::getRecords("preparationtype")));

// End of file