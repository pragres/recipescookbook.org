<?php

/**
 * phpull
 *
 * PHP Serialized and Relational Database
 *
 * phpull is a library for storage and retrieve serialized and relational data
 * only with PHP language.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program as the file LICENSE.txt; if not, please see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 *
 * @author Rafael Rodriguez Ramirez
 * @version: 1.0
 * @link http://phpull.pragres.com
 */

if (!defined("PHPULL_ROOT")) define("PHPULL_ROOT", "./");

define("PHPULL_ROLLBACK_TRANSACTION", "PHPULL_ROLLBACK_TRANSACTION");

class phpull {

	var $schema = null;

	/**
	 * Constructor
	 *
	 * @param string $schema
	 * @return phpNDS
	 */
	public function phpull($schema){
		$this->setSchema($schema);
	}

	/**
	 * Complete Object Properties
	 *
	 * @param mixed $source
	 * @param mixed $complement
	 * @return mixed
	 */
	static function cop($source, $complement){
		if (is_null($source)) return $complement;
		if (is_null($complement)) return $complement;
		if (is_scalar($complement)) return $complement;
		if (is_object($complement)){
			$vars = get_object_vars($complement);
			foreach($vars as $key => $value){
				if (is_object($source)){
					if (isset($source->$key)) $source->$key = self::cop($source->$key, $complement->$key);
					else  $source->$key = self::cop(null, $complement->$key);
				}
				if (is_array($source)){
					if (isset($source[$key])) $source[$key] = self::cop($source[$key], $complement->$key);
					else  $source[$key] = self::cop(null, $complement->$key);
				}
			}
		}
		if (is_array($complement)){
			foreach($complement as $key => $value){
				if (is_object($source)){
					if (isset($source->$key)) $source->$key = self::cop($source->$key, $complement[$key]);
					else  $source->$key = self::cop(null, $complement[$key]);
				}
				if (is_array($source)){
					if (isset($source[$key])) $source[$key] = self::cop($source[$key], $complement[$key]);
					else  $source[$key] = self::cop(null, $complement[$key]);
				}
			}
		}
		return $source;
	}

	/**
	 * Add schema
	 *
	 * @param string $schema
	 */
	public function addSchema($schema){
		$arr = explode("/",$schema);
		$path = PHPULL_ROOT;
		foreach($arr as $d){
			$path .= "$d/";
			if (!file_exists($path)) mkdir($path);
		}
	}

	/**
	 * Set the schema of work
	 *
	 * @param string $schema
	 */
	public function setSchema($schema){
		$this->addSchema($schema);
		$this->schema = $schema;
	}

	/**
	 * Rename a schema
	 *
	 * @param string $schema
	 * @param string $newname
	 */
	public function renameSchema($newname, $schema){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$restore = $schema === $this->schema;
		rename(PHPULL_ROOT.$schema, PHPULL_ROOT.$newname);
		if ($restore) $this->schema = $newname;
	}

	/**
	 * Remove a schema
	 *
	 * @param string $schema
	 * @return boolean
	 */
	public function delSchema($schema){
		if (file_exists(PHPULL_ROOT.$schema)){
			if (!is_dir(PHPULL_ROOT.$schema)) return false;
			$dir = scandir(PHPULL_ROOT.$schema);
			foreach($dir as $entry){
				if ($entry != "." && $entry != ".."){
					if (is_dir(PHPULL_ROOT.$schema."/$entry")){
						$this->delSchema($schema."/$entry");
					} else {
						if ($entry != ".locks" && $entry != ".references") $this->delNode($entry, $schema);
					}
				}
			}

			if (file_exists(PHPULL_ROOT.$schema."/.locks")) unlink(PHPULL_ROOT.$schema."/.locks");

			// Remove orphan references
			$references = $this->getReferences($schema);

			foreach($references as $rel){

				if ($rel['foreign_schema']== $schema) $sch = $rel['schema'];
				else $sch = $rel['foreign_schema'];

				// If the schema of reference is a subschema of this schema
				if ($schema == substr($sch,0,strlen($schema))) continue;

				$relats = $this->getReferences($sch);
				$newreferences = array();
				foreach($relats as  $re){
					if ($re['schema'] != $schema && $re['foreign_schema'] != $schema) $newreferences[] = $re;
				}
				file_put_contents(PHPULL_ROOT.$sch."/.references", serialize($newreferences));
			}

			unlink(PHPULL_ROOT.$schema."/.references");
			rmdir(PHPULL_ROOT.$schema);
			return true;
		}
		return false;
	}

