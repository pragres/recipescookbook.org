<?php

//event-type: return-html

app::connectToDB();

$col = objectDB::getObjs(array('tbName' => 'usercomments'));

foreach($col as $i=>$item) $col[$i]->id = $item->getId();

e("recipes/admin/design/browsers/browserUserComments", array(
    	"comments" => $col));

// End of file

