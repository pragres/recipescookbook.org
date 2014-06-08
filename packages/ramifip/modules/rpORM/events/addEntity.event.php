<?php

/**
 * Event for add a new entity
 *
 */

#event-type: return-object

class addEntity extends rpEvent{
	static function Run(&$params){
		$entity = $params->ENTITY;
		if (!is_null($entity)){
			if (substr($entity,strlen($entity)-6)!="Entity") $entity .= "Entity";

			$entityname = substr($entity,0, strlen($entity) - 6);

			if (class_exists($entity) && class_exists($entityname."Table") && class_exists($entityname."Collection")){
				$metadata = array();

				eval('$metadata = '.$entityname.'Table::getMetadata();');

				$p = array();

				foreach($metadata->fields as $field){
					$v = post(array($field->name, "field_{$entityname}_{$field->name}"));
					if (!is_null($v)) $p[$field->name] = $v;
				}

				try {
					$obj = new $entity($p);
					$obj->RESULT = 'OBJECT INSERTED';
					echo $obj->asJSON();
				} catch (Exception $e) {
					echo "{RESULT: 'OBJECT INSERTION FAILED'}";
				};
			} else echo "{RESULT: 'ENTITY UNKNOWN'}";
		} else echo "{RESULT: 'PLEASE, SEND ME THE NAME OF THE ENTITY'}";
	}
}


// End of file