	/**
	 * Insert a node in schema
	 *
	 * @param mixed $node
	 * @param scalar $id
	 * @param string $schema
	 * @return scalar
	 */
	public function addNode($node, $id = null, $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (is_null($id)) $id = date("Ymdhis").uniqid();
		if ($id == ".references" || $id == ".locks") throw Exception("Invalid ID '$id' for node");
		$node = $this->triggerBeforeAdd($node, $id, $schema);
		if ($node == false) return false;
		$data = serialize($node);
		file_put_contents(PHPULL_ROOT.$schema."/$id", $data);
		$this->lockNode($id, $schema);
		$r = $this->triggerAfterAdd($node, $id, $schema);
		if ($r === PHPULL_ROLLBACK_TRANSACTION){
			unlink(PHPULL_ROOT.$schema."/$id");
			$this->unlockNode($id, $schema);
			return PHPULL_ROLLBACK_TRANSACTION;
		}
		$this->unlockNode($id, $schema);
		return $id;
	}

	/**
	 * Trigger before add
	 *
	 * @param mixed $node
	 * @param string $id
	 * @param string $schema
	 * @return mixed
	 */
	public function triggerBeforeAdd($node, $id, $schema){
		return $node;
	}

	/**
	 * Trigger after add
	 *
	 * @param mixed $node
	 * @param string $id
	 * @param string $schema
	 * @return mixed
	 */
	public function triggerAfterAdd($node, $id, $schema){
		return $node;
	}

	/**
	 * Return a node
	 *
	 * @param scalar $id
	 * @param string $schema
	 * @return mixed
	 */
	public function getNode($id, $schema = null){
		if (is_null($schema)) $schema = $this->schema;		
		if (file_exists(PHPULL_ROOT.$schema."/$id")) $data = file_get_contents(PHPULL_ROOT.$schema."/$id"); else return null;
		$sec = 0; while ($this->isLockNode($id, $schema) || $sec > 999999) {$sec++;}
		$this->lockNode($id, $schema);
		$node = unserialize($data);
		$this->unlockNode($id, $schema);
		return $node;
	}

