<?php

app::connectToDB();

$host = $_SERVER['HTTP_HOST'];

$xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
$urls = array();

$urls[] = "home";
$urls[] = "find-a-recipe";
$urls[] = "recipes-catalog";
$urls[] = "subscribe";
$urls[] = "read-a-secret";
$urls[] = "who-i-am";

$recipes = objectDB::getObjs(array("tbName" => "recipe"));

foreach ($recipes as $recipe){
	$urls[] = "recipe/".urlencode(str_replace("&","and",str_replace(" ","-",$recipe->name)));
}

date_default_timezone_set("America/New_York");

foreach ($urls as $url){
	$xml .= "<url>";
	$xml .= "<loc>http://$host/$url</loc>";
	$xml .= "<lastmod>".date("Y-m-d")."</lastmod>";
	$xml .= "<changefreq>weekly</changefreq>";
	$xml .= "<priority>0.8</priority>";
	$xml .= "</url>";
}

$xml .= "</urlset>";

echo $xml;
