<?php

// event-type: return-object

$r = app::shareRecipe(post("id"), post("email"));

echo "{result: " . rpDataType::boolToString($r) . "}";