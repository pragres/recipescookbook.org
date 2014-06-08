<?php

// event-type: return-html

$filter = post("filter");
u("recipes/portal/view/RecipesCatalogFilter");
echo new RecipesCatalogFilter($filter);

//