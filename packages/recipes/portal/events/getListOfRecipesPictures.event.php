<?php

// event-type: return-object

app::connectToDB();

$col = objectDB::getObjs(array(
            "tbName" => "recipe"
        ));

echo "[";
$i = 0;
foreach ($col as $item) {
    $p = trim($item->picture);
    if ($p != "") {
        if (rpFileSystem::fileExists($p)) {
            if ($i++ > 0)
                echo ",";
            echo "{picture: ".json_encode($p).", id: {$item->getId()}, name: \"{$item->name}\", path:\"".RecipesModel::recipePath($item)."\", name: \"{$item->name}\"}";
        }
    }
}
echo "]";

// End of file