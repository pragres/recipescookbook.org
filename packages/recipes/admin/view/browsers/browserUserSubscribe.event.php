<?php

//event-type: return-html

$col = RecipesModel::getRecords('subscribe');

e("recipes/admin/design/browsers/browserUserSubscribe", array(
       "subscribes" => $col
));

// End of file
