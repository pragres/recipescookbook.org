<?php
/**
 * Event for get collection of {$classname}
 * 
 * @udpated {/div.now:Y-m-d h:i:s/}
 */

#event-type: return-object

$entity = post('ENTITY');

if (!is_null($entity)){
	if (substr($entity,strlen($entity)-6)!="Entity") $entity .= "Entity";
	$entityname = substr($entity,0, strlen($entity) - 6);
	$collectionanme = $entityname."Collection";
	$col = new $collectionanme();
	$col->loadItems($_POST);
	echo "{total: ".$col->getLength().", table: ".$col->asJson()."}";
} else echo "{RESULT: 'PLEASE, SEND ME THE NAME OF THE ENTITY'}";

// End of file