	/**
	 * Return a list of node's id
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getNodesID($schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");

		$list = array();
		$dir = scandir(PHPULL_ROOT.$schema);
		foreach($dir as $entry){
			if (!is_dir(PHPULL_ROOT.$schema."/$entry")){
				if ($entry != ".references" && $entry != ".locks") $list[] = $entry;
			}
		}

		return $list;
	}

	/**
	 * Return a list of nodes
	 *
	 * @param array $params
	 * @param string $schema
	 * @return array
	 */
	public function getNodes($params = array(), $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$params = self::cop(array("where" => "true","offset" => 0,"limit" => -1,"fields" => "*", "order" => null, "order_asc" => true),$params);
		$ids = $this->getNodesID($schema);
		$list = array();
		$i = 0;
		$c = 0;
		foreach($ids as $id){
			if ($c < $params['limit'] || $params['limit'] == -1){

				$node = $this->getNode($id, $schema);
				if (is_object($node)) $vars = get_object_vars($node);
				elseif(is_array($node)) $vars = $node;
				elseif(is_scalar($node)) $vars = array('value' => $node);
				$w = $params['where'];
				
				foreach($vars as $key => $value){
					$w = str_replace('{'.$key.'}', '$vars["'.$key.'"]', $w);
				}
				$w = str_replace('{id}','$id', $w);

				$r = false;
				
				eval('$r = '.$w.';');

				if ($r === true){
					if (is_object($node) || is_array($node)){
						$fields = explode(",",$params['fields']);
						foreach($fields as $key => $value) $fields[$value] = true;
						foreach($vars as $key => $value) if (!isset($fields[$key]) && !isset($fields['*'])) {
							if (is_object($node)) unset($node->$key);
							elseif (is_array($node)) unset($node[$key]);
						}
					}
					if ($c >= $params['offset']) $list[$id] = $node;
					$c++;
				}
			}
			$i++;
		}
		$order = $params['order'];

		if ($order !== false){
			$c = count($list);
			$sorted = array();
			foreach($list as $id => $node){
				$node = $this->getNode($id);
				$sorted[$id] = $node;
				if (is_object($node)) if (isset($node->$order)) $sorted[$id] = $node->$order; else $sorted[$id] = null;
				if (is_array($node)) if (isset($node[$order])) $sorted[$id] = $node[$order]; else $sorted[$id] = null;
			}
			if (asort($sorted)){
				if ($params['order_asc'] === false) $sorted = array_reverse($sorted);
				$newlist = array();
				foreach($sorted as $id => $value) $newlist[$id] = $list[$id];
				$list = $newlist;
			}
		}

		return $list;
	}

	/**
	 * Return the count of nodes
	 *
	 * @param array $params
	 * @param string $schema
	 * @return integer
	 */
	public function getCount($params = array(), $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$params = self::cop(array("where" => "true"),$params);

		$ids = $this->getNodesID($schema);
		$list = array();

		$c = 0;
		foreach($ids as $id){
			$node = $this->getNode($id, $schema);

			if (is_object($node)) $vars = get_object_vars($node);
			elseif(is_array($node)) $vars = $node;
			elseif(is_scalar($node)) $vars = array('value' => $node);

			$w = $params['where'];
			foreach($vars as $key => $value){
				$w = str_replace('{'.$key.'}','$vars["'.$key.'"]', $w);
			}
			$w = str_replace('{id}',$id, $w);

			$r = false;
			eval('$r = '.$w.';');
			if ($r === true) $c++;
		}
		return $c;
	}

	/**
	 * Remove one node
	 *
	 * @param scalar $id
	 * @param string $schema
	 * @return boolean
	 */
	public function delNode($id, $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		if (file_exists(PHPULL_ROOT.$schema."/$id")) {
			$sec = 0; while ($this->isLockNode($id, $schema) || $sec > 999999) {$sec++;}
			$this->lockNode($id, $schema);

			$r = $this->triggerBeforeDel($id, $schema);
			if ($r === PHPULL_ROLLBACK_TRANSACTION){
				$this->unlockNode($id, $schema);
				return PHPULL_ROLLBACK_TRANSACTION;
			}

			$restore = array();
			// Delete cascade
			$references = $this->getReferences($schema);
			foreach($references as $rel){
				if ($rel['foreign_schema'] == $schema) {
					if (!$this->existsSchema($rel['schema'])) continue;
					$ids = $this->getNodesID($rel['schema']);
					foreach($ids as $fid){
						$node = $this->getNode($fid, $rel['schema']);

						$restore[] = array(
							"node" => $node,
							"id" => $fid,
							"schema" => $rel['schema']
						);

						$procede = false;

						if (is_array($node)){
							if (isset($node[$rel['property']])){
								if ($node[$rel['property']]==$id) {
									if ($rel['delete_cascade'] == true) $procede = true;
									else $this->setNode($fid, array($rel['property'] => null), $rel['schema']);
								}
							}
						}elseif(is_object($node)){
							if (isset($node->$rel['property'])){
								if ($node->$rel['property']==$id) {
									if ($rel['delete_cascade'] == true) $procede = true;
									else $this->setNode($fid, array($rel['property'] => null), $rel['schema']);
								}
							}
						}

						if ($procede) {
							$r = $this->delNode($fid,$rel['schema']);
							if ($r === PHPULL_ROLLBACK_TRANSACTION){
								return PHPULL_ROLLBACK_TRANSACTION;
							}
						}
					}
				}
			}

			$r = $this->triggerAfterDel($id, $schema);

			if ($r === PHPULL_ROLLBACK_TRANSACTION){
				foreach ($restore as $rest){
					if ($this->existsNode($rest['id'], $rest['schema'])){
						$this->setNode($rest['id'],$rest['node'], $rest['schema']);
					} else {
						$this->addNode($rest['node'], $rest['id'],$rest['schema']);
					}
				}
				return PHPULL_ROLLBACK_TRANSACTION;
			}

			// Delete the node
			unlink(PHPULL_ROOT.$schema."/$id");
			$this->unlockNode($id, $schema);
			return true;
		}
		return false;
	}

