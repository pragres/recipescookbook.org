<?php

/*
 * Load objects from database with ObjectDB
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
 * @author Salvi Pascual <salvi.pascual@pragres.com>
 * @version 4.1
 * @link http://objectdb.pragres.com
 */

define("ODB_ROOT_DIR", '../');

include ODB_ROOT_DIR.'objectDB.inc';

objectDB::connect('pgsql://postgres:postgres@localhost:5432/objectdb');

include_once ODB_ROOT_DIR."examples/city.php";

$cities = objectDB::getObjs(array('tbName' => 'city', 'order' => 'population DESC'));

foreach ($cities as $city) $city->showCard();

// End of file