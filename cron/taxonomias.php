<?php
define("PACKAGES", "../../postforall/packages/");

include PACKAGES."com/nusoap/nusoap.php";
include PACKAGES."ramifip/modules/rpCore/rpPropertiesFile.php";
include PACKAGES."ramifip/modules/rpCore/rpMail.php";

$conf = new rpPropertiesFile("../packages/postforall/service.conf");
$cliente = new nusoap_client($conf->url, true);
$cliente->setCredentials($conf->user,$conf->pass);

echo "[INFO] BASE DE DATOS - " . $cliente->call('comprobar_basedatos', array()) . "\n";

echo "Taxonomias...\n";

echo $cliente->call('clearTaxonomias', array(
    'tipocontenido' => 'recipe'
    ));

    $f = fopen("taxonomias.txt", "r");

    while (!feof($f)){
    	$s = fgets($f);
    	$s = trim($s);
    	if ($s!=""){
    		if (substr($s,0,1)!="#"){
    			echo $s."\n";
    			$arr = explode(":",$s);
    			echo $cliente->call('addTaxonomia',array(
				    'tipocontenido' => 'recipe',
					'descripcion' => utf8_encode(trim($arr[0])),
					'frase' => utf8_encode(trim($arr[1]))
    			));
    		}
    	}
    }

    fclose($f);
    
    $cliente->call("updateTaxResults", array(
    	"tipocontenido" => "recipe"    	
    ));
    