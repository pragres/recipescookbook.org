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
<br>
<br>
<br>
<div style="margin: auto; width: 200px;">
?$access_denied 
<label style="color: red;">Access denied</label> 
$access_denied? 
User: <br/>
<input class="edit" type="text" id="edtUser"><br>
Password: <br>
<input class="edit" type="password" id="edtPassword"><br>
<p align="center">
<button id="btnLogin" onclick="app.admin.login();">Login</button>
</p>
</div>
<div id="admin-footer"></div>
</body>
</html>
