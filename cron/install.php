<?php

define("PACKAGES", "../../postforall/packages/");

include PACKAGES."com/nusoap/nusoap.php";
include PACKAGES."ramifip/modules/rpCore/rpPropertiesFile.php";
include PACKAGES."ramifip/modules/rpCore/rpMail.php";

$conf = new rpPropertiesFile("../packages/postforall/service.conf");
$cliente = new nusoap_client($conf->url, true);
$cliente->setCredentials($conf->user,$conf->pass);

echo "[INFO] BASE DE DATOS - " . $cliente->call('comprobar_basedatos', array()) . "\n";

echo "[INFO] Eliminando tipo de contenido <recipe> ...\n";
echo $cliente->call('delTipoDeContenido', array(   
    'nombre' => 'recipe'
));

echo "[INFO] Creando tipo de contenido <recipe> ...\n";
echo $cliente->call('addTipoDeContenido', array(
    'nombre' => 'recipe',
    'titulo' => 'Mirta Recipe',
    'plantilla' => file_get_contents("plantilla.tpl"),
    'plantilla_lite' => file_get_contents("plantilla-lite.tpl")
));

echo "[INFO] Agregando los campos al tipo de contenido <recipe> ...\n";
echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'name',
    'titulo' => 'Name',
    'tipo' => 'titulo',
    'posible_parentezco' => 'TRUE',
	'indexable' => 'TRUE'
));

echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'description',
    'titulo' => 'Description',
    'tipo' => 'memo',
    'posible_parentezco' => 'false',
    'indexable' => 'TRUE'
));

echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'diet',
    'titulo' => 'Diet',
    'tipo' => 'texto',
    'posible_parentezco' => 'TRUE',
    'indexable' => 'TRUE'
));

echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'nationality',
    'titulo' => 'Nationality',
    'tipo' => 'texto',
    'posible_parentezco' => 'TRUE',
    'indexable' => 'TRUE'
));

echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'occasion',
    'titulo' => 'Occasion',
    'tipo' => 'texto',
    'posible_parentezco' => 'TRUE',
    'indexable' => 'TRUE'
));

echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'cookingtime',
    'titulo' => 'Preparation time',
    'tipo' => 'texto',
    'posible_parentezco' => 'TRUE',
    'indexable' => 'FALSE'
));

echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'preparationtype',
    'titulo' => 'Preparation type',
    'tipo' => 'texto',
    'posible_parentezco' => 'TRUE',
    'indexable' => 'TRUE'
));

echo $cliente->call('addCampo', array(
    'tipocontenido' => 'recipe',
    'nombre' => 'besttime',
    'titulo' => 'Best time',
    'tipo' => 'texto',
    'posible_parentezco' => 'TRUE',
    'indexable' => 'TRUE'
));