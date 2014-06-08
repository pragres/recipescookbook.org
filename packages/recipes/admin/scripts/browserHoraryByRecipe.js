function deleteHoraryOf(horary, recipe){
    recipes.model.delhorary_recipe({
        id_horary: horary,
        id_recipe: recipe
    });
    refreshHorariesOf(recipe);
}

function insertHoraryTo(recipe){
    recipes.model.addhorary_recipe({
        id_horary: $("#cboHorary").val(),
        id_recipe: recipe
    });
    refreshHorariesOf(recipe);
}

function refreshHorariesOf(recipe){
    app.events.recipes.admin.view.browsers.browserHoraryByRecipe({
        recipe: recipe,
        component: 'horariesof-body'
    }, 'horariesof-body');
}