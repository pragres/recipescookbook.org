function deleteIngredientOf(ingredient, recipe){
    recipes.model.delingredient_recipe({
        id_ingredient: ingredient,
        id_recipe: recipe
    });
    refreshIngredientsOf();
}

function insertIngredientTo(recipe){
    recipes.model.addingredient_recipe({
        id_ingredient: $("#cboIngredient").val(),
        ammount: $("#edtAmmount").val(),
        id_recipe: recipe
    });
    refreshIngredientsOf();
}

function refreshIngredientsOf(){
    app.events.recipes.admin.view.browsers.browserIngredientByRecipe({
        recipe: $("#recipe-id").val(),
        component: 'ingredientssof-body'
    }, 'ingredientssof-body');
}