	public function triggerBeforeDel($id, $schema){
		return '';
	}

	public function triggerAfterDel($id, $schema){
		return '';
	}

	/**
	 * Remove some nodes
	 *
	 * @param array $params
	 * @param string $schema
	 */
	public function delNodes($params = array(), $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$params = self::cop(array("where" => "true","offset" => 0,"limit" => -1), $params);

		if ($params['where'] != "true"){
			$nodes = $this->getNodes($params, $schema);
			foreach($nodes as $id => $node){
				$this->delNode($id, $schema);
			}
		} else {
			$nodes = $this->getNodesID($schema);
			foreach($nodes as $id){
				$this->delNode($id, $schema);
			}
		}
	}

	/**
	 * Update data of a node
	 *
	 * @param scalar $id
	 * @param mixed $data
	 * @param string $schema
	 */
	public function setNode($id, $data, $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$node = $this->getNode($id, $schema);

		$r = $this->triggerBeforeSet($id, $node, $data);
		if ($r === PHPULL_ROLLBACK_TRANSACTION){
			return PHPULL_ROLLBACK_TRANSACTION;
		}

		$sec = 0; while ($this->isLockNode($id, $schema) || $sec > 999999) {$sec++;}
		$this->lockNode($id, $schema);

		$old = $node;
		$node = self::cop($node, $data);

		file_put_contents($schema."/$id", serialize($node));

		$r = $this->triggerAfterSet($id, $old, $node, $data);

		if ($r === PHPULL_ROLLBACK_TRANSACTION){
			file_put_contents($schema."/$id", serialize($old));
		}

		$this->unlockNode($id, $schema);
	}

	public function triggerAfterSet($id, &$old, $new){
		return true;
	}

	public function triggerBeforeSet($id, &$node, &$data){
		return true;
	}

	/**
	 * Set id of Node
	 *
	 * @param scalar $id_old
	 * @param scalar $id_new
	 * @param string $schema
	 */
	public function setNodeID($id_old, $id_new, $schema = null){
		if (is_null($schema)) $schema = $this->schema;

		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");

		$sec = 0; while ($this->isLockNode($id_old, $schema) || $sec > 999999) {$sec++;}

		$this->lockNode($id_old, $schema);
		$this->lockNode($id_new, $schema);

		// Update cascade
		$references = $this->getReferences($schema);
		foreach($references as $rel){
			if ($rel['foreign_schema'] == $schema && $rel['update_cascade'] == true) {
				$ids = $this->getNodesID($rel['schema']);
				foreach($ids as $fid){
					$node = $this->getNode($fid, $rel['schema']);

					$procede = false;

					if (is_array($node)){
						if (isset($node[$rel['property']])){
							if ($node[$rel['property']] == $id_old) $procede = true;
						}
					}elseif(is_object($node)){
						if (isset($node->$rel['property'])){
							if ($node->$rel['property'] == $id_old) $procede = true;
						}
					}

					if ($procede) $this->setNode($fid, array($rel['property'] => $id_new), $rel['schema']);
				}
			}
		}

		rename(PHPULL_ROOT.$schema."/$id_old", PHPULL_ROOT.$schema."/$id_new");

		$this->unlockNode($id_old,$schema);
		$this->unlockNode($id_new,$schema);
	}

