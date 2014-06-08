<?php
// event-type: return-object

app::verifyAuth();

if (isset($_SESSION['recipes_user']))
    echo "{ok: true}";
else
    echo "{ok: false}";

// End of file