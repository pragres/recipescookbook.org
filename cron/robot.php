<?php

define("PACKAGES", "../../postforall/packages/");
define("FILES", "../../../postforall/files/");
define("MAX_IMAGE_SIZE", 1024 * 300);
define("LOCK_FILE","robot.lck");

include PACKAGES."ramifip/lib/div/div.php";
include PACKAGES."com/nusoap/nusoap.php";
include PACKAGES."ramifip/modules/rpCore/rpPropertiesFile.php";
include PACKAGES."ramifip/modules/rpCore/rpMail.php";

if (file_exists(LOCK_FILE))	{
	echo "Una instancia ya se esta ejecutando.\n";
	exit();
}


class RecipesMisc {

    /**
     * Cooking time
     * @param <type> $m
     * @return <type>
     */
    static function viewCookingTime($m) {
        if ($m <= 59)
            return "$m min";
        $h = intval($m / 60);
        $mm = $m - ($h * 60);
        return "$h:" . ($mm < 10 ? "0" : "") . "$mm h";
    }

}



$f = fopen(LOCK_FILE, "w");
fclose($f);

$conf = new rpPropertiesFile(PACKAGES."postforall/service.conf");

echo $conf->url."\n";

$cliente = new nusoap_client($conf->url, true);
$cliente->setCredentials($conf->user,$conf->pass);

if ($cliente->getError() != false){
	unlink(LOCK_FILE);
	die($cliente->getError());
}

$r = $cliente->call('comprobar_basedatos', array());
if ($r != "CONEXION OK") echo "[INFO] BASE DE DATOS - " . $r;
if ($cliente->getError() != false){
	unlink(LOCK_FILE);
	die($cliente->getError());
}

include "rpDBDriver/rpDBDriver.php";
include "rpDBDriver/rpDBDriverMySQL.php";

$db = new rpDBDriverMySQL("mysql://mirtarecipes:creandohorarios@localhost/mirtarecipes");
$r = $db->getAsArray("select * from recipe");


echo "limpiando...\n";

$cliente->call("delContenido",array(
		"tipocontenido" => "recipe"
));

echo "Agregando recipes...\n";

foreach($r as $recipe){
	
	
	$name = $recipe['name'];

	echo $name."\n";

	$c = $db->getAsArray("select * from diet where id_diet = {$recipe['diet']}");
	$diet = $c[0]['name'];

	$c = $db->getAsArray("select * from nationality where id_nationality = {$recipe['nationality']}");	
	$nationality = $c[0]['name'];

	$c = $db->getAsArray("select * from occasion where id_occasion = {$recipe['occasion']}");	
	$occasion = $c[0]['name'];

	$cookingtime =  $c[0]['cookingtime']." minutes"; //RecipesMisc::viewCookingTime(intval($c[0]['cookingtime']));

	$c = $db->getAsArray("select * from preparationtype where id_preparationtype = {$recipe['preparationtype']}");	
	$preparationtype = $c[0]['name'];

	$c = $db->getAsArray("select horary.name as name from horary inner join horary_recipe on horary.id_hoarry = horary_recipe.id_horary");	

	$besttime = "";
	if (count($C)>1) foreach($c as $hor) $besttime .= $hor['name'].", "; else $besttime = $c['name'];

	$r = $cliente->call("addContenido",array(
		"tipocontenido" => "recipe",
		"campos" => "name,description,diet,nationality,occasion,cookingtime,preparationtype,besttime",
		"valores" => "'{$name}','{$description}','{$diet}','{$nationality}','{$occasion}','{$cookingtime}','{$preparationtype}','{$besttime}'"

	));

}

unlink(LOCK_FILE);