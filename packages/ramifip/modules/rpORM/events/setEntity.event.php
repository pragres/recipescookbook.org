<?php

/**
 * Event for update an entity
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
			$v = post(array($key,"field_{$entityname}_$key"));
			if (!is_null($v)) $k[$key] = $v;
		}

		$p = array();

		foreach($metadata->fields as $field){
			$v = post(array($field->name,"key_{$entityname}_{$field->name}"));
			if (!is_null($v)) $p[$field->name] = $v;
		}

		if (count($k) < 1) {
			echo "{RESULT: 'MISSING OBJECT KEYS'}";
		} else {
			try {
				$obj = new $entity($k, false);
				if (!is_null($obj)) {
					foreach($p as $field => $value)	$obj->$field = $value;
					$obj->OBJECT_UPDATED = true;
					$obj->save();
					echo $obj->asJson();
				} else {
					echo "{RESULT: 'OBJECT UPDATED'}";
				}
			} catch(Exception $e){
				echo "{RESULT: 'OBJECT UPDATE FAILED'}";
			}
		}
	} else echo "{RESULT: 'ENTITY UNKNOWN'}";
} else echo "{RESULT: 'PLEASE, SEND ME THE NAME OF THE ENTITY'}";

// End of file