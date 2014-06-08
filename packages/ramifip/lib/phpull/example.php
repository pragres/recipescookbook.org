<?php

/**
 * phpull
 * 
 * This is a basic example of phpull that demonstrates their main functionalities.
 * 
 * @author Rafael Rodriguez
 * 
 */

include "phpull.php";

// Adding a schema on the fly if not exists
$db = new phpull("database/companies");

// Deleting all nodes in schema database/companies
$db->delNodes();

// Add node into schema database/companies
$id = $db->addNode(array(
	"name" => "Pagres",
	"phone" => "1-(510) 457-1656"
));

// Change data of node
$db->setNode($id, array(
	"email" => "questions@pragres.com",
	"phone" => "+15104571656"
));

// Retrieve a node from schema database/companies
$company = $db->getNode($id);

echo $company['name']." - ";

// Adding a schema on the fly if not exists
$db->addSchema("database/employees");

// Clear the new schema
$db->delNodes(array(), "database/employees");

// Add reference on the fly
$db->addReference(array(
	"schema" => "database/employees",
	"foreign_schema" => "database/companies",
	"property" => "company"
));

// Add node related
$ide = $db->addNode(array(
	"name" => "Salvi Pascual",
	"company" => $id
),null,"database/employees");

// Retrieve employees
$employees = $db->getNodes(array(
	"where" => "{company} == '$id'",
	"offset" => 0,
	"limit" => 20,
	"fields" => "name",
	"order" => "name",
	"order_asc" => true
), "database/employees");

foreach ($employees as $ide => $employee){
	echo $employee['name'];	
}

// When removing the company, they will also remove the records related to her
$db->delNode($id);

// End of file