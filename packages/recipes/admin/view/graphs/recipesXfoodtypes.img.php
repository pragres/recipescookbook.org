<?php


u("recipes/admin/view/graphs/DefaultPieChart");

app::connectToDB();
$n = objectDB::getObjs("foodtype");

$points = array();
$labels = array();
foreach ($n as $item) {
	$c = objectDB::getLengthOf("recipe", "foodtype = {$item->getId()}");
	if ($c > 0){
		$points[] = $c;
		$labels[] = $item->name;
	}
}

$g = new DefaultPieChart($points, $labels, "Recipes by food type");
