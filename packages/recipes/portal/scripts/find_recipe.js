
recipes.portal.FindRecipe = {
    ing_selector: null
};

recipes.portal.FindRecipe.IngredientsSelector = function(id, selector){

    this.id = id;
    this.selector = "#search-filter-ingredients";
    if (isset(selector))
        this.selector =  selector;

    this.ingredients = [];

    this.getInlineList = function(){
        var l = "";
        for(var i =0; i<this.ingredients.length; i++){
            if (i>0)
                l+=",";
            if (this.ingredients[i].contain == false)
                l+="-";
            l+=this.ingredients[i].ingredient.id;
        }
        return l;
    };
	
    this.addIngredient = function(id, contain){
        for(var i =0; i<this.ingredients.length; i++){
            var ing = this.ingredients[i];
            if (ing.ingredient.id == id){
                ramifip.gui.showNotification("No duplicate the ingredient");
                return false;
            }
        }
        this.ingredients[this.ingredients.length] = {
            ingredient: app.events.recipes.portal.events.getIngredient({
                id: id
            }),
            contain: contain
        };
        this.refreshIngredients();
        return true;
    };

    this.delIngredient = function (idx) {
        this.ingredients.splice(idx,1);
        this.refreshIngredients();
    };

    this.refreshIngredients = function(){
        var html = "<table class = \"portal-grid\">";
        var sand = "";
        for(var i =0; i<this.ingredients.length; i++){
            html += "<tr><td>";
            var ing = this.ingredients[i];
            if (ing.contain == true)
                html += "Contains";
            else
                html += "Not contains";
            sand = "";
            if (this.ingredients.length>0 && i< this.ingredients.length-1) sand = "AND";

            html += "</td><td>" + ing.ingredient.name + "</td><td>" + sand + "</td><td><div class = \"pointer padding-five\" onclick = \""+this.id+".delIngredient("+i+");\">x</div></td></tr>";
        }

        html += "</table>";
        
        $(this.selector).html(html);
    };

    this.show = function(){
        this.refreshIngredients();
    };

};

recipes.portal.FindRecipe.ing_selector = new recipes.portal.FindRecipe.IngredientsSelector("recipes.portal.FindRecipe.ing_selector");

$(function(){
    $("#btnSearch").click(function(){
        app.events.recipes.portal.events.showSearchResult({
            phrase: $("#edtTitle").val(),
            diet:  $("#cboDiet").val(),
            preparationtype:  $("#cboPreparation").val(),
            nationality:  $("#cboNationality").val(),
            occasion:  $("#cboOccasion").val(),
            cookingtime:  $("#cboCookingTime").val(),
            horary:  $("#cboHorary").val(),
            ingredients: recipes.portal.FindRecipe.ing_selector.getInlineList()
        },"search-result");
        $("#search-result").effect('highlight',{},900);
    });

    $("#addIngredient").click(function(){
        var c = $("#cboContain").val();
        recipes.portal.FindRecipe.ing_selector.addIngredient($("#cboIngredients").val(), c=="yes"?true:false);
    });
    recipes.portal.FindRecipe.ing_selector.show();
});