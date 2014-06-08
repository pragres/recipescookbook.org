<?php
class ingredient_recipe extends ODBObject{
     var $id_ingredient = ODB_TYPE_STRING;
     var $id_recipe = ODB_TYPE_STRING;
     var $ammount = ODB_TYPE_STRING;
     static $without_id = false; 
}
// End of file