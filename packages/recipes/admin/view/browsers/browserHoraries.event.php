<?php

// event-type: return-html

e('recipes/admin/design/browsers/browserHoraries', array(
	'section-title' => 'Horaries', 
	'records' => RecipesModel::getRecords("horary")));

// End of file