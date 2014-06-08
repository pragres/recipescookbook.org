<?php

//event-type: return-html

$records = RecipesModel::getRecords("secretsofcooking");

foreach($records as $idx => $item){
	$pm = rpHelperHTML::truncateHTML(150, $item->secret);
	if (strlen($pm) < strlen($item->secret)) $pm .= "(...)";
	$records[$idx]->secret = $pm;     	
}

e("recipes/admin/design/browsers/browserSecretsOfCooking", array(
	"section-title" => "Secrets of cooking",
	"records" => $records
));

// End of file