<?php
/**
 * Event for update: {$classname}
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
				$col->removeItem($k);
				echo "{OBJECT_DELETED: true}";
			} catch(Exception $e) {
				echo "{OBJECT_DELETED: false}";
			}
		}

	} else echo "{OBJECT_DELETED: false}";
} else echo "{OBJECT_DELETED: false}";

// End of file