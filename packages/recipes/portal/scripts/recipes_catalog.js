$(function(){
    $("#btnRecipesCatalogFilter").click(function(){
        app.events.recipes.portal.events.showRecipesCatalog({
            filter: $("#edtRecipesCatalogFilter").val()
        }, "recipes-catalog-content");
    });
    
    $("#edtRecipesCatalogFilter").keypress(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;

        if (keyCode == 13) {
            app.events.recipes.portal.events.showRecipesCatalog({
                filter: $("#edtRecipesCatalogFilter").val()
            }, "recipes-catalog-content");
        }
        return true;
    });
});