	/**
	 * Know if schema exists
	 *
	 * @param string $schema
	 * @return boolean
	 */
	public function existsSchema($schema = null){
		if (is_null($schema)) $schema = $this->schema;

		if (file_exists(PHPULL_ROOT.$schema)) {
			if (is_dir(PHPULL_ROOT.$schema)) return true;
		}

		return false;
	}

	/**
	 * Know if node exists
	 *
	 * @param string $id
	 * @param string $schema
	 * @return boolean
	 */
	public function existsNode($id, $schema = null){
		if (is_null($schema)) $schema = $this->schema;

		if (file_exists(PHPULL_ROOT.$schema."/$id")) {
			if (!is_dir(PHPULL_ROOT.$schema."/$id")) return true;
		}

		return false;
	}

	/**
	 * Return a list of schema's references
	 *
	 * @param string $schema
	 * @return array
	 */
	public function getReferences($schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$path = PHPULL_ROOT.$schema."/.references";
		if (!file_exists($path)){
			file_put_contents($path,serialize(array()));
		}
		$data = file_get_contents($path);
		return unserialize($data);
	}

	/**
	 * Get list of lock nodes
	 *
	 * @param string $schema
	 * @return array
	 */
	private function getLocks($schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$path = PHPULL_ROOT.$schema."/.locks";
		if (!file_exists($path)){
			file_put_contents($path, serialize(array()));
		}
		$data = file_get_contents($path);
		return unserialize($data);
	}

	/**
	 * Lock a node
	 *
	 * @param scalar $id
	 * @param string $schema
	 * @return boolean
	 */
	private function lockNode($id, $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		if (!file_exists(PHPULL_ROOT.$schema."/".$id)) return false;
		$blocked = $this->getLocks($schema);
		$blocked[$id] = true;
		$path = PHPULL_ROOT.$schema."/".".locks";
		file_put_contents($path,serialize($blocked));
		return true;
	}

	/**
	 * Unlock a node
	 *
	 * @param scalar $id
	 * @param string $schema
	 * @return boolean
	 */
	private function unlockNode($id, $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		$blocked = $this->getLocks($schema);
		if (isset($blocked[$id])) unset($blocked[$id]);
		$path = PHPULL_ROOT.$schema."/.locks";
		$nlocks = array();
		foreach($blocked as $lock) if (file_exists(PHPULL_ROOT.$schema."/$lock") && $id != $lock) $nlocks[] = $lock;
		file_put_contents($path,serialize($nlocks));
		return true;
	}

	/**
	 * Know if node are lock
	 *
	 * @param scalar $id
	 * @param string $schema
	 * @return boolean
	 */
	public function isLockNode($id, $schema = null){
		if (is_null($schema)) $schema = $this->schema;
		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		if (!file_exists(PHPULL_ROOT.$schema."/".$id)) return false;
		$blocked = $this->getLocks($schema);
		return isset($blocked[$id]);
	}

	/**
	 * Add new reference for schema
	 *
	 * @param array $params
	 * @return boolean
	 */
	public function addReference($params = array()){
		$params = self::cop(array("schema" => $this->schema, "foreign_schema" => $this->schema, "update_cascade" => true, "delete_cascade" => true), $params);

		if (!isset($params['property'])) return false;

		$schema = $params['schema'];
		$foreign_schema = $params['foreign_schema'];

		if (!$this->existsSchema($schema)) throw new Exception("Schema $schema not exists");
		if (!$this->existsSchema($foreign_schema)) throw new Exception("Schema $foreign_schema not exists");

		$references = $this->getReferences($schema);
		$freferences = $this->getReferences($foreign_schema);

		foreach($references as $rel) if (serialize($rel) == serialize($params)) return true;

		$references[] = $params;
		$freferences[] = $params;

		file_put_contents(PHPULL_ROOT.$schema."/.references", serialize($references));
		file_put_contents(PHPULL_ROOT.$foreign_schema."/.references", serialize($freferences));

		return true;
	}

