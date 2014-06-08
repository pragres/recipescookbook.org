<?php

// event-type: return-html

app::connectToDB();

foreach ($_POST as $key => $value) if ($value == "null") $_POST[$key] = null;

$phrase = post("phrase", "");
$diet = post("diet");
$preparationtype = post("preparationtype");
$nationality = post("nationality");
$occasion = post("occasion");
$cookingtime = post("cookingtime");
$horary = post("horary");
$ingredients = post("ingredients");
$words = explode(" ", $phrase);
$result = RecipesModel::search($phrase, $diet, $preparationtype, $nationality, $occasion, $cookingtime, $horary, $ingredients);
$i=0;

foreach ($result as $item) {
	$result[$i]->content = rpHelperHTML::highLightWords($words, ucfirst(strtolower($item->name)));
	$result[$i]->href = url(RecipesModel::recipePath($item));
	$i++;
}

e("recipes/portal/design/search_result",array(
	"results" => $result
));

// End of file