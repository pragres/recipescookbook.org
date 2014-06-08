function showEditForm(id){
    ramifip.gui.window({
        id: "frmRecipe",
        modal: true,
        title: "Add recipe",
        width: 630,
        height: 380,
        buttons: [
            {
                caption: "Cancel",
                click: function(){
                    ramifip.gui.hideWin("frmRecipe");
                }
            },{
                caption: "Ok",
                click: function(){
                    if (validate()){
                        var data = recipe();
                        data.id = id;
                        recipes.model.setrecipe(data);
                        refresh();
                        ramifip.gui.hideWin("frmRecipe");
                    }
                }
            },
        ]
    });
    app.events.recipes.admin.view.forms.formRecipe({
        action: 'edit',
        id: id
    },"frmRecipe-body");
	
    nicEditors.allTextAreas();
	
	u('recipes/admin/scripts/formRecipes', true);
}

function showDelete(id){
    ramifip.gui.window({
        modal: true,
        id: "deleteConfirm",
        title: "Delete record",
        body: 'Are you sure?',
        height: 100,
        width: 250,
        buttons: [
            {
                caption: "No",
                click: function(){
                    ramifip.gui.hideWin("deleteConfirm");
                }
            }, {
                caption: "Yes",
                click: function(){
                    recipes.model.delrecipe({
                        table: "recipe",
                        id: id
                    });
                    ramifip.gui.hideWin("deleteConfirm");
                    refresh();
                }
            }
        ]
    });
}

function recipe(){
    return {
        name: $("#edtName").val(),
        description: $("#editor-edtDescription").html(),
        preparationmode: $("#editor-edtPreparationMode").html(),
        numberofguests: $("#edtNumberOfGuests").val(),
        cookingtime: $("#edtCookingTime").val(),
        prepareinfamily: $("#chkPrepareInFamily").attr('checked')=="checked",
        secretoffamily: $("#chkSecretOfFamily").attr('checked')=="checked",
        peoplelike: 0,
        peopleunlike: 0,
        viewamount: 0,
        nationality: $("#cboNationality").val(),
        diet: $("#cboDiet").val(),
        preparationtype: $("#cboPreparationType").val(),
        foodtype: $("#cboFoodType").val(),
        occasion: $("#cboOccasion").val(),
        picture: $("#edtPicture").val(),
        inserteddate: date("Y-m-d h:i:s"),
		keywpords: $("#edtKeywords").val()
    };
}

function refresh(order, page){
    $("#admin-detail").html("");
    app.admin.browsers.showRecipes(order, page);
}

function showHoraries(recipe){
    ramifip.gui.window({
        id: "horariesof",
        title: "Horaries of recipe",
        modal: true
    });
    app.events.recipes.admin.view.browsers.browserHoraryByRecipe({
        recipe: recipe,
        component: 'horariesof-body'
    }, "horariesof-body");
}

function showIngredients(recipe){
    ramifip.gui.window({
        id: "ingredientssof",
        title: "Ingredients of recipe",
        modal: true
    });
    app.events.recipes.admin.view.browsers.browserIngredientByRecipe({
        recipe: recipe,
        component: 'ingredientssof-body'
    }, "ingredientssof-body");
    
    u("recipes/admin/scripts/browserIngredientByRecipe");
}

$(function(){
	$("#btnAddRecord").click(function(){
	    ramifip.gui.window({
	        id: "frmRecipe",
	        modal: true,
	        title: "Add recipe",
	        width: 630,
	        height: 380,
	        buttons: [
	            {
	                caption: "Cancel",
	                click: function(){
	                    ramifip.gui.hideWin("frmRecipe");
	                }
	            },{
	                caption: "Ok",
	                click: function(){
	                    if (validate()){
	                        recipes.model.addrecipe(recipe());
	                        refresh();
	                        ramifip.gui.hideWin("frmRecipe");
	                    }
	                }
	            },
	        ]
	    });
	    app.events.recipes.admin.view.forms.formRecipe({
	        action: 'add'
	    },"frmRecipe-body");
		
	    nicEditors.allTextAreas();
		
		u('recipes/admin/scripts/formRecipes', true);
	});
	
	$(".chkHistoryWritten").change(function(){
		var recipe = $(this).attr("idrecipe");
		recipes.model.setrecipe({id: recipe, history_written: $(this).attr("checked")=="checked"});
	});
	
	$(".chkHistoryRevised").change(function(){
		var recipe = $(this).attr("idrecipe");
		recipes.model.setrecipe({id: recipe, history_revised: $(this).attr("checked")=="checked"});
	});
	
	$(".chkInCatalog").change(function(){
		var recipe = $(this).attr("idrecipe");
		recipes.model.setrecipe({id: recipe, in_catalog: $(this).attr("checked")=="checked"});
	});
	
	$(".chkBackLinks").change(function(){
		var recipe = $(this).attr("idrecipe");
		recipes.model.setrecipe({id: recipe, backlinks: $(this).attr("checked")=="checked"});
	});
	
	$(".chkCampaing").change(function(){
		var recipe = $(this).attr("idrecipe");
		var v = $(this).attr("checked")=="checked";
		recipes.model.setrecipe({id: recipe, campaing: v});
	});
	
	$(".sorter").click(function(){
		refresh($(this).attr('field'), $("page").val());
	});
	
	$("button.page").click(function(){
		refresh($("order").val(), $(this).html());
	});
});