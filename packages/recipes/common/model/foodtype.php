<?php
class foodtype extends ODBObject{
     var $name = ODB_TYPE_STRING;
     var $description = ODB_TYPE_STRING;
     static $without_id = true; 
}
// End of file