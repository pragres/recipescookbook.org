<?php

//event-type: return-html

app::connectToDB();

$order = post('order','name');
$page = post('page', 1);
$limit = 8;
$total = objectDB::getLengthOf("recipe");
$pages = $total / $limit;
if ($page > $pages) $page = $pages;
$offset = ($page - 1) * $limit;

$pages=1;

$col = objectDB::getObjs(array('tbName' => 'recipe', 'order' => $order/*, "offset" => $offset, "limit" => $limit*/));

foreach($col as $idx => $item){
	$col[$idx] = RecipesModel::getRecipe($item->getId());
}

e("recipes/admin/design/browsers/browserRecipes", array(
	"section-title" => "Recipes",
	"records" => $col,
	"orderby_$order" => true,
	"total" => $total,
	"limit" => $limit,
	"page" => $page,
	"offset" => $offset,
	"pages" => $pages
));

// End of file