	/**
	 * Delete a reference
	 *
	 * @param array $params
	 * @return boolean
	 */
	public function delReference($params = array()){
		$params = self::cop(array("schema" => $this->schema, "foreign_schema" => $this->schema, "update_cascade" => true, "delete_cascade" => true), $params);

		if (!isset($params['property'])) return false;

		$schema = $params['schema'];
		$foreign_schema = $params['foreign_schema'];

		$references = $this->getReferences($schema);
		$newreferences = array();
		foreach($references as $rel) {
			if ($rel['schema'] == $params['schema'] && $rel['foreign_schema'] == $params['foreign_schema'] && $rel['property'] == $params['property']) continue;
			$newreferences[] = $rel;
		}

		file_put_contents(PHPULL_ROOT.$schema."/.references", serialize($newreferences));

		$references = $this->getReferences($foreign_schema);
		$newreferences = array();
		foreach($references as $rel) {
			if ($rel['schema'] == $params['schema'] &&
			$rel['foreign_schema'] == $params['foreign_schema'] &&
			$rel['property'] == $params['property']
			) continue;

			$newreferences[] = $rel;
		}

		file_put_contents(PHPULL_ROOT.$foreign_schema."/.references", serialize($newreferences));

		return true;
	}
}


class phpullEntity{

	static $schema;
	private $id = null;

	public function __construct($properties, $id = null){
		if (is_object($properties)) $properties = get_object_vars($properties);
		if (!is_null($properties)){
			if (is_scalar($properties) && is_null($id)){
				$id = $properties;
			}
		}

		$db = new phpull(self::$schema);

		if ($id == null){
			foreach ($properties as $prop => $value) $this->$prop = $value;
				
			$id = $this->id;
			$this->id = $db->addNode($this, $id);
		} else {
			$this->load($id);
		}
	}

	/**
	 * Return the ID
	 *
	 * @return scalar
	 */
	public function getId(){
		return $this->id;
	}

	/**
	 * Set the ID
	 *
	 * @param scalar $id
	 */
	public function setId($id = null){
		if (is_null($id)) $id = date("Ymdhis").uniqid();
		$db = new phpull(self::$schema);
		$id_old = $this->id;
		$this->id = $id;
		$db->setNodeID($id_old, $this->id);
		$this->save();
	}

	
	/**
	 * Set property
	 *
	 * @param string $property
	 * @param mixed $value
	 */
	public function set($property, $value){
		$this->$property = $value;
		$db = new phpull(self::$schema);
		$db->setNode($this->id, array($property => $value));
	}
	
	/**
	 * Get property
	 *
	 * @param string $property
	 * @return mixed
	 */
	public function get($property){
		$db = new phpull(self::$schema);
		$node = $db->getNode($this->id);
		if (!isset($node->$property)) return null;
		return $node->$property;
	}
	
	/**
	 * Save the entity
	 *
	 */
	public function save(){
		$db = new phpull(self::$schema);
		$db->setNode($this->id, $this);
	}

	/**
	 * Load an entity
	 *
	 * @param scalar $id
	 */
	public function load($id = null){
		$db = new phpull(self::$schema);
		if (is_null($id)) $id = $this->id;

		$node = $db->getNode($id);
		if (!is_object($node)) throw new Exception("Entity constructor: The node have been an Object");
		$vars = get_object_vars($node);
		foreach($vars as $key => $value){
			$this->$key = $value;
		}

		$this->id = $id;
	}
}
// End of file