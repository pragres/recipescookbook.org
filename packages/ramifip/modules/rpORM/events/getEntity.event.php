<?php

/**
 * Event for get entity
 *
 */

#event-type: return-object

$entity = post('ENTITY');

if (!is_null($entity)){
	if (substr($entity,strlen($entity)-6)!="Entity") $entity .= "Entity";

	$entityname = substr($entity,0, strlen($entity) - 6);

	if (class_exists($entity) && class_exists($entityname."Table") && class_exists($entityname."Collection")){
		$metadata = array();
		eval('$metadata = '.$entityname.'Table::getMetadata();');

		$k = array();

		foreach($metadata->primary_key as $key){
			$v = post(array($key,"key_{$entityname}_$key"));
			if (!is_null($v)) $k[$key] = $v;
		}

		if (count($k) < 1) {
			echo "{RESULT: 'MISSING OBJECT KEYS'}";
		} else {
			try {
				$collectionanme = $entityname."Collection";
				$col = new $collectionanme();
				$item = $col->getItem($k);

				if (!is_null($item)) {
					$item->RESULT = 'OBJECT FOUND';
					echo $item->asJson();
				} else {
					echo "{RESULT: 'OBJECT_NOT_FOUND'}";
				}
			} catch(Exception $e){
				echo "{RESULT: 'AN ERROR OCCURED WHEN TRY GET THE OBJECT: {$e}'}}";
			}
		}
	} else echo "{RESULT: 'ENTITY UNKNOWN'}";
} else echo "{RESULT: 'PLEASE, SEND ME THE NAME OF THE ENTITY'}";

// End of file