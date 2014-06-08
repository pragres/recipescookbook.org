<?php
class usercomments extends ODBObject{
     var $username = ODB_TYPE_STRING;
     var $usercomment = ODB_TYPE_STRING;
     var $recipe = ODB_TYPE_STRING;
     static $without_id = true; 
}
// End of file