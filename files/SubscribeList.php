<?php

session_start();
$user = app::getAuthUser();

if ($user==null) die("Access denied");
app::connectToDB();

$objs = objectDB::getObjs(array(
    "tbName"=>"subscribe"
));

header("Content-type: text/plain");
foreach($objs as $obj) echo $obj->email.";";