<?php

//event-type: only-execute

$path = post("path", null);
$relative_path = post("relative_path", PACKAGES);
if ($path != null)
    if (is_dir($relative_path . $path))
        rmdir($relative_path . $path);
    else
        unlink($relative_path . $path);

// -- end code event --//