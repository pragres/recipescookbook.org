<?php
// event-type: return-html

app::connectToDB();

$recipe = post("recipe");
$cmp = post("component");

$col = objectDB::getObjs(array(
            "tbName" => "horary_recipe",
            "where" => "id_recipe = $recipe"
        ));
        foreach ($col as $i=>$item) {
        	$h = objectDB::getObjs("horary", "id_horary = {$item->id_horary}");
        	$col[$i]->name=  $h[0]->name;     
        }
 
$options = array();

$r = objectDB::getObjs("horary");

foreach ($r as $item) {
    $continue = false;
    foreach ($col as $h)
        if ($h->id_horary === $item->getId()) {
            $continue = true;
            break;
        }
    if ($continue === true)
        continue;
    $options[] = array("id" =>$item->getId(), "name"=>$item->name);
}
 
e("recipes/admin/design/browsers/browserHoraryByRecipe", array(
	"id_recipe" => $recipe,
	"horariesby" => $col,
	"horaries" => $options
));

echo "<script>".o("recipes/admin/scripts/browserHoraryByRecipe.js")."</script>";

//End of file