<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head profile="http://www.w3.org/2005/10/profile">
		<link rel="icon" type="image/ico" href="{$WWW}{$BACK_PATH}images/favicon.ico"></link>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<title>Mirta Recipes cookbook: Administration</title>
{% WEB_RESOURCES %}
</head>
<body>
{% recipes/admin/design/header %}
<div id = "primary-links">
    <label option = "Diets" class = "menu-item primary-link pointer padding-five">Diets</label>
    <label option = "FoodTypes" class = "menu-item primary-link pointer padding-five">Food types</label>
    <label option = "Horaries" class = "menu-item primary-link pointer padding-five">Horaries</label>
    <label option = "Ingredients" class = "menu-item primary-link pointer padding-five">Ingredients</label>
    <label option = "Nationalities" class = "menu-item primary-link pointer padding-five">Nationalities</label>
    <label option = "Occasions" class = "menu-item primary-link pointer padding-five">Occasions</label>
    <label option = "PreparationTypes" class = "menu-item primary-link pointer padding-five">Preparation types</label>
    <label option = "SecretsOfCooking" class = "menu-item primary-link pointer padding-five">Secrets of cooking</label>
    <label option = "Recipes" class = "menu-item primary-link pointer padding-five">Recipes</label>
   <!--{ <label option = "UserComments" class = "menu-item primary-link pointer padding-five">User's comments</label> }-->
    <label option = "UserSubscribe" class = "menu-item primary-link pointer padding-five">Subscribe</label>
</div>
<div id = "admin-section">
{% section %}    
</div>
<div id = "admin-footer"></div>
<label class = "primary-link pointer padding-five"  id ="btnStatics">Statistics</label>
<label class = "primary-link pointer padding-five"  id ="btnLogout">Logout</label>
</body>
</html>
