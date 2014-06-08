Mirta Recipes Cookbook

---------------------------
Configuration
---------------------------

Goto the folder DATA and create subfolder called "recipes-config". Then create this files:


recipes.ini - General options
-----------------------------------------
# Mirta's Recipes Configuration file

dburl = "mysql://root@localhost/mirtarecipes"
share_recipe_email_from = "salvi.pascual@gmail.com"



users.json - List of administrators
-----------------------------------------
{
users:
    [
        {user: "rafa", password: "creandohorarios"},
        {user: "salvi", password: "ChangeMe"},
        {user: "mirta", password: "ChangeMe"}
    ]
}