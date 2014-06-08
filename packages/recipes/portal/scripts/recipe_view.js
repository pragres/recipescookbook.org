recipes.portal.RecipeView = {
    refreshComments: function(){
        app.events.recipes.portal.events.showLastComments({
            limit: 5,
            recipe: recipes.portal.recipe_selected
        }, "last-comments");
        $("#last-comments").effect('highlight',{},900);
    },
    incPeopleLike: function(){
        var r = app.events.recipes.portal.events.incPeopleLike({
            recipe: recipes.portal.recipe_selected
        });
        $("#labPeopleLike").html(r.peoplelike);
    },
    incPeopleUnlike: function(){
        var r = app.events.recipes.portal.events.incPeopleUnlike({
            recipe: recipes.portal.recipe_selected
        });
        $("#labPeopleUnlike").html(r.peopleunlike);
    },
    viewAllComments: function(){
        app.events.recipes.portal.events.showLastComments({
            recipe: recipes.portal.recipe_selected
        }, "portal-content");
    }
};

$(function(){
	
	$('#portal-recipe-share-link').click(function(){
		recipes.portal.showShareRecipe($("#recipe-id").val());
	});
	
    $("#btnAddComment").click(function(){
        if (ramifip.gui.validateFields([{
            id: "edtNameToShow"
        },{
            id: "edtComment"
        }],{
			win_error_title: "For send a comment...",
			win_error_body: "You should insert your Name, as well as a Commentary to show before proceed.",
			win_error_height: 150,
			win_error_width: 300,
			win_zindex: 9999
		}) == true){
            recipes.model.addusercomments({
                username: $("#edtNameToShow").val(),
                usercomment: $("#edtComment").val(),
                recipe: recipes.portal.recipe_selected
            });
            $("#edtNameToShow").val("");
            $("#edtComment").val("");
        }
        recipes.portal.RecipeView.refreshComments();
    });

    //$("#portal-title").html('<h1>How to make ' + $("#recipe-name").val() + '</h1>');

    var id =$("#recipe-id").val();
    recipes.portal.recipe_selected = id;


    var r = app.events.recipes.portal.events.incViewAmount({
        recipe: id
    });
        
    recipes.portal.RecipeView.refreshComments();
});