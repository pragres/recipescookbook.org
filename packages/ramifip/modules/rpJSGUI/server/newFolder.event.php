<?php

$foldername = post("foldername");
$path = post("path");
if ($foldername != null) {
    mkdir(PACKAGES."$path/$foldername");
